import {ICourse} from "./slices/coursesSlice/types";

export type IKey = 'author' | 'name' | 'description' | 'cover' | 'tags' | 'testimonials'

export type IDeactivatedBlocks = Array<keyof Pick<ICourse, 'published' | 'courseId' | 'direction'>>


