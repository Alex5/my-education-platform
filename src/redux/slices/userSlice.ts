import {createDraftSafeSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "../types";
import {RootState} from "../store";

const initialState: IUser = {
    author: false,
    appointment: '',
    loggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>){
            state.author = action.payload.author;
            state.appointment = action.payload.appointment;
            state.loggedIn = true
        },
        signOut(state){
            state.author = initialState.author;
            state.appointment = initialState.appointment;
            state.loggedIn = false
        }
    },
})

const selectSelf = (state: RootState) => state.user;
export const getUser = createDraftSafeSelector(selectSelf, (state) => state)
export const getLoggedIn = createDraftSafeSelector(selectSelf, (state) => state.loggedIn)

// Action creators are generated for each case reducer function
export const { setUser, signOut } = userSlice.actions

export default userSlice.reducer