export interface IVideoState {
    videos: IVideo[]
    authorVideos: IVideo[]
}

export interface IVideo {
    videoId: string;
    ownerId: string;
    embedLink: string;
    name: string;
    published: boolean;
    cover: string;
    description: string;
}