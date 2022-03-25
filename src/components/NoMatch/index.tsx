import React from 'react';
import {Button, Display, Image} from "@geist-ui/core";
import noMatch from "../../assets/404.svg";
import {useNavigate} from "react-router-dom";

const NoMatch = () => {
    const navigate = useNavigate();
    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '440px', alignItems: 'center'}}>
                <Display caption="Страница не найдена...">
                    <Image width="435px" src={noMatch}/>
                </Display>
                <Button width={'100%'} onClick={() => navigate(-1)} type={'secondary'} children={'Назад'} />
            </div>
        </div>
    );
};

export default NoMatch;