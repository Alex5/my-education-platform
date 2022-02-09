import React, { useEffect, useState } from 'react';
import { Card, Description, Divider, Grid, Image, Loading, Spacer, Text } from "@geist-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, setCourses, setSelectedCourse } from "../../redux/slices/coursesSlice/coursesSlice";
import { PublicRequests } from "../../api/publicRequests";
import TextSnippet from "../TextSnippet";
import { ICourse } from "../../redux/slices/coursesSlice/types";
import AuthorAccountPreview from '../Author/components/AuthorAccountPreview';
import { courseDeclinations } from '../../services/helpers';
import { courseDirectionsNames } from '../../services/maps';
import PageLayout from '../Layout/PageLayout';

const Courses = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const courses = useSelector(getCourses);
    const { courseDirection } = useParams<"courseDirection">();
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

    const direction = courseDirectionsNames[courseDirection || ''];
    const declination = courseDeclinations(courses.length);

    return (
        <PageLayout title={`${courses.length} ${declination} по ${direction}`}>
            <Grid.Container gap={2} justify="flex-start">
                {coursesLoad
                    ? (
                        <Loading />
                    )
                    : courses && courses.map(course =>
                        <Grid key={course.courseId} style={{ cursor: 'pointer' }} xs={24} md={8}>
                            <Card
                                key={course.courseId}
                                onClick={() => handleSelectCourse(course)}
                                width="100%"
                                hoverable
                            >
                                <Image style={{ objectFit: 'cover' }} src={course.cover}
                                    height="200px" width="400px" draggable={false} />
                                <StyledCourseCardHeader>
                                    <TextSnippet text={course.name} />
                                </StyledCourseCardHeader>
                                <Divider />
                                <Spacer />
                                <Description title="Автор" content={
                                    <AuthorAccountPreview ownerId={course.ownerId} accountId={course.accountId} />
                                } />
                            </Card>
                        </Grid>
                    )}
            </Grid.Container>
        </PageLayout>
    );
};

const StyledCourseCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`


export default Courses;