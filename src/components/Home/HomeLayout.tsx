import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import {Grid} from "@geist-ui/react";
import styled from "styled-components";

const HomeLayout = () => {
    return (
        <Grid.Container gap={2}>
            <Grid xs={6}>
                <StyledSidebar>
                    <NavLink end to={"/"} className={({isActive}) => isActive ? "active" : ''}
                             children={"Курсы"}/>

                    <NavLink end to={"/videos"} className={({isActive}) => isActive ? "active" : ''}
                             children={"Видео"}/>
                </StyledSidebar>
            </Grid>
            <Grid direction={"column"} xs={18}>
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
    transition: ease-in-out 0.1s;
  }

  .active {
    font-weight: 500;
    color: #0070F3;
    background-color: #f7f7f7;
  }
`

export default HomeLayout;