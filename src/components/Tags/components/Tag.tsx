import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {PublicRequests} from "../../../api/publicRequests";
import {useDispatch, useSelector} from "react-redux";
import {getCourses, setCourses} from "../../../redux/slices/coursesSlice/coursesSlice";
import {Card, Text, Image, Spacer, Grid, Loading} from "@geist-ui/react";

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
            <Text h2>{tagName || ''}</Text>
            <Spacer/>
            {courses.length > 0
                ? <Grid.Container gap={1}>
                    {tagLoad
                        ? <Loading/>
                        : courses.map(course => (
                            <Grid>
                                <Card onClick={() => navigate(`/${course.direction}/${course.courseId}`)}
                                      style={{cursor: 'pointer'}}
                                      width="400px">
                                    <Image style={{objectFit: 'cover'}} src={course.cover}
                                           height="200px" width="400px" draggable={false}/>
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