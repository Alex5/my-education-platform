import React, {FC} from 'react';
import {Badge, Button, Grid, Link, Text} from "@geist-ui/core";
import {NavLink, NavLinkProps, Outlet} from "react-router-dom";
import styled from "styled-components";

interface IMenu {
    to: string;
    children: string;
    end?: boolean;
    label?: string;
    disabled?: boolean
}

interface MenuLayoutProps {
    menu: IMenu[];
}

const MenuLayout: FC<MenuLayoutProps> = ({menu}) => {
    return (
        <Grid.Container gap={2}>
            <Grid xs={24} md={4}>
                <StyledSidebar>
                    {menu && menu.map(menuItem => (
                        <NavLink
                            onClick={event => menuItem.disabled && event.preventDefault()}
                            style={{cursor: menuItem.disabled ? "not-allowed" : ''}}
                            end={menuItem.end}
                            to={menuItem.to}
                            className={({isActive}) => isActive ? "active" : ''}
                        >
                            {menuItem.label
                                ? <Badge.Anchor style={{width: '100%'}}>
                                    <Badge type="success" scale={0.5}>{menuItem.label}</Badge>
                                    <Text mt={0} mb={0} children={menuItem.children}/>
                                </Badge.Anchor>
                                : <Text mt={0} mb={0} children={menuItem.children}/>
                            }
                        </NavLink>
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
    border: 1px solid transparent;
  }

  .active {
    font-weight: bold;
    color: #0070F3;
    background-color: #f7f7f7;
    border: 1px solid #eeeeee;
  }
  
  
`

export default MenuLayout;