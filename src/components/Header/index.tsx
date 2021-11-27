import React, {FC, useContext, useState} from 'react';
import {Button, ButtonGroup, Loading, Popover, Spacer, Tag, Text, User, useToasts} from "@geist-ui/react";
import styled from "styled-components";
import yandexLogo from "../../assets/YandexLogo.svg";
import googleLogo from "../../assets/GoogleLogo.svg";
import {AuthContext} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {AuthRequests} from "../../services/authRequests"
import {Link, useNavigate} from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setUser} from "../../redux/slices/userSlice";
import {Github} from "@geist-ui/react-icons";
import {PublicRequests} from "../../services/publicRequests";
import {AuthProvider, GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";

interface HeaderProps {
    isAuthor: boolean;
}

const Header: FC<HeaderProps> = ({isAuthor}) => {
    const [load, setLoad] = useState(false);

    const dispatch = useDispatch();
    const {author} = useSelector(getUser);

    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();

    const [, setToast] = useToasts()
    const [user, loading] = useAuthState(auth);



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

    const transformToAuthor = async () => {
        setLoad(true)
        const updatedUser = await PublicRequests.transformToAuthor(user?.uid || '');
        dispatch(setUser(updatedUser));
        setLoad(false)
    }

    return (
        <StyledHeader>
            <StyledHeaderContent>
                <Link to={"/"}>
                    <Text style={{fontFamily: 'TTNormsBold'}} mb={0} mt={0} h4>
                        My Education Platform
                    </Text>
                </Link>
                {loading
                    ? <Loading mr={0} ml={0} width={10}/>
                    : user
                        ? <div style={{display: 'flex', alignItems: 'center'}}>
                            {author
                                ? <Button scale={1 / 2} onClick={() => navigate('/author')} auto
                                          children="Панель автора"/>
                                : <Button loading={load} onClick={transformToAuthor} scale={1 / 2} type="secondary"
                                          children="Стать автором"/>
                            }
                            <Popover style={{cursor: 'pointer'}} content={<HeaderMenu isAuthor={isAuthor}/>}>
                                <User scale={1.8} src={user.photoURL != null ? user.photoURL : ''} name=""/>
                            </Popover>
                        </div>
                        : <StyledActions>
                            <ButtonGroup>
                                <Button onClick={() => login('google')}
                                        icon={<img height={"17px"} src={googleLogo} alt="Google Logo"/>}/>
                                <Button onClick={() => login('github')}
                                        icon={<Github/>}
                                />
                            </ButtonGroup>
                            <Spacer/>
                        </StyledActions>
                }
            </StyledHeaderContent>
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
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