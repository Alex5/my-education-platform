import {selector} from "recoil";
import {PublicRequests} from "../../api/publicRequests";
import {VideosRequests} from "../../api/videosRequests";


export const videosQuery = selector({
    key: 'videosQuery',
    get: async () => await VideosRequests.getVideos()
})