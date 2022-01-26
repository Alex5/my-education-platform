export interface IUser {
    author: boolean,
    appointment: string,
    loggedIn: boolean,
    uid: string,
    accounts: IAccount[]
}

export interface IAccount {
    name: string;
    channelLink: string;
    photoLink: string;
    knowledge: string;
}