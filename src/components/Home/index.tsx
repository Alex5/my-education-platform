import React, {FC} from 'react';
import {Page, Text, Grid, Card, Spacer} from "@geist-ui/react";
import {useNavigate} from 'react-router-dom';
import {BarChart, Code, Figma} from "@geist-ui/react-icons";
import styled from "styled-components";

const Home: FC = () => {
    let navigate = useNavigate();

    return (
        <Page.Content>
            <Text h1>Направления</Text>
            <Text>Все наши курсы разбиты по направлениям, выберите какое вам нравится.</Text>
            <Spacer/>
            <Grid.Container gap={2}>
                <Grid xs={24} md={8}>
                    <Card style={{cursor: 'pointer'}} onClick={() => navigate('/programming')} width="100%" hoverable>
                        <StyledCardContent>
                            <Code color={"#1482ff"}/>
                            <Text h4 mb={0} mt={0}> Программирование</Text>
                        </StyledCardContent>
                        <Card.Footer>
                            <Text>5 курсов</Text>
                        </Card.Footer>
                    </Card>
                </Grid>
            </Grid.Container>
        </Page.Content>
    );
};

export const StyledCardContent = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`

export default Home;