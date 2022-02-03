import { Timestamp } from "firebase/firestore";
import { IAccount } from "../authorSlice/author.types";

export interface ArticlesState {
    articles: IArticle[]
}

export interface IArticle {
    title: string,
    content: string,
    id: string,
    account: IAccount,
    ownerId: string
    published: boolean,
    createdAt?: Timestamp,
}