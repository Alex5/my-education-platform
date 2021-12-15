import React, {useEffect} from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {Courses, Home, Layout, Course, CoursesIndex, ForAuthor, NoMatch} from "./components";
import {AuthorCourse, AuthorCourses, AuthorHome, EditCourse, General} from "./components/Author";
import AuthorCoursesLayout from "./components/Author/components/AuthorCourses/AuthorCoursesLayout";
import Settings from "./components/Author/components/AuthorCourses/components/AuthorCourse/components/Settings";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setUser} from "./redux/slices/userSlice/userSlice";
import {AuthRequests} from "./api/authRequests";
import {Auth, getAuth, onAuthStateChanged} from "firebase/auth"
import Lessons from "./components/Lessons";
import Account from "./components/Account";
import AccountLayout from "./components/Account/AccountLayout";

function App() {
    const dispatch = useDispatch();

    function RequireAuth({children}: { children: JSX.Element }) {
        const auth: Auth = getAuth();
        let location = useLocation();

        if (!auth.currentUser) {
            return <Navigate to="/" state={{from: location}}/>;
        }

        return children;
    }

    function RequireAuthor({children}: { children: JSX.Element }) {
        const {author} = useSelector(getUser);
        let location = useLocation();

        if (!author) {
            return <Navigate to="/for-author" state={{from: location}}/>;
        }

        return children;
    }

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
                <Route path={"/for-author"} element={<ForAuthor/>}/>
                <Route path="/author">
                    <Route index element={
                        <RequireAuthor>
                            <AuthorHome/>
                        </RequireAuthor>
                    }/>
                    <Route path="courses" element={
                        <RequireAuthor>
                            <AuthorCoursesLayout/>
                        </RequireAuthor>
                    }>
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
                <Route path={'/account'} element={
                    <RequireAuth>
                        <AccountLayout/>
                    </RequireAuth>
                }>
                    <Route index element={<Account/>}/>
                    <Route path="settings" element={<div>Account Settings</div>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Route>
            <Route path="*" element={<NoMatch/>}/>
        </Routes>
    );
}

export default App;
