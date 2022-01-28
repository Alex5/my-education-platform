import React, {useEffect, useState} from 'react';
import {Card, Description, Divider, Grid, Image, Loading, Spacer, Text} from "@geist-ui/core";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getCourses, setCourses, setSelectedCourse} from "../../redux/slices/coursesSlice/coursesSlice";
import {PublicRequests} from "../../api/publicRequests";
import TextSnippet from "../TextSnippet";
import {ICourse} from "../../redux/slices/coursesSlice/types";

const Courses = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const courses = useSelector(getCourses);
    const {courseDirection} = useParams<"courseDirection">();
    const [coursesLoad, setCoursesLoad] = useState<boolean>(false);

    const handleSelectCourse = (course: ICourse) => {
        dispatch(setSelectedCourse(course));
        navigate(`/${course.direction}/${course.courseId}`)
    }

    useEffect(() => {
        (async () => {
            setCoursesLoad(true);
            const courses = await PublicRequests.getCourses(courseDirection || '');
            dispatch(setCourses(courses));
            setCoursesLoad(false);
        })()
    }, [courseDirection])

    return (
        <>
            <Text h3>{courses.length} курса по {courseDirection}</Text>
            <Spacer/>
            <Grid.Container gap={2} justify="flex-start">
                {coursesLoad
                    ? (
                        <Loading/>
                    )
                    : courses && courses.map(course =>
                    <Grid key={course.courseId} style={{cursor: 'pointer'}} xs={24} md={8}>
                        <Card
                            key={course.courseId}
                            onClick={() => handleSelectCourse(course)}
                            width="100%"
                            hoverable
                        >
                            <Image style={{objectFit: 'cover'}} src={course.cover}
                                   height="200px" width="400px" draggable={false}/>
                            <StyledCourseCardHeader>
                                <TextSnippet text={course.name}/>
                            </StyledCourseCardHeader>
                            <Divider/>
                            <Spacer/>
                            <Description title="Автор" content={
                                <>
                                    <Text b>{course.author?.name}</Text>
                                    <Spacer h={0.2}/>
                                    <Text small>{course.author?.appointment}</Text>
                                </>
                            }/>
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