import React, {FC} from 'react';
import {Button, Description, Grid, Image, Link, Loading, Spacer, Tag, Text} from "@geist-ui/core";
import styled from "styled-components";
import Iframe from "../Author/components/shared/Iframe";
import {Youtube} from "@geist-ui/react-icons";
import {useNavigate} from 'react-router-dom';
import AuthorAccountPreview from '../Author/components/AuthorAccountPreview';
import {ISocialInfo} from "../Author/components/AuthorSocialMediaAccounts";

interface VideoLayoutProps {
    title: string;
    headerActions: React.ReactNode[];
    cover: string;
    accountId: string;
    ownerId: string;
    tags: string[];
    socialAccounts: ISocialInfo[]
}

const VideoLayout: FC<VideoLayoutProps> = (
    {
        title,
        headerActions,
        cover,
        accountId,
        ownerId,
        tags,
        children,
        socialAccounts
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
                        <AuthorAccountPreview accountId={accountId} ownerId={ownerId}/>
                    </StyledBubble>
                    <Spacer/>
                    <StyledBubble>
                        <Description title="Соц. сети автора" content={<>
                            <Spacer/>
                            {socialAccounts && socialAccounts.map(social => (
                                <Link key={social.id} style={{marginRight: '10px'}} href={social.link} target={'_blank'}>
                                    <img
                                        height={'24px'}
                                        src={social.icon}
                                        alt={social.company}
                                        title={social.name}
                                    />
                                </Link>

                            ))}
                        </>}/>
                    </StyledBubble>
                    <Spacer/>
                    <StyledBubble>
                        <Description title="Теги" content={<StyledTags>
                            {tags && tags.map(tag => (
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