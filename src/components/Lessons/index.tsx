import {Button, Card, Grid, Spacer, Text} from '@geist-ui/react';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCourseStatus, getLessons, setCourseStatus, setLessons} from "../../redux/slices/coursesSlice";
import {ILesson} from "../../redux/types";
import styled from "styled-components";
import {PublicRequests} from "../../services/publicRequests";
import {useParams} from "react-router-dom";
import {UserRequests} from "../../services/userRequests";

const Lessons = () => {
    const [selectedLesson, setSelectedLesson] = useState<ILesson>({} as ILesson);
    const [count, setCount] = useState(0);
    const [load, setLoad] = useState(false);
    const {courseId} = useParams<"courseId">()

    const dispatch = useDispatch();
    const lessons = useSelector(getLessons);
    const courseStatus = useSelector(getCourseStatus);

    const handleNextLesson = async () => {
        try {
            setLoad(true)
            const newCourseStatus = await UserRequests.nextLesson(courseId || '', selectedLesson.lessonId)
            dispatch(setCourseStatus(newCourseStatus));
            setSelectedLesson(lessons[newCourseStatus.viewedLessons.length])
            setLoad(false)
        } catch (e) {
            setCount(count + 1)
            setLoad(false)
        }
    }

    useEffect(() => {
        if (lessons.length === 0) {
            PublicRequests
                .getLessons(courseId || '')
                .then(async lessons => {
                    dispatch(setLessons(lessons))
                    const courseStatus = await UserRequests.getCourseStatus(courseId || '');
                    dispatch(setCourseStatus(courseStatus));
                })
        } else {
            courseStatus.viewedLessons.length === lessons.length
                ? setSelectedLesson(lessons[lessons.length - 1])
                : setSelectedLesson(lessons[courseStatus.viewedLessons.length])
        }
    }, [count, courseId, courseStatus.viewedLessons.length, dispatch, lessons])

    return (
        <>
            <Text h2 children={selectedLesson.name}/>
            <Spacer/>
            <Grid.Container gap={2} justify="center" height="100px">
                <Grid xs={6} direction="column">
                    {lessons.map(lesson =>
                        <StyledLesson
                            viewedLessons={courseStatus.viewedLessons}
                            lessonId={lesson.lessonId}
                            selectedLessonId={selectedLesson.lessonId}
                        >
                            <span>
                                 {lesson.name}
                            </span>
                        </StyledLesson>
                    )}
                </Grid>
                <Grid xs={18} direction="column">

                    <iframe width="100%" height="415" src={selectedLesson.videoLink}
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </Grid>
                <Spacer/>
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <Button loading={load} onClick={handleNextLesson} children={"Следующий урок"}/>
                </div>

            </Grid.Container>
        </>

    );
};

const StyledLesson = styled.div<{ viewedLessons: string[], lessonId: string, selectedLessonId: string }>`
  background-color: ${props => props.viewedLessons.includes(props.lessonId) ? "lightgreen" : 'lightgray'};
  border: ${props => props.selectedLessonId === props.lessonId ? '1px solid black' : 'unset'};
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
`

export default Lessons;