export interface AuthorChannelId {
    value: string;
}

export interface Snippet2 {
    videoId: string;
    textDisplay: string;
    textOriginal: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: AuthorChannelId;
    canRate: boolean;
    viewerRating: string;
    likeCount: number;
    publishedAt: Date;
    updatedAt: Date;
}

export interface TopLevelComment {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet2;
}

export interface Snippet {
    videoId: string;
    topLevelComment: TopLevelComment;
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
}

export interface IYouTubeComment {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
}

