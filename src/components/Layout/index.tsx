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

    return (
        <PageContainer>
            <Header isAuthor={author}/>
            <StyledPage>
                <Page.Content>
                    {location.pathname !== "/" && !location.pathname.includes('/author') && <Breadcrumbs/>}
                    <Outlet/>
                </Page.Content>
                <Page.Footer style={{
                    position: 'fixed',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    left: 0,
                    backgroundColor: "white",
                    boxShadow: 'inset 0 -1px #eaeaea',
                }}>
                    <Text b children="Проект создан: "/>
                    <Link block target={"_blank"} href={"https://github.com/Alex5"} color
                          children={"Ильин Алексей (JavaScript - разработчик)"}/>
                </Page.Footer>
            </StyledPage>
        </PageContainer>
    );
};

const PageContainer = styled.div`
  background-color: #fafafa;
  min-height: calc(100vh - 1px);
`

const StyledPage = styled.div`
  max-width: 1048px;
  margin: auto;
  padding: 0 24px;
`

export default Layout;