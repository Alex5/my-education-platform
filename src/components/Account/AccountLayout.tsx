import React from 'react';
import MenuLayout from "../Layouts/MenuLayout";

const AccountLayout = () => {
    const accountMenu = [
        {
            to: '/account',
            children: 'Основные'
        },
    ]

    return <MenuLayout menu={accountMenu}/>;
};

export default AccountLayout;