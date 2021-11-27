import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {Page} from "@geist-ui/react";
import {Breadcrumbs, Header} from "../index";
import AuthorTabs from "../Author/components/AuthorTabs";
import {useSelector} from "react-redux";
import {getUser} from "../../redux/slices/userSlice";

const Layout = () => {
    const location = useLocation();
    const {author} = useSelector(getUser);

    return (
        <Page width={"1048px"}>
            <Page.Header>
                <Header isAuthor={author}/>
            </Page.Header>
            <Page.Content>
                {location.pathname.includes('/author') && <AuthorTabs/>}
                {location.pathname !== "/" && !location.pathname.includes('/author') && <Breadcrumbs/>}
                <Outlet/>
            </Page.Content>
            <Page.Footer>
            </Page.Footer>
        </Page>
    );
};

export default Layout;