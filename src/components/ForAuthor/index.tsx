import React, {useEffect} from 'react';
import {Page, Text} from "@geist-ui/core";
import {useSelector} from "react-redux";
import {getUser} from "../../redux/slices/userSlice/userSlice";
import {useLocation, useNavigate} from "react-router-dom";

const ForAuthor = () => {
    const {author} = useSelector(getUser);

    const navigate = useNavigate();

    const location = useLocation();
    // @ts-ignore
    const from = location.state?.from?.pathname || '';

    useEffect(() => {
        return author ? navigate(from) : navigate('/for-author');
    }, [author, from, navigate])

    return (
        <Page.Content>
            <Text children={"Работайте в свое удовольствие"}/>
        </Page.Content>
    );
};

export default ForAuthor;