import React, { FC } from 'react';
import { Text } from "@geist-ui/core";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/slices/userSlice/userSlice";
import AuthorTabs from "../Author/components/AuthorTabs";
import AuthBox from "../AuthBox";
import mepLogo from "../../../src/assets/mepLogo.png";

const Header: FC = () => {
    const { author } = useSelector(getUser);

    const location = useLocation();

    return (
        <StyledHeaderContanier>
            <StyledHeader author={author}>
                <StyledHeaderContent>
                    <Link to={"/"}>
                        <Text style={{color: 'black', fontFamily: 'TTNormsBold' }} mb={0} mt={0} h4>
                            My Education Platform
                        </Text>
                    </Link>
                    <AuthBox />
                </StyledHeaderContent>
                {location.pathname.includes('/author') && (
                    <StyledAuthorTabs>
                        <AuthorTabs />
                    </StyledAuthorTabs>
                )}
            </StyledHeader>
        </StyledHeaderContanier>
    );
};

const StyledHeaderContanier = styled.div`
    padding: 0 24px;
    background-color: aliceblue;
    box-shadow: inset 0 -1px #eaeaea;
    top: 0;
    position: sticky;
    z-index: 1;
`

const StyledHeader = styled.nav<{ author: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  height: 70px;
`


const StyledAuthorTabs = styled.div`
  max-width: 1048px;
  margin: auto;
  width: 100%;
  height: 30px;
`

export default Header;