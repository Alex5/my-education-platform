import React, {useEffect} from 'react';
import {Tabs} from "@geist-ui/react";
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
                <Tabs.Item label="Мои курсы" value="/author/courses"/>
                {/*<Tabs.Item label="Менторство" value="/author/mentoring"/>*/}
                {/*<Tabs.Item label="Настройки" value="/author/settings"/>*/}
            </Tabs>
        </>

    );
};

export default AuthorTabs;