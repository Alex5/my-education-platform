import {createDraftSafeSelector, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ICourse, ICourseInfo, ILessonInfo} from "../types";
import {RootState} from "../store";

export interface CoursesState {
    courses: ICourse[],
    courseInfo: ICourseInfo
    lessonInfo: ILessonInfo
}

const initialState: CoursesState = {
    courses: [],
    courseInfo: {} as ICourseInfo,
    lessonInfo: {} as ILessonInfo
}

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses(state, action: PayloadAction<ICourse[]>){
            state.courses = action.payload;
        },
        setCourseInfo(state, action: PayloadAction<ICourseInfo>){
            state.courseInfo = action.payload;
        },
        setLessonInfo(state, action: PayloadAction<ILessonInfo>){
            state.lessonInfo = action.payload;
        }
    },
})

const selectSelf = (state: RootState) => state.courses;
export const getCourses = createSelector(
    selectSelf,
    (state) => state.courses
)
export const getCourseInfo = createDraftSafeSelector(selectSelf, (state) => state.courseInfo)
export const getLessonInfo = createDraftSafeSelector(selectSelf, (state) => state.lessonInfo)

// Action creators are generated for each case reducer function
export const { setCourses, setCourseInfo, setLessonInfo } = coursesSlice.actions

export default coursesSlice.reducer