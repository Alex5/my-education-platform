import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../../shared/components/Header";
import {Page} from "@geist-ui/react";
import Footer from "../../shared/components/Footer";

const Layout = () => {
    return (
        <>
            <Header/>
            <Page width={'1048px'} >
                <Outlet/>
                <Footer/>
            </Page>
        </>

    );
};

export default Layout;