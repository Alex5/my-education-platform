import {createDraftSafeSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../store";
import {IVideo, IVideoState} from "./types";

const initialState: IVideoState = {
    videos: [],
    authorVideos: [],
}

export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setVideos(state, action: PayloadAction<IVideo[]>) {
            state.videos = action.payload;
        },
    },
})

const selectSelf = (state: RootState) => state.videos;

// selectors
export const getVideos = createDraftSafeSelector(selectSelf, (state) => state.videos)

// actions
export const {setVideos} = videosSlice.actions

export default videosSlice.reducer