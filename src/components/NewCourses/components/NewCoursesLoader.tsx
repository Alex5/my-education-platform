import React, {ReactNode} from 'react';
import {Grid} from "@geist-ui/core";
import ContentLoader, {IContentLoaderProps} from "react-content-loader";

const NewCoursesLoader = () => {
    const NewCourseLoader = (props: JSX.IntrinsicAttributes & IContentLoaderProps & { children?: ReactNode; }) => (
        <ContentLoader
            speed={2}
            width={293}
            height={128}
            viewBox="0 0 293 128"
            backgroundColor="#ededed"
            foregroundColor="#ffffff"
            {...props}
        >
            <circle cx="49" cy="83" r="42"/>
            <rect x="101" y="46" rx="0" ry="0" width="184" height="20"/>
            <circle cx="121" cy="105" r="20"/>
            <rect x="155" y="86" rx="0" ry="0" width="130" height="15"/>
            <rect x="156" y="110" rx="0" ry="0" width="130" height="13"/>
        </ContentLoader>
    )

    return (
        <Grid.Container>
            <Grid xs={24} md={8}>
                <NewCourseLoader/>
            </Grid>
            <Grid xs={24} md={8}>
                <NewCourseLoader/>
            </Grid>
            <Grid xs={24} md={8}>
                <NewCourseLoader/>
            </Grid>
        </Grid.Container>
    );
};

export default NewCoursesLoader;