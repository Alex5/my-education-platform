import {Button, Card, Grid, Loading, Spacer, Tag, Text, Tooltip} from '@geist-ui/react';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getCourseStatus,
    getPreviewLessons,
    setCourseStatus, setSelectedCourse
} from "../../redux/slices/coursesSlice/coursesSlice";
import styled from "styled-components";
import {PublicRequests} from "../../api/publicRequests";
import {useParams} from "react-router-dom";
import {UserRequests} from "../../api/userRequests";
import Testimonials from "../Testimonials";
import {ILesson} from "../../redux/slices/coursesSlice/types";
import Lesson from "./components/Lesson";
import {Eye, EyeOff} from "@geist-ui/react-icons";

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

    const markLessonViewed = async () => {
        try {
            setLoad(true)
            const newCourseStatus = await UserRequests.markLessonViewed(courseId || '', selectedLesson.lessonId)
            dispatch(setCourseStatus(newCourseStatus));
            setLoad(false)
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
        }

        lessons && handleSelectLesson(lessons.filter(l => l.position === 1)[0].lessonId)
    }, [courseId, courseStatus.viewedLessons.length, dispatch, lessons])

    const checkLessonView: boolean = courseStatus.viewedLessons.includes(selectedLesson.lessonId);

    return (
        <>
            <Grid.Container gap={2} justify="space-between" direction={"row"}>
                <Grid>
                    <Text h3 mb={0} mt={0}>
                        {selectedLesson.name}
                    </Text>
                </Grid>
                {courseStatus.start && (
                    <Grid>
                        <div style={{display: 'flex'}}>
                            <Button
                                loading={load}
                                onClick={markLessonViewed}
                                type={checkLessonView ? "success" : 'default'}
                                icon={checkLessonView ? <Eye/> : <EyeOff/>}
                                auto
                                children={checkLessonView ? "Просмотрено" : "Не просмотрено"}/>
                        </div>
                    </Grid>
                )}
            </Grid.Container>
            <Spacer/>
            <Grid.Container gap={2} justify="center">
                <Grid xs={6} direction="column" style={{height: '600px', overflow: 'auto', position: "sticky", top: 0}}>
                    {lessons && [...lessons].sort((a, b) => a.position - b.position).map(lesson =>
                        <StyledLesson
                            key={lesson.lessonId}
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
                <Grid xs={18} direction={"column"}>
                    <Lesson load={load} selectedLesson={selectedLesson}/>
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
  display: flex;
`

export default Lessons;