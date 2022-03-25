import React, { Suspense } from 'react';
import { Grid} from "@geist-ui/core";
import VideoCard from "./Components/shared/VideoCard";
import {useRecoilValue} from "recoil";
import {videosQuery} from "./selectors";
import AppLoader from "../shared/AppLoader";

const Videos = () => {

    const VideosComponent = () => {
        const videos = useRecoilValue(videosQuery);

        return (
            <Grid.Container gap={2}>
                {videos && videos.map(video => (
                    <Grid xs={24} md={8} key={video.videoId}>
                        <VideoCard video={video}/>
                    </Grid>
                ))}
            </Grid.Container>
        )
    }

    return <Suspense fallback={<AppLoader s/>} children={<VideosComponent/>}/>
};

export default Videos;