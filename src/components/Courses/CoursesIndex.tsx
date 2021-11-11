import React from 'react';
import {Avatar, Card, Description, Divider, Grid, Image, Rating, Spacer, Tag, Text, User} from "@geist-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {Github} from "@geist-ui/react-icons";
import styled from "styled-components";

const CoursesIndex = () => {
    const navigate = useNavigate()
    const {course} = useParams<"course">();
    return (
        <>
            <Text h3>2 курса по программированию</Text>
            <Grid.Container gap={2} justify="flex-start">
                <Grid xs={24} md={8}>
                    <Card onClick={() => navigate(`/${course}/1`)} width="100%" hoverable>
                        <StyledCourseCardHeader>
                            <div>
                                <Text mt={0} mb={0} h5>JavaScript для начинающих</Text>
                                <Text small type="secondary">Базовый курс</Text>
                            </div>

                            <Image
                                src="https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_960_720.png"
                                alt="javascript"
                                mr={0}
                                width={'50px'}
                            />

                        </StyledCourseCardHeader>
                        <Spacer/>
                        <Divider/>
                        <Spacer/>
                        <Description title="Автор" content={
                            <User src="" name="Заболоцкий Роман">
                                Senior JavaScript engineer
                            </User>
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
  display: flex;
  justify-content: space-between;
`


export default CoursesIndex;