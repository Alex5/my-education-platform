import { Timestamp } from "firebase/firestore";

export interface AuthorState {
    selectedAccount: IAccount | null,
    accounts: IAccount[],
}

export interface IAccount {
    name: string;
    channelLink: string;
    photoLink: string;
    knowledge: string;
    id: string;
    ownerId: string;
    updatedAt: number;
}

