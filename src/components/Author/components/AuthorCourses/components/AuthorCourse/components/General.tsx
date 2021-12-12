import React, {useEffect, useState} from 'react';
import {Button, Card, Fieldset, Grid, Input, Note, Spacer, Tag, Text, useInput, useToasts} from "@geist-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getLessons,
    getSelectedCourse,
    setLessons,
    setSelectedCourse
} from "../../../../../../../redux/slices/coursesSlice";
import {AuthorRequests} from "../../../../../../../api/authorRequests";
import styled from "styled-components";
import {IAuthor, IKey, ITag} from "../../../../../../../redux/types";
import EditBlock from "./EditBlock";
import {PlusCircle, Trash} from "@geist-ui/react-icons";
import {nanoid} from "nanoid";

const General = () => {
    const navigate = useNavigate();
    const {authorCourseId} = useParams<"authorCourseId">();
    const [, setToast] = useToasts();
    const dispatch = useDispatch();
    const lessons = useSelector(getLessons)

    const selectedCourse = useSelector(getSelectedCourse);
    const [loading, setLoading] = useState<boolean>(false);
    const {state, setState, reset, bindings} = useInput('')

    const handleUpdateState = (key: IKey, value: string | IAuthor | ITag) => {
        dispatch(setSelectedCourse({
            ...selectedCourse,
            [`${key}`]: key === 'tags'
                ? handleUpdateTags(value as ITag)
                : value
        }));
    }

    const handleUpdate = (key: IKey, data: string | IAuthor | ITag[]) => {
        return async () => {
            setLoading(true)
            const course = await AuthorRequests.updateCourse(authorCourseId || '', key, data);
            dispatch(setSelectedCourse(course));
            setLoading(false)
            setToast({
                text: 'Успешно обновлено',
                type: "success"
            })
        }
    }

    const handleUpdateTags = (tag: ITag) => {
        setState('');
        return selectedCourse.tags.some(t => t.id === tag.id)
            ? selectedCourse.tags.filter(t => t.id !== tag.id)
            : [...selectedCourse.tags, tag];
    };

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
            <EditBlock
                name={"Название курса"}
                data={selectedCourse.name}
                handleUpdateState={handleUpdateState}
                handleUpdate={handleUpdate}
                courseKey={"name"}
                loading={loading}
            />
            <Fieldset>
                <Fieldset.Title>Автор курса</Fieldset.Title>
                <Fieldset.Subtitle>
                    <Spacer/>
                    <Grid.Container gap={1}>
                        <Grid xs={8}>
                            <Input
                                value={selectedCourse.author.name}
                                onChange={e => handleUpdateState('author', {
                                    ...selectedCourse.author,
                                    name: e.target.value
                                })} width="100%"
                                placeholder="Иван Иванов">
                                Имя Фамилия
                            </Input>
                        </Grid>
                        <Grid xs={8}>
                            <Input
                                value={selectedCourse.author.appointment}
                                onChange={e => handleUpdateState('author', {
                                    ...selectedCourse.author,
                                    appointment: e.target.value
                                })}
                                width="100%"
                                placeholder="Senior Pomidor JavaScript Developer">
                                Должность
                            </Input>
                        </Grid>
                        <Grid xs={8}>
                            <Input value={selectedCourse.author.channelLink}
                                   onChange={e => handleUpdateState('author', {
                                       ...selectedCourse.author,
                                       channelLink: e.target.value
                                   })}
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
                    <Button
                        loading={loading}
                        onClick={handleUpdate('author', selectedCourse.author)}
                        auto
                        scale={1 / 3}
                    >
                        Сохранить
                    </Button>
                </Fieldset.Footer>
            </Fieldset>
            <Spacer/>
            <EditBlock
                name={"Об этом курсе"}
                data={selectedCourse.description}
                handleUpdateState={handleUpdateState}
                handleUpdate={handleUpdate}
                courseKey={"description"}
                loading={loading}
            />
            <EditBlock
                name={"Тизер или обложка"}
                data={selectedCourse.cover}
                handleUpdateState={handleUpdateState}
                handleUpdate={handleUpdate}
                courseKey={"cover"}
                loading={loading}
            />
            <Fieldset>
                <Fieldset.Title>Теги</Fieldset.Title>
                <Fieldset.Subtitle>
                    <StyledTags>
                        {selectedCourse.tags?.map(tag => (
                            <StyledTag>
                                <Text mr={0.5} b key={tag.id}>{tag.text} </Text>
                                <Trash cursor={'pointer'} onClick={() => handleUpdateState('tags', tag)} size={15}/>
                            </StyledTag>
                        ))}
                        {selectedCourse.tags.length !== 5 && (
                            <Input
                                {...bindings}
                                onIconClick={() => handleUpdateState('tags', {
                                    id: nanoid(),
                                    text: state.toLowerCase()
                                })}
                                iconClickable
                                iconRight={<PlusCircle/>} placeholder="Название тега"/>
                        )}
                    </StyledTags>
                </Fieldset.Subtitle>
                <Fieldset.Footer>
                    <span></span>
                    <Button loading={loading} onClick={handleUpdate('tags', selectedCourse.tags)} auto
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


const StyledTags = styled.div`
  flex-direction: row;
  display: flex;
  grid-gap: 5px;
`

const StyledTag = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
`

export default General;