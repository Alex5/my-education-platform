import React, { useEffect, useState } from 'react';
import { Button, Text, Grid, Tooltip, Spacer, Tag, useToasts, Breadcrumbs } from "@geist-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
    getLessons,
    getSelectedCourse,
    setLessons,
    updateSelectedCourseLessons
} from "../../../../../../../redux/slices/coursesSlice/coursesSlice";
import { XCircle } from "@geist-ui/react-icons";
import { nanoid } from "nanoid";
import Lesson from "./Lesson";
import { AuthorRequests } from "../../../../../../../api/authorRequests";
import { ILesson } from "../../../../../../../redux/slices/coursesSlice/types";
import PageLayout from "../../../../../../Layouts/PageLayout";

const EditCourse = () => {
    const dispatch = useDispatch();
    const [selectedLesson, setSelectedLesson] = useState<ILesson | undefined>(undefined)
    const [load, setLoad] = useState<boolean>(false)
    const { setToast } = useToasts()
    const lessons = useSelector(getLessons);
    const selectedCourse = useSelector(getSelectedCourse);

    const handleLessonSelect = (lessonId: string) => {
        const selected = lessons.find(lesson => lesson.lessonId === lessonId);
        setSelectedLesson(selected);
    }

    const handleAddLesson = () => {
        dispatch(setLessons([...lessons, {
            lessonId: nanoid(),
            name: `Урок ${lessons.length + 1}`,
            courseId: selectedCourse.courseId,
            description: '',
            homeWorks: [],
            videoLink: '',
            videoId: '',
            position: lessons.length + 1
        }]))
    }

    const handleLessonDelete = (lessonId: string) => {
        const newLessons = lessons.filter(lesson => lesson.lessonId !== lessonId)
        dispatch(setLessons(newLessons));
    }

    const handleLessonsSave = async () => {
        setLoad(true);
        const newLessons = await AuthorRequests.saveLessons(lessons, selectedCourse.courseId)
        dispatch(updateSelectedCourseLessons(newLessons))
        setLoad(false);
        setToast({
            text: 'Уроки успешно обновлены',
            type: 'success'
        })
    }

    useEffect(() => {
        handleLessonSelect(selectedLesson ? selectedLesson.lessonId : lessons[0]?.lessonId)
    }, [lessons, selectedLesson])

    return (
        <PageLayout title={selectedCourse.name} back>
            <StyledEditLessonsHeader>
                <Text mt={0} style={{ fontWeight: 600, fontSize: '1.5rem' }}>Редактирование уроков</Text>
                <Button
                    onClick={handleLessonsSave}
                    type="secondary"
                    auto
                    scale={1 / 2}
                    loading={load}
                >
                    Сохранить уроки
                </Button>
            </StyledEditLessonsHeader>
            <Grid.Container gap={2}>
                <Grid xs={24} md={18} direction={'column'}>
                    <Lesson selectedLesson={selectedLesson} />
                </Grid>
                <Grid direction="column" xs={24} md={6}>
                    <div style={{ height: '500px', overflow: 'auto' }}>
                        {lessons && [...lessons].sort((a, b) => a.position - b.position).map(lesson =>
                            <StyledLessonItem
                                key={lesson.lessonId}
                                lessonId={lesson.lessonId || ''}
                                selectedLessonId={selectedLesson?.lessonId || ''}
                                onClick={() => handleLessonSelect(lesson.lessonId || '')}
                            >
                                <Tag type="lite">{lesson.position}</Tag>
                                <Tooltip text={lesson.name}>
                                    <span style={{ fontWeight: 500, fontSize: '1rem' }}
                                        children={
                                            lesson.name.length > 15
                                                ? `${lesson.name.slice(0, 13)}...`
                                                : lesson.name
                                        }
                                    />
                                </Tooltip>
                                {lessons.length > 1 && <XCircle onClick={() => handleLessonDelete(lesson.lessonId)} />}
                            </StyledLessonItem>
                        )}
                    </div>
                    <Spacer />
                    <Button onClick={handleAddLesson} children="Добавить урок" />
                </Grid>
            </Grid.Container>
        </PageLayout>
    );
};

const StyledLessonItem = styled.div<{ selectedLessonId?: string, lessonId: string }>`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 10px;
  cursor: pointer;
  justify-content: space-between;
  transition: ease-in-out 0.2s;
  margin-bottom: 10px;
  border-radius: 5px;
  color: ${props => props.selectedLessonId === props.lessonId ? "black" : "#666666"};
  font-weight: ${props => props.selectedLessonId === props.lessonId ? "500" : ""};
  background-color: ${props => props.selectedLessonId === props.lessonId ? "#f7f7f7" : ""};

  &:hover {
    background-color: #fbfbfb;
  }
`

const StyledEditLessonsHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export default EditCourse;