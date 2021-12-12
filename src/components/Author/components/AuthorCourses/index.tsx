import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import * as Geist from "@geist-ui/react";
import {Search, UserPlus} from "@geist-ui/react-icons";
import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import {AuthContext} from "../../../../index";
import {AuthorRequests} from '../../../../api/authorRequests';
import {useDispatch, useSelector} from "react-redux";
import {getCourses, setCourses, setSelectedCourse} from "../../../../redux/slices/coursesSlice";
import {IAuthor, ICourse} from "../../../../redux/types";
import {Select, Spacer, Tooltip} from "@geist-ui/react";

const AuthorCourses = () => {
    const courses = useSelector(getCourses);
    const [navigate, location] = [useNavigate(), useLocation()]
    const [addCourseModal, setAddCourseModal] = useState<boolean>(false);
    const [courseName, setCourseName] = useState<string>("");
    const [courseDirection, setCourseDirection] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const {auth} = useContext(AuthContext);
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();

    const handleAddCourse = async () => {
        setLoading(true)
        const newCourses = await AuthorRequests.addCourse({
            name: courseName,
            courseId: '',
            ownerId: user?.uid || '',
            published: false,
            direction: courseDirection,
            lessons: [],
            testimonials: [],
            author: {} as IAuthor,
            description: '',
            cover: '',
            tags: []
        })
        setLoading(false);
        setAddCourseModal(false);
        setCourseName("");
        dispatch(setCourses(newCourses));
    }

    const handleSelectCourse = (course: ICourse) => {
        return () => {
            dispatch(setSelectedCourse(course));
            navigate(`${location.pathname}/${course.courseId}`)
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            const courses = await AuthorRequests.getCourses();
            dispatch(setCourses(courses));
            setLoading(false)
        })()
    }, [dispatch])

    return (
        <>
            <StyledHomeHeader>
                <Geist.Input scale={1.3} icon={<Search/>} width={'100%'} placeholder="Поиск по курсам"/>
                <Geist.Spacer/>
                <Geist.Button
                    onClick={() => setAddCourseModal(true)}
                    auto
                    type="secondary"
                    children="Новый курс"
                />
                <Geist.Spacer/>
            </StyledHomeHeader>
            <Geist.Spacer/>
            <Geist.Grid.Container gap={2}>
                {loading
                    ? <Geist.Loading style={{height: '200px'}}/>
                    : courses.length > 0
                        ? courses.map(course =>
                            <Geist.Grid xs={24} sm={12} md={8}>
                                <Geist.Card
                                    style={{cursor: 'pointer'}} hoverable width="100%"
                                    onClick={handleSelectCourse(course)}
                                >
                                    <Tooltip text={course.name}>
                                        <Geist.Text h4>{course.name.length > 25 ? `${course.name.slice(0, 25)}...` : course.name}</Geist.Text>
                                    </Tooltip>
                                    <Geist.Divider/>
                                    <Geist.Spacer/>
                                    <Geist.Description
                                        title={"Статус"}
                                        content={course.published
                                            ? <Geist.Dot type="success">Опубликован</Geist.Dot>
                                            : <Geist.Dot>черновик</Geist.Dot>
                                        }
                                    />
                                    <Geist.Spacer h={1}/>
                                    <Geist.Description
                                        title={"Автор"}
                                        content={course.author
                                            ? <Geist.User name={course.author?.name}>
                                                {course.author?.appointment}
                                            </Geist.User>
                                            : <span>Автор пока не добавлен</span>
                                        }/>
                                </Geist.Card>
                            </Geist.Grid>)
                        : <Geist.Grid xs={24} alignItems="center" justify="center">
                            <Geist.Text children={"Нет курсов"}/>
                        </Geist.Grid>
                }
            </Geist.Grid.Container>
            <Geist.Modal visible={addCourseModal} onClose={() => setAddCourseModal(false)}>
                <Geist.Modal.Title>Новый курс</Geist.Modal.Title>
                <Geist.Modal.Content>
                    <Geist.Input
                        placeholder={"Введите название курса"}
                        value={courseName}
                        onChange={e => setCourseName(e.target.value)}
                        width={"100%"}
                    />
                    <Spacer/>
                    <Select
                        width={"100%"}
                        placeholder="Выберите направление"
                        onChange={(val: any) => setCourseDirection(val)}
                    >
                        <Select.Option value="programming">Программирование</Select.Option>
                    </Select>
                </Geist.Modal.Content>
                <Geist.Modal.Action passive onClick={() => setAddCourseModal(false)}>Отменить</Geist.Modal.Action>
                <Geist.Modal.Action loading={loading} onClick={handleAddCourse}>Сохранить</Geist.Modal.Action>
            </Geist.Modal>
        </>
    );
};

const StyledHomeHeader = styled.div`
  display: flex;
`
const StyledCourseCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default AuthorCourses;