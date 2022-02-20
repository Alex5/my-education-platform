import React from 'react';
import {Outlet} from 'react-router-dom';
import {Grid} from "@geist-ui/core";
import MenuLayout, {IMenu} from "../Layouts/MenuLayout";

const HomeLayout = () => {
    const homeMenu: IMenu[] = [
        {
            to: '/',
            children: 'Курсы',
            end: true
        }, {
            to: '/videos',
            children: 'Видео',
        },
        {
            to: '/articles',
            children: 'Статьи',
        },
        {
            to: '/interviews',
            children: 'Собеседования',
        },
    ]

    return (
        <MenuLayout menu={homeMenu}>
            <Outlet/>
        </MenuLayout>
    );
};

export default HomeLayout;