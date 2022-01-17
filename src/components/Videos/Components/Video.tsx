import React from 'react';
import {Grid} from "@geist-ui/react";
import {useParams} from "react-router-dom";

const Video = () => {
    const {videoId} = useParams<"videoId">();

    return (
        <Grid.Container>
            <Grid xs={24}>
                <iframe width="100%" height="600" src={`https://www.youtube.com/embed/Ph5cR4jXckM`}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
            </Grid>
        </Grid.Container>
    );
};

export default Video;