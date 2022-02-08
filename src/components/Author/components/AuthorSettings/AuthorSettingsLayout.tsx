import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuLayout from "../../../Layout/MenuLayout";
import PageLayout from '../../../Layout/PageLayout';

const AuthorSettingsLayout = () => {
    return (
        <PageLayout title='Настройки автора'>
            <MenuLayout menu={[{
                to: '/author/settings',
                children: 'Основные',
                end: true
            }]}>
                <Outlet />
            </MenuLayout>
        </PageLayout>

    )
}

export default AuthorSettingsLayout;