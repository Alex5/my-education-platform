import React from 'react';
import {RouteObject, useParams, useRoutes} from 'react-router-dom';
import Home from "./Home";
import Layout from "./Layout";
import NoMatch from "./NoMatch";
import Courses from "./Courses";
import CoursesIndex from "./Courses/CoursesIndex";
import Course from "./Courses/components/Course";

const AppRouter = () => {
    enum RouteNames {
        COURSES = '/courses',
        COURSES_ID = '/courses/:id',
    }

    let routes: RouteObject[] = [
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "/:course",
                    element: <Courses />,
                    children: [
                        { index: true, element: <CoursesIndex /> },
                        { path: "/:course/:id", element: <Course /> }
                    ]
                },
                { path: "*", element: <NoMatch /> }
            ]
        }
    ];

    let element = useRoutes(routes);

    return (
        <>
            {element}
        </>
    );
};

export default AppRouter;