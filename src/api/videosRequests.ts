import {IVideo} from "../redux/slices/videosSlice/types";
import {collection, getDocs, where, query, addDoc, getDoc, doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from "../fbconfig";
import {getAuth} from "firebase/auth";

enum CollectionNames {
    videos = 'videos'
}

export const VideosRequests = {
    async saveVideo(video: IVideo): Promise<IVideo[]> {
        debugger
        const docRef = doc(db, CollectionNames.videos, video.videoId);
        await setDoc(docRef, video);
        return await this.getAuthorVideos(video.ownerId);
    },
    async updateVideo(video: IVideo) {
        const docRef = doc(db, CollectionNames.videos, video.videoId);
        await updateDoc(docRef, {...video});
        return await this.getAuthorVideos(video.ownerId);
    },
    async deleteVideo(video: Pick<IVideo, 'videoId' | 'ownerId'>) {
        await deleteDoc(doc(db, CollectionNames.videos, video.videoId));
        return await this.getAuthorVideos(video.ownerId);
    },
    async getVideos(type?: 'author'): Promise<IVideo[]> {
        const {currentUser} = await getAuth();

        if (!currentUser) {
            return Promise.reject('not_authorized')
        }

        const q = query(collection(db, "videos"),
            type === 'author'
                ? where("ownerId", '==', currentUser.uid)
                : where("published", "==", true)
        );
        const querySnapshot = await getDocs(q);

        const videos: IVideo[] = [];

        querySnapshot.forEach((doc) => {
            videos.push(doc.data() as IVideo);
        });

        return videos;
    },
    async getAuthorVideos(uid: string): Promise<IVideo[]> {
        const q = query(collection(db, "videos"), where("ownerId", "==", uid));
        const querySnapshot = await getDocs(q);

        const videos: IVideo[] = [];

        querySnapshot.forEach((doc) => {
            videos.push(doc.data() as IVideo);
        });

        return videos;
    }
}