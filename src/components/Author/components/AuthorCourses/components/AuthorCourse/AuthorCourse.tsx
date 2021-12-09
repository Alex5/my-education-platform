import React, {useEffect, useState} from 'react';
import {NavLink, Outlet, useParams, useNavigate, useLocation} from "react-router-dom";
import {Badge, Button, Divider, Grid, Spacer, Tag, Text} from "@geist-ui/react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getCourses, getSelectedCourse, setSelectedCourse} from "../../../../../../redux/slices/coursesSlice";
import {ArrowLeft} from "@geist-ui/react-icons";
import {AuthorRequests} from "../../../../../../api/authorRequests";

const AuthorCourse = () => {
    const [load, setLoading] = useState(false);

    const {authorCourseId} = useParams<"authorCourseId">();
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    const selectedCourse = useSelector(getSelectedCourse);

    const handlePublishCourse = async (publish: boolean) => {
        setLoading(true);
        const updatedCourse = await AuthorRequests.updateCourse(selectedCourse.courseId, 'published', publish);
        setLoading(false)
        dispatch(setSelectedCourse(updatedCourse));
    }

    useEffect(() => {
        location.pathname === `/author/courses/${authorCourseId}` && navigate(`/author/courses/${authorCourseId}/general`)
    }, [authorCourseId, location.pathname, navigate])

    return (
        <>
            <StyledInfoHeader>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Text h2 children={selectedCourse.name}/>
                    <Spacer/>

                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {selectedCourse.published
                        ? <Button
                            onClick={() => handlePublishCourse(false)}
                            loading={load}
                            auto
                            children={"Снять с публикации"}
                        />
                        :
                        <Button
                            onClick={() => handlePublishCourse(true)}
                            loading={load}
                            auto
                            type="success"
                            children={"Опубликовать"}
                        />
                    }
                    <Spacer/>
                    <Button disabled={!selectedCourse.published} auto type={"secondary"} children={"Открыть"}/>
                </div>
            </StyledInfoHeader>
            <Spacer h={3}/>
            <Grid.Container gap={2} justify="center" height="100px">
                <Grid xs={24} md={4}>
                    <StyledSidebar>
                        <NavLink
                            style={({isActive}) => isActive ? selectedStyle : {}}
                            to={`/author/courses/${authorCourseId}/general`}
                        >
                            Курс
                        </NavLink>
                        <NavLink
                            style={({isActive}) => isActive ? selectedStyle : {}}
                            to={`/author/courses/${authorCourseId}/settings`}
                        >
                            Настройки
                        </NavLink>
                    </StyledSidebar>
                </Grid>
                <Grid xs={24} md={20}>
                    <StyledContent>
                        <Outlet/>
                    </StyledContent>
                </Grid>
            </Grid.Container>
        </>
    );
};

const StyledInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  border: 1px solid #ebebeb;
`

const StyledSidebar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    display: block;
    padding: 8px 0;
    font-size: 14px;
    color: #666;
    transition: color .2s ease;
  }
`
const StyledContent = styled.div`
  width: 100%;
`

const selectedStyle = {
    color: "#000",
    fontWeight: 700
}

export default AuthorCourse;