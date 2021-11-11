import React, {useContext} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {Button, Card, Description, Divider, Grid, Input, Link, Page, Spacer, Text, User} from "@geist-ui/react";
import {Search, UserPlus} from "@geist-ui/react-icons";
import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import {AuthContext} from "../../../../index";

const AuthorCourses = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useContext(AuthContext);
    const [user, loading] = useAuthState(auth);
    const courseExist = true;
    const courseName = "JavaScript для начинающих";

    return (
        <>
            <StyledHomeHeader>
                <Input scale={1.3} icon={<Search/>} width={'100%'} placeholder="Поиск по курсам"/>
                <Spacer/>
                <Button auto type="secondary" children="Новый курс"/>
                <Spacer/>
                <Button auto icon={<UserPlus/>}/>
            </StyledHomeHeader>
            <Spacer/>
            <Grid.Container gap={2} height="100px">
                {courseExist
                    ? <Grid xs={8}>
                        <Card style={{cursor: 'pointer'}} hoverable width="100%"
                              onClick={() => navigate(`${location.pathname}/105320`)}>
                            <h4>{courseName}</h4>
                            <Divider/>
                            <Description
                                title={"Автор"}
                                content={user &&
                                <User src={user.photoURL != null ? user.photoURL : ''} name={user.displayName}>
                                    {user.email}
                                </User>
                                }/>
                        </Card>
                    </Grid>
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
  margin-top: 20px;
`

export default AuthorCourses;