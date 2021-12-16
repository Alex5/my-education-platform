import React, {FC, memo, useEffect, useState} from 'react';
import {Card, Grid, Loading, Page, Spacer, Tag, Text} from "@geist-ui/react";
import {Code} from "@geist-ui/react-icons";
import styled from "styled-components";
import {PublicRequests} from "../../api/publicRequests";
import {useNavigate} from "react-router-dom";

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

    const tags = ["react", "redux-toolkit", "react router 6"]

    return (
        <>
            <Text h4>Теги</Text>
            <Grid.Container gap={1}>
                {tags.map(tag => (
                    <Grid>
                        <Tag onClick={() => navigate(`tags/${tag}`)} style={{cursor: 'pointer'}} scale={1.5}
                             type="lite">{tag}</Tag>
                    </Grid>
                ))}
            </Grid.Container>
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