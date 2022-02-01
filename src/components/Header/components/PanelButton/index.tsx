import React, {FC, useContext, useState} from 'react';
import {Auth, User} from 'firebase/auth';
import {Avatar, Button} from "@geist-ui/core";
import {PublicRequests} from "../../../../api/publicRequests";
import {EStatus} from "../../../../redux/enums";
import {getUser, getUserLoading, setUser} from "../../../../redux/slices/userSlice/userSlice";
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

    const userLoading = useSelector(getUserLoading);

    return (
        <>
            {!location.pathname.includes('/author') && (
                <Button
                    loading={userLoading && transformLoad}
                    scale={1 / 2}
                    onClick={() => user.author ? navigate('/author') : transformToAuthor}
                    auto
                    children={user.author ? "Панель автора" : "Стать автором"}
                />
            )}
        </>
    )
};


export default PanelButton;