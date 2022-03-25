import {selector, selectorFamily} from "recoil";
import {PublicRequests} from "../../api/publicRequests";

export const articleQuery = selectorFamily({
    key: 'articleQuery',
    get: (articleId: string) => async () => {
        return await PublicRequests.getArticleById(articleId);
    }
})

export const articlesQuery = selector({
    key: 'articlesQuery',
    get: async () => {
        return await PublicRequests.getArticles();
    }
})