import {Card, Grid, Spacer, Spinner} from '@geist-ui/core';
import {useNavigate} from 'react-router-dom';
import AuthorAccountPreview from '../Author/components/AuthorAccountPreview';
import PageLayout from '../Layouts/PageLayout';
import {useRecoilValueLoadable} from "recoil";
import {articlesQuery} from "./selectors";
import {IArticle} from "../../redux/slices/articlesSlice/articles.types";
import {NoMatch} from "../index";
import AppLoader from "../shared/AppLoader";

const ArticlesLayout = () => {
    const articlesLoadable = useRecoilValueLoadable(articlesQuery);
    const navigate = useNavigate();

    switch (articlesLoadable.state) {
        case "hasValue": {
            return (
                <PageLayout>
                    <Grid.Container gap={2}>
                        {articlesLoadable.contents.map((article) => (
                            <Grid key={article.id} xs={24} md={12}>
                                <Card
                                    onClick={() => navigate(`/articles/${article.id}`, {state: article})}
                                    style={{cursor: 'pointer'}}
                                    width={'100%'}
                                    hoverable
                                >

                                    <AuthorAccountPreview ownerId={article.ownerId} accountId={article.accountId}/>

                                    <Spacer/>
                                    <h4>{article.title}</h4>
                                    <p>{article.sketch}</p>
                                </Card>
                            </Grid>
                        ))
                        }
                    </Grid.Container>
                </PageLayout>
            )
        }
        case 'loading':
            return <Spinner/>;
        case 'hasError':
            throw  <NoMatch/>;
    }
};

export default ArticlesLayout;
