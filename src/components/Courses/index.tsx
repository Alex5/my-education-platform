import React from 'react';
import {Breadcrumbs, Page, Spacer} from "@geist-ui/react";
import {NavLink, Outlet, useLocation} from "react-router-dom";

const Courses = () => {
    const location = useLocation();
    const links = location.pathname.split('/');

    return (
        <Page.Content>
            <Breadcrumbs>
                {links.map((link, index) =>
                    <NavLink
                        to={links.indexOf(links[links.length - 1]) === index ? location.pathname : link.length === 0 ? '/' : `/${link}`}
                        style={() => links.indexOf(links[links.length - 1]) === index ? {color: 'black'} : {color: 'gray'}}
                    >
                        <Breadcrumbs.Item>{link.length === 0 ? 'Направления' : link}</Breadcrumbs.Item>
                    </NavLink>
                )}
            </Breadcrumbs>
            <Spacer/>
            <Outlet/>
        </Page.Content>
    );
};

export default Courses;