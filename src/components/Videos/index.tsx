import React, { useEffect } from 'react';
import { Card, Divider, Grid, Image, Link, Text, User } from "@geist-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { VideosRequests } from "../../api/videosRequests";
import { getVideos, setVideos } from "../../redux/slices/videosSlice";
import { useNavigate } from "react-router-dom";
import SnipText from "../shared/SnipText";
import AuthorAccountPreview from '../Author/components/AuthorAccountPreview';
import VideoCard from "./Components/shared/VideoCard";

const Videos = () => {
    const dispatch = useDispatch();
    const videos = useSelector(getVideos);



    useEffect(() => {
        (async () => {
            const videos = await VideosRequests.getVideos();
            dispatch(setVideos(videos));
        })()
    }, [])


    return (
        <Grid.Container gap={2}>
            {videos && videos.map(video => (
                <Grid xs={24} md={8} key={video.videoId}>
                    <VideoCard video={video}/>
                </Grid>
            ))}
        </Grid.Container>
    );
};

export default Videos;