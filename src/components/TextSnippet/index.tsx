import React, {FC} from 'react';
import * as Geist from "@geist-ui/react";
import {Tooltip} from "@geist-ui/react";
import {snipText} from "../../services/helpers";

interface TextSnippetProps {
    text: string
}

const TextSnippet: FC<TextSnippetProps> = ({text}) => {
    const checkVisible = text.length > 25;

    return (
        <Tooltip visible={checkVisible} text={text}>
            <Geist.Text h4>{snipText(text)}</Geist.Text>
        </Tooltip>
    );
};

export default TextSnippet;