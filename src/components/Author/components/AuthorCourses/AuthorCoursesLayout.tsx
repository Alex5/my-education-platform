import React from 'react';
import {Outlet} from "react-router-dom";

const AuthorCoursesLayout = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default AuthorCoursesLayout;