import React, {FC} from 'react';
import {Page, Text, Grid, Card, Image} from "@geist-ui/react";
import {Link} from 'react-router-dom';

const Home: FC = () => {
    return (
        <Page.Content>
            <Text h1>Направления</Text>
            <Grid.Container gap={2} justify="flex-start">
                <Grid xs={6}>
                    <Link to="/programming">
                        <Card shadow>
                            <Image
                                src="https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg"
                                draggable={false}
                            />
                            <Text h4 mb={0}>Программирование</Text>
                            <Text type="secondary" small>3 курса.</Text>
                        </Card>
                    </Link>
                </Grid>
                <Grid xs={6}>
                    <Link to="/design">
                        <Card shadow>
                            <Image
                                src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg"
                                draggable={false}
                            />
                            <Text h4 mb={0}>Дизайн</Text>
                            <Text type="secondary" small>1 курс.</Text>
                        </Card>
                    </Link>
                </Grid>
            </Grid.Container>
        </Page.Content>
    );
};

export default Home;