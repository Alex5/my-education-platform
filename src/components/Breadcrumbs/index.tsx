import React from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {Breadcrumbs} from "@geist-ui/react";

const Breadcrums = () => {
    const location = useLocation();
    const links = location.pathname.split('/');

    return (
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
    );
};

export default Breadcrums;