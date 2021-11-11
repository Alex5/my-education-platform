import React from 'react';
import {useParams} from "react-router-dom";
import {Avatar, Button, Card, Collapse, Description, Divider, Fieldset, Grid, Note, Spacer, Text, User} from "@geist-ui/react";
import {Info} from "@geist-ui/react-icons";

const Course = () => {
    let {courseId} = useParams<"courseId">();

    return (
        <Grid.Container gap={2} justify="center" height="100px">
            <Grid direction="column" xs={18}>
                <Text h2 mb={0} mt={0}>
                    JavaScript для начинающих
                </Text>
                {/*<Text mt={0} type="secondary">В данном курсе рассмотрены основы программирования на JavaScript а также*/}
                {/*    некоторые инструменты и*/}
                {/*    модели данных, необходимые для практического использования JavaScript.</Text>*/}
                <Spacer h={3}/>
                <Fieldset>
                    <Fieldset.Title>О курсе</Fieldset.Title>
                    <Fieldset.Subtitle>Цель данного курса - познакомить слушателей с основами программирования на
                        JavaScript
                        и подготовить их
                        для практического применения данного инструмента.
                    </Fieldset.Subtitle>
                </Fieldset>
                <Spacer/>
                <Fieldset>
                    <Fieldset.Title>Для кого этот курс</Fieldset.Title>
                    <Fieldset.Subtitle> Фактически особых требований нет. Достаточно желания, некоторой внимательности и
                        общей компьютерной
                        грамотности, например в рамках школьного курса информатики.</Fieldset.Subtitle>
                </Fieldset>
                <Spacer/>
                <Fieldset>
                    <Fieldset.Title>Автор курса</Fieldset.Title>
                    <Fieldset.Subtitle>
                        <User name={"Roman"}/>
                    </Fieldset.Subtitle>
                </Fieldset>
                <Spacer/>
                <Fieldset>
                    <Fieldset.Title children="Программа курса"/>
                    <Fieldset.Subtitle>
                        <Collapse.Group>
                            <Collapse title="Введение в JavaScript" initialVisible>
                                <ul>
                                    <li>В двух словах о JavaScript.</li>
                                    <li>Внедрение кода, структура программы, комментарии.</li>
                                    <li>Переменные, типы данных.</li>
                                    <li>Простейшие операции.</li>
                                    <li>Ветвление.</li>
                                    <li>Циклы.</li>
                                </ul>
                            </Collapse>
                            <Collapse title="Стандартные объекты">
                                <ul>
                                    <li>Функции</li>
                                </ul>
                            </Collapse>
                        </Collapse.Group>
                    </Fieldset.Subtitle>
                </Fieldset>
                <Fieldset>
                    <Fieldset.Title>Отзывы</Fieldset.Title>
                    <Fieldset.Subtitle>
                        <User name={"Roman"}/>
                    </Fieldset.Subtitle>
                </Fieldset>
                <Spacer/>
            </Grid>
            <Grid xs={6}>
                <Button type="secondary" children="Начать"/>
            </Grid>
        </Grid.Container>
    );
};

export default Course;