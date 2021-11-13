import React from 'react';
import {Spacer, Tabs} from "@geist-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {Home} from "@geist-ui/react-icons";

const AuthorTabs = () => {
    const navigate = useNavigate();
    const {courseId} = useParams<"courseId">();

    const changeHandler = (val: string) => navigate(`${val}`);

    return (
        <>
            <Tabs hideDivider initialValue="/author" onChange={changeHandler}>
                <Tabs.Item label={<><Home/></>} value="/author"/>
                <Tabs.Item label="Ваши курсы" value="/author/courses"/>
                <Tabs.Item label="Активность" value="/author/activity"/>

            </Tabs>
        </>

    );
};

export default AuthorTabs;