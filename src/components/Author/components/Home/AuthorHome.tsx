import {Image, Spacer, Text, Card, Grid, Description} from '@geist-ui/react';
import React, {useEffect, useState} from 'react';
import {AuthorRequests} from "../../../../api/authorRequests";
import axios from "axios";
import {PublicRequests} from "../../../../api/publicRequests";

const AuthorHome = () => {
    const [coursesViews, setCoursesViews] = useState([])
    const [courseNames, setCourseNames] = useState<any>({});

    const getCoursesViews = async () => {
        const courses = await AuthorRequests.getCourses()
        let promises: any[] = [];
        courses.forEach(course => {
            promises.push(axios.post('https://functions.yandexcloud.net/d4evjuqoeg5e1v2uar3r?integration=raw',JSON.stringify({
                courseId: course.courseId || ''
            })));
        })
        Promise.all(promises)
            .then((data) => {
                const coursesViews: any = data.map(item => item.data.body[0])
                debugger
                setCoursesViews(coursesViews);
            })
            .catch((error) => {
                console.log("Error" + error);
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
                <Grid xs={8}>
                    <Card width="100%">
                        <Text small>Просмотры курсов</Text>
                        {coursesViews && coursesViews.map((course: any) =>
                            <div>
                                {course && courseNames[course?.string_value]}
                                <Text h1 mt={0} mb={0}>{course && course.count}</Text>
                            </div>
                        )}

                    </Card>
                </Grid>
            </Grid.Container>
        </>
    );
};

export default AuthorHome;