import {FC, ReactNode, Suspense, useEffect, useState} from 'react';
import {ICourse} from "../../redux/slices/coursesSlice/types";
import {PublicRequests} from "../../api/publicRequests";
import styled from "styled-components";
import {Grid, Spacer} from "@geist-ui/core";
import {useNavigate} from "react-router-dom";
import AuthorAccountPreview from '../Author/components/AuthorAccountPreview';
import SnipText from '../shared/SnipText';
import ContentLoader, {IContentLoaderProps} from "react-content-loader"
import AppLoader from "../shared/AppLoader";

interface NewCoursesProps {
    courseLimit: number
}

const NewCourses: FC<NewCoursesProps> = ({courseLimit}) => {
    const [newCourses, setNewCourses] = useState<ICourse[]>([]);
    const [newCoursesLoad, setNewCoursesLoad] = useState<boolean>(false);

    const navigate = useNavigate();

    const NewCourseLoader = (props: JSX.IntrinsicAttributes & IContentLoaderProps & { children?: ReactNode; }) => (
        <ContentLoader
            speed={2}
            width={293}
            height={128}
            viewBox="0 0 293 128"
            backgroundColor="#ededed"
            foregroundColor="#ffffff"
            {...props}
        >
            <circle cx="49" cy="83" r="42"/>
            <rect x="101" y="46" rx="0" ry="0" width="184" height="20"/>
            <circle cx="121" cy="105" r="20"/>
            <rect x="155" y="86" rx="0" ry="0" width="130" height="15"/>
            <rect x="156" y="110" rx="0" ry="0" width="130" height="13"/>
        </ContentLoader>
    )

    useEffect(() => {
        (async () => {
            setNewCoursesLoad(true);
            const newCourses = await PublicRequests.getNewCourses(courseLimit);
            setNewCourses(newCourses);
            setNewCoursesLoad(false);
        })()
    }, [courseLimit])

    return (
        <Grid.Container gap={1}>
            {newCoursesLoad
                ? <>
                    <NewCourseLoader/>
                    <NewCourseLoader/>
                    <NewCourseLoader/>
                </>
                : newCourses && newCourses.map(course => (
                <Grid md={8} xs={24} key={course.courseId}>
                    <StyledNewCourse onClick={() => navigate(`${course.direction}/${course.courseId}`)}>
                        {course.cover.length > 0 && (
                            <div>
                                <StyledNewCourseImage>
                                    <img src={course.cover} alt={`Обложка курса ${course.name}`}/>
                                </StyledNewCourseImage>
                                <Spacer/>
                            </div>
                        )}
                        <Spacer/>
                        <StyledNewCourseBody>
                            <div>
                                <SnipText length={15} h5 text={course.name}/>
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
            ))
            }
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