import React, {FC, useContext} from 'react';
import {Button, Popover, Spacer, Text, User} from "@geist-ui/react";
import {AuthContext} from "../../../index";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signOut} from "../../../redux/slices/userSlice";
import styled from "styled-components";

interface HeaderMenuProps {
    isAuthor: boolean;
}

const HeaderMenu: FC<HeaderMenuProps> = ({isAuthor}) => {
    const {auth} = useContext(AuthContext);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        auth.signOut().then(() => {
            dispatch(signOut())
        })
    }

    return (
        <StyledHeaderMenu>
            <User scale={6} src={auth.currentUser?.photoURL || ''} name=""/>
            <Text b>{auth.currentUser?.displayName}</Text>
            <Text>{auth.currentUser?.email}</Text>
            <Button scale={1/2} children="Выйти" onClick={handleSignOut}/>
        </StyledHeaderMenu>
    );
};

const StyledHeaderMenu = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default HeaderMenu;