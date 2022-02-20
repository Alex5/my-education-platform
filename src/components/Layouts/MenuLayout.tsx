import React, { FC } from 'react';
import { Badge, Button, Grid, Link, Text } from "@geist-ui/core";
import { NavLink, NavLinkProps, Outlet } from "react-router-dom";
import styled from "styled-components";

export interface IMenu {
    to: string;
    children: string;
    end?: boolean;
    label?: {
        text: string,
        disabled?: boolean;
        type: "default" | "secondary" | "success" | "warning" | "error";
        enable: boolean;
    }
}

interface MenuLayoutProps {
    menu: IMenu[];
}

const MenuLayout: FC<MenuLayoutProps> = ({ menu }) => {
    return (
        <Grid.Container gap={2}>
            <Grid xs={24} md={4}>
                <StyledSidebar>
                    {menu && menu.map(menuItem => (
                        <NavLink
                            key={menuItem.to}
                            onClick={event => menuItem.label?.disabled && event.preventDefault()}
                            style={{ cursor: menuItem.label?.disabled ? "not-allowed" : '' }}
                            end={menuItem.end}
                            to={menuItem.to}
                            className={({ isActive }) => isActive ? "active" : ''}
                        >
                            {menuItem.label?.enable
                                ? (
                                    <Badge.Anchor style={{ width: '100%' }}>
                                        <Badge type={menuItem.label.type} scale={0.5}>{menuItem.label?.text}</Badge>
                                        <Text mt={0} mb={0} children={menuItem.children} />
                                    </Badge.Anchor>
                                )
                                : <Text mt={0} mb={0} children={menuItem.children} />
                            }
                        </NavLink>
                    ))}
                </StyledSidebar>
            </Grid>
            <Grid direction={"column"} xs={24} md={20}>
                <Outlet />
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
    padding: 5px 5px 5px 10px;
    border-radius: 10px;
    transition: ease-in-out 0.1s;
    border: 1px solid transparent;
    margin-bottom: 5px
  }

  .active {
    font-weight: bold;
    color: #0070f3;
    background-color: #fafafa;
    border: 1px solid #eaeaea;
  }
`

export default MenuLayout;