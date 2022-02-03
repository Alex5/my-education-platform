import { Timestamp } from "firebase/firestore";

export interface AuthorState {
    selectedAccount: IAccount,
    accounts: IAccount[],
}

export interface IAccount {
    name: string;
    channelLink: string;
    photoLink: string;
    knowledge: string;
}

