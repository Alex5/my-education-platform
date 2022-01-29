import React, {FC, useContext} from 'react';
import {Loading, Text} from "@geist-ui/core";
import styled from "styled-components";
import {AuthContext} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUser} from "../../redux/slices/userSlice/userSlice";
import AuthorTabs from "../Author/components/AuthorTabs";
import AuthBox from "./components/AuthBox";

const Header: FC = () => {
    const {author} = useSelector(getUser);

    const location = useLocation();

    const {auth} = useContext(AuthContext);
    const [user, loading] = useAuthState(auth);

    return (
        <div style={{padding: '0 24px'}}>
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
                            : <AuthBox auth={auth} user={user}/>
                        }
                    </div>
                </StyledHeaderContent>
                {location.pathname.includes('/author') && (
                    <StyledAuthorTabs>
                        <AuthorTabs/>
                    </StyledAuthorTabs>
                )}
            </StyledHeader>
        </div>

    );
};

const StyledHeader = styled.nav<{ author: boolean }>`
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 -1px #eaeaea;
  width: 100%;
  background-color: white;
  max-width: 1048px;
  margin: auto;
`
const StyledHeaderContent = styled.div`
  justify-content: space-between;
  display: flex;
  max-width: 1048px;
  margin: auto;
  width: 100%;
  align-items: center;
  height: 80px;
`


const StyledAuthorTabs = styled.div`
  max-width: 1048px;
  margin: auto;
  width: 100%;
  height: 30px;
`

export default Header;