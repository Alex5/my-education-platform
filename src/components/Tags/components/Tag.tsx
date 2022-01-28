import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {PublicRequests} from "../../../api/publicRequests";
import {useDispatch, useSelector} from "react-redux";
import {getCourses, setCourses} from "../../../redux/slices/coursesSlice/coursesSlice";
import {Card, Text, Image, Spacer, Grid, Loading} from "@geist-ui/core";

const Tag = () => {
    const {tagName} = useParams<"tagName">()
    const courses = useSelector(getCourses);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tagLoad, setTagLoad] = useState(false);

    useEffect(() => {
        (async () => {
            setTagLoad(true)
            const coursesByTag = await PublicRequests.getCoursesByTag(tagName || '');
            dispatch(setCourses(coursesByTag));
            setTagLoad(false)
        })()
    }, [tagName])

    return (
        <div>
            <Text h1>{tagName || ''}</Text>
            <Spacer/>
            {courses.length > 0
                ? <Grid.Container gap={2}>
                    {tagLoad
                        ? <Loading/>
                        : courses.map(course => (
                            <Grid xs={24} md={8}>
                                <Card onClick={() => navigate(`/${course.direction}/${course.courseId}`)}
                                      style={{cursor: 'pointer'}}
                                      >
                                    <Image style={{objectFit: 'cover'}} src={course.cover}
                                           height="200px" width="100%" draggable={false}/>
                                    <Text h4 mb={0}>{course.name.slice(0, 30)}...</Text>
                                    <div style={{height: "50px"}}>
                                        <Text type="secondary" small>{course.description.slice(0, 100)}...</Text>
                                    </div>
                                </Card>
                            </Grid>
                        ))}
                </Grid.Container>
                : <span>Нет курсов по выбранному тегу</span>
            }
        </div>
    );
};

export default Tag;