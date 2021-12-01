import React from 'react';
import {NavLink, Outlet, useLocation} from 'react-router-dom';
import {Grid} from "@geist-ui/react";
import styled from "styled-components";

const AccountLayout = () => {
    const location = useLocation();

    return (
        <Grid.Container gap={2} justify="center" height="100px">
            <Grid xs={24} md={4}>
                <StyledSidebar>
                    <NavLink
                        style={
                            location.pathname === '/account'
                                ? {color: 'black', fontWeight: 500}
                                : {color: 'gray'}
                        }
                        to={`/account`}>
                        Основные
                    </NavLink>
                </StyledSidebar>
            </Grid>
            <Grid xs={24} md={20}>
                <Outlet/>
            </Grid>
        </Grid.Container>
    );
};

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

export default AccountLayout;