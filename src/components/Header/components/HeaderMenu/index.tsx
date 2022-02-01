import React, {FC, useContext} from 'react';
import {Popover} from "@geist-ui/core";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signOut, getAuth} from "firebase/auth";
import {firebaseApp} from "../../../../fbconfig";
import {signOut as reduxSignOut} from "../../../../redux/slices/userSlice/userSlice";

const HeaderMenu: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);

    const handleSignOut = async () => {
        await signOut(auth);
        dispatch(reduxSignOut());
    }

    return (
        <>
            <Popover.Item onClick={() => navigate('/account')}>
                <span>Настройки</span>
            </Popover.Item>
            <Popover.Item line/>
            <Popover.Item onClick={handleSignOut}>
                <span>Выйти</span>
            </Popover.Item>
        </>
    );
};

export default HeaderMenu;