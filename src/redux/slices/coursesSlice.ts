import {createDraftSafeSelector, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ICourse, ICourseInfo, ILessonInfo} from "../types";
import {RootState} from "../store";

export interface CoursesState {
    courses: ICourse[],
    selectedCourse: ICourse
    lessons: ILessonInfo[]
}

const initialState: CoursesState = {
    courses: [],
    selectedCourse: {} as ICourse,
    lessons: []
}

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses(state, action: PayloadAction<ICourse[]>){
            state.courses = action.payload;
        },
        setLessons(state, action: PayloadAction<ILessonInfo[]>){
            state.lessons = action.payload;
        },
        setSelectedCourse(state, action: PayloadAction<ICourse>) {
            state.selectedCourse = action.payload;
        }
    },
})

const selectSelf = (state: RootState) => state.courses;
export const getCourses = createSelector(
    selectSelf,
    (state) => state.courses
)
export const getSelectedCourse = createDraftSafeSelector(selectSelf, (state) => state.selectedCourse)
export const getLessons = createDraftSafeSelector(selectSelf, (state) => state.lessons)

// Action creators are generated for each case reducer function
export const { setCourses, setSelectedCourse, setLessons } = coursesSlice.actions

export default coursesSlice.reducer