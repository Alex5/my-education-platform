import React from 'react';
import {Card, Description, Grid, Image, Rating, Spacer, Tag, Text, User} from "@geist-ui/react";
import {Link, useLocation} from "react-router-dom";
import {Github} from "@geist-ui/react-icons";

const CoursesIndex = () => {
    const location = useLocation()

    return (
        <>
            <Text h3>2 курса по программированию</Text>
            <Grid.Container gap={2} justify="flex-start">
                <Grid xs={6}>
                    <Link to={`${location.pathname}/1`}>
                        <Card shadow>
                            <Image
                                style={{objectFit: 'cover'}}
                                src="https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_960_720.png"
                                draggable={false}
                            />
                            <Text h4 mt={0} mb={0}>JS Junior</Text>
                            <Text mt={0} type="secondary" small>8 лекций до 20 мин.</Text>
                            <Spacer/>
                            <Description title="Автор" content={
                                <User src="https://unix.bio/assets/avatar.png" name="Заболоцкий Роман">
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
                                <Rating scale={0.5} icon={<Github />} locked={true} value={4} count={5} />
                            }/>
                        </Card>
                    </Link>
                </Grid>
                <Grid xs={6} >
                    <Link to={`${location.pathname}/2`}>
                        <Card shadow>
                            <Image
                                style={{objectFit: 'cover'}}
                                src="https://chel.ligarobotov.ru/wp-content/uploads/sites/9/2020/07/py.png"
                                draggable={false}
                            />
                            <Text h4 mt={0} mb={0}>Python Junior</Text>
                            <Text type="secondary" small>12 лекций до 20 мин.</Text>
                            <Spacer/>
                            <Description title="Автор" content={
                                <User src="https://unix.bio/assets/avatar.png" name="Заболоцкий Роман">
                                    Senior JavaScript engineer
                                </User>
                            }/>
                            <Spacer/>
                            <Description title="Доступные услуги" content={
                                <>
                                    <Spacer height={"0.5"}/>
                                    <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
                                        <Tag scale={0.5} type="lite">Нет</Tag>
                                    </div>
                                </>
                            }/>
                            <Spacer/>
                            <Description title="Рейтинг" content={
                                <Rating scale={0.5} icon={<Github />} locked={true} value={3} count={5} />
                            }/>
                        </Card>
                    </Link>
                </Grid>
            </Grid.Container>
        </>
    );
};

export default CoursesIndex;