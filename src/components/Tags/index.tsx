import React, {FC, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Grid, Spinner} from "@geist-ui/react";
import {PublicRequests} from "../../api/publicRequests";
import {snipText} from "../../services/helpers";
import styled from "styled-components";

interface TagsProps {
    length?: number;
}

const Tags: FC<TagsProps> = ({length}) => {
    const [tags, setTags] = useState<string[]>([]);
    const [load, setLoad] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        try {
            setLoad(true);
            PublicRequests.getTags().then(tags => {
                const uniqTags = new Set([...tags])
                setTags(length ? Array.from(uniqTags).slice(0, length) : Array.from(uniqTags));
                setLoad(false);
            })
        } catch (e) {
            alert(e)
            setLoad(false);
        }

    }, [length])

    const navigate = useNavigate();

    const navigateToTag = (tag: string) => {
        const path = location.pathname.includes('tags') ? tag : `tags/${tag}`;
        return () => navigate(path, {replace: true});
    }

    return (
        <Grid.Container gap={1}>
            {load
                ? <Spinner/>
                : tags && tags.map(tag => (
                <Grid key={tag}>
                    <StyledTag
                        onClick={navigateToTag(tag)}
                    >
                        {snipText(tag, 10)}
                    </StyledTag>
                </Grid>
            ))}
        </Grid.Container>
    );
};

const StyledTag = styled.div`
  background-color: #f2f2f2;
  border-radius: 5px;
  border: 1px solid #e7e7e7;
  cursor: pointer;
  padding: 5px 10px 5px 10px;
`

export default Tags;