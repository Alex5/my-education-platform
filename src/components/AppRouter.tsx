import React from 'react';
import {RouteObject, useRoutes} from 'react-router-dom';
import Home from "./Home";
import Layout from "./Layout";
import NoMatch from "./NoMatch";
import Courses from "./Courses";
import CoursesIndex from "./Courses/CoursesIndex";
import Course from "./Courses/components/Course";
import * as path from "path";
import Author from "./Author";

const AppRouter = () => {
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
                        { path: "/:course/:courseId", element: <Course /> }
                    ]
                },
                { path: "*", element: <NoMatch /> }
            ]
        },
        {
            path: "/author",
            element: <Layout />,
            children: [
                { index: true, element: <Author /> },
                // {
                //     path: "/:course",
                //     element: <Courses />,
                //     children: [
                //         { index: true, element: <CoursesIndex /> },
                //         { path: "/:course/:courseId", element: <Course /> }
                //     ]
                // },
                // { path: "*", element: <NoMatch /> }
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