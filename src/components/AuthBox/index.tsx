import React, { FC } from 'react';
import { Avatar, Button, Popover, Spacer, useMediaQuery } from "@geist-ui/core";
import HeaderMenu from "../Header/components/HeaderMenu";
import googleLogo from "../../assets/GoogleLogo.svg";
import PanelButton from "../Header/components/PanelButton";
import styled from "styled-components";
import { getAuth } from 'firebase/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useSelector } from "react-redux";
import { getFirebaseUser } from "../../redux/slices/userSlice/userSlice";

const AuthBox: FC = () => {
    const user = useSelector(getFirebaseUser);
    const userExist = user && Object.keys(user).length > 0;

    const auth = getAuth();
    const [signInWithGoogle] = useSignInWithGoogle(auth);

    const upMD = useMediaQuery('md', { match: 'up' })

    return (
        userExist
            ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {upMD
                        ? <>
                            <PanelButton />
                            <Spacer />
                        </>
                        : <></>
                    }
                    <Popover
                        placement={"bottomEnd"}
                        style={{ cursor: 'pointer' }}
                        content={<HeaderMenu />}
                    >
                        <Avatar scale={1.8} src={user.photoURL || ''} />
                    </Popover>
                </div>
            )
            : (
                <StyledActions>
                    <Button
                        auto
                        onClick={() => signInWithGoogle()}
                        icon={<img
                            height={"17px"}
                            src={googleLogo}
                            alt="Google Logo" />}
                    />
                </StyledActions>
            )
    );
};

const StyledActions = styled.div`
  display: flex;
  align-items: center;
`

export default AuthBox;