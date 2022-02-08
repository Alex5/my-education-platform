import { useState } from 'react'

import { Button, Tabs, Textarea, useTabs, Text, Input, Spacer, Loading, useToasts, ButtonGroup } from '@geist-ui/core';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { Download } from '@geist-ui/react-icons';
import axios, { AxiosResponse } from 'axios';
import { IArticle } from '../../../../../redux/slices/articlesSlice/articles.types';

const AuthorArticle = () => {
    const { state } = useLocation();
    const stateArticle = state as IArticle || null;

    const [saveLoad, setSaveLoad] = useState<boolean>(false);
    const [article, setArticle] = useState<string>(stateArticle?.content || '');
    const [sketch, setSketch] = useState<string>(stateArticle?.sketch || '');
    const [articleTitle, setArticleTitle] = useState<string>(stateArticle?.title || '');
    const [mdLink, setMdLink] = useState<string>('');
    const [loadMdLink, setLoadMdLink] = useState<boolean>(false);

    const selectedAccount = useSelector(getSelectedAccount);
    const user = useSelector(getFirebaseUser);
    const dispatch = useDispatch();

    const { bindings } = useTabs('1');
    const { setToast } = useToasts();

    const navigate = useNavigate();

    const saveArticle = async () => {
        setSaveLoad(true);
        const articles = await AuthorRequests.addArticle({
            title: articleTitle,
            content: article,
            ownerId: user?.uid || '',
            accountId: stateArticle?.accountId || selectedAccount.id,
            published: false,
            sketch,
            createdAt: Date.now(),
            id: stateArticle?.id
        });
        dispatch(setArticles(articles))
        setSaveLoad(false);
        navigate('/author/articles')
    }

    const loadMdString = async () => {
        setLoadMdLink(true);
        axios
            .get<string, AxiosResponse<string>>(mdLink)
            .then(({ data }) => {
                setArticle(data);
                setMdLink('');
                setLoadMdLink(false);
            })
            .catch((error) => {
                setLoadMdLink(false);
                setMdLink('');
                setToast({
                    text: error.message,
                    type: 'error'
                })
            })
    }

    return (
        <PageLayout
            title={
                <StyledArticleTitleInput
                    onChange={e => setArticleTitle(e.target.value)}
                    scale={4 / 3}
                    value={articleTitle}
                    placeholder='Название статьи'
                    width={'100%'}
                />
            }
            headerActions={[
                <AuthorAccountsSelect accountId={stateArticle?.accountId || ''} />,
                <StyledArticleTitleInput
                    onChange={e => setMdLink(e.target.value)}
                    iconRight={mdLink.length > 0 && loadMdLink ? <Loading /> : <Download />}
                    iconClickable
                    onIconClick={loadMdString}
                    ml={1}
                    width={'180px'}
                    placeholder='Ссылка на .md файл'
                    value={mdLink}
                />,
                <Button
                    ml={1}
                    loading={false}
                    disabled={false}
                    children={stateArticle?.published ? 'Снять с публикации' : 'Опубликовать'}
                    auto
                />,
                <Button
                    ml={1}
                    onClick={saveArticle}
                    loading={saveLoad}
                    disabled={article.length === 0}
                    children='Сохранить'
                    type='secondary'
                    auto
                />,
            ]}>
            <Textarea
                onChange={e => setSketch(e.target.value)}
                value={sketch}
                placeholder='Краткое описание'
                maxLength={100}
                width={'100%'}
            />
            <Spacer />
            <Tabs {...bindings}>
                <Tabs.Item label="Писать" value="1">
                    <Textarea placeholder='# Привет мир' style={{ minHeight: '500px' }} value={article} width={'100%'} resize='vertical' onChange={e => setArticle(e.target.value)} />
                </Tabs.Item>
                <Tabs.Item label="Просмотр" value="2">
                    {article.length > 0
                        ? <MarkdownRender markdownString={article} />
                        : <Text small type={'secondary'} children={'Ничего нет для предварительного просмотра'} />
                    }
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    )
};

const StyledArticleTitleInput = styled(Input)`
background-color: white;   
`

export default AuthorArticle;
