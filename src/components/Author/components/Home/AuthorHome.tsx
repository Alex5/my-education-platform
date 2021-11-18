import {Button, Card, Description, Divider, Grid, Input, Spacer, Text, User} from '@geist-ui/react';
import React, {useContext, useEffect} from 'react';
import {Search, UserPlus} from "@geist-ui/react-icons";
import styled from "styled-components";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../../../../index";

const AuthorHome = () => {
    return (
            <>
                <Spacer/>
                <Grid.Container gap={2} height="100px">
                    <p>Какие-то карточки с показателями</p>
                </Grid.Container>
            </>
    );
};

export default AuthorHome;