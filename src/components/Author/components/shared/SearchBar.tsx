import React, {FC} from 'react';
import * as Geist from "@geist-ui/react";
import {useLocation} from "react-router-dom";
import {Grid, Spacer} from "@geist-ui/react";

interface SearchBarProps {
    onClick: () => void
}

const SearchBar: FC<SearchBarProps> = ({onClick}) => {
    const location = useLocation();

    return (
        <>
            <Grid.Container gap={2}>
                <Grid xs={24} md={20}>
                    {/*<Geist.Input scale={1.3} icon={<Search/>} width={'100%'} placeholder="Поиск по курсам"/>*/}
                </Grid>
                <Grid xs={24} md={4}>
                    <Geist.Button
                        onClick={onClick}
                        width={"100%"}
                        type="secondary"
                        children={location.pathname === '/author/courses' ? "Новый курс" : "Новое видео"}
                    />
                </Grid>
            </Grid.Container>
            <Spacer/>
        </>

    );
};

export default SearchBar;