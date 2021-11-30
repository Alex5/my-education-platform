import React, {useEffect, useState} from 'react';
import {Button, Fieldset, Spacer, Textarea, Note, useToasts, Input, Grid} from "@geist-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getLessons, setLessons, getSelectedCourse} from "../../../../../../../redux/slices/coursesSlice";
import {AuthorRequests} from "../../../../../../../api/authorRequests";
import styled from "styled-components";
import {ILesson} from "../../../../../../../redux/types";

const General = () => {

    const navigate = useNavigate();
    const {authorCourseId} = useParams<"authorCourseId">();
    const [, setToast] = useToasts();
    const dispatch = useDispatch();
    const lessons = useSelector(getLessons)

    const selectedCourse = useSelector(getSelectedCourse);
    const [description, setDescription] = useState<string>(selectedCourse.description || '')
    const [authorName, setAuthorName] = useState<string | undefined>(selectedCourse.author?.name || '')
    const [authorAppointment, setAuthorAppointment] = useState<string>(selectedCourse.author?.appointment || '')
    const [loading, setLoading] = useState<boolean>(false)

    const handleDescriptionUpdate = async () => {
        setLoading(true)
        await AuthorRequests.updateCourse(authorCourseId || '', 'description', description);
        setLoading(false)
        setToast({
            text: 'Описание курса обновлено',
            type: "success"
        })
    }
    const handleAuthorUpdate = async () => {
        setLoading(true)
        await AuthorRequests.updateCourse(authorCourseId || '', 'author', {
            name: authorName,
            appointment: authorAppointment,
            avatar: ''
        });
        setLoading(false)
        setToast({
            text: 'Автор курса обновлён',
            type: "success"
        })
    }

    useEffect(() => {
        (async () => {
            const lessons = await AuthorRequests.getLessons(authorCourseId || '')
            dispatch(setLessons(lessons));
        })()
    }, [authorCourseId])

    return (
        <>
            <Fieldset>
                <Fieldset.Title>Автор курса</Fieldset.Title>
                <Fieldset.Subtitle>
                    <Spacer/>
                    <Grid.Container gap={1}>
                        <Grid xs={12}>
                            <Input value={authorName} onChange={e => setAuthorName(e.target.value)} width="100%" placeholder="Иван Иванов">
                                Имя Фамилия
                            </Input>
                        </Grid>
                        <Grid xs={12}>
                            <Input value={authorAppointment} onChange={e => setAuthorAppointment(e.target.value)} width="100%"
                                   placeholder="Senior Pomidor JavaScript Developer">
                                Должность
                            </Input>
                        </Grid>
                    </Grid.Container>
                    <Spacer h={2}/>
                </Fieldset.Subtitle>
                <Fieldset.Footer>
                    <span></span>
                    <Button loading={loading} onClick={handleAuthorUpdate} auto scale={1 / 3}>Сохранить</Button>
                </Fieldset.Footer>
            </Fieldset>
            <Spacer/>
            <Fieldset>
                <Fieldset.Title>Описание курса</Fieldset.Title>
                <Fieldset.Subtitle>
                    <Spacer/>
                    <Textarea
                        resize={"vertical"}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        width="100%"
                        placeholder={"Поле не заполнено"}/>
                </Fieldset.Subtitle>
                <Fieldset.Footer>
                    Пожалуйста, используйте максимум 148 символов.
                    <Button loading={loading} onClick={handleDescriptionUpdate} auto scale={1 / 3}>Сохранить</Button>
                </Fieldset.Footer>
            </Fieldset>
            <Spacer/>
            <Fieldset>
                <Fieldset.Title>Содержание</Fieldset.Title>
                <Fieldset.Subtitle>
                    <Spacer/>
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