import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {Link, Page, Spacer, Text} from "@geist-ui/react";
import {Breadcrumbs, Header} from "../index";
import {useSelector} from "react-redux";
import {getUser} from "../../redux/slices/userSlice/userSlice";
import styled from "styled-components";

const Layout = () => {
    const location = useLocation();
    const {author} = useSelector(getUser);
    const isAuthorUrl = location.pathname !== "/" && !location.pathname.includes('/author') && !location.pathname.includes('/videos');

    return (
        <>
            <Header isAuthor={author}/>
            <StyledPage>
                <Page.Content>
                    {isAuthorUrl && <Breadcrumbs/>}
                    <Outlet/>
                </Page.Content>
            </StyledPage>
        </>
    );
};

const StyledPage = styled.div`
  max-width: 1048px;
  margin: auto;
  padding: 0 24px;
`

export default Layout;