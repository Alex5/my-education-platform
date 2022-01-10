import React, {FC, memo, useEffect, useState} from 'react';
import {Button, Card, Grid, Link, Loading, Page, Spacer, Tag, Text} from "@geist-ui/react";
import {Code} from "@geist-ui/react-icons";
import styled from "styled-components";
import {PublicRequests} from "../../api/publicRequests";
import {useNavigate} from "react-router-dom";
import Tags from "../Tags";
import NewCourses from "../NewCourses";

const Home: FC = () => {
    const navigate = useNavigate();
    const CourseSize = memo(({direction}: any) => {
        const [size, setSize] = useState(0);
        const [load, setLoad] = useState(false);

        useEffect(() => {
            (async () => {
                setLoad(true)
                const number = await PublicRequests.getCoursesSize(direction);
                setLoad(false);
                setSize(number);
            })()
        }, [direction])

        return load ? <Loading/> : <Text>{size} курса</Text>
    })

    return (
        <>
            <Text h4>Новые курсы</Text>
            <NewCourses/>
            <Text h4>Теги</Text>
            <Tags length={8}/>
            <Page.Content>
                <Text h1>Направления</Text>
                <Text>Все наши курсы разбиты по направлениям, выберите какое вам нравится.</Text>
                <Spacer/>
                <Grid.Container gap={2}>
                    <Grid xs={24} md={8}>
                        <Card style={{cursor: 'pointer'}} onClick={() => navigate('/programming')} width="100%"
                              hoverable>
                            <StyledCardContent>
                                <Code color={"#1482ff"}/>
                                <Text h4 mb={0} mt={0}> Программирование</Text>
                            </StyledCardContent>
                            <Card.Footer>
                                <CourseSize direction={"programming"}/>
                            </Card.Footer>
                        </Card>
                    </Grid>
                </Grid.Container>
            </Page.Content>
        </>
    );
};

export const StyledCardContent = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`

export default Home;