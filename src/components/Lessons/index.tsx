import {Button, Card, Grid, Loading, Spacer, Text, Tooltip} from '@geist-ui/react';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getCourseStatus,
    getPreviewLessons,
    setCourseStatus, setSelectedCourse
} from "../../redux/slices/coursesSlice";
import {ILesson} from "../../redux/types";
import styled from "styled-components";
import {PublicRequests} from "../../api/publicRequests";
import {useParams} from "react-router-dom";
import {UserRequests} from "../../api/userRequests";
import Testimonials from "../Testimonials";

const Lessons = () => {
    const [selectedLesson, setSelectedLesson] = useState<ILesson>({} as ILesson);
    const [load, setLoad] = useState(false);
    const {courseId} = useParams<"courseId">()

    const dispatch = useDispatch();
    const lessons = useSelector(getPreviewLessons);
    const courseStatus = useSelector(getCourseStatus);


    const handleSelectLesson = async (lessonId: string) => {
        setLoad(true)
        const lesson = await PublicRequests.getLesson(lessonId);
        setSelectedLesson(lesson);
        setLoad(false)
    }

    const handleNextLesson = async () => {
        if (courseStatus.viewedLessons.length === lessons.length) {
            alert('Курс завершён')
            return;
        }

        try {
            setLoad(true)
            const newCourseStatus = await UserRequests.nextLesson(courseId || '', selectedLesson.lessonId)
            dispatch(setCourseStatus(newCourseStatus));

            if (newCourseStatus.viewedLessons.length !== lessons.length) {
                await handleSelectLesson(lessons[newCourseStatus.viewedLessons.length].lessonId)
                setLoad(false)
            }
        } catch (e) {
            alert(e);
            setLoad(false)
        }
    }

    useEffect(() => {
        if (!lessons) {
            setLoad(true)
            PublicRequests
                .getCourse(courseId || '')
                .then(async course => {
                    dispatch(setSelectedCourse(course))
                    const courseStatus = await UserRequests.getCourseStatus(courseId || '');
                    dispatch(setCourseStatus(courseStatus));
                    setLoad(false)
                })
        } else {
            courseStatus.viewedLessons.length === lessons.length
                ? handleSelectLesson(lessons[lessons.length - 1].lessonId)
                : handleSelectLesson(lessons[courseStatus.viewedLessons.length].lessonId)
        }
    }, [courseId, courseStatus.viewedLessons.length, dispatch, lessons])

    return (
        <>
            <Text h2 children={selectedLesson.name}/>
            <Spacer/>
            <Grid.Container gap={2} justify="center">
                <Grid xs={6} direction="column">
                    {lessons && lessons.map(lesson =>
                        <StyledLesson
                            viewedLessons={courseStatus.viewedLessons}
                            lessonId={lesson.lessonId}
                            selectedLessonId={selectedLesson.lessonId}
                            onClick={() => handleSelectLesson(lesson.lessonId)}
                        >
                            <Tooltip text={lesson.name}>
                                {`${lesson.name.slice(0, 25)}...`}
                            </Tooltip>
                        </StyledLesson>
                    )}
                </Grid>
                <Grid xs={18} direction="column">
                    {load
                        ? <Loading/>
                        : <iframe width="100%" height="415" src={selectedLesson.videoLink}
                                  title="YouTube video player" frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen/>
                    }
                    <Spacer/>
                    <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                        {courseStatus.start &&
                        <Button
                            type={"secondary"}
                            loading={load}
                            onClick={handleNextLesson}
                            children={"Следующий урок"}/>
                        }
                    </div>
                    <Spacer/>
                    <Testimonials videoId={selectedLesson.videoId}/>
                </Grid>
            </Grid.Container>
        </>

    );
};

const StyledLesson = styled.div<{ viewedLessons: string[], lessonId: string, selectedLessonId: string }>`
  background-color: ${props => props.viewedLessons.includes(props.lessonId) ? "#3291FF" : '#EAEAEA'};
  color: ${props => props.viewedLessons.includes(props.lessonId) ? "white" : 'black'};
  border: ${props => props.selectedLessonId === props.lessonId ? '2px solid black' : '2px solid transparent'};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
`

export default Lessons;