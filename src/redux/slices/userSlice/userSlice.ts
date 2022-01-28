import {createDraftSafeSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../store";
import {IUser} from "./types";
import {IAccount} from "../authorSlice/author.types";

const initialState: IUser = {
    author: false,
    appointment: '',
    loggedIn: false,
    uid: '',
    accounts: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>){
            state.author = action.payload.author;
            state.appointment = action.payload.appointment;
            state.loggedIn = true
            state.uid = action.payload.uid
        },
        signOut(state){
            state.author = initialState.author;
            state.appointment = initialState.appointment;
            state.loggedIn = false
        },
        setAccounts(state, action: PayloadAction<IAccount[]>){
            state.accounts = action.payload;
        }
    },
})

const selectSelf = (state: RootState) => state.user;
export const getUser = createDraftSafeSelector(selectSelf, (state) => state)
export const getLoggedIn = createDraftSafeSelector(selectSelf, (state) => state.loggedIn)
export const getAccounts = createDraftSafeSelector(selectSelf, (state) => state.accounts)

// Action creators are generated for each case reducer function
export const { setUser, signOut, setAccounts } = userSlice.actions

export default userSlice.reducer