import React, {FC} from 'react';
import {Button, Description, Grid, Image, Link, Loading, Spacer, Tag, Text} from "@geist-ui/core";
import styled from "styled-components";
import Iframe from "../Author/components/shared/Iframe";
import {Youtube} from "@geist-ui/react-icons";
import {IAuthor} from "../../redux/slices/coursesSlice/types";
import {useNavigate} from 'react-router-dom';

interface VideoLayoutProps {
    title: string;
    headerActions: React.ReactNode[],
    cover: string,
    info: {
        author: IAuthor,
        tags: string[]
    }
}

const VideoLayout: FC<VideoLayoutProps> = (
    {
        title,
        headerActions,
        cover,
        info,
        children
    }) => {

    const navigate = useNavigate()

    return (
        <>
            <StyledVideoLayoutHeader>
                <Text h3 children={title}/>
                <StyledHeaderActions>
                    {headerActions && headerActions.map(action => action)}
                </StyledHeaderActions>
            </StyledVideoLayoutHeader>
            <Spacer/>
            <Grid.Container gap={2}>
                <Grid xs={24} md={18}>
                    <Image src={cover}/>
                </Grid>
                <Grid xs={24} md={6} direction={"column"}>
                    <StyledBubble>
                        <Description title="Автор" content={info.author.name}/>
                    </StyledBubble>
                    <Spacer/>
                    <StyledBubble>
                        <Description title="Соц. сети автора" content={<>
                            <Link target={"_blank"} href={info.author.channelLink}>
                                <Youtube/>
                            </Link>
                        </>}/>
                    </StyledBubble>
                    <Spacer/>
                    <StyledBubble>
                        <Description title="Теги" content={<StyledTags>
                            {info.tags && info.tags.map(tag => (
                                    <Tag
                                        style={{cursor: 'pointer'}}
                                        onClick={() => navigate(`/tags/${tag}`)}
                                        type={"lite"}
                                        key={tag}
                                        scale={1 / 2}>{tag}
                                    </Tag>
                                )
                            )}
                        </StyledTags>}/>
                    </StyledBubble>
                    <Spacer/>
                </Grid>
            </Grid.Container>
            <Spacer/>
            <StyledVideoLayoutBody>
                {children}
            </StyledVideoLayoutBody>
        </>
    );
};

const StyledVideoLayoutHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

const StyledHeaderActions = styled.div`
display: flex;
align-items: center;
`

const StyledVideoLayoutBody = styled.div``

const StyledBubble = styled.div`
  background-color: #f7f7f7;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #e3e3e3;
`

const StyledTags = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`

export default VideoLayout;