import {atom} from "recoil";
import {IVideo} from "../../redux/slices/videosSlice/types";

const initialState: IVideo[] = []

export const interviewsState = atom({
    key: 'interviewsState', // unique ID (with respect to other atoms/selectors)
    default: initialState, // default value (aka initial value)
});