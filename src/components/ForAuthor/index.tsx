import React, {useEffect} from 'react';
import {Page, Text} from "@geist-ui/react";
import {useSelector} from "react-redux";
import {getUser} from "../../redux/slices/userSlice/userSlice";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

const ForAuthor = () => {
    const {author} = useSelector(getUser);

    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || '';

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