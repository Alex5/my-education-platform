import React, {FC, useEffect, useState} from 'react';
import {Button, Card, Description, Fieldset, Loading, Spacer, Text} from "@geist-ui/core";
import {PublicRequests} from "../../api/publicRequests";
import {IYouTubeComment} from "./types";
import {Heart} from "@geist-ui/react-icons";

interface TestimonialsProps {
    videoId: string | undefined
}

const Testimonials: FC<TestimonialsProps> = ({videoId}) => {
    const [load, setLoad] = useState<boolean>(false);
    const [comments, setComments] = useState<IYouTubeComment[]>([])

    useEffect(() => {
        setLoad(true)
        PublicRequests
            .getTestimonials(videoId || '')
            .then(comments => {
                setComments(comments);
                setLoad(false);
            })
    }, [videoId])

    return (
        <Fieldset>
            <Fieldset.Title children="Отзывы c YouTube"/>
            <Spacer/>
            <Fieldset.Subtitle>
                {load
                    ? <Loading/>
                    : comments && comments.map(comment =>
                    <Card mb={1} key={comment.id}>
                        <Description
                            title={comment.snippet.topLevelComment.snippet.authorDisplayName}
                            content={comment.snippet.topLevelComment.snippet.textOriginal}/>
                        <div style={{display: 'flex'}}>
                            <Text
                                type={"secondary"}
                            >
                                {new Date(comment.snippet.topLevelComment.snippet.updatedAt).toLocaleDateString()}
                            </Text>
                            <Spacer/>
                            <Text
                                type={"secondary"}
                            >
                                {new Date(comment.snippet.topLevelComment.snippet.updatedAt).toLocaleTimeString()}
                            </Text>
                        </div>
                        <div style={{display: 'flex'}}>
                            <Button type="abort" scale={1/2} icon={<Heart />} auto>{comment.snippet.topLevelComment.snippet.likeCount}</Button>
                        </div>
                    </Card>
                )
                }
                <Spacer/>
            </Fieldset.Subtitle>
        </Fieldset>
    );
};

export default Testimonials;