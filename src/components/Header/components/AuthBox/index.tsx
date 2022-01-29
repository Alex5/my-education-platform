import React, {FC} from 'react';
import {Avatar, Button, Popover, Spacer, useToasts} from "@geist-ui/core";
import HeaderMenu from "../HeaderMenu";
import googleLogo from "../../../../assets/GoogleLogo.svg";
import PanelButton from "../PanelButton";
import styled from "styled-components";
import {AuthRequests} from "../../../../api/authRequests";
import {setUser} from "../../../../redux/slices/userSlice/userSlice";
import {useDispatch} from "react-redux";
import {Auth, User} from 'firebase/auth';

interface AuthBoxProps {
    auth: Auth;
    user: User | undefined | null;
}

const AuthBox: FC<AuthBoxProps> = ({auth, user}) => {
    const [, setToast] = useToasts();
    const dispatch = useDispatch();

    const login = (providerName: 'google' | 'github') => {
        AuthRequests
            .signIn(auth, providerName)
            .then((user) => {
                dispatch(setUser(user))
                setToast({
                    text: `Вход выполнен`,
                    type: 'success'
                })
            })
            .catch(err => {
                setToast({
                    text: `Ошибка входа: ${err}`,
                    type: 'error'
                })
            });
    }

    return (
        user
            ? <div style={{display: 'flex', alignItems: 'center'}}>
                <PanelButton/>
                <Spacer/>
                <Popover
                    placement={"bottomEnd"}
                    style={{cursor: 'pointer'}}
                    content={<HeaderMenu/>}
                >
                    <Avatar scale={1.8} src={user.photoURL != null ? user.photoURL : ''}/>
                </Popover>
            </div>
            : <StyledActions>
                <Button auto onClick={() => login('google')}
                        icon={<img height={"17px"} src={googleLogo} alt="Google Logo"/>}/>
            </StyledActions>
    );
};

const StyledActions = styled.div`
  display: flex;
  align-items: center;
`

export default AuthBox;