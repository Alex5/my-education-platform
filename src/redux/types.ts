import {ICourse} from "./slices/coursesSlice/types";

export type IKey = 'author' | 'name' | 'description' | 'cover' | 'tags'

export type IDeactivatedBlocks = Array<keyof Pick<ICourse, 'published' | 'courseId' | 'direction'>>


