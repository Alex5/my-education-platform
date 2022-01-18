import React, {FC} from 'react';
import {Grid} from "@geist-ui/react";
import {NavLink, NavLinkProps, Outlet} from "react-router-dom";
import styled from "styled-components";

interface MenuLayoutProps {
    menu: { to: string, children: string, end?: boolean }[];
}

const MenuLayout: FC<MenuLayoutProps> = ({menu}) => {
    return (
        <Grid.Container gap={2}>
            <Grid xs={24} md={4}>
                <StyledSidebar>
                    {menu && menu.map(menuItem => (
                        <NavLink end={menuItem.end} to={menuItem.to}
                                 className={({isActive}) => isActive ? "active" : ''}
                                 children={menuItem.children}/>
                    ))}
                </StyledSidebar>
            </Grid>
            <Grid direction={"column"} xs={24} md={20}>
                <Outlet/>
            </Grid>
        </Grid.Container>
    );
};

const StyledSidebar = styled.nav`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;

  a {
    text-decoration: none;
    color: black;
    padding: 10px;
    border-radius: 10px;
    transition: ease-in-out 0.1s;
  }

  .active {
    font-weight: 500;
    color: #0070F3;
    background-color: #f7f7f7;
  }
`

export default MenuLayout;