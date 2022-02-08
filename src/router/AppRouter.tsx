import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Course, Courses, CoursesIndex, ForAuthor, Home, Layout, NoMatch } from "../components";
import HomeLayout from "../components/Home/HomeLayout";
import Videos from "../components/Videos";
import Lessons from "../components/Lessons";
import { AuthorCourse, AuthorCourses, AuthorHome, EditCourse, General } from "../components/Author";
import AuthorCoursesLayout from "../components/Author/components/AuthorCourses/AuthorCoursesLayout";
import Settings from "../components/Author/components/AuthorCourses/components/AuthorCourse/components/Settings";
import MentoringLayout from "../components/Author/components/Mentoring/MentoringLayout";
import Mentoring from "../components/Author/components/Mentoring";
import AuthorVideosLayout from "../components/Author/components/AuthorVideos/AuthorVideosLayout";
import AuthorVideos from "../components/Author/components/AuthorVideos";
import AuthorSettingsLayout from "../components/Author/components/AuthorSettings/AuthorSettingsLayout";
import AuthorSettings from "../components/Author/components/AuthorSettings";
import AccountLayout from "../components/Account/AccountLayout";
import Account from "../components/Account";
import TagsLayout from "../components/Tags/TagsLayout";
import Tags from "../components/Tags";
import Tag from "../components/Tags/components/Tag";
import Video from "../components/Videos/Components/Video";
import { appRoutes } from "./routes";
import { Auth, getAuth } from "firebase/auth";
import AuthorArticles from '../components/Author/components/AuthorArticles/AuthorArticles';
import AuthorArticlesLayout from '../components/Author/components/AuthorArticles/AuthorArticlesLayout';
import AuthorArticle from '../components/Author/components/AuthorArticles/components/AuthorArticle';
import Articles from "../components/Articles";
import Article from "../components/Articles/components/Article";

const AppRouter = () => {
    function RequireAuth({ children }: { children: JSX.Element }) {
        const auth: Auth = getAuth();
        let location = useLocation();

        if (!auth.currentUser) {
            return <Navigate to="/" state={{ from: location }} />;
        }

        return children;
    }

    // function RequireAuthor({children}: { children: JSX.Element }) {
    //     const {author} = useSelector(getUser);
    //     let location = useLocation();
    //
    //     if (!author) {
    //         return <Navigate to="/for-author" state={{from: location}}/>;
    //     }
    //
    //     return children;
    // }

    return (
        <Routes>
            <Route path={appRoutes.home.path} element={<Layout />}>
                <Route element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path={appRoutes.home.videos.path} element={<Videos />} />
                    <Route path={appRoutes.home.articles.path} element={<Articles />} />
                    <Route path={appRoutes.noMatch.path} element={<NoMatch />} />
                </Route>
                <Route path={appRoutes.home.courseDirection.path} element={<Courses />}>
                    <Route index element={<CoursesIndex />} />
                    <Route path={appRoutes.home.courseDirection.courseId.path} element={<Course />} />
                    <Route path={appRoutes.home.courseDirection.courseId.lessons.path} element={<Lessons />} />
                    <Route path={appRoutes.noMatch.path} element={<NoMatch />} />
                </Route>
                <Route path={"/for-author"} element={<ForAuthor />} />
                <Route path="/author">
                    <Route index element={<AuthorHome />} />
                    <Route path="courses" element={<AuthorCoursesLayout />}>
                        <Route index element={<AuthorCourses />} />
                        <Route path=":authorCourseId" element={<AuthorCourse />}>
                            <Route path="general" element={<General />} />
                            <Route path="edit" element={<EditCourse />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                    <Route path="mentoring" element={<MentoringLayout />}>
                        <Route index element={<Mentoring />} />
                    </Route>
                    <Route path="videos" element={<AuthorVideosLayout />}>
                        <Route index element={<AuthorVideos />} />
                    </Route>
                    <Route path="settings" element={<AuthorSettingsLayout />}>
                        <Route index element={<AuthorSettings />} />
                        <Route path="additional" element={<div>Additional</div>} />
                    </Route>
                    <Route path="articles" element={<AuthorArticlesLayout />}>
                        <Route index element={<AuthorArticles />} />
                        <Route path="create" element={<AuthorArticle />} />
                        <Route path=":id/edit" element={<AuthorArticle />} />
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Route>
                <Route path={'/account'} element={
                    <RequireAuth>
                        <AccountLayout />
                    </RequireAuth>
                }>
                    <Route index element={<Account />} />
                    <Route path="settings" element={<div>Account Settings</div>} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
                <Route path="/tags" element={<TagsLayout />}>
                    <Route index element={<Tags />} />
                    <Route path=":tagName" element={<Tag />} />
                </Route>
                <Route path="/videos/:videoId">
                    <Route index element={<Video />} />
                </Route>
                <Route path="/articles/:articleId">
                    <Route index element={<Article />} />
                </Route>
                <Route path="*" element={<NoMatch />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

export default AppRouter;