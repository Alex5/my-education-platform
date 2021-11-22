import React, {useContext} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {Page} from "@geist-ui/react";
import {Breadcrumbs, Header} from "../index";
import AuthorTabs from "../Author/components/AuthorTabs";
import {AuthContext} from "../../index";
import styled from "styled-components";

const Layout = ({author}: { author: boolean }) => {
    const location = useLocation();
    const {isAuthor} = useContext(AuthContext);

    return (
        <Page width={"1048px"}>
            <Page.Header>
                <Header isAuthor={isAuthor}/>
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

const Container = styled.div`
  width: 1000px;
`

export default Layout;