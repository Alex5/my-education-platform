import {IAccount} from "../authorSlice/author.types";

export interface IUser {
    author: boolean,
    appointment: string,
    loggedIn: boolean,
    uid: string,
    accounts: IAccount[]
}

