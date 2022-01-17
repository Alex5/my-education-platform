import React, {FC, useEffect, useState} from 'react';
import {ICourse} from "../../redux/slices/coursesSlice/types";
import {PublicRequests} from "../../api/publicRequests";
import styled from "styled-components";
import {Card, Description, Grid, Link, Spacer} from "@geist-ui/react";
import {Youtube} from "@geist-ui/react-icons";
import {snipText} from "../../services/helpers";
import {useNavigate} from "react-router-dom";

interface NewCoursesProps {
    courseLimit: number
}

const NewCourses: FC<NewCoursesProps> = ({courseLimit}) => {
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
            <StyledNewCourseContainer>
                {newCourses.map(course => (
                    <Grid xs={8} key={course.courseId}>
                        <StyledNewCourse onClick={() => navigate(`${course.direction}/${course.courseId}`)}>
                            {course.cover.length > 0 && (
                                <>
                                    <StyledNewCourseImage>
                                        <img src={course.cover} alt={`Обложка курса ${course.name}`}/>
                                    </StyledNewCourseImage>
                                    <Spacer/>
                                </>
                            )}
                            <div>
                                <Description title="Название" content={snipText(course.name, 20)}/>
                                <Spacer/>
                                <Description title="Автор" content={snipText(course.author.name || '', 20)}/>
                            </div>
                        </StyledNewCourse>
                    </Grid>
                ))}
            </StyledNewCourseContainer>
        </Grid.Container>
    );
};

const StyledNewCourseContainer = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
`

const StyledNewCourse = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  overflow: auto;
  transition: ease-in-out 0.3s;

  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }
`

const StyledNewCourseImage = styled.div`
  img {
    object-fit: cover;
    height: 100%;
    width: 100px;
    border-radius: 10px;
  }
`

export default NewCourses;