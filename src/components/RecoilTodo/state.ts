import {atom} from "recoil";
import {ITodo} from "./types";

const initialState: ITodo[] = []

export const todoListState = atom({
    key: 'todoListState',
    default: initialState,
});

export const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'Show All',
});

