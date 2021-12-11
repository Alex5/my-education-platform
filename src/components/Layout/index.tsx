import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {Link, Page, Spacer, Text} from "@geist-ui/react";
import {Breadcrumbs, Header} from "../index";
import {useSelector} from "react-redux";
import {getUser} from "../../redux/slices/userSlice";
import styled from "styled-components";

const Layout = () => {
    const location = useLocation();
    const {author} = useSelector(getUser);
    const isAuthorUrl = location.pathname !== "/" && !location.pathname.includes('/author');

    return (
        <>
            <Header isAuthor={author}/>
            <StyledPage>
                <Page.Content>
                    {isAuthorUrl && <Breadcrumbs/>}
                    <Outlet/>
                </Page.Content>
                {/*<PageFooter>*/}
                {/*    <Text type={"secondary"} small b children="Проект создан: "/>*/}
                {/*    <Link block target={"_blank"} href={"https://github.com/Alex5"} color*/}
                {/*          children={"Ильин Алексей (JavaScript разработчик)"}/>*/}
                {/*</PageFooter>*/}
            </StyledPage>
        </>
    );
};

const PageFooter = styled.div`
  position: fixed;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: white;
  box-shadow: inset 0 1px #eaeaea;
  z-index: 2;
`

const StyledPage = styled.div`
  max-width: 1048px;
  margin: auto;
  padding: 0 24px;
`

export default Layout;