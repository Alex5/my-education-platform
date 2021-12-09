import React, {useEffect, useState} from 'react';
import {Button, Fieldset, Spacer, Textarea, Note, useToasts, Input, Grid, Text, Tag, Card} from "@geist-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getLessons,
    setLessons,
    getSelectedCourse,
    setSelectedCourse
} from "../../../../../../../redux/slices/coursesSlice";
import {AuthorRequests} from "../../../../../../../api/authorRequests";
import styled from "styled-components";

const General = () => {
    const navigate = useNavigate();
    const {authorCourseId} = useParams<"authorCourseId">();
    const [, setToast] = useToasts();
    const dispatch = useDispatch();
    const lessons = useSelector(getLessons)

    const selectedCourse = useSelector(getSelectedCourse);
    const [description, setDescription] = useState<string>(selectedCourse.description || '')
    const [authorName, setAuthorName] = useState<string | undefined>(selectedCourse.author?.name || '')
    const [courseName, setCourseName] = useState<string | undefined>(selectedCourse.name || '')
    const [authorAppointment, setAuthorAppointment] = useState<string>(selectedCourse.author?.appointment || '')
    const [channelLink, setChannelLink] = useState<string>(selectedCourse.author?.channelLink || '')
    const [descriptionLoading, setDescriptionLoading] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const handleDescriptionUpdate = async () => {
        setDescriptionLoading(true)
        await AuthorRequests.updateCourse(authorCourseId || '', 'description', description);
        setDescriptionLoading(false)
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
            avatar: '',
            channelLink: channelLink
        });
        setLoading(false)
        setToast({
            text: 'Автор курса обновлён',
            type: "success"
        })
    }

    const handleUpdate = async (key: string, data: any) => {
        setLoading(true)
        const course = await AuthorRequests.updateCourse(authorCourseId || '', key, data);
        dispatch(setSelectedCourse(course));
        setLoading(false)
        setToast({
            text: 'Успешно обновлено',
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
            <Card>
                <Card.Body style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text mb={0} mt={0} h4>Статус</Text>
                    {selectedCourse.published
                        ? <Tag type="success">Опубликован</Tag>
                        : <Tag type="secondary">Черновик</Tag>
                    }
                </Card.Body>
            </Card>
            <Spacer/>
            <Fieldset>
                <Fieldset.Title>Название курса</Fieldset.Title>
                <Fieldset.Subtitle>
                    <Spacer/>
                    <Input onChange={e => setCourseName(e.target.value)} value={courseName}/>
                </Fieldset.Subtitle>
                <Fieldset.Footer>
                    <span>Сохранить изменения</span>
                    <Button loading={loading} onClick={() => handleUpdate('name', courseName)} auto
                            scale={1 / 3}>Сохранить</Button>
                </Fieldset.Footer>
            </Fieldset>
            <Spacer/>
            <Fieldset>
                <Fieldset.Title>Автор курса</Fieldset.Title>
                <Fieldset.Subtitle>
                    <Spacer/>
                    <Grid.Container gap={1}>
                        <Grid xs={8}>
                            <Input value={authorName} onChange={e => setAuthorName(e.target.value)} width="100%"
                                   placeholder="Иван Иванов">
                                Имя Фамилия
                            </Input>
                        </Grid>
                        <Grid xs={8}>
                            <Input value={authorAppointment} onChange={e => setAuthorAppointment(e.target.value)}
                                   width="100%"
                                   placeholder="Senior Pomidor JavaScript Developer">
                                Должность
                            </Input>
                        </Grid>
                        <Grid xs={8}>
                            <Input value={channelLink} onChange={e => setChannelLink(e.target.value)}
                                   width="100%"
                                   placeholder="https://www.youtube.com/c/">
                                Ссылка на YouTube-канал
                            </Input>
                        </Grid>
                    </Grid.Container>
                    <Spacer h={2}/>
                </Fieldset.Subtitle>
                <Fieldset.Footer>
                    <span>Сохранить изменения</span>
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
                    <Button loading={descriptionLoading} onClick={handleDescriptionUpdate} auto
                            scale={1 / 3}>Сохранить</Button>
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