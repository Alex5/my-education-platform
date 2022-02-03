import { RootState } from "../../store";
import { createDraftSafeSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticlesState, IArticle } from "./articles.types";

const initialState: ArticlesState = {
    articles: []
}

export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setArticles(state, action: PayloadAction<IArticle[]>) {
            state.articles = action.payload;
        }
    },
})

const selectSelf = (state: RootState) => state.articles;

// selectors
export const getArticles = createDraftSafeSelector(selectSelf, (state) => state.articles);

// actions
export const { setArticles } = articlesSlice.actions

export default articlesSlice.reducer