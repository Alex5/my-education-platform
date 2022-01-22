import React, {useEffect} from 'react';
import {Card, Grid, Image, Text} from "@geist-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {VideosRequests} from "../../api/videosRequests";
import {getVideos, setVideos} from "../../redux/slices/videosSlice";
import {useNavigate} from "react-router-dom";

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
                        <Image height={"118px"} width={"210px"} src={video.cover}/>
                        <Text h5 mb={0} children={video.name}/>
                        {/*<Text type={"secondary"} small mb={0} children={video.ownerId}/>*/}
                    </Card>
                </Grid>
            ))}
        </Grid.Container>
    );
};

export default Videos;