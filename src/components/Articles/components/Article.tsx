import { Button, Divider, Grid, Text, User } from '@geist-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IArticle } from '../../../redux/slices/articlesSlice/articles.types';
import MarkdownRender from '../../Author/components/shared/MarkdownRender';
import PageLayout from '../../Layout/PageLayout';

const Article = () => {
  const location = useLocation();
  const article = location.state as IArticle;

  return (
    <PageLayout title={article.title}>
      <StyledArticleHeader>
        <User name={article.account.name} src={article.account.photoLink}>
          {article.account.knowledge}
        </User>
      </StyledArticleHeader>
      <MarkdownRender markdownString={article.content} />
    </PageLayout>

  )
};

const StyledArticleHeader = styled.div`
  display: flex,
  align-items: center
  width: 1000px
`

export default Article;
