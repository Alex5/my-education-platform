import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Description, Display,
    Fieldset,
    Grid, Image, Link,
    Loading,
    Modal,
    Spacer, Tag,
    Text,
    useModal
} from "@geist-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
    getSelectedCourse,
    setSelectedCourse,
    setCourseStatus,
    getCourseStatus
} from "../../../redux/slices/coursesSlice/coursesSlice";
import { PublicRequests } from "../../../api/publicRequests";
import { UserRequests } from "../../../api/userRequests";
import { AnalyticsLogs } from "../../../services/analytics";
import styled from "styled-components";
import { Heart, Youtube } from "@geist-ui/react-icons";
import VideoLayout from "../../Layout/VideoLayout";

const Course = () => {
    const [load, setLoad] = useState(false);
    const [startLoad, setStartLoad] = useState(false);

    const dispatch = useDispatch();
    const selectedCourse = useSelector(getSelectedCourse);
    const courseStatus = useSelector(getCourseStatus);

    let { courseId } = useParams<"courseId">();
    const navigate = useNavigate();
    const location = useLocation();

    const { setVisible, bindings } = useModal()

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

    useEffect(() => {
        PublicRequests
            .getCourse(courseId || '')
            .then(async course => {
                dispatch(setSelectedCourse(course));
                const courseStatus = await UserRequests.getCourseStatus(courseId || '');
                dispatch(setCourseStatus(courseStatus));
                setLoad(false)
            })

        AnalyticsLogs.pageView(location.pathname, selectedCourse.name, courseId || '')
    }, [courseId])

    return (
        <>
            <VideoLayout
                title={selectedCourse.name}
                headerActions={[
                    <Button disabled mr={1} auto icon={<Heart />} />,
                    load
                        ? <Loading />
                        : courseStatus && courseStatus.start
                            ?
                            <Button loading={load} type={"success"} onClick={() => navigate(`${location.pathname}/lessons`)}
                                children="Продолжить" />
                            :
                            <Button loading={load} onClick={handleStartCourse} type="secondary"
                                children="Начать" />
                ]}
                cover={selectedCourse.cover}
                tags={selectedCourse.tags}
                ownerId={selectedCourse.ownerId}
                accountId={selectedCourse.accountId}
                socialAccounts={selectedCourse.socialAccounts}
            >
                <Fieldset>
                    <Fieldset.Title>Об этом курсе</Fieldset.Title>
                    <Fieldset.Subtitle>
                        {load ? <Loading /> : <Text>{selectedCourse.description}</Text>}
                    </Fieldset.Subtitle>
                </Fieldset>
                <Spacer />
                <Fieldset>
                    <Fieldset.Title children="Уроки" />
                    <Fieldset.Subtitle>
                        {load
                            ? <Loading />
                            : <ul>
                                {selectedCourse.lessons && selectedCourse.lessons.map(lesson =>
                                    <li key={lesson.lessonId}>{lesson.name}</li>
                                )}
                            </ul>
                        }
                    </Fieldset.Subtitle>
                </Fieldset>
            </VideoLayout>
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

export default Course;