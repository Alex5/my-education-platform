import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
    Button,
    Card,
    Description, Divider,
    Fieldset,
    Grid,
    Loading,
    Modal,
    Spacer,
    Text,
    Textarea,
    useModal
} from "@geist-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {
    getSelectedCourse,
    setSelectedCourse,
    setCourseStatus,
    getCourseStatus
} from "../../../redux/slices/coursesSlice";
import {PublicRequests} from "../../../api/publicRequests";
import {UserRequests} from "../../../api/userRequests";
import {AnalyticsLogs} from "../../../services/analytics";
import Testimonials from "../../Testimonials";
import styled from "styled-components";

const Course = () => {
    const [load, setLoad] = useState(false);
    const [startLoad, setStartLoad] = useState(false);

    const dispatch = useDispatch();
    const selectedCourse = useSelector(getSelectedCourse);
    const courseStatus = useSelector(getCourseStatus);

    let {courseId} = useParams<"courseId">();
    const navigate = useNavigate();
    const location = useLocation();

    const {visible, setVisible, bindings} = useModal()

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

        AnalyticsLogs.pageView(location.pathname, selectedCourse.name)
    }, [courseId, dispatch, selectedCourse])

    return (
        <>
            <StyledCourseHeader>
                <Grid.Container gap={2} justify="center">
                    <Grid direction="column" xs={18}>
                        <Text h1 mb={0} mt={0}>
                            {load ? <Loading/> : selectedCourse.name}
                        </Text>
                        <Spacer/>
                        <Description title="Автор курса" content={load ? <Loading/> : selectedCourse.author?.name}/>
                    </Grid>
                    <Grid xs={6} alignItems={"center"}>
                        {load
                            ? <Loading/>
                            : courseStatus && courseStatus.start
                                ?
                                <Button onClick={() => navigate(`${location.pathname}/lessons`)} children="Продолжить"/>
                                :
                                <Button loading={startLoad} onClick={handleStartCourse} type="secondary"
                                        children="Начать"/>
                        }
                    </Grid>
                </Grid.Container>
            </StyledCourseHeader>
            <Spacer h={3}/>
            <Fieldset>
                <Fieldset.Title>О курсе</Fieldset.Title>
                <Fieldset.Subtitle>
                    {load ? <Loading/> : selectedCourse.description}
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
            <Testimonials/>
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

const StyledCourseHeader = styled.div`
  position: sticky;
  background-color: #f7f7f7;
  top: 10px;
  padding: 15px;
  border-radius: 15px;
`

export default Course;