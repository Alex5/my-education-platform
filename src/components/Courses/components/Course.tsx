import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
    Button, ButtonGroup,
    Description, Display,
    Fieldset,
    Grid, Image, Link,
    Loading,
    Modal,
    Spacer, Tag,
    Text,
    useModal
} from "@geist-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {
    getSelectedCourse,
    setSelectedCourse,
    setCourseStatus,
    getCourseStatus
} from "../../../redux/slices/coursesSlice/coursesSlice";
import {PublicRequests} from "../../../api/publicRequests";
import {UserRequests} from "../../../api/userRequests";
import {AnalyticsLogs} from "../../../services/analytics";
import styled from "styled-components";
import {Heart, Youtube} from "@geist-ui/react-icons";

const Course = () => {
    const [load, setLoad] = useState(false);
    const [startLoad, setStartLoad] = useState(false);

    const dispatch = useDispatch();
    const selectedCourse = useSelector(getSelectedCourse);
    const courseStatus = useSelector(getCourseStatus);

    let {courseId} = useParams<"courseId">();
    const navigate = useNavigate();
    const location = useLocation();

    const {setVisible, bindings} = useModal()

    const handleStartCourse = async () => {
        try {
            setStartLoad(true)
            const courseStatus = await UserRequests.startCourse(courseId || '')
            dispatch(setCourseStatus(courseStatus));
            setStartLoad(false)
            navigate(`${location.pathname}/lessons`)
        } catch (e) {
            setStartLoad(false)
            setVisible(true)
        }
    }

    const handleGetCourseStatus = async () => {
        const courseStatus = await UserRequests.getCourseStatus(courseId || '');
        dispatch(setCourseStatus(courseStatus));
    }

    useEffect(() => {
        if (Object.keys(selectedCourse).length === 0) {
            setLoad(true)
            PublicRequests
                .getCourse(courseId || '')
                .then(course => {
                    dispatch(setSelectedCourse(course));
                    setLoad(false)
                })
        }

        handleGetCourseStatus()

        AnalyticsLogs.pageView(location.pathname, selectedCourse.name, courseId || '')
    }, [courseId, dispatch, selectedCourse, location.pathname])

    return (
        <>
            <Grid.Container gap={2} justify="space-between" direction={"row"}>
                <Grid>
                    <Text h3 mb={0} mt={0}>
                        {load ? <Loading/> : selectedCourse.name}
                    </Text>
                </Grid>
                <Grid>
                    <div style={{display: 'flex'}}>
                        <Button disabled mr={1} auto icon={<Heart/>}/>
                        {load
                            ? <Loading/>
                            : courseStatus && courseStatus.start
                                ?
                                <Button type={"success"} onClick={() => navigate(`${location.pathname}/lessons`)}
                                        children="Продолжить"/>
                                :
                                <Button loading={startLoad} onClick={handleStartCourse} type="secondary"
                                        children="Начать"/>
                        }
                    </div>
                </Grid>
            </Grid.Container>
            <Spacer h={2}/>
            <Grid.Container gap={2} justify="center">
                <Grid direction="column" xs={16}>
                    {selectedCourse.cover
                        ? <Image src={selectedCourse.cover}/>
                        : <Display caption="Нет доступного изображения">
                            <span style={{fontSize: '120px'}}>😢</span>
                        </Display>
                    }
                </Grid>
                <Grid xs={8} direction={"column"}>
                    <StyledBubble>
                        <Description title="Краткое описание" content={<Text small>-</Text>}/>
                    </StyledBubble>
                    <Spacer/>
                    <StyledBubble>
                        <Description title="Автор курса" content={load ? <Loading/> : selectedCourse.author?.name}/>
                    </StyledBubble>
                    <Spacer/>
                    <StyledBubble>
                        <Description title="Соц. сети автора" content={<>
                            <Link target={"_blank"} href={selectedCourse.author?.channelLink}>
                                <Youtube/>
                            </Link>
                        </>}/>
                    </StyledBubble>
                    <Spacer/>
                    <StyledBubble>
                        <Description title="Популярные теги" content={<StyledTags>
                            {selectedCourse.tags
                                ? selectedCourse.tags.map(tag =>
                                    <Tag
                                        style={{cursor: 'pointer'}}
                                        onClick={() => navigate(`/tags/${tag}`)}
                                        type={"lite"} key={tag}
                                        scale={1 / 2}>{tag}
                                    </Tag>
                                )
                                : <span>Пока пусто</span>}
                        </StyledTags>}/>
                    </StyledBubble>
                    <Spacer/>
                </Grid>
            </Grid.Container>
            <Spacer h={3}/>
            <Fieldset>
                <Fieldset.Title>Об этом курсе</Fieldset.Title>
                <Fieldset.Subtitle>
                    {load ? <Loading/> : <Text>{selectedCourse.description}</Text>}
                </Fieldset.Subtitle>
            </Fieldset>
            <Spacer/>
            <Fieldset>
                <Fieldset.Title children="Уроки"/>
                <Fieldset.Subtitle>
                    {load
                        ? <Loading/>
                        : <ul>
                            {selectedCourse.lessons && selectedCourse.lessons.map(lesson =>
                                <li>{lesson.name}</li>
                            )}
                        </ul>
                    }
                </Fieldset.Subtitle>
            </Fieldset>
            <Spacer/>
            <Modal {...bindings}>
                <Modal.Title>Уведомление</Modal.Title>
                <Modal.Content>
                    <Text>Прогресс не будет сохранён, для сохранения авторизуйтесь. Либо продолжите без
                        сохранения</Text>
                </Modal.Content>
                <Modal.Action passive onClick={() => setVisible(false)}>Отменить</Modal.Action>
                <Modal.Action onClick={() => navigate(`${location.pathname}/lessons`)}>Продолжить без
                    сохранения</Modal.Action>
            </Modal>
        </>
    );
};

const StyledBubble = styled.div`
  background-color: #f7f7f7;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #e3e3e3;
`

const StyledTags = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`


export default Course;