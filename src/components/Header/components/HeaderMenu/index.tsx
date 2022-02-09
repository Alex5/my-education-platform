import React, { FC, useContext } from 'react';
import { Popover, useMediaQuery } from "@geist-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut, getAuth } from "firebase/auth";
import { firebaseApp } from "../../../../fbconfig";
import { signOut as reduxSignOut } from "../../../../redux/slices/userSlice/userSlice";

const HeaderMenu: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);

    const handleSignOut = async () => {
        await signOut(auth);
        dispatch(reduxSignOut());
    }

    const upMD = useMediaQuery('md', { match: 'up' })

    return (
        <>
            {upMD
                ? <></>
                :
                <Popover.Item onClick={() => navigate('/author')}>
                    <span>Панель автора</span>
                </Popover.Item>
            }
            <Popover.Item onClick={() => navigate('/account')}>
                <span>Настройки</span>
            </Popover.Item>
            <Popover.Item line />
            <Popover.Item onClick={handleSignOut}>
                <span>Выйти</span>
            </Popover.Item>
        </>
    );
};

export default HeaderMenu;