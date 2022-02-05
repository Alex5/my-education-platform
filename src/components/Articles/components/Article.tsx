import { Button, Divider, Grid, Text, User } from '@geist-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PublicRequests } from '../../../api/publicRequests';
import { IArticle } from '../../../redux/slices/articlesSlice/articles.types';
import MarkdownRender from '../../Author/components/shared/MarkdownRender';
import PageLayout from '../../Layout/PageLayout';

const Article = () => {
  const location = useLocation();
  const { articleId } = useParams<"articleId">();

  const [article, setArticle] = useState<IArticle>(location.state as IArticle);

  debugger

  useEffect(() => {
    if (!article) {
      (async () => {
        const article = await PublicRequests.getArticleById(articleId || '');
        setArticle(article);
      })()

    }
  }, [article])

  return (
    <PageLayout title={article?.title}>
      <StyledArticleHeader>
        <User name={article?.account?.name} src={article?.account?.photoLink}>
          {article?.account?.knowledge}
        </User>
      </StyledArticleHeader>
      <MarkdownRender markdownString={article?.content} />
    </PageLayout>

  )
};

const StyledArticleHeader = styled.div`
  display: flex,
  align-items: center
  width: 1000px
`

export default Article;
