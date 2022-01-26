import React from 'react';
import {Outlet} from 'react-router-dom';
import MenuLayout from "../../../Layout/MenuLayout";

const AuthorSettingsLayout = () => {
    return (
        <MenuLayout menu={[{
            to: '/author/settings',
            children: 'Основные',
            end: true
        }]}>
            <Outlet/>
        </MenuLayout>
    )
}

export default AuthorSettingsLayout;