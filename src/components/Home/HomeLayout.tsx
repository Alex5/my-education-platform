import React from 'react';
import {Outlet} from 'react-router-dom';
import {Grid} from "@geist-ui/core";
import MenuLayout from "../Layout/MenuLayout";

const HomeLayout = () => {
    return (
        <MenuLayout menu={[
            {
                to: '/',
                children: 'Курсы',
                end: true
            }, {
                to: '/videos',
                children: 'Видео',
            },
            {
                to: '/intensives',
                children: 'Интенсивы',
                label: 'Скоро',
                disabled: true
            },
        ]}>
            <Grid direction={"column"} xs={24} md={20}>
                <Outlet/>
            </Grid>
        </MenuLayout>
    );
};

export default HomeLayout;