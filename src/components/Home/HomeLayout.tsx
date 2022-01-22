import React from 'react';
import {Outlet} from 'react-router-dom';
import {Grid} from "@geist-ui/react";
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

        ]}>
            <Grid direction={"column"} xs={24} md={20}>
                <Outlet/>
            </Grid>
        </MenuLayout>
    );
};

export default HomeLayout;