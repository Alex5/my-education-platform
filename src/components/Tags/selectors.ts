import {selector} from "recoil";
import {PublicRequests} from "../../api/publicRequests";


export const tagsQuery = selector({
    key: 'tagsQuery',
    get: async () => {
        return await PublicRequests.getTags();
    }
})