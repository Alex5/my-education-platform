import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Button, Description, Fieldset, Grid, Image, Loading, Modal, Spacer, Text, useModal} from "@geist-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {
    getLessons,
    getSelectedCourse,
    setLessons,
    setSelectedCourse,
    setCourseStatus,
    getCourseStatus
} from "../../../redux/slices/coursesSlice";
import {PublicRequests} from "../../../services/publicRequests";
import {getLoggedIn} from "../../../redux/slices/userSlice";
import {UserRequests} from "../../../services/userRequests";
import {AnalyticsLogs} from "../../../services/analytics";

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
            <Grid.Container gap={2} justify="center" height="100px">
                <Grid direction="column" xs={18}>
                    <Text h1 mb={0} mt={0}>
                        {load ? <Loading/> : selectedCourse.name}
                    </Text>
                    <Spacer/>
                    <Description title="Автор курса" content={load ? <Loading/> : selectedCourse.author?.name}/>
                    <Spacer h={3}/>
                    <Fieldset>
                        <Fieldset.Title>О курсе</Fieldset.Title>
                        <Spacer/>
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
                </Grid>
                <Grid xs={6}>
                    {load
                        ? <Loading/>
                        : courseStatus && courseStatus.start
                            ? <Button onClick={() => navigate(`${location.pathname}/lessons`)} children="Продолжить"/>
                            :
                            <Button loading={startLoad} onClick={handleStartCourse} type="secondary" children="Начать"/>
                    }
                </Grid>
            </Grid.Container>
            <Modal {...bindings}>
                <Modal.Content>
                    <Text>Прогресс не будет сохранён. Если вы хотите сохранение прогресса, авторизуйтесь.</Text>
                </Modal.Content>

                <Modal.Action passive onClick={() => setVisible(false)}>Отменить</Modal.Action>
                <Modal.Action onClick={() => navigate(`${location.pathname}/lessons`)}>Продолжить без
                    сохранения</Modal.Action>
            </Modal>
        </>
    );
};

export default Course;