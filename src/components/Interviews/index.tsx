import React, {Suspense, useEffect} from 'react';
import PageLayout from "../Layouts/PageLayout";
import {useRecoilState, useRecoilValue} from "recoil";
import {interviewsQuery} from "./selectors";
import {interviewsState} from "./atoms";
import {VideosRequests} from "../../api/videosRequests";
import VideoCard from "../Videos/Components/shared/VideoCard";
import {Grid} from '@geist-ui/core';

const Interview = () => {
    const [interviews, setInterviews] = useRecoilState(interviewsState);

    useEffect(() => {
        (async () => {
            const interviews = await VideosRequests.getVideosByTag('собеседование');
            setInterviews(interviews);
        })()
    }, [])

    return (
        <PageLayout>
            <Grid.Container>
                {interviews.map(interview => (
                    <Grid xs={3} md={24}>
                        <VideoCard video={interview}/>
                    </Grid>
                ))}
            </Grid.Container>
        </PageLayout>
    );
};

export default Interview;