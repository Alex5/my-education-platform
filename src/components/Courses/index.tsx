import React from 'react';
import {Page} from "@geist-ui/react";
import {Outlet} from "react-router-dom";

const Courses = () => {
    return (
        <Page.Content>
            <Outlet/>
        </Page.Content>
    );
};

export default Courses;