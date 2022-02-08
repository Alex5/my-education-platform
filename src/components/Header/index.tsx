import { FC } from 'react';
import { Spacer, Text } from "@geist-ui/core";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/slices/userSlice/userSlice";
import AuthorTabs from "../Author/components/AuthorTabs";
import AuthBox from "../AuthBox";
import { Link as GeistLink } from "@geist-ui/core";
import { Github } from '@geist-ui/react-icons';

const Header: FC = () => {
    const { author } = useSelector(getUser);

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <StyledHeaderContanier>
            <StyledHeader author={author}>
                <StyledHeaderContent>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={"/"}>
                            <Text style={{ color: 'black', fontFamily: 'TTNormsBold' }} mb={0} mt={0} h4>
                                My Education Platform
                            </Text>
                        </Link>
                        <Spacer />
                        <GeistLink block href='https://github.com/Alex5/my-education-platform' target={'_blank'}>
                            <Github />
                        </GeistLink>
                        <Spacer />
                        <StyledHeaderGeistLink
                            onClick={() => navigate('/articles/fWbjvhubvRI9_DN5IBt-j')}
                            mb={0}
                            mt={0}
                            type='secondary'
                            children={'О проекте'}
                        />
                    </div>
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
    box-shadow: inset 0 -1px #eaeaea;
    top: 0;
    position: sticky;
    z-index: 1;
    background-color: white;
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
  padding:  12px 0 12px 0;
`

const StyledAuthorTabs = styled.div`
  max-width: 1048px;
  margin: auto;
  width: 100%;
  height: 50px
`

const StyledHeaderGeistLink = styled(Text)`
cursor: pointer;

    &:hover {
        color: black;
    }
`

export default Header;