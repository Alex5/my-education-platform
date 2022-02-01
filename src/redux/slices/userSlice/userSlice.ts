import {createDraftSafeSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../store";
import {IUser} from "./types";
import {IAccount} from "../authorSlice/author.types";
import {User} from "firebase/auth";

const initialState: IUser = {
    author: false,
    appointment: '',
    loggedIn: false,
    uid: '',
    accounts: [],
    firebaseUser: {} as User,
    userLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.author = action.payload.author;
            state.appointment = action.payload.appointment;
            state.loggedIn = true
            state.uid = action.payload.uid
        },
        signOut() {
            return initialState
        },
        setAccounts(state, action: PayloadAction<IAccount[]>) {
            state.accounts = action.payload;
        },
        setFirebaseUser(state, action: PayloadAction<User | null | undefined>) {
            state.firebaseUser = action.payload
        },
        setUserLoading(state, action: PayloadAction<boolean>) {
            state.userLoading = action.payload;
        }
    },
})

const selectSelf = (state: RootState) => state.user;
export const getUser = createDraftSafeSelector(selectSelf, (state) => state)
export const getLoggedIn = createDraftSafeSelector(selectSelf, (state) => state.loggedIn)
export const getAccounts = createDraftSafeSelector(selectSelf, (state) => state.accounts)
export const getFirebaseUser = createDraftSafeSelector(selectSelf, (state) => state.firebaseUser)
export const getUserLoading = createDraftSafeSelector(selectSelf, (state) => state.userLoading)

// Action creators are generated for each case reducer function
export const {setUser, signOut, setAccounts, setFirebaseUser, setUserLoading} = userSlice.actions

export default userSlice.reducer