import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Grid, Tag} from "@geist-ui/react";

const Tags = () => {
    const tags = ["react", "redux-toolkit", "react router 6", 'front-end', 'что учить в 2022', 'roadmap']
    const navigate = useNavigate();

    return (
        <Grid.Container gap={1}>
            {tags.map(tag => (
                <Grid>
                    <Tag onClick={() => navigate(`tags/${tag}`)} style={{cursor: 'pointer'}} scale={1.5}
                         type="lite">{tag}</Tag>
                </Grid>
            ))}
        </Grid.Container>
    );
};

export default Tags;