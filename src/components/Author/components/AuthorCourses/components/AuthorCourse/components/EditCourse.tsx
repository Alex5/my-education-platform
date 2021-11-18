import React, {useEffect, useState} from 'react';
import {Button, Input, Spacer, Fieldset, Text, Textarea, Grid, Link} from "@geist-ui/react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {vs} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {XCircle} from "@geist-ui/react-icons";
import styled from "styled-components";
import {FirestoreQueries} from "../../../../../../../services/firestore";
import {getCourseInfo, getLessonInfo, setLessonInfo} from "../../../../../../../redux/slices/coursesSlice";
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import HomeWork from "./HomeWork";

const EditCourse = () => {
    const lessonInfo = useSelector(getLessonInfo);
    const courseInfo = useSelector(getCourseInfo);
    const [lessonId, setLessonId] = useState<string>("");
    const [code, setCode] = useState<string>('');
    const [videoLink, setVideoLink] = useState<string>(lessonInfo.videoLink)
    const dispatch = useDispatch();

    const getLessons = async (lessonId: string) => {
        const lessonInfoFB = await FirestoreQueries.getLessonInfo(lessonId || '')
        dispatch(setLessonInfo(lessonInfoFB));
        setVideoLink(lessonInfoFB.videoLink)
        setLessonId(lessonId)
    }

    useEffect(() => {
        getLessons(courseInfo.lessons[0].lessonId || lessonId);
    }, [courseInfo && courseInfo.lessons])

    return (
        <div>
            <Grid.Container gap={2}>
                <Grid xs={16}>
                    <Fieldset width={"100%"}>
                        <Fieldset.Title>
                            {courseInfo.lessons && courseInfo.lessons.find(lesson => lesson.lessonId === lessonId)?.name}
                        </Fieldset.Title>
                        <Fieldset.Subtitle>
                            <Text>Описание</Text>
                            <Textarea resize={"vertical"} value={lessonInfo.description} width={"100%"}/>
                            <Spacer/>
                            <Link
                                href="https://support.google.com/youtube/answer/171780?hl=ru"
                                icon
                                target="_blank"
                            >
                                Ссылка для встраивания
                            </Link>
                            <Spacer/>
                            <Input width={"100%"} value={videoLink} onChange={(e) => setVideoLink(e.target.value)}/>
                            <Spacer/>
                            {videoLink &&
                            <iframe width="100%" height="315" src={videoLink}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                            }
                            <Spacer/>
                            <Fieldset>
                                <Fieldset.Title>
                                    Домашнее задание
                                </Fieldset.Title>
                                {lessonInfo.homeWork && lessonInfo.homeWork.map((hw,index) =>
                                    <HomeWork {...hw} key={index}/>
                                )}
                                <Fieldset.Footer>
                                    Сохраните несколько домашних заданий
                                    <Button auto scale={1 / 3}>Сохранить</Button>
                                </Fieldset.Footer>
                            </Fieldset>
                        </Fieldset.Subtitle>
                        <Fieldset.Footer>
                            Сохраните ваш урок, обязательные поля подсветятся
                            <Button auto scale={1 / 3}>Сохранить</Button>
                        </Fieldset.Footer>
                    </Fieldset>
                </Grid>
                <Grid direction="column" xs={8}>
                    {courseInfo.lessons && courseInfo.lessons.map(lesson =>
                        <StyledLessonItem lessonId={lessonId} selectedLessonId={lesson.lessonId} onClick={() => getLessons(lesson.lessonId)}>
                            <span children={`${lesson.name.slice(0 ,35)}...`}/>
                            <XCircle/>
                        </StyledLessonItem>
                    )}
                    <Button scale={1 / 2} children="Добавить урок"/>
                </Grid>
            </Grid.Container>
        </div>
    );
};

const StyledLessonItem = styled.div<{selectedLessonId: string, lessonId: string}>`
  display: flex;
  align-items: center;
  padding: 5px;
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
    background-color: #f7f7f7;
  }
`

export default EditCourse;