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
import Tags from "./components/Tags";
import TagsLayout from "./components/Tags/TagsLayout";
import Tag from "./components/Tags/components/Tag";
import MentoringLayout from "./components/Author/components/Mentoring/MentoringLayout";
import Mentoring from "./components/Author/components/Mentoring";
import HomeLayout from "./components/Home/HomeLayout";
import Videos from "./components/Videos";
import Video from "./components/Videos/Components/Video";
import AuthorVideosLayout from "./components/Author/components/AuthorVideos/AuthorVideosLayout";
import AuthorVideos from "./components/Author/components/AuthorVideos";
import AuthorSettingsLayout from "./components/Author/components/AuthorSettings/AuthorSettingsLayout";
import AuthorSettings from "./components/Author/components/AuthorSettings";
import AppRouter from "./router";

function App() {
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

    return <AppRouter/>;
}

export default App;
