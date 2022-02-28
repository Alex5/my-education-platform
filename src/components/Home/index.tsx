import React, {FC, memo, useEffect, useState} from 'react';
import {Card, Grid, Loading, Page, Spacer, Text} from "@geist-ui/core";
import {Code, Figma} from "@geist-ui/react-icons";
import styled from "styled-components";
import {PublicRequests} from "../../api/publicRequests";
import {NavLink, useNavigate} from "react-router-dom";
import Tags from "../Tags";
import NewCourses from "../NewCourses";
import { courseDeclinations } from '../../services/helpers';

const Home: FC = () => {
    const navigate = useNavigate();

    const CourseSize = memo(({direction}: any) => {
        const [size, setSize] = useState(0);
        const [load, setLoad] = useState(false);

        useEffect(() => {
            (async () => {
                setLoad(true)
                const number = await PublicRequests.getCoursesSize(direction);
                setLoad(false);
                setSize(number);
            })()
        }, [direction])

        return load ? <Loading/> : <Text>{size} {courseDeclinations(size)}</Text>
    })

    return (
       <>
           <Text h4>Новые курсы</Text>
           <NewCourses courseLimit={3}/>
           <Spacer h={5}/>
           <Text h4>Курсы по тегам</Text>
           <Tags maxTags={8}/>
           <Page.Content>
               <Text h1>Направления</Text>
               <Text>Все наши курсы разбиты по направлениям, выберите какое вам нравится.</Text>
               <Spacer/>
               <Grid.Container gap={2}>
                   <Grid xs={24} md={8}>
                       <Card style={{cursor: 'pointer'}} onClick={() => navigate('/programming')} width="100%"
                             hoverable>
                           <StyledCardContent>
                               <Code color={"#1482ff"}/>
                               <Text h4 mb={0} mt={0}>Программирование</Text>
                           </StyledCardContent>
                           <Card.Footer>
                               <CourseSize direction={"programming"}/>
                           </Card.Footer>
                       </Card>
                   </Grid>
                   <Grid xs={24} md={8}>
                       <Card style={{cursor: 'pointer'}} onClick={() => navigate('/design')} width="100%"
                             hoverable>
                           <StyledCardContent>
                               <Figma color={"#8a63d2"}/>
                               <Text h4 mb={0} mt={0}>Дизайн</Text>
                           </StyledCardContent>
                           <Card.Footer>
                               <CourseSize direction={"design"}/>
                           </Card.Footer>
                       </Card>
                   </Grid>
               </Grid.Container>
           </Page.Content>
       </>
    );
};

export const StyledCardContent = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`

const StyledSidebar = styled.nav`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
  
  a {

    text-decoration: none;
    color: black;
    padding: 10px;
    border-radius: 10px;
    transition: ease-in-out 0.3s;
  }

  .active {
    font-weight: 500;
    color: #0070F3;
    background-color: #FAFAFA;
  }
`

const StyledNavLink = styled(NavLink)`

`

export default Home;