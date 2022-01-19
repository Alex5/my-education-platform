import React from 'react';
import {Grid} from "@geist-ui/react";
import {useParams} from "react-router-dom";
import PageLayout from "../../shared/PageLayout";
import {useSelector} from "react-redux";
import {getVideos} from "../../../redux/slices/videosSlice";
import {IVideo} from "../../../redux/slices/videosSlice/types";

const Video = () => {
    const {videoId} = useParams<"videoId">();
    const videos = useSelector(getVideos);
    const selectedVideo = videos.find(video => video.videoId === videoId) || {} as IVideo;

    return (
        <PageLayout title={selectedVideo.name || ''}>
            <Grid.Container>
                <Grid xs={24}>
                    <iframe width="100%" height="600" src={`https://www.youtube.com/embed/Ph5cR4jXckM`}
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </Grid>
            </Grid.Container>
        </PageLayout>

    );
};

export default Video;