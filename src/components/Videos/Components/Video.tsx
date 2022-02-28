import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PageLayout from "../../Layouts/PageLayout";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedVideo, setSelectedVideo} from "../../../redux/slices/videosSlice";
import Testimonials from "../../Testimonials";
import {VideosRequests} from "../../../api/videosRequests";
import {Grid,  Fieldset, Loading} from '@geist-ui/core';

const Video = () => {
    const {videoId} = useParams<"videoId">();

    const [load, setLoad] = useState<boolean>(false);

    const dispatch = useDispatch();
    const {embedLink, name, description} = useSelector(getSelectedVideo) || {};

    useEffect(() => {
        setLoad(true);
        VideosRequests
            .getVideoById(videoId || '')
            .then(video => {
                dispatch(setSelectedVideo(video));
                setLoad(false);
            })
            .catch((e) => {
                alert(e)
                setLoad(false);
            })
    }, [videoId])

    return (
        <PageLayout title={name}>
            <Grid.Container gap={2}>
                <Grid xs={24}>
                    {load
                        ? <Loading/>
                        : <iframe width="100%" height="590" src={embedLink}
                                  title={name} frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen/>
                    }
                </Grid>
                <Grid xs={24}>
                    <Fieldset>
                        <Fieldset.Title>Описание</Fieldset.Title>
                        <Fieldset.Subtitle>
                            {description}
                        </Fieldset.Subtitle>
                    </Fieldset>
                </Grid>
                <Grid xs={24}>
                    <Testimonials videoId={videoId}/>
                </Grid>
            </Grid.Container>
        </PageLayout>

    );
};

export default Video;