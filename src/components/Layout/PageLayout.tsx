import React, { FC } from 'react';
import { Button, Grid, Spacer, Text } from "@geist-ui/core";
import { Breadcrumbs } from "../index";
import styled from 'styled-components';

interface PageLayoutProps {
    title: string | React.ReactNode;
    subTitle?: string;
    headerActions?: React.ReactNode[];
}

const PageLayout: FC<PageLayoutProps> = ({ title, subTitle, children, headerActions }) => {
    return (
        <Grid.Container>
            <Grid.Container>
                <StyledPageLayoutHeader>
                    <StyledPageLayoutHeaderTitle>
                        {typeof title === 'string'
                            ? <Text h3 mb={0} mt={0} children={title} />
                            : title}
                            <Spacer/>
                        <Text type={'secondary'} small mb={0} mt={0} children={subTitle} />
                    </StyledPageLayoutHeaderTitle>
                    <StyledPageLayoutHeaderActions>
                        {headerActions && headerActions.map(action => action)}
                    </StyledPageLayoutHeaderActions>
                </StyledPageLayoutHeader>
            </Grid.Container>
            <Spacer h={3} />
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