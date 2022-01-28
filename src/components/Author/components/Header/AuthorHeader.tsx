import styled from "styled-components";

const AuthorHeader = () => {
    return (
        <StyledAuthorHeader>
            <StyledAuthorHeaderContent>
                Header
            </StyledAuthorHeaderContent>
            <StyledAuthorHeaderTabs>
            </StyledAuthorHeaderTabs>
        </StyledAuthorHeader>
    );
};

const StyledAuthorHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`

const StyledAuthorHeaderContent = styled.div`
  width: 1024px;
  background-color: wheat;
  padding: 15px;
`

const StyledAuthorHeaderTabs = styled.div`
  box-sizing: border-box;
  width: 750pt;
  height: 100%;
  z-index: 900;
  margin: 0px auto;

  .content.jsx-1486330690 {
    padding-top: 0;
  }
`

export default AuthorHeader;