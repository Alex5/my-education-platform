import {Image, Spacer, Text, Display} from '@geist-ui/react';
import React from 'react';
import dev from "../../../../assets/developer.svg"

const AuthorHome = () => {

    return (
        <>
            <Text h3 b children={"Дашборд"}/>
            <Spacer/>
            <Display caption="Страница находится в разработке.">
                <Image width="435px" src={dev}/>
            </Display>
        </>
    );
};

export default AuthorHome;