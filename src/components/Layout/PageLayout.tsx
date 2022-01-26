import React, {FC} from 'react';
import {Grid, Spacer, Text} from "@geist-ui/react";
import {Breadcrumbs} from "../index";

interface PageLayoutProps {
    title: string
}

const PageLayout: FC<PageLayoutProps> = ({title, children}) => {
    return (
        <Grid.Container>
            <Grid xs={0} md={24} lg={24}>
                <Breadcrumbs/>
                <Spacer/>
            </Grid>
            <Grid xs={24} md={24}>
                <Text h3 children={title}/>
            </Grid>
            <Spacer h={3}/>
            {children}
        </Grid.Container>
    );
};

export default PageLayout;