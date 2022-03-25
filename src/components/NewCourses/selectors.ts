import {selectorFamily} from "recoil";
import {PublicRequests} from "../../api/publicRequests";

export const newCoursesQuery = selectorFamily({
    key: 'newCoursesQuery',
    get: (courseLimit: number) => async () => {
        return await PublicRequests.getNewCourses(courseLimit);
    }
})