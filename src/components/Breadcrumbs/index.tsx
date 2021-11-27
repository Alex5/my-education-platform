import React from 'react';
import {NavLink} from "react-router-dom";
import {Breadcrumbs as GBreadcrumbs} from "@geist-ui/react";
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs()

    return (
        <GBreadcrumbs>
            {breadcrumbs.map(({match, breadcrumb}) =>
                <GBreadcrumbs.Item key={match.pathname}>
                    <NavLink to={match.pathname}>
                        {breadcrumb}
                    </NavLink>
                </GBreadcrumbs.Item>
            )}
        </GBreadcrumbs>
    );
};

export default Breadcrumbs;