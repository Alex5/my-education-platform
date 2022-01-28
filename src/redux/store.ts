import { configureStore } from '@reduxjs/toolkit'
import coursesSlice from "./slices/coursesSlice/coursesSlice";
import userSlice from "./slices/userSlice/userSlice";
import videosSlice from "./slices/videosSlice";
import authorSlice from "./slices/authorSlice/author.slice";

export const store = configureStore({
    reducer: {
        courses: coursesSlice,
        user: userSlice,
        videos: videosSlice,
        author: authorSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch