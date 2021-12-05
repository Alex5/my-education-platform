import React, {FC, useContext, useState} from 'react';
import {Button, ButtonGroup, Loading, Popover, Spacer, Link as GLInk, Text, User, useToasts} from "@geist-ui/react";
import styled from "styled-components";
import googleLogo from "../../assets/GoogleLogo.svg";
import {AuthContext} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {AuthRequests} from "../../api/authRequests"
import {Link, useLocation, useNavigate} from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setUser} from "../../redux/slices/userSlice";
import {Github} from "@geist-ui/react-icons";
import {PublicRequests} from "../../api/publicRequests";
import {EStatus} from "../../redux/enums";
import AuthorTabs from "../Author/components/AuthorTabs";

interface HeaderProps {
    isAuthor: boolean;
}

const Header: FC<HeaderProps> = ({isAuthor}) => {
    const [load, setLoad] = useState(false);

    const dispatch = useDispatch();
    const {author} = useSelector(getUser);

    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

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
        const updatedUser = await PublicRequests.transformAccount(user?.uid || '', EStatus.author);
        dispatch(setUser(updatedUser));
        setLoad(false)
    }

    return (
        <StyledHeader author={author}>
            <StyledHeaderContent>
                <Link to={"/"}>
                    <Text style={{fontFamily: 'TTNormsBold'}} mb={0} mt={0} h4>
                        My Education Platform
                    </Text>
                </Link>
                <div style={{display: 'flex', alignItems: 'center'}}>
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
                                <Popover placement={"bottomEnd"} style={{cursor: 'pointer'}}
                                         content={<HeaderMenu isAuthor={isAuthor}/>}>
                                    <User scale={1.8} src={user.photoURL != null ? user.photoURL : ''} name=""/>
                                </Popover>
                            </div>
                            : <StyledActions>
                                <ButtonGroup>
                                    <Button onClick={() => login('google')}
                                            icon={<img height={"17px"} src={googleLogo} alt="Google Logo"/>}/>
                                    {/*<Button onClick={() => login('github')}*/}
                                    {/*        icon={<Github/>}*/}
                                    {/*/>*/}
                                </ButtonGroup>
                                <Spacer/>
                            </StyledActions>
                    }
                    <GLInk href={'https://github.com/Alex5/my-education-platform'} target={"_blank"}>
                        <Github/>
                    </GLInk>
                </div>
            </StyledHeaderContent>
            {location.pathname.includes('/author') &&
            <StyledAuthorTabs>
                <AuthorTabs/>
            </StyledAuthorTabs>
            }
        </StyledHeader>
    );
};

const StyledHeader = styled.nav<{ author: boolean }>`
  height: ${props => props.author ? 'unset' : '80px'};
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 -1px #eaeaea;
  width: 100%;
  background-color: white;
`
const StyledHeaderContent = styled.div`
  justify-content: space-between;
  display: flex;
  max-width: 1048px;
  margin: auto;
  padding: 0 24px;
  width: 100%;
  align-items: center;
  height: 80px;
`

const StyledActions = styled.div`
  display: flex;
  align-items: center;
`

const StyledAuthorTabs = styled.div`
  max-width: 1048px;
  margin: auto;
  padding: 0 24px;
  width: 100%;
  height: 30px;
`

export default Header;