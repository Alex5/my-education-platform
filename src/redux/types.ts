import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface ICourse {
    name: string,
    courseId: string,
    ownerId: string,
    published: boolean,
    description: string,
    author: IAuthor,
    direction: string,
    lessons: Pick<ILesson, "lessonId" | "name">[],
    testimonials: ITestimonial[];
    cover: ''
}

export interface ICourseStatus {
    start: boolean,
    viewedLessons: string[]
}

export interface IAuthor {
    name: string,
    appointment: string,
    avatar: string,
    channelLink: string
}

export interface IHomeWork {
    description: string,
    code: string
}

export interface ILesson {
    lessonId: string;
    courseId: string
    description: string
    homeWorks: IHomeWork[]
    videoLink: string,
    name: string,
    videoId: string
}

export interface IUser {
    author: boolean,
    appointment: string,
    loggedIn: boolean
}

export interface ITestimonial {
    id: string,
    name: string,
    text: string,
    date: Timestamp
}

export type IKey = 'author' | 'name' | 'description' | 'cover'


