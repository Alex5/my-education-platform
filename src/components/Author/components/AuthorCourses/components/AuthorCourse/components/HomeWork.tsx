import React from 'react';
import {Fieldset, Spacer, Text, Textarea} from "@geist-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {vs} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {IHomeWork} from "../../../../../../../redux/slices/coursesSlice/types";

const HomeWork = (hw: IHomeWork) => {
    return (
        <>
            <Fieldset>
                <Fieldset.Subtitle>
                    <Text>Описание</Text>
                    <Textarea value={hw.description} width={"100%"}/>
                    <Text>Код</Text>
                    <SyntaxHighlighter language="javascript" style={vs}>
                        {hw.code}
                    </SyntaxHighlighter>
                </Fieldset.Subtitle>
            </Fieldset>
            <Spacer/>
        </>

    );
};

export default HomeWork;