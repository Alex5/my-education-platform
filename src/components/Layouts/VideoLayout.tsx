import React, {FC, Suspense} from 'react';
import {Button, Description, Grid, Image, Link, Loading, Spacer, Tag, Text} from "@geist-ui/core";
import styled from "styled-components";
import Iframe from "../Author/components/shared/Iframe";
import {ArrowLeft, Youtube} from "@geist-ui/react-icons";
import {useNavigate} from 'react-router-dom';
import AuthorAccountPreview from '../Author/components/AuthorAccountPreview';
import {ISocialInfo} from "../Author/components/AuthorSocialMediaAccounts";
import AppLoader from "../shared/AppLoader";

interface VideoLayoutProps {
    title: string;
    headerActions: React.ReactNode[];
    cover: string;
    accountId: string;
    ownerId: string;
    tags: string[];
    socialAccounts: ISocialInfo[]
    back?: boolean;
}

const VideoLayout: FC<VideoLayoutProps> = (props) => {
    const {title, headerActions, cover, accountId} = props;
    const {ownerId, tags, children, socialAccounts, back} = props;

    const navigate = useNavigate()

    return (
        <>
            <StyledVideoLayoutHeader>
                {back && (
                    <>
                        <ArrowLeft cursor={'pointer'} onClick={() => navigate(-1)}/>
                        <Spacer/>
                    </>
                )}
                <Text h3 children={title}/>
                <StyledHeaderActions>
                    {headerActions?.map((action, index) => <div key={index}>{action}</div>)}
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
                                <Link key={social.id} style={{marginRight: '10px'}} href={social.link}
                                      target={'_blank'}>
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
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fafafa;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #eeeeee;
  margin-bottom: 25px
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