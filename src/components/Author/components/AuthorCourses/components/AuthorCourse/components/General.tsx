import React, {useEffect} from 'react';
import {Button, Fieldset, Spacer, Textarea, Note} from "@geist-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getLessons, setLessons, getSelectedCourse} from "../../../../../../../redux/slices/coursesSlice";
import {FirestoreQueries} from "../../../../../../../services/firestore";
import styled from "styled-components";

const General = () => {
    const navigate = useNavigate();
    const {authorCourseId} = useParams<"authorCourseId">();
    const dispatch = useDispatch();
    const lessons = useSelector(getLessons)
    const selectedCourse = useSelector(getSelectedCourse);

    const handleGetLessons = async () => {
        const lessons = await FirestoreQueries.getLessons(authorCourseId || '')
        dispatch(setLessons(lessons));
    }

    useEffect(() => {
        handleGetLessons()
    }, [authorCourseId])

    return (
        <>
            <Fieldset>
                <Fieldset.Title>Описание курса</Fieldset.Title>
                <Fieldset.Subtitle>
                    <Textarea
                        resize={"vertical"}
                        value={selectedCourse.description}
                        width="100%"
                        placeholder={"Поле не заполнено"}/>
                </Fieldset.Subtitle>
                <Fieldset.Footer>
                    Пожалуйста, используйте максимум 148 символов.
                    <Button auto scale={1 / 3}>Сохранить</Button>
                </Fieldset.Footer>
            </Fieldset>
            <Spacer/>
            <Fieldset>
                <Fieldset.Title>Содержание</Fieldset.Title>
                <Fieldset.Subtitle>
                    {lessons.length > 0
                        ? lessons && lessons.map((lesson, index) =>
                        <StyledLessonItem
                            key={index}
                            onClick={() => navigate(`/author/courses/${authorCourseId}/edit`)}
                        >
                            &#8226; {lesson.name}
                        </StyledLessonItem>
                    )
                        : <Note style={{display: 'flex', justifyContent: 'space-between'}} type="warning" label={false}>
                            В курсе пока что нет ни одного урока.
                            <Button auto type="warning" children="Добавить" scale={1 / 3}/>
                        </Note>
                    }
                </Fieldset.Subtitle>
                <Fieldset.Footer>
                    <span></span>
                    <Button onClick={() => navigate(`/author/courses/${authorCourseId}/edit`)} auto
                            scale={1 / 3}>Редактировать</Button>
                </Fieldset.Footer>
            </Fieldset>
        </>
    );
};

const StyledLessonItem = styled.div`
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: ease-in-out 0.2s;
  margin-bottom: 5px;

  &:hover {
    background-color: #f7f7f7;
  }
`

export default General;