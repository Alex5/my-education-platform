import {Image, Spacer, Text, Card, Grid, Description, Loading, Table, Badge, Button} from '@geist-ui/react';
import React, {useEffect, useState} from 'react';
import {AuthorRequests} from "../../../../api/authorRequests";
import axios from "axios";
import {PublicRequests} from "../../../../api/publicRequests";
import styled from "styled-components";

const AuthorHome = () => {

    return (
        <>
            <Text h3 b children={"Дашборд"}/>
            <Spacer/>
            <Grid.Container gap={2} justify="flex-start" height="100px">
                <Grid xs={6}>
                    <Card width="100%">
                        <Button children={"создать курс"}/>
                    </Card>
                </Grid>
            </Grid.Container>
        </>
    );
};

const StyledCourseView = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export default AuthorHome;