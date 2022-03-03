import React, {FC} from 'react';
import {Card, Image} from "@geist-ui/core";
import SnipText from "../../../../shared/SnipText";

interface P {
    name: string;
    cover: string;
    onClick: () => void
}

const AuthorVideo: FC<P> = ({name,cover, onClick}) => {
    return (
        <Card hoverable style={{cursor: 'pointer'}} onClick={onClick}>
            <SnipText length={30} h5 text={name}/>
            <Image src={cover}/>
        </Card>
    );
};

export default AuthorVideo;