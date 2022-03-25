import { Timestamp } from "firebase/firestore";

export interface ArticlesState {
    articles: IArticle[]
}

export interface IArticle {
    title: string;
    content: string;
    id: string | null;
    accountId: string;
    ownerId: string;
    published: boolean | null;
    createdAt: number | null;
    sketch: string;
}