import React, {FC} from 'react';
import {Grid, Spacer, Text} from "@geist-ui/core";
import styled from 'styled-components';
import {ArrowLeft} from "@geist-ui/react-icons";
import {useNavigate} from "react-router-dom";

interface PageLayoutProps {
    title?: string | React.ReactNode;
    subTitle?: string;
    headerActions?: React.ReactNode;
    back?: boolean;
}

const PageLayout: FC<PageLayoutProps> = ({title, subTitle, back, children, headerActions}) => {
    const navigate = useNavigate();

    return (
        <Grid.Container>
            {title && (
                <StyledPageLayoutHeader>
                    <StyledPageLayoutHeaderTitle>
                        {back && (
                            <>
                                <ArrowLeft cursor={'pointer'} onClick={() => navigate(-1)}/>
                                <Spacer/>
                            </>
                        )}
                        <Text h3 mb={0} mt={0} children={title}/>
                        <Spacer/>
                        <Text type={'secondary'} small mb={0} mt={0} children={subTitle}/>
                    </StyledPageLayoutHeaderTitle>
                    <StyledPageLayoutHeaderActions>
                        {headerActions}
                    </StyledPageLayoutHeaderActions>
                </StyledPageLayoutHeader>
            )}
            <Grid direction='column' xs={24} md={24}>
                {children}
            </Grid>
        </Grid.Container>
    );
};

const StyledPageLayoutHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fafafa;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #eeeeee;
  margin-bottom: 25px
`

const StyledPageLayoutHeaderActions = styled.div`
  display: flex;
  align-items: center;
`
const StyledPageLayoutHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export default PageLayout;