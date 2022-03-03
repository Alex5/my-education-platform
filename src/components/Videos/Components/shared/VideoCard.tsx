import React, {FC, Suspense} from 'react';
import {Card, Divider, Image, useMediaQuery} from "@geist-ui/core";
import SnipText from "../../../shared/SnipText";
import AuthorAccountPreview from "../../../Author/components/AuthorAccountPreview";
import {useNavigate} from "react-router-dom";
import {IVideo} from "../../../../redux/slices/videosSlice/types";
import AppLoader from "../../../shared/AppLoader";

interface VideoCardProps {
    video: IVideo
}

const VideoCard: FC<VideoCardProps> = ({video}) => {
    const navigate = useNavigate();

    const {videoId, name, ownerId, accountId} = video;

    const isXS = useMediaQuery('xs')

    return (
        <Card width={"100%"} onClick={() => navigate(`/videos/${videoId}`)} style={{cursor: 'pointer'}} hoverable>
            <Image height={isXS ? "195px" : "155px"} width={"100%"} src={video.cover}/>
            <SnipText h5 text={name}/>
            <Divider/>
            <AuthorAccountPreview ownerId={ownerId} accountId={accountId}/>
        </Card>
    );
};

export default VideoCard;