import React, {useEffect} from 'react';
import {Tabs} from "@geist-ui/react";
import {useNavigate, Navigate} from "react-router-dom";
import {Home} from "@geist-ui/react-icons";

const AuthorTabs = () => {
    const navigate = useNavigate();
    const changeHandler = (val: string) => navigate(`${val}`);

    useEffect(() => {
        navigate("/author", {replace: true})
    }, [])

    return (
        <div style={{marginBottom: '20px'}}>
            <Tabs hideDivider initialValue={"/author"} onChange={changeHandler}>
                <Tabs.Item label={<><Home/></>} value="/author"/>
                <Tabs.Item label="Ваши курсы" value="/author/courses"/>
                <Tabs.Item label="Активность" value="/author/activity"/>
            </Tabs>
        </div>

    );
};

export default AuthorTabs;