import {createDraftSafeSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../store";
import {IVideo, IVideoState} from "./types";

const initialState: IVideoState = {
    videos: [],
    authorVideos: [],
    selectedVideo: {} as IVideo
}

export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setVideos(state, action: PayloadAction<IVideo[]>) {
            state.videos = action.payload;
        },
        setSelectedVideo(state, action: PayloadAction<IVideo>) {
            state.selectedVideo = action.payload;
        }
    },
})

const selectSelf = (state: RootState) => state.videos;

// selectors
export const getVideos = createDraftSafeSelector(selectSelf, (state) => state.videos)
export const getSelectedVideo = createDraftSafeSelector(selectSelf, (state) => state.selectedVideo)

// actions
export const {setVideos, setSelectedVideo} = videosSlice.actions

export default videosSlice.reducer