import React, {useEffect} from 'react';
import {NavLink, Outlet, useNavigate, useParams} from "react-router-dom";
import {Button, Divider, Grid, Spacer, Text} from "@geist-ui/react";
import styled from "styled-components";

const AuthorCourse = () => {
    const {authorCourseId} = useParams<"authorCourseId">();
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/author/courses/${authorCourseId}/general`);
    }, [])

    return (
        <>
            <StyledInfoHeader>
                <Text mt={0} mb={0} h3 children={"JavaScript для начинающих"}/>
                <Button auto type={"success"} children={"Опубликовать"}/>
            </StyledInfoHeader>
            <Divider/>
            <Spacer h={3}/>
            <Grid.Container gap={2} justify="center" height="100px">
                <Grid xs={4}>
                    <StyledSidebar>
                        <NavLink
                            style={({isActive}) => isActive ? selectedStyle : {}}
                            to={`/author/courses/${authorCourseId}/general`}
                        >
                            Курс
                        </NavLink>
                        <NavLink
                            style={({isActive}) => isActive ? selectedStyle : {}}
                            to={`/author/courses/${authorCourseId}/contact`}
                        >
                            Общение
                        </NavLink>
                        <NavLink
                            style={({isActive}) => isActive ? selectedStyle : {}}
                            to={`/author/courses/${authorCourseId}/analytics`}
                        >
                            Аналитика
                        </NavLink>
                    </StyledSidebar>
                </Grid>
                <Grid xs={20}>
                    <StyledContent>
                        <Outlet/>
                    </StyledContent>
                </Grid>
            </Grid.Container>
        </>
    );
};

const StyledInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`

const StyledSidebar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    display: block;
    padding: 8px 0;
    font-size: 14px;
    color: #666;
    transition: color .2s ease;
  }
`
const StyledContent = styled.div`
  width: 100%;
`

const selectedStyle = {
    color: "#000",
    fontWeight: 700
}

export default AuthorCourse;