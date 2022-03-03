import React from 'react';
import {Outlet} from "react-router-dom";
import {Page} from "@geist-ui/core";
import {Footer, Header} from "../index";
import styled from "styled-components";

const Layout = () => {
    return (
        <>
            <Header/>
            <StyledPageContainer>
                <StyledPage>
                    <Page.Content>
                        <Outlet/>
                    </Page.Content>
                </StyledPage>
            </StyledPageContainer>
            <Footer/>
        </>
    );
};

const StyledPageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 118px);
`

const StyledPage = styled.div`
  max-width: 1048px;
  margin: auto;
  padding: 0 24px;
`

export default Layout;