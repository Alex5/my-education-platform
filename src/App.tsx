import React, {useContext, useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Courses, Home, Layout, Course, CoursesIndex, ForAuthor, NoMatch} from "./components";
import {AuthorCourse, AuthorCourses, AuthorHome, EditCourse, General} from "./components/Author";
import AuthorCoursesLayout from "./components/Author/components/AuthorCourses/AuthorCoursesLayout";
import Settings from "./components/Author/components/AuthorCourses/components/AuthorCourse/components/Settings";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setUser} from "./redux/slices/userSlice";
import {AuthRequests} from "./api/authRequests";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import Lessons from "./components/Lessons";

function App() {
    const {author} = useSelector(getUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const userInfo = await AuthRequests.getUserInfo(uid)
                dispatch(setUser(userInfo));
            }
        });
    }, [dispatch])

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/:courseDirection" element={<Courses/>}>
                    <Route index element={<CoursesIndex/>}/>
                    <Route path="/:courseDirection/:courseId" element={<Course/>}/>
                    <Route path="/:courseDirection/:courseId/lessons" element={<Lessons/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
                <Route path={"/for-author"} element={!author ? <ForAuthor/> : <Navigate to={"/author"}/>}/>
                <Route path="/author">
                    <Route index element={author ? <AuthorHome/> : <Navigate to={"/for-author"}/>}/>
                    <Route path="courses" element={<AuthorCoursesLayout/>}>
                        <Route index element={<AuthorCourses/>}/>
                        <Route path=":authorCourseId" element={<AuthorCourse/>}>
                            <Route path="general" element={<General/>}/>
                            <Route path="edit" element={<EditCourse/>}/>
                            <Route path="settings" element={<Settings/>}/>
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
