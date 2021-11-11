import React, {FC, useContext} from 'react';
import {Button, ButtonGroup, Loading, Page, Popover, Spacer, Text, User, useToasts} from "@geist-ui/react";
import styled from "styled-components";
import yandexLogo from "../../assets/YandexLogo.svg";
import googleLogo from "../../assets/GoogleLogo.svg";
import {AuthContext} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import GoogleAuth from "../../services/googleAuth"
import {Link} from "react-router-dom";
import HeaderMenu from "../HeaderMenu";

interface HeaderProps {
    isAuthor: boolean;
}

const Header: FC<HeaderProps> = ({isAuthor}) => {
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
                    <Link to={"/"}><Text mb={0} mt={0} h4>Education Platform</Text></Link>
                    {loading
                        ? <Loading mr={0} ml={0} width={10}/>
                        : user
                            ? <Popover style={{cursor: 'pointer'}} content={<HeaderMenu isAuthor={isAuthor}/>}>
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
                                <Spacer/>
                                <Link to="/author/courses">Авторам</Link>
                            </StyledActions>
                    }
                </StyledHeaderContent>
            </StyledHeader>
    );
};

const StyledHeader = styled.div`
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.02);
  height: 60px;
  display: flex;
`
const StyledHeaderContent = styled.div`
  justify-content: space-between;
  display: flex;
  width: 100%;
  align-items: center;
`

const StyledActions = styled.div`
  display: flex;
  align-items: center;
`

export default Header;