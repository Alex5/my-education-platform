import {FC, Suspense} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {snipText} from "../../services/helpers";
import {Card, Grid, Loading} from "@geist-ui/core";
import {useRecoilValue} from "recoil";
import {tagsQuery} from "./selectors";

interface TagsProps {
    maxTags?: number;
}

const Tags: FC<TagsProps> = ({maxTags}) => {
    const TagsComponent = () => {
        const tags = useRecoilValue(tagsQuery);
        const uniqTags = Array.from(new Set([...tags])).slice(0, maxTags);

        const [location, navigate] = [useLocation(), useNavigate()];

        const navigateToTag = (tag: string) => {
            const path = location.pathname.includes('tags') ? tag : `tags/${tag}`;
            return () => navigate(path, {replace: true});
        }

        return (
            <Grid.Container gap={1}>
                {uniqTags?.map(tag => (
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
    }

    return <Suspense fallback={<Loading/>} children={<TagsComponent/>}/>
};

export default Tags;