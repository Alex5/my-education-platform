import React, {FC, useState} from 'react';
import {Button, Fieldset, Input, Link, Spacer, Text, Textarea} from "@geist-ui/react";
import HomeWork from "./HomeWork";
import {useDispatch, useSelector} from "react-redux";
import {ILessonInfo} from "../../../../../../../redux/types";
import {getLessons, setLessons} from "../../../../../../../redux/slices/coursesSlice";

interface LessonProps {
    selectedLesson: ILessonInfo | undefined
}

const Lesson: FC<LessonProps> = ({selectedLesson}) => {
    const dispatch = useDispatch();
    const lessons = useSelector(getLessons);

    const handleLessonEdit = (value: string, key: string) => {
        const newLessons = lessons.map(lesson =>
            lesson.lessonId === selectedLesson?.lessonId
                ? {...lesson, [`${key}`]: value}
                : lesson)
        dispatch(setLessons(newLessons));
    }

    return (
        <Fieldset width={"100%"}>
            <Fieldset.Subtitle>
                <Text>Название урока</Text>
                <Input
                    onChange={e => handleLessonEdit(e.target.value, 'name')}
                    value={selectedLesson?.name}
                    width={"100%"}
                />
                <Text>Описание</Text>
                <Textarea
                    resize={"vertical"}
                    onChange={e => handleLessonEdit(e.target.value, 'description')}
                    value={selectedLesson?.description}
                    width={"100%"}
                />
                <Spacer/>
                <Link
                    href="https://support.google.com/youtube/answer/171780?hl=ru"
                    icon
                    target="_blank"
                >
                    Ссылка для встраивания
                </Link>
                <Spacer/>
                <Input
                    width={"100%"}
                    value={selectedLesson?.videoLink}
                    onChange={(e) => handleLessonEdit(e.target.value, 'videoLink')}
                />
                <Spacer/>
                {selectedLesson?.videoLink &&
                <iframe
                    style={{borderRadius: '5px'}} width="100%" height="315" src={selectedLesson?.videoLink}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                }
                <Spacer/>
                {/*<Fieldset>*/}
                {/*    <Fieldset.Title>*/}
                {/*        Домашнее задание*/}
                {/*    </Fieldset.Title>*/}
                {/*    <Spacer/>*/}
                {/*    {selectedLesson?.homeWorks*/}
                {/*        ? selectedLesson?.homeWorks.map((hw, index) =>*/}
                {/*            <HomeWork {...hw} key={index}/>*/}
                {/*        )*/}
                {/*        : <span>Нет домашек</span>}*/}
                {/*    <Button width="100%" children="Добавить ДЗ"/>*/}
                {/*    <Fieldset.Footer>*/}
                {/*        Сохраните несколько домашних заданий*/}
                {/*        <Button auto scale={1 / 3}>Сохранить</Button>*/}
                {/*    </Fieldset.Footer>*/}
                {/*</Fieldset>*/}
            </Fieldset.Subtitle>
        </Fieldset>
    );
};

export default Lesson;