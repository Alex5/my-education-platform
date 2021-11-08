import React, {useContext} from 'react';
import {Button, ButtonGroup, Loading, Popover, User, useToasts} from "@geist-ui/react";
import styled from "styled-components";
import yandexLogo from "../../assets/YandexLogo.svg";
import googleLogo from "../../assets/GoogleLogo.svg";
import {AuthContext} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import GoogleAuth from "../../services/googleAuth"
import {Link} from "react-router-dom";

const Header = () => {
    const [, setToast] = useToasts()
    const {auth} = useContext(AuthContext);
    const [user, loading] = useAuthState(auth);

    const login = () => {
        GoogleAuth
            .signIn(auth)
            .then(user => {
                setToast({
                    text: `Вход выполнен: ${user.metadata.lastSignInTime}`,
                    type: 'success'
                })
            }).catch(err => {
            setToast({
                text: `Ошибка входа: ${err}`,
                type: 'error'
            })
        });

    }

    return (
        <StyledHeader>
            <StyledHeaderContent>
                <span>Education Platform</span>
                {loading
                    ? <Loading mr={0} ml={0} width={10}/>
                    : user
                        ? <Popover style={{cursor: 'pointer'}} content={<>
                            <Popover.Item>
                                <Button onClick={() => auth.signOut()} children="Выйти"/>
                            </Popover.Item>
                        </>}>
                            <User src={user.photoURL != null ? user.photoURL : ''} name={user.displayName}>
                                {user.email}
                            </User>
                        </Popover>
                        : <StyledActions>
                            <ButtonGroup>
                                <Button onClick={login}
                                        icon={<img height={"17px"} src={googleLogo} alt="Google Logo"/>}/>
                                <Button disabled icon={<img height={"17px"} src={yandexLogo} alt="Yandex Logo"/>}/>
                            </ButtonGroup>
                            <Link to="/author">
                                <Button auto children={"Авторам"}/>
                            </Link>
                        </StyledActions>
                }
            </StyledHeaderContent>
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.02);
  height: 70px;
  display: flex;
`
const StyledHeaderContent = styled.div`
  justify-content: space-between;
  display: flex;
  margin: auto;
  max-width: 1048px;
  width: 100%;
  align-items: center;
`

const StyledActions = styled.div`
  display: flex;
  align-items: center;
`

export default Header;