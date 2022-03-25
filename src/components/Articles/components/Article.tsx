import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import AuthorAccountPreview from '../../Author/components/AuthorAccountPreview';
import MarkdownRender from '../../Author/components/shared/MarkdownRender';
import PageLayout from '../../Layouts/PageLayout';
import {useRecoilValueLoadable} from "recoil";
import {articleQuery} from "../selectors";
import {Spinner} from "@geist-ui/core";
import {NoMatch} from "../../index";

const Article = () => {
    const {articleId} = useParams<"articleId">();
    const {state, contents} = useRecoilValueLoadable(articleQuery(articleId || ''));

    switch (state) {
        case 'hasValue':
            return (
                <PageLayout title={contents.title}>
                    <StyledArticleHeader>
                        <AuthorAccountPreview ownerId={contents.ownerId} accountId={contents.accountId || ''}/>
                    </StyledArticleHeader>
                    <MarkdownRender markdownString={contents.content}/>
                </PageLayout>
            )
        case 'loading':
            return <Spinner/>;
        case 'hasError':
            throw  <NoMatch/>;
    }
};

const StyledArticleHeader = styled.div`
  display: flex;
  align-items: center;
  width: 1000px;
`

export default Article;
