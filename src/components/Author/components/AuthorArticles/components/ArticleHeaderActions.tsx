import { Button, Input, Loading, Spinner, useToasts } from '@geist-ui/core'
import { Download } from '@geist-ui/react-icons';
import axios, { AxiosResponse } from 'axios';
import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { AuthorRequests } from '../../../../../api/authorRequests';
import { setArticles } from '../../../../../redux/slices/articlesSlice/articles.slice';
import { IArticle } from '../../../../../redux/slices/articlesSlice/articles.types';
import { getSelectedAccount } from '../../../../../redux/slices/authorSlice/author.slice';
import { getFirebaseUser } from '../../../../../redux/slices/userSlice/userSlice';
import AuthorAccountsSelect from '../../AuthorAccountsSelect';

interface ArticleHeaderActionsProps {
    content: string;
    sketch: string;
    title: string;
    setArticleContent: (articleContent: string) => void;
    stateArticle: IArticle;
}

const ArticleHeaderActions: FC<ArticleHeaderActionsProps> = ({
    content, title, sketch, setArticleContent, stateArticle }
) => {
    const [saveLoad, setSaveLoad] = useState<boolean>(false);
    const [mdLink, setMdLink] = useState<string>('');
    const [loadMdLink, setLoadMdLink] = useState<boolean>(false);

    const selectedAccount = useSelector(getSelectedAccount);
    const user = useSelector(getFirebaseUser);
    const dispatch = useDispatch();

    const { setToast } = useToasts();

    const navigate = useNavigate();

    const saveArticle = async () => {
        setSaveLoad(true);
        const articles = await AuthorRequests.addArticle({
            title: title,
            content: content,
            ownerId: stateArticle.ownerId || user?.uid || '',
            accountId: stateArticle?.accountId || selectedAccount.id,
            published: stateArticle.published || false,
            sketch: sketch,
            createdAt: stateArticle.createdAt || Date.now(),
            id: stateArticle.id || null
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
                setArticleContent(data);
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
        <>
            <AuthorAccountsSelect accountId={stateArticle?.accountId || ''} />
            <StyledArticleTitleInput
                onChange={e => setMdLink(e.target.value)}
                iconRight={mdLink.length > 0 && loadMdLink ? <Spinner /> : <Download />}
                iconClickable
                onIconClick={loadMdString}
                ml={1}
                width={'180px'}
                placeholder='Ссылка на .md файл'
                value={mdLink}
            />
            <Button
                ml={1}
                loading={false}
                disabled={true}
                children={stateArticle?.published ? 'Снять с публикации' : 'Опубликовать'}
                auto
            />
            <Button
                ml={1}
                onClick={saveArticle}
                loading={saveLoad}
                disabled={content.length === 0}
                children='Сохранить'
                type='secondary'
                auto
            />
        </>
    )
}

const StyledArticleTitleInput = styled(Input)`
    background-color: white;   
`

export default ArticleHeaderActions