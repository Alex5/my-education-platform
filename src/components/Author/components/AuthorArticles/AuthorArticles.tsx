import { Button } from "@geist-ui/core";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../../Layout/PageLayout";


const AuthorArticles = () => {
    const navigate = useNavigate();


    return (
        <PageLayout
            title="Ваши статьи"
            headerActions={[
                <Button auto onClick={() => navigate(`/author/articles/create`)} children={'Добавить статью'} />
            ]}
        >

        </PageLayout>
    )
}

export default AuthorArticles;
