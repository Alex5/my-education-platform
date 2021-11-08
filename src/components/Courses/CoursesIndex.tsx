import React from 'react';
import {Avatar, Card, Description, Divider, Grid, Rating, Spacer, Tag, Text, User} from "@geist-ui/react";
import {useNavigate} from "react-router-dom";
import {Github} from "@geist-ui/react-icons";
import styled from "styled-components";

const CoursesIndex = () => {
    const navigate = useNavigate()
    return (
        <>
            <Text h3>2 курса по программированию</Text>
            <Grid.Container gap={2} justify="flex-start">
                <Grid xs={24} md={8}>
                    <Card onClick={() => navigate('/marketing/1')} width="100%" hoverable>
                        <StyledCourseCardHeader>
                            <div>
                                <Text h3 mb={0} mt={0}>JS Junior</Text>
                                <Avatar
                                    ml={0}
                                    mr={0}
                                    scale={1}
                                    src="https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_960_720.png"/>
                            </div>
                            <Text type="secondary" small>Начальные знания по JavaScript</Text>
                        </StyledCourseCardHeader>
                        <Divider/>
                        <Description title="Автор" content={
                            <User src="https://unix.bio/assets/avatar.png" name="Заболоцкий Роман">
                                Senior JavaScript engineer
                            </User>
                        }/>
                        <Spacer/>
                        <Description title="О курсе" content={
                            <Text>
                                Вы научитесь создавать сайты и приложения, проектировать
                                интерфейсы и работать со сложными инструментами frontend-разработчика.
                            </Text>
                        }/>
                        <Spacer/>
                        <Description title="Доступные услуги" content={
                            <>
                                <Spacer height={"0.5"}/>
                                <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
                                    <Tag scale={0.5} type="lite">Менторство</Tag>
                                    <Tag scale={0.5} type="lite">Домашнее задание</Tag>
                                    <Tag scale={0.5} type="lite">Расписание</Tag>
                                </div>
                            </>
                        }/>
                        <Spacer/>
                        <Description title="Рейтинг" content={
                            <Rating scale={0.5} icon={<Github/>} locked={true} value={4} count={5}/>
                        }/>
                    </Card>
                </Grid>
            </Grid.Container>
        </>
    );
};

const StyledCourseCardHeader = styled.div`
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

export default CoursesIndex;