import { useState } from 'react'

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
import MarkdownRender from '../../shared/MarkdownRender';
import { useNavigate } from 'react-router-dom';

const AuthorArticle = () => {
    const [saveLoad, setSaveLoad] = useState<boolean>(false);
    const [article, setArticle] = useState<string>('');
    const [articleTitle, setArticleTitle] = useState<string>('');

    const selectedAccount = useSelector(getSelectedAccount);
    const user = useSelector(getFirebaseUser);
    const dispatch = useDispatch();

    const { setState, bindings } = useTabs('1');

    const navigate = useNavigate();

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
            navigate('/author/articles')
        } catch (error) {
            setSaveLoad(false);
        }
    }

    return (
        <PageLayout
            title={<Input value={articleTitle} onChange={e => setArticleTitle(e.target.value)} width={"100%"} mt={0} mb={0} placeholder='Название статьи' />}
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
                        ? <MarkdownRender markdownString={article}/>
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
