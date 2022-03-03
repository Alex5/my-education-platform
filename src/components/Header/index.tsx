import {FC} from 'react';
import {Button, Spacer, Text, useMediaQuery} from "@geist-ui/core";
import styled from "styled-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUser} from "../../redux/slices/userSlice/userSlice";
import AuthorTabs from "../Author/components/AuthorTabs";
import AuthBox from "../AuthBox";
import {Link as GeistLink} from "@geist-ui/core";
import {Github} from '@geist-ui/react-icons';

const Header: FC = () => {
    const {author} = useSelector(getUser);

    const location = useLocation();
    const navigate = useNavigate();

    const isXS = useMediaQuery('xs')

    const isAuthorPages = location.pathname.includes('/author');

    return (
        <>
            <StyledHeaderContanier isAuthorPages={isAuthorPages}>
                <StyledHeader author={author}>
                    <StyledHeaderContent>

                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Link to={"/"}>
                                <Text style={{color: 'black', fontFamily: 'TTNormsBold'}} mb={0} mt={0} h4>
                                    {isXS ? 'MEP' : 'My Education Platform'}
                                </Text>
                            </Link>
                            <Spacer/>
                            <Button
                                onClick={() => window.open('https://github.com/Alex5/my-education-platform', '_blank')}
                                padding={0.5} auto icon={<Github/>}/>
                            {!isXS && (
                                <StyledHeaderGeistLink
                                    onClick={() => navigate('/articles/fWbjvhubvRI9_DN5IBt-j')}
                                    mb={0}
                                    mt={0}
                                    ml={1}
                                    type='secondary'
                                    children={'О проекте'}
                                />
                            )}
                        </div>
                        <AuthBox/>
                    </StyledHeaderContent>
                </StyledHeader>
            </StyledHeaderContanier>
            {isAuthorPages && (
                <StyledAuthorTabsContainer isAuthorPages={isAuthorPages}>
                    <StyledAuthorTabs>
                        <AuthorTabs/>
                    </StyledAuthorTabs>
                </StyledAuthorTabsContainer>
            )}
        </>

    );
};

const StyledHeaderContanier = styled.div<{ isAuthorPages: boolean }>`
  height: 80px;
  padding: 0 24px;
  backdrop-filter: saturate(180%) blur(5px);
  background-color: white;
  box-shadow: ${props => props.isAuthorPages ? '' : '0 0 15px 0 rgb(0 0 0 / 10%)'};
  display: flex;
  flex-direction: column;
  top: ${props => props.isAuthorPages ? '' : 0};
  position: ${props => props.isAuthorPages ? '' : 'sticky'};
  z-index: 999;
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
  padding: 12px 0 12px 0;
`

const StyledAuthorTabsContainer = styled.div<{ isAuthorPages: boolean }>`
  width: 100%;
  height: 48px;
  background-color: white;
  top: ${props => props.isAuthorPages ? '0' : ''};
  position: ${props => props.isAuthorPages ? 'sticky' : ''};
  z-index: 999;
  box-shadow: ${props => props.isAuthorPages ? '0px 15px 15px -15px rgb(0 0 0 / 10%)' : ''};
`

const StyledAuthorTabs = styled.div`
  max-width: 1048px;
  margin: auto;


`

const StyledHeaderGeistLink = styled(Text)`
  cursor: pointer;

  &:hover {
    color: black;
  }
`

export default Header;