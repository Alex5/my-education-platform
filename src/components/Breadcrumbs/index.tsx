import React from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {Breadcrumbs as GBreadcrumbs} from "@geist-ui/react";

const Breadcrumbs = () => {
    const location = useLocation();
    const links = location.pathname.split('/');

    return (
        <GBreadcrumbs>
            {links.map((link, index) =>
                <NavLink
                    to={links.indexOf(links[links.length - 1]) === index ? location.pathname : link.length === 0 ? '/' : `/${link}`}
                    style={() => links.indexOf(links[links.length - 1]) === index ? {color: 'black'} : {color: 'gray'}}
                >
                    <GBreadcrumbs.Item>{link.length === 0 ? 'Направления' : link}</GBreadcrumbs.Item>
                </NavLink>
            )}
        </GBreadcrumbs>
    );
};

export default Breadcrumbs;