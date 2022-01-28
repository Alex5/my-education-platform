import React, {FC} from 'react';
import {Text, Tooltip} from "@geist-ui/core";
import {snipText} from "../../services/helpers";
import * as Geist from "@geist-ui/core";

interface SnipTextProps {
    text: string;
    h1?: boolean
    h2?: boolean
    h3?: boolean
    h4?: boolean
    h5?: boolean
}

const SnipText: FC<SnipTextProps> = ({text, h1, h2, h3, h4, h5}) => {
    return (
        <>
            {text && text.length < 25
                ? <Geist.Text h1={h1} h2={h2} h3={h3} h4={h4} h5={h5}>{snipText(text)}</Geist.Text>
                : <Tooltip text={text}>
                    <Geist.Text h1={h1} h2={h2} h3={h3} h4={h4} h5={h5}>{snipText(text)}</Geist.Text>
                </Tooltip>
            }
        </>
    )
}

export default SnipText;