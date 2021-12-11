import {Image, Spacer, Text, Card, Grid, Description, Loading, Table, Badge} from '@geist-ui/react';
import React, {useEffect, useState} from 'react';
import {AuthorRequests} from "../../../../api/authorRequests";
import axios from "axios";
import {PublicRequests} from "../../../../api/publicRequests";
import styled from "styled-components";

const AuthorHome = () => {
    const [coursesViews, setCoursesViews] = useState([])
    const [courseNames, setCourseNames] = useState<any>({});
    const [load, setLoad] = useState(false);

    const getCoursesViews = async () => {
        setLoad(true)
        const courses = await AuthorRequests.getCourses()
        let promises: any[] = [];
        courses.forEach(course => {
            promises.push(axios.post('https://functions.yandexcloud.net/d4evjuqoeg5e1v2uar3r?integration=raw', JSON.stringify({
                courseId: course.courseId || ''
            })));
        })
        Promise.all(promises)
            .then((data) => {
                const coursesViews: any = data.map(item => item.data[0])
                setCoursesViews(coursesViews);
                setLoad(false)
            })
            .catch((error) => {
                setLoad(false)
            });
    }

    useEffect(() => {
        PublicRequests.getCourseNamesMap().then(courseNames => {
            setCourseNames(courseNames);
        })
        getCoursesViews()
    }, [])

    // @ts-ignore
    return (
        <>
            <Text h3 b children={"Дашборд"}/>
            <Spacer/>
            <Grid.Container gap={2} justify="flex-start" height="100px">
                <Grid xs={6}>
                    <Card width="100%">
                        <Text type={"secondary"} small>Просмотры курсов</Text>
                        <Spacer/>
                        {load
                            ? <Loading/>
                            : coursesViews.length === 0
                                ? <span>Нет просмотров</span>
                                : coursesViews.map((course: any) =>
                                    <StyledCourseView>
                                        {course && courseNames[course?.string_value]}
                                        {course && <Badge>{course.count}</Badge>}
                                    </StyledCourseView>
                                )
                        }
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