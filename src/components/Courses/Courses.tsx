import React, {useEffect} from 'react';
import {Card, Description, Divider, Grid, Spacer, Text} from "@geist-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getCourses, setCourses, setSelectedCourse} from "../../redux/slices/coursesSlice";
import {PublicRequests} from "../../api/publicRequests";
import {ICourse} from "../../redux/types";

const Courses = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const courses = useSelector(getCourses);
    const {courseDirection} = useParams<"courseDirection">();

    const handleSelectCourse = (course: ICourse) => {
        dispatch(setSelectedCourse(course));
        navigate(`/${course.direction}/${course.courseId}`)
    }

    useEffect(() => {
        (async () => {
            const courses = await PublicRequests.getCourses(courseDirection || '');
            dispatch(setCourses(courses));
        })()
    }, [])

    return (
        <>
            <Text h3>{courses.length} курса по программированию</Text>
            <Spacer/>
            <Grid.Container gap={2} justify="flex-start">
                {courses.map(course =>
                    <Grid style={{cursor: 'pointer'}} xs={24} md={8}>
                        <Card
                            key={course.courseId}
                            onClick={() => handleSelectCourse(course)}
                            width="100%"
                            hoverable
                        >
                            <StyledCourseCardHeader>
                                <Text mt={0} mb={0} h3>{course.name}</Text>
                            </StyledCourseCardHeader>
                            <Spacer/>
                            <Divider/>
                            <Spacer/>
                            <Description title="Автор" content={
                                <>
                                    <Text b>{course.author?.name}</Text>
                                    <Spacer h={0.2}/>
                                    <Text small>{course.author?.appointment}</Text>
                                </>
                            }/>
                            {/*<Spacer/>*/}
                            {/*<Description title="Доступные услуги" content={*/}
                            {/*    <>*/}
                            {/*        <Spacer height={"0.5"}/>*/}
                            {/*        <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>*/}
                            {/*            <Tag scale={0.5} type="lite">Менторство</Tag>*/}
                            {/*            <Tag scale={0.5} type="lite">Домашнее задание</Tag>*/}
                            {/*            <Tag scale={0.5} type="lite">Расписание</Tag>*/}
                            {/*        </div>*/}
                            {/*    </>*/}
                            {/*}/>*/}
                            {/*<Spacer/>*/}
                            {/*<Description title="Рейтинг" content={*/}
                            {/*    <Rating scale={0.5} icon={<Github/>} locked={true} value={4} count={5}/>*/}
                            {/*}/>*/}
                        </Card>
                    </Grid>
                )}
            </Grid.Container>
        </>
    );
};

const StyledCourseCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`


export default Courses;