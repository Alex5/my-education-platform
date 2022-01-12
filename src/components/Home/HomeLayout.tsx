import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import {Card, Grid, Page, Spacer, Text} from "@geist-ui/react";
import NewCourses from "../NewCourses";
import Tags from "../Tags";
import {Code} from "@geist-ui/react-icons";
import {StyledCardContent} from "./index";
import styled from "styled-components";

const HomeLayout = () => {
    return (
        <Grid.Container gap={2}>
            <Grid xs={4}>
                <StyledSidebar>
                    <NavLink end to={"/"} className={({isActive}) => isActive ? "active" : ''}
                             children={"Курсы"}/>

                    <NavLink end to={"/shorts"} className={({isActive}) => isActive ? "active" : ''}
                             children={"Шортс"}/>
                </StyledSidebar>
            </Grid>
            <Grid direction={"column"} xs={20}>
                <Outlet/>
            </Grid>
        </Grid.Container>

    );
};

const StyledSidebar = styled.nav`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
  
  a {

    text-decoration: none;
    color: black;
    padding: 10px;
    border-radius: 10px;
    transition: ease-in-out 0.3s;
  }

  .active {
    font-weight: 500;
    color: #0070F3;
    background-color: #FAFAFA;
  }
`

export default HomeLayout;