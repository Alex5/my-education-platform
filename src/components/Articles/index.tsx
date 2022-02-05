import { Card, Grid, Link, Spacer, User } from '@geist-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PublicRequests } from '../../api/publicRequests';
import { getArticles, setArticles } from '../../redux/slices/articlesSlice/articles.slice';
import MarkdownRender from '../Author/components/shared/MarkdownRender';
import PageLayout from '../Layout/PageLayout';

const ArticlesLayout = () => {
  const articles = useSelector(getArticles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const articles = await PublicRequests.getArticles();
      dispatch(setArticles(articles));
    })()
  }, [])

  return (
    <PageLayout>
      <Grid.Container gap={2}>
        {articles
          ? articles.map(article => (
            <Grid xs={24} md={12}>
              <Card
                onClick={() => navigate(`/articles/${article.id}`, { state: article })}
                style={{ cursor: 'pointer' }}
                width={'100%'}
                hoverable
              >
                <User src={article.account.photoLink} name={article.account.name}>
                  {article.account.knowledge}
                </User>
                <Spacer />
                <h4>{article.title}</h4>
                <p>{article.content.slice(0, 100)}...</p>
              </Card>
            </Grid>
          ))
          : 'Нет статей'
        }
      </Grid.Container>
    </PageLayout>
  )
};

export default ArticlesLayout;
