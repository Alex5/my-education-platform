import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from "@geist-ui/core";
import MenuLayout, { IMenu } from "../Layout/MenuLayout";

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
            label: {
                text: 'Новинка',
                type: 'success',
                enable: true
            },
        },
        {
            to: '/interviews',
            children: 'Собеседования',
            label: {
                text: 'Скоро',
                type: 'secondary',
                disabled: true,
                enable: true
            },
        },
        // {
        //     to: '/collections',
        //     children: 'Коллекции',
        //     label: {
        //         text: 'Скоро',
        //         type: 'secondary',
        //         disabled: true,
        //         enable: true
        //     },
        // },
        // {
        //     to: '/collections',
        //     children: 'Менторы',
        //     label: {
        //         text: 'Скоро',
        //         type: 'secondary',
        //         disabled: true,
        //         enable: true
        //     },
        // },
    ]

    return (
        <MenuLayout menu={homeMenu}>
            <Outlet />
        </MenuLayout>
    );
};

export default HomeLayout;