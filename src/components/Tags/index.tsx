import React, {FC, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Grid, Spinner} from "@geist-ui/react";
import {PublicRequests} from "../../api/publicRequests";
import {snipText} from "../../services/helpers";

interface TagsProps {
    length?: number;
}

const Tags: FC<TagsProps> = ({length}) => {
    const [tags, setTags] = useState<string[]>([]);
    const [load, setLoad] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        setLoad(true);
        PublicRequests.getTags().then(tags => {
            const uniqTags = new Set([...tags])
            setTags(length ? Array.from(uniqTags).slice(0, length) : Array.from(uniqTags));
            setLoad(false);
        })
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
                <Grid>
                    <Button
                        onClick={navigateToTag(tag)}
                        auto
                        scale={1 / 2}
                        ghost
                        type={"secondary"}
                    >
                        {snipText(tag, 10)}
                    </Button>
                </Grid>
            ))}
            {location.pathname !== '/tags' && (
                <Grid>
                    <Button
                        onClick={() => navigate(`tags`, {replace: true})}
                        scale={1 / 2}
                        type="secondary-light"
                        auto
                    >
                        Все теги
                    </Button>
                </Grid>
            )}
        </Grid.Container>
    );
};

export default Tags;