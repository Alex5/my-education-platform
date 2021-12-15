import {createDraftSafeSelector, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../store";
import {ICourse, ICourseStatus, ILesson, ITestimonial} from "./types";

export interface CoursesState {
    courses: ICourse[];
    selectedCourse: ICourse;
    lessons: ILesson[];
    courseStatus: ICourseStatus;
    testimonials: ITestimonial[];
}

const initialState: CoursesState = {
    courses: [],
    selectedCourse: {} as ICourse,
    lessons: [],
    courseStatus: {
        start: false,
        viewedLessons: []
    },
    testimonials: []
}

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses(state, action: PayloadAction<ICourse[]>){
            state.courses = action.payload;
        },
        setLessons(state, action: PayloadAction<ILesson[]>){
            state.lessons = action.payload;
        },
        setSelectedCourse(state, action: PayloadAction<ICourse>) {
            state.selectedCourse = action.payload;
        },
        setCourseStatus(state, action: PayloadAction<ICourseStatus>) {
            state.courseStatus = action.payload;
        },
        setTestimonials(state, action: PayloadAction<ITestimonial[]>) {
            state.testimonials = action.payload
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
export const getPreviewLessons = createDraftSafeSelector(selectSelf, (state) => state.selectedCourse.lessons)
export const getCourseStatus = createDraftSafeSelector(selectSelf, (state) => state.courseStatus)
export const getTestimonials = createDraftSafeSelector(selectSelf, (state) => state.testimonials)

export const { setCourses, setSelectedCourse, setLessons, setCourseStatus, setTestimonials } = coursesSlice.actions

export default coursesSlice.reducer