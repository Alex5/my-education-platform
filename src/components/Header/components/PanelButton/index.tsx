import React, {FC, useContext, useState} from 'react';
import {Auth, User} from 'firebase/auth';
import {Avatar, Button} from "@geist-ui/core";
import {PublicRequests} from "../../../../api/publicRequests";
import {EStatus} from "../../../../redux/enums";
import {getUser, setUser} from "../../../../redux/slices/userSlice/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";

interface PanelButtonProps {

}

const PanelButton: FC<PanelButtonProps> = () => {
    const [transformLoad, setTransformLoad] = useState(false);

    const user = useSelector(getUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()


    const transformToAuthor = async () => {
        setTransformLoad(true)
        const updatedUser = await PublicRequests.transformAccount(user?.uid || '', EStatus.author);
        dispatch(setUser(updatedUser));
        setTransformLoad(false)
    }

    return (
        <>
            {user.author
                ? !location.pathname.includes('/author') &&
                <Button scale={1 / 2} onClick={() => navigate('/author')} auto
                        children="Панель автора"/>
                : <Button loading={transformLoad} onClick={transformToAuthor} scale={1 / 2}
                          type="secondary"
                          children="Стать автором"/>}
        </>
    )
};


export default PanelButton;