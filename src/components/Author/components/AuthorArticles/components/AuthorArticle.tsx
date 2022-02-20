import { useState } from 'react'

import { Tabs, Textarea, useTabs, Text, Input, Spacer } from '@geist-ui/core';
import PageLayout from '../../../../Layouts/PageLayout'
import MarkdownRender from '../../shared/MarkdownRender';
import { useLocation } from 'react-router-dom';
import { IArticle } from '../../../../../redux/slices/articlesSlice/articles.types';
import ArticleHeaderActions from './ArticleHeaderActions';

const AuthorArticle = () => {
    const { state } = useLocation();
    const stateArticle = state as IArticle || null;


    const [articleContent, setArticleContent] = useState<string>(stateArticle?.content || '');
    const [sketch, setSketch] = useState<string>(stateArticle?.sketch || '');
    const [articleTitle, setArticleTitle] = useState<string>(stateArticle?.title || '');


    const { bindings } = useTabs('1');

    return (
        <PageLayout
            title={
                <Input
                    onChange={e => setArticleTitle(e.target.value)}
                    scale={4 / 3}
                    value={articleTitle}
                    placeholder='Название статьи'
                    width={'100%'}
                />
            }
            headerActions={
                <ArticleHeaderActions
                    sketch={sketch}
                    content={articleContent}
                    title={articleTitle}
                    stateArticle={stateArticle}
                    setArticleContent={setArticleContent}
                />
            }
        >
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
                    <Textarea placeholder='# Привет мир' style={{ minHeight: '500px' }} value={articleContent} width={'100%'} resize='vertical' onChange={e => setArticleContent(e.target.value)} />
                </Tabs.Item>
                <Tabs.Item label="Просмотр" value="2">
                    {articleContent.length > 0
                        ? <MarkdownRender markdownString={articleContent} />
                        : <Text small type={'secondary'} children={'Ничего нет для предварительного просмотра'} />
                    }
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    )
};



export default AuthorArticle;
