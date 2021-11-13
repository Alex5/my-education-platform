import {Button, Card, Description, Divider, Grid, Input, Spacer, Text, User} from '@geist-ui/react';
import React, {useContext} from 'react';
import {Search, UserPlus} from "@geist-ui/react-icons";
import styled from "styled-components";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../../../../index";

const AuthorHome = () => {
    const navigate = useNavigate();
    const courseExist = true;

    return (
            <>
                <Spacer/>
                <Grid.Container gap={2} height="100px">
                    <p>Какие-то карточки с показателями</p>
                </Grid.Container>
            </>
    );
};

const StyledHomeHeader = styled.div`
  display: flex;
`

export default AuthorHome;