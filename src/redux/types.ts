export interface ICourse {
    name: string,
    courseId: string,
    ownerId: string,
    publicationStatus: string,
    description?: string
}

export interface IHomeWork {
    description: string,
    code: string
}

export interface ILessonInfo {
    lessonId: string;
    courseId: string
    description: string
    homeWorks: IHomeWork[]
    videoLink: string,
    name: string
}

export interface ILesson {
    lessonId: string,
    name: string
}

export interface ICourseInfo {
    courseId: string
    description: string
    lessons: ILesson[]
}

