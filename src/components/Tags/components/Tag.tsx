import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {PublicRequests} from "../../../api/publicRequests";
import {useDispatch, useSelector} from "react-redux";
import {getCourses, setCourses} from "../../../redux/slices/coursesSlice/coursesSlice";
import {Card, Text, Image, Link, Spacer, Grid} from "@geist-ui/react";

const Tag = () => {
    const {tagName} = useParams<"tagName">()
    const courses = useSelector(getCourses);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const coursesByTag = await PublicRequests.getCoursesByTag(tagName || '');
            dispatch(setCourses(coursesByTag));
        })()
    }, [tagName])

    return (
        <div>
            <Text h2>{tagName || ''}</Text>
            <Spacer/>
            <Grid.Container gap={1}>
                {courses && courses.map(course => (
                    <Grid>
                        <Card onClick={() => navigate(`/programming/${course.courseId}`)} style={{cursor: 'pointer'}} width="400px">
                            <Image style={{objectFit: 'cover'}} src={course.cover}
                                   height="200px" width="400px" draggable={false}/>
                            <Text h4 mb={0}>{course.name}</Text>
                            <Text type="secondary" small>{course.description}</Text>
                        </Card>
                    </Grid>
                ))}
            </Grid.Container>

        </div>

    );
};

export default Tag;