import React, {FC} from 'react';
import * as Geist from "@geist-ui/react";
import {Tooltip} from "@geist-ui/react";
import {snipText} from "../../services/helpers";

interface TextSnippetProps {
    text: string
}

const TextSnippet: FC<TextSnippetProps> = ({text}) => {
    return (
        <Tooltip text={text}>
            <Geist.Text h4>{snipText(text)}</Geist.Text>
        </Tooltip>
    );
};

export default TextSnippet;