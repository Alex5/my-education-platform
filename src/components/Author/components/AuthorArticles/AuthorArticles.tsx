import { Card, Text, Button, Grid } from "@geist-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthorRequests } from "../../../../api/authorRequests";
import { IArticle } from "../../../../redux/slices/articlesSlice/articles.types";
import { getFirebaseUser } from "../../../../redux/slices/userSlice/userSlice";
import PageLayout from "../../../Layout/PageLayout";


const AuthorArticles = () => {
    const [authorArticles, setAuthorArticles] = useState<IArticle[]>([]);

    const navigate = useNavigate();

    const firebaseUser = useSelector(getFirebaseUser);

    useEffect(() => {
        (async () => {
            const articles = await AuthorRequests.getAuthorArticles(firebaseUser?.uid || '');
            setAuthorArticles(articles);
        })()
    }, [])

    return (
        <PageLayout
            title="Ваши статьи"
            headerActions={[
                <Button auto onClick={() => navigate(`/author/articles/create`)} children={'Добавить статью'} />
            ]}
        >
            <Grid.Container>
                {authorArticles.length > 0
                    ? authorArticles.map(article => (
                        <Grid xs={24} md={8}>
                            <Card>
                                {article.title}
                            </Card>
                        </Grid>

                    ))
                    : <Text small children={'Нет созданных статей'} />}
            </Grid.Container>

        </PageLayout>
    )
}

export default AuthorArticles;

