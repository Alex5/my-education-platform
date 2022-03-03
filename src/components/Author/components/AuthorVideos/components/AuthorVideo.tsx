import React, {FC} from 'react';
import {Badge, Card, Image, Popover, Spacer} from "@geist-ui/core";
import SnipText from "../../../../shared/SnipText";
import {MoreVertical} from "@geist-ui/react-icons";
import MenuContent from "./MenuContent";
import {IVideo} from "../../../../../redux/slices/videosSlice/types";

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