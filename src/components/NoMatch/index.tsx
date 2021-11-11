import React from 'react';
import {Display} from "@geist-ui/react";

const NoMatch = () => {
    return (
        <Display caption="Раздел пока не готов.">
            <span style={{fontSize: "100px"}}>&#128580;</span>
        </Display>
    );
};

export default NoMatch;