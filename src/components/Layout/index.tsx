import React from 'react';
import {Outlet} from "react-router-dom";
import {Page} from "@geist-ui/core";
import {Header} from "../index";
import styled from "styled-components";

const Layout = () => {
    return (
        <>
            <Header/>
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