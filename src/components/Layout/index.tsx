import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {Link, Page, Spacer, Text} from "@geist-ui/core";
import {Breadcrumbs, Header} from "../index";
import {useSelector} from "react-redux";
import {getUser} from "../../redux/slices/userSlice/userSlice";
import styled from "styled-components";

const Layout = () => {
    const {author} = useSelector(getUser);

    return (
        <>
            <Header isAuthor={author}/>
            <StyledPage>
                <Page.Content>
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