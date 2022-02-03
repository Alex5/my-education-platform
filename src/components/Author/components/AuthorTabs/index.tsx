import { Tabs } from '@geist-ui/core';
import React, {useEffect} from 'react';

import {useNavigate} from "react-router-dom";

const AuthorTabs = () => {
    const navigate = useNavigate();
    const changeHandler = (val: string) => navigate(`${val}`);

    useEffect(() => {
        navigate("/author/courses", {replace: true})
    }, [])

    return (
        <>
            <Tabs hideDivider initialValue={"/author/courses"} onChange={changeHandler}>
                <Tabs.Item label="Курсы" value="/author/courses"/>
                <Tabs.Item label="Видео" value="/author/videos"/>
                <Tabs.Item label="Статьи" value="/author/articles"/>
                <Tabs.Item label="Настройки" value="/author/settings"/>
            </Tabs>
        </>

    );
};

export default AuthorTabs;