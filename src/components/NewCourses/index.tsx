import {FC, Suspense} from 'react';
import styled from "styled-components";
import {Grid, Spacer} from "@geist-ui/core";
import {useNavigate} from "react-router-dom";
import AuthorAccountPreview from '../Author/components/AuthorAccountPreview';
import SnipText from '../shared/SnipText';
import {useRecoilValue} from "recoil";
import {newCoursesQuery} from "./selectors";
import NewCoursesLoader from "./components/NewCoursesLoader";

interface NewCoursesProps {
    courseLimit: number
}

const NewCourses: FC<NewCoursesProps> = ({courseLimit}) => {
    const NewCoursesComponent = () => {
        const newCourses = useRecoilValue(newCoursesQuery(courseLimit));

        const navigate = useNavigate();

        return (
            <Grid.Container gap={1}>
                {newCourses?.map(course => (
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
                ))}
            </Grid.Container>
        )
    }

    return (
        <Suspense fallback={<NewCoursesLoader/>} children={<NewCoursesComponent/>}/>
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