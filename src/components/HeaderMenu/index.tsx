import React, {FC, useContext} from 'react';
import {Popover} from "@geist-ui/react";
import {AuthContext} from "../../index";
import {useNavigate} from "react-router-dom";

interface HeaderMenuProps {
    isAuthor: boolean;
}

const HeaderMenu: FC<HeaderMenuProps> = ({isAuthor}) => {
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            <Popover.Item children="Панель автора" onClick={() => navigate("/author/courses")}/>
            <Popover.Item line/>
            <Popover.Item children="Выйти" onClick={() => auth.signOut()}/>
        </div>
    );
};

export default HeaderMenu;