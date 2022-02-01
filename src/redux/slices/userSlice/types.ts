import {IAccount} from "../authorSlice/author.types";
import {User} from "firebase/auth";

export interface IUser {
    author: boolean,
    appointment: string,
    loggedIn: boolean,
    uid: string,
    accounts: IAccount[];
    firebaseUser: User | null | undefined,
    userLoading: boolean;
}

