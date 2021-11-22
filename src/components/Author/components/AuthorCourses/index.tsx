import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {
    Button,
    ButtonDropdown,
    Card,
    Description,
    Divider, Dot,
    Grid,
    Input, Loading,
    Modal,
    Spacer,
    Tag,
    Text,
    User
} from "@geist-ui/react";
import {Search, UserPlus} from "@geist-ui/react-icons";
import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import {AuthContext} from "../../../../index";
import {FirestoreQueries} from '../../../../services/firestore';
import {useDispatch, useSelector} from "react-redux";
import {getCourses, setCourses, setSelectedCourse} from "../../../../redux/slices/coursesSlice";
import {nanoid} from "nanoid";
import {ICourse, ICourseInfo} from "../../../../redux/types";

const AuthorCourses = () => {
    const courses = useSelector(getCourses);
    const [navigate, location] = [useNavigate(), useLocation()]
    const [addCourseModal, setAddCourseModal] = useState<boolean>(false);
    const [courseName, setCourseName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const {auth} = useContext(AuthContext);
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();

    const handleAddCourse = async () => {
        setLoading(true)
        const newCourses = await FirestoreQueries.addCourse({
            name: courseName,
            courseId: '',
            ownerId: user?.uid || '',
            publicationStatus: 'draft',
        })
        setLoading(false);
        setAddCourseModal(false);
        setCourseName("");
        dispatch(setCourses(newCourses));
    }

    const handleSelectCourse = (course: ICourse) => {
        dispatch(setSelectedCourse(course));
        navigate(`${location.pathname}/${course.courseId}`)
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            const courses = await FirestoreQueries.getCourses();
            dispatch(setCourses(courses));
            setLoading(false)
        })()
    }, [dispatch])

    return (
        <>
            <StyledHomeHeader>
                <Input scale={1.3} icon={<Search/>} width={'100%'} placeholder="Поиск по курсам"/>
                <Spacer/>
                <Button
                    onClick={() => setAddCourseModal(true)}
                    auto
                    type="secondary"
                    children="Новый курс"
                />
                <Spacer/>
                <Button auto icon={<UserPlus/>}/>
            </StyledHomeHeader>
            <Spacer/>
            <Grid.Container gap={2}>
                {loading
                    ? <Loading style={{height: '200px'}}/>
                    : courses.length > 0
                        ? courses.map(course =>
                            <Grid xs={24} sm={12} md={8}>
                                <Card
                                    style={{cursor: 'pointer'}} hoverable width="100%"
                                    onClick={() => handleSelectCourse(course)}
                                >
                                    <Text h5>{course.name}</Text>
                                    <Divider/>
                                    <Spacer/>
                                    <Description
                                        title={"Статус"}
                                        content={course.publicationStatus === 'draft'
                                            ? <Dot>черновик</Dot>
                                            : <Dot type="success">Опубликован</Dot>
                                        }
                                    />
                                    <Spacer h={1}/>
                                    <Description
                                        title={"Автор"}
                                        content={user &&
                                        <User src={user.photoURL != null ? user.photoURL : ''} name={user.displayName}>
                                            {user.email}
                                        </User>
                                        }/>
                                </Card>
                            </Grid>)
                        : <Grid xs={24} alignItems="center" justify="center">
                            <Text children={"Нет курсов"}/>
                        </Grid>
                }
            </Grid.Container>
            <Modal visible={addCourseModal} onClose={() => setAddCourseModal(false)}>
                <Modal.Title>Новый курс</Modal.Title>
                <Modal.Content>
                    <Input
                        placeholder={"Введите название курса"}
                        value={courseName}
                        onChange={e => setCourseName(e.target.value)}
                        width={"100%"}
                    />
                </Modal.Content>
                <Modal.Action passive onClick={() => setAddCourseModal(false)}>Отменить</Modal.Action>
                <Modal.Action loading={loading} onClick={handleAddCourse}>Сохранить</Modal.Action>
            </Modal>
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