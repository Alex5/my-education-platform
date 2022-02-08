import {IAccount} from "../authorSlice/author.types";

export interface IFirebaseUser {
    uid: string;
    photoURL: string;
    email: string;
    displayName: string;
}

export interface IUser {
    author: boolean,
    appointment: string,
    loggedIn: boolean,
    uid: string,
    accounts: IAccount[];
    firebaseUser: IFirebaseUser,
    userLoading: boolean;
}



