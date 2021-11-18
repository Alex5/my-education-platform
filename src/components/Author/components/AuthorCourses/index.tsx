import React, {useContext, useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Button, Card, Description, Divider, Grid, Input, Spacer, Text, User} from "@geist-ui/react";
import {Search, UserPlus} from "@geist-ui/react-icons";
import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import {AuthContext} from "../../../../index";
import {FirestoreQueries} from '../../../../services/firestore';
import {useDispatch, useSelector} from "react-redux";
import {getCourses, setCourses} from "../../../../redux/slices/coursesSlice";
import AuthorTabs from "../AuthorTabs";

const AuthorCourses = () => {
    const courses = useSelector(getCourses);
    const [navigate, location] = [useNavigate(), useLocation()]
    const {auth} = useContext(AuthContext);
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const courses = await FirestoreQueries.getCourses();
            dispatch(setCourses(courses));
        })()
    }, [dispatch])

    return (
        <>
            <StyledHomeHeader>
                <Input scale={1.3} icon={<Search/>} width={'100%'} placeholder="Поиск по курсам"/>
                <Spacer/>
                <Button onClick={() => navigate('/author/courses/create')} auto type="secondary" children="Новый курс"/>
                <Spacer/>
                <Button auto icon={<UserPlus/>}/>
            </StyledHomeHeader>
            <Spacer/>
            <Grid.Container gap={2}>
                {courses.length > 0
                    ? courses && courses.map(course => <Grid xs={8}>
                    <Card
                        style={{cursor: 'pointer'}} hoverable width="100%"
                        onClick={() => navigate(`${location.pathname}/${course.courseId}`)}
                    >
                        <h5>{course.name}</h5>
                        <Divider/>
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
        </>
    );
};

const StyledHomeHeader = styled.div`
  display: flex;
`

export default AuthorCourses;