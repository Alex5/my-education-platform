export interface ICourse {
    name: string,
    courseId: string,
    ownerId: string,
    published: boolean,
    description?: string,
    author?: IAuthor,
    direction: string,
    lessons: Pick<ILesson, "lessonId" | "name">[]
}

export interface ICourseStatus {
    start: boolean,
    viewedLessons: string[]
}

export interface IAuthor {
    name: string,
    appointment: string,
    avatar: string
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
    name: string
}

export interface IUser {
    author: boolean,
    appointment: string,
    loggedIn: boolean
}


