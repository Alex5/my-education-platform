import React, {useEffect} from 'react';
import {Card, Divider, Grid, Image, Link, Text, User} from "@geist-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {VideosRequests} from "../../api/videosRequests";
import {getVideos, setVideos} from "../../redux/slices/videosSlice";
import {useNavigate} from "react-router-dom";
import SnipText from "../shared/SnipText";

const Videos = () => {
    const dispatch = useDispatch();
    const videos = useSelector(getVideos);

    const navigate = useNavigate();

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
                    <Card onClick={() => navigate(`/videos/${video.videoId}`)} style={{cursor: 'pointer'}} hoverable>
                        <Image height={"155px"} width={"100%"} src={video.cover}/>
                        <SnipText h5 text={video.name}/>
                        <Divider/>
                        <User src={video.account?.photoLink} name={video.account?.name}>
                            <SnipText text={video.account?.knowledge}/>
                        </User>
                    </Card>
                </Grid>
            ))}
        </Grid.Container>
    );
};

export default Videos;