import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button, Tabs, Textarea, useTabs, Text, Input, Spacer } from '@geist-ui/core';
import PageLayout from '../../../../Layout/PageLayout'
import styled from 'styled-components'
import AuthorAccountsSelect from '../../AuthorAccountsSelect'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedAccount } from '../../../../../redux/slices/authorSlice/author.slice'
import { AuthorRequests } from '../../../../../api/authorRequests'
import { nanoid } from 'nanoid'
import { getFirebaseUser } from '../../../../../redux/slices/userSlice/userSlice'
import { setArticles } from '../../../../../redux/slices/articlesSlice/articles.slice'

const AuthorArticle = () => {
    const [saveLoad, setSaveLoad] = useState<boolean>(false);
    const [article, setArticle] = useState<string>('');
    const [articleTitle, setArticleTitle] = useState<string>('');

    const selectedAccount = useSelector(getSelectedAccount);

    const user = useSelector(getFirebaseUser);
    const dispatch = useDispatch();

    const { setState, bindings } = useTabs('1');


    const saveArticle = async () => {
        try {
            setSaveLoad(true);
            const articles = await AuthorRequests.addArticle({
                title: articleTitle,
                content: article,
                id: nanoid(),
                ownerId: user?.uid || '',
                account: selectedAccount,
                published: false
            });
            dispatch(setArticles(articles))
            setSaveLoad(false);
        } catch (error) {
            setSaveLoad(false);
        }
    }

    return (
        <PageLayout
            title={<Input value={articleTitle} onChange={e => setArticleTitle(e.target.value)} width={"100%"} mt={0} mb={0} placeholder='Название списка' />}
            headerActions={[
                <AuthorAccountsSelect />,
                <Button
                    onClick={saveArticle}
                    loading={saveLoad}
                    ml={1}
                    disabled={article.length === 0}
                    auto
                    type={'secondary'}
                    children="Сохранить"
                />
            ]}>
            <Spacer h={3} />
            <Tabs {...bindings}>
                <Tabs.Item label="Писать" value="1">

                    <Textarea placeholder='# Привет мир' style={{ minHeight: '500px' }} value={article} width={'100%'} resize='vertical' onChange={e => setArticle(e.target.value)} />
                </Tabs.Item>
                <Tabs.Item label="Предварительный просмотр" value="2">
                    {article.length > 0
                        ? <ReactMarkdown
                            children={article}
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            style={darcula}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        />
                        : <Text small type={'secondary'} children={'Ничего нет для предварительного просмотра'} />
                    }
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    )
};

const StyledArticleFooter = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: #fafafa;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #eeeeee;
`

export default AuthorArticle;
