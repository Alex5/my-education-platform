import React, {useContext} from 'react';
import {Button, ButtonGroup, Loading, Page, Popover, User, useToasts} from "@geist-ui/react";
import styled from "styled-components";
import yandexLogo from "../../../assets/YandexLogo.svg";
import googleLogo from "../../../assets/GoogleLogo.svg";
import {AuthContext} from "../../../index";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

const Header = () => {
    const [, setToast] = useToasts()
    const {auth} = useContext(AuthContext);

    const login = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                setToast({
                    text: `Вход выполнен: ${user.metadata.lastSignInTime}`,
                    type: 'success'
                })
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const [user, loading] = useAuthState(auth);
    const profile = () => (
        <>
            <Popover.Item>
                <Button onClick={() => auth.signOut()} children="Выйти"/>
            </Popover.Item>
        </>
    )

    return (
        <>
            <StyledHeader>
                <StyledHeaderContent>
                    <div>
                        Education Platform
                    </div>
                    {loading
                        ? <Loading mr={0} ml={0} width={10}/>
                        : user
                            ? <Popover style={{cursor: 'pointer'}} content={profile}>
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
                                <Button auto children={"Я автор"}/>
                            </StyledActions>
                    }
                </StyledHeaderContent>
            </StyledHeader>
        </>
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
`

const StyledActions = styled.div`
  display: flex;
  align-items: center;
`

export default Header;