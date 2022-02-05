import React, { FC, useEffect, useState } from 'react';
import { ICourse } from "../../redux/slices/coursesSlice/types";
import { PublicRequests } from "../../api/publicRequests";
import styled from "styled-components";
import { Description, Grid, Image, Link, Spacer, Text } from "@geist-ui/core";
import { snipText } from "../../services/helpers";
import { useNavigate } from "react-router-dom";
import AuthorAccountPreview from '../Author/components/AuthorAccountPreview';
import SnipText from '../shared/SnipText';

interface NewCoursesProps {
    courseLimit: number
}

const NewCourses: FC<NewCoursesProps> = ({ courseLimit }) => {
    const [newCourses, setNewCourses] = useState<ICourse[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const newCourses = await PublicRequests.getNewCourses(courseLimit);
            setNewCourses(newCourses);
        })()
    }, [courseLimit])

    return (
        <Grid.Container gap={1}>
            {newCourses.map(course => (
                <Grid md={8} xs={24} key={course.courseId}>
                    <StyledNewCourse onClick={() => navigate(`${course.direction}/${course.courseId}`)}>
                        {course.cover.length > 0 && (
                            <div>
                                <StyledNewCourseImage>
                                    <img src={course.cover} alt={`Обложка курса ${course.name}`} />
                                </StyledNewCourseImage>
                                <Spacer />
                            </div>
                        )}
                        <Spacer/>
                        <StyledNewCourseBody>
                            <div>
                                <SnipText length={15} h5 text={course.name} />
                            </div>
                            <div>
                                <AuthorAccountPreview
                                    snipLength={15}
                                    ownerId={course.ownerId}
                                    accountId={course.accountId}
                                    disableLink
                                />
                            </div>
                        </StyledNewCourseBody>
                    </StyledNewCourse>
                </Grid>
            ))}
        </Grid.Container>
    );
};

const StyledNewCourse = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  transition: ease-in-out 0.3s;
  width: 100%;

  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }
`

const StyledNewCourseImage = styled.div`
    height: 100%;
    width: 100px;

  img {
    object-fit: cover;
    height: 100%;
    width: 100px;
    border-radius: 10px;
  }
`

const StyledNewCourseBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export default NewCourses;