import React, {FC, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Grid, Spinner} from "@geist-ui/core";
import {PublicRequests} from "../../api/publicRequests";
import {snipText} from "../../services/helpers";
import {Card} from "@geist-ui/core";

interface TagsProps {
    maxTags?: number;
}

const Tags: FC<TagsProps> = ({maxTags}) => {
    const [tags, setTags] = useState<string[]>([]);
    const [load, setLoad] = useState<boolean>(false);

    const [location, navigate] = [useLocation(), useNavigate()];

    const navigateToTag = (tag: string) => {
        const path = location.pathname.includes('tags') ? tag : `tags/${tag}`;
        return () => navigate(path, {replace: true});
    }

    useEffect(() => {
        try {
            setLoad(true);
            PublicRequests.getTags().then(tags => {
                const uniqTags = new Set([...tags])

                setTags(maxTags ? Array.from(uniqTags).slice(0, maxTags) : Array.from(uniqTags));
                setLoad(false);
            })
        } catch (e) {
            alert(e)
            setLoad(false);
        }

    }, [maxTags])

    return (
        <Grid.Container gap={1}>
            {load
                ? <Spinner/>
                : tags && tags.map(tag => (
                <Grid key={tag}>
                    <Card style={{cursor: 'pointer'}} hoverable onClick={navigateToTag(tag)}>
                        <Card.Content padding={0.3}>
                            {snipText(tag, 10)}
                        </Card.Content>
                    </Card>
                </Grid>
            ))}
        </Grid.Container>
    );
};

export default Tags;