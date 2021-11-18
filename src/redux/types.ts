export interface ICourse {
    name: string,
    courseId: string,
    ownerId: string
}

export interface IHomeWork {
    description: string,
    code: string
}

export interface ILessonInfo {
    courseId: string
    description: string
    homeWork: IHomeWork[]
    videoLink: string
}

export interface ILesson {
    lessonId: string,
    name: string
}

export interface ICourseInfo {
    description: string
    lessons: ILesson[]
}

