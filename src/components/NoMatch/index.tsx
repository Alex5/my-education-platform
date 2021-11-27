import React from 'react';
import {Display, Image} from "@geist-ui/react";
import noMatch from "../../assets/404.svg";

const NoMatch = () => {
    return (
        <Display caption="Houston, we have a problem...">
            <Image width="435px" src={noMatch}/>
        </Display>
    );
};

export default NoMatch;