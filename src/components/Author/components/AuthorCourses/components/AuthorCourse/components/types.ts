import {ICourse} from "../../../../../../../redux/slices/coursesSlice/types";

export const BLOCK_KEYS: Array<keyof ICourse> = [
    'name',
    'description',
    'accountId',
    'lessons',
    'tags',
    'cover',
    'socialAccounts'
]