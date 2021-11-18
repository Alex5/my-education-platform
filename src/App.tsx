import React, {useContext} from 'react';
import {Routes, Route, Outlet, Navigate} from 'react-router-dom';
import {Courses, Home, Layout, Course, CoursesIndex, ForAuthor, NoMatch} from "./components";
import {AuthorCourse, AuthorCourses, AuthorHome, CreateCourse, EditCourse, General} from "./components/Author";
import {AuthContext} from "./index";
import AuthorCoursesLayout from "./components/Author/components/AuthorCourses/AuthorCoursesLayout";

function App() {
    const {isAuthor} = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Layout author={false}/>}>
                <Route index element={<Home/>}/>
                <Route path="/:course" element={<Courses/>}>
                    <Route index element={<CoursesIndex/>}/>
                    <Route path="/:course/:courseId" element={<Course/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
                <Route path={"/for-author"} element={<ForAuthor/>}/>
                <Route path="/author">
                    <Route index element={isAuthor ? <AuthorHome/> : <Navigate to={"/for-author"}/>}/>
                    <Route path="courses" element={<AuthorCoursesLayout/>}>
                        <Route index element={<AuthorCourses/>}/>
                        <Route path=":authorCourseId" element={<AuthorCourse/>}>
                            <Route path="general" element={<General/>}/>
                            <Route path="edit" element={<EditCourse/>}/>
                            <Route path="*" element={<NoMatch/>}/>
                        </Route>
                        <Route path="*" element={<NoMatch/>}/>
                    </Route>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
