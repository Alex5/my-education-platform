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
                            <Card hoverable width="100%" onClick={() => navigate('/author/js-junior')}>
                                <h4>JavaScript для начинающих</h4>
                                <Divider/>
                                <Description title="Кол-во прохождений" content="278"/>
                                <Spacer/>
                                <Description title="Кол-во отзывов" content="214"/>
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
`

export default AuthorHome;