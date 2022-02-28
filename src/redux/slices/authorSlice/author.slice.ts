import { RootState } from "../../store";
import { createDraftSafeSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthorState, IAccount } from "./author.types";

const initialState: AuthorState = {
    selectedAccount: null,
    accounts: [],
}

export const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        setSelectedAccount(state, action: PayloadAction<IAccount>) {
            state.selectedAccount = action.payload;
        },
        setAccounts(state, action: PayloadAction<IAccount[]>) {
            state.accounts = action.payload;
        },
    },
})

const selectSelf = (state: RootState) => state.author;

// selectors
export const getSelectedAccount = createDraftSafeSelector(selectSelf, (state) => state.selectedAccount);
export const getAccounts = createDraftSafeSelector(selectSelf, (state) => state.accounts);

// actions
export const { setSelectedAccount, setAccounts } = authorSlice.actions

export default authorSlice.reducer