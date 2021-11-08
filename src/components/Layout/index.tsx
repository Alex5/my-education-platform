import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {Page} from "@geist-ui/react";
import {Breadcrumbs, Footer, Header} from "../index";

const Layout = () => {
    const location = useLocation();

    return (
        <>
            <Header/>
            <Page width={'1048px'} >
                {location.pathname !== "/" && <Breadcrumbs/>}
                <Outlet/>
                <Footer/>
            </Page>
        </>

    );
};

export default Layout;