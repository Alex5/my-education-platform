import React, {useContext} from 'react';
import {Routes, Route, Outlet, Navigate} from 'react-router-dom';
import {Courses, Home, Layout, Course, CoursesIndex, ForAuthor, NoMatch} from "./components";
import {AuthorActivity, AuthorCourse, AuthorCourses, AuthorHome} from "./components/Author";
import {AuthContext} from "./index";
import General from "./components/Author/components/AuthorCourses/components/AuthorCourse/components/General";

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
                    <Route path="/author/courses" element={<><Outlet/></>}>
                        <Route index element={<AuthorCourses/>}/>
                        <Route path="/author/courses/:authorCourseId" element={<AuthorCourse/>}>
                            <Route path="/author/courses/:authorCourseId/general" element={<General/>}/>
                            <Route path="*" element={<NoMatch/>}/>
                        </Route>
                    </Route>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
