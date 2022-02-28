import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {IArticle} from '../../../redux/slices/articlesSlice/articles.types';
import AuthorAccountPreview from '../../Author/components/AuthorAccountPreview';
import MarkdownRender from '../../Author/components/shared/MarkdownRender';
import PageLayout from '../../Layouts/PageLayout';
import ErrorBoundary from "../../shared/ErrorBoundary";

const Article = () => {
    const ArticleComponent = () => {
        const location = useLocation();

        const article = location.state as IArticle;

        if (!article) {
            throw new Error('Нет статьи')
        }

        return (
            <PageLayout title={article.title}>
                <StyledArticleHeader>
                    <AuthorAccountPreview ownerId={article.ownerId} accountId={article.accountId}/>
                </StyledArticleHeader>
                <MarkdownRender markdownString={article.content}/>
            </PageLayout>

        )
    }

    return <ErrorBoundary children={<ArticleComponent/>}/>
};

const StyledArticleHeader = styled.div`
  display: flex;
  align-items: center;
  width: 1000px;
`

export default Article;
