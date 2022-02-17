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
    length?: number
}

const SnipText: FC<SnipTextProps> = ({text, h1, h2, h3, h4, h5, length}) => {
    return (
        <>
            {text && text.length < 25
                ? <Geist.Text margin={0} h1={h1} h2={h2} h3={h3} h4={h4} h5={h5}>{snipText(text, length)}</Geist.Text>
                : <Tooltip type="dark" text={text}>
                    <Geist.Text margin={0} h1={h1} h2={h2} h3={h3} h4={h4} h5={h5}>{snipText(text, length)}</Geist.Text>
                </Tooltip>
            }
        </>
    )
}

export default SnipText;