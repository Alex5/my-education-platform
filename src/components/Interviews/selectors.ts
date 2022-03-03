import {selectorFamily} from "recoil";
import {VideosRequests} from "../../api/videosRequests";
import {IVideo} from "../../redux/slices/videosSlice/types";

export const interviewsQuery = selectorFamily({
    key: 'interviews',
    get: (tag: string) => async () => {
        return await VideosRequests.getVideosByTag(tag);
    },
})