import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import * as Geist from "@geist-ui/core";
import { AuthorRequests } from '../../../../api/authorRequests';
import { useDispatch, useSelector } from "react-redux";
import { getCourses, setCourses, setSelectedCourse } from "../../../../redux/slices/coursesSlice/coursesSlice";
import { Spacer } from "@geist-ui/core";
import { ICourse } from "../../../../redux/slices/coursesSlice/types";
import { getUser } from "../../../../redux/slices/userSlice/userSlice";
import SearchBar from "../shared/SearchBar";
import { Select } from '@geist-ui/core';
import SnipText from "../../../shared/SnipText";
import AuthorAccountPreview from '../AuthorAccountPreview';

const AuthorCourses = () => {
    const courses = useSelector(getCourses);
    const [navigate, location] = [useNavigate(), useLocation()]
    const [addCourseModal, setAddCourseModal] = useState<boolean>(false);
    const [courseName, setCourseName] = useState<string>("");
    const [courseDirection, setCourseDirection] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [addCourseLoading, setAddCourseLoading] = useState<boolean>(false);
    const { author, uid } = useSelector(getUser);
    const dispatch = useDispatch();

    const handleAddCourse = async () => {
        setAddCourseLoading(true)
        const newCourses = await AuthorRequests.addCourse({
            name: courseName,
            courseId: '',
            ownerId: uid,
            published: false,
            direction: courseDirection,
            lessons: [],
            accountId: '',
            description: '',
            cover: '',
            tags: []
        })
        setAddCourseModal(false);
        setCourseName("");
        dispatch(setCourses(newCourses));
        setAddCourseLoading(false);
    }

    const handleSelectCourse = (course: ICourse) => {
        return () => {
            dispatch(setSelectedCourse(course));
            navigate(`${location.pathname}/${course.courseId}`)
        }
    }

    const handleGetCourses = async () => {
        setLoading(true)
        const courses = await AuthorRequests.getCourses(uid);
        dispatch(setCourses(courses));
        setLoading(false)
    }

    useEffect(() => {
        if (author) {
            handleGetCourses()
        }
    }, [author])

    return (
        <Geist.Grid.Container gap={2}>
            <Geist.Grid xs={24}>
                <SearchBar onClick={() => setAddCourseModal(true)} />
            </Geist.Grid>
            {loading
                ? <Geist.Loading style={{ height: '200px' }} />
                : courses.length > 0
                    ? courses.map(course =>
                        <Geist.Grid key={course.courseId} xs={24} sm={12} md={8}>
                            <Geist.Card
                                style={{ cursor: 'pointer' }} hoverable width="100%"
                                onClick={handleSelectCourse(course)}
                            >
                                <SnipText h4 text={course.name} />
                                <Geist.Divider />
                                <Geist.Spacer />
                                <Geist.Description
                                    title={"Статус"}
                                    content={course.published
                                        ? <Geist.Dot type="success">Опубликован</Geist.Dot>
                                        : <Geist.Dot>черновик</Geist.Dot>
                                    }
                                />
                                <Geist.Spacer h={1} />
                                <Geist.Description
                                    title={"Автор"}
                                    content={
                                        <AuthorAccountPreview ownerId={course.ownerId} accountId={course.accountId} />
                                    } />
                            </Geist.Card>
                        </Geist.Grid>)
                    : <Geist.Grid xs={24} alignItems="center" justify="center">
                        <Geist.Text children={"Нет курсов"} />
                    </Geist.Grid>
            }

            <Geist.Modal visible={addCourseModal} onClose={() => setAddCourseModal(false)}>
                <Geist.Modal.Title>Новый курс</Geist.Modal.Title>
                <Geist.Modal.Content>
                    <Geist.Input
                        placeholder={"Введите название курса"}
                        value={courseName}
                        onChange={e => setCourseName(e.target.value)}
                        width={"100%"}
                    />
                    <Spacer />
                    <Select
                        width={"100%"}
                        placeholder="Выберите направление"
                        onChange={(val: any) => setCourseDirection(val)}
                    >
                        <Select.Option value="programming">Программирование</Select.Option>
                        <Select.Option value="design">Дизайн</Select.Option>
                        <Select.Option value="marketing">Маркетинг</Select.Option>
                        <Select.Option value="management">Управление</Select.Option>
                        <Select.Option value="analytics">Аналитика</Select.Option>
                        <Select.Option value="games">Разработка игр</Select.Option>
                        <Select.Option value="creative">Креатив</Select.Option>
                        <Select.Option value="management">Бизнес</Select.Option>
                    </Select>
                </Geist.Modal.Content>
                <Geist.Modal.Action passive onClick={() => setAddCourseModal(false)}>Отменить</Geist.Modal.Action>
                <Geist.Modal.Action loading={addCourseLoading} onClick={handleAddCourse}>Сохранить</Geist.Modal.Action>
            </Geist.Modal>
        </Geist.Grid.Container>
    );
};

export default AuthorCourses;