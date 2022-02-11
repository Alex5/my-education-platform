import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface ITag {
    id: string,
    text: string
}

export interface ICourse {
    createdAt: number;
    name: string;
    courseId: string;
    ownerId: string;
    published: boolean;
    description: string;
    direction: string;
    lessons: Pick<ILesson, "lessonId" | "name" | "position">[];
    cover: string;
    tags: string[];
    accountId: string;
    socialAccounts: string[];
}

export interface ICourseStatus {
    start: boolean,
    viewedLessons: string[]
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
    videoId: string,
    position: number
}

export interface ITestimonial {
    id: string;
    name: string;
    text: string;
    date: number;
}