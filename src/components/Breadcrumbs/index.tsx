import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Breadcrumbs as GBreadcrumbs, Spacer} from "@geist-ui/react";
import useBreadcrumbs, {BreadcrumbMatch} from 'use-react-router-breadcrumbs';
import {PublicRequests} from "../../api/publicRequests";
import {useSelector} from "react-redux";
import {getVideos} from "../../redux/slices/videosSlice";
import {getCourses} from "../../redux/slices/coursesSlice/coursesSlice";

interface IBreadcrumb {
    id: string;
    name: string;
}

const Breadcrumbs = () => {
    const {courseDirection} = useParams<"courseDirection">();
    const {tagName} = useParams<"tagName">();
    const navigate = useNavigate();
    const videos = useSelector(getVideos);
    const courses = useSelector(getCourses);

    const directionNameById = {
        [`${courseDirection}`]: 'Программирование'
    }

    const coursesNameById: IBreadcrumb[] = courses.map(video => ({
        name: video.name,
        id: video.courseId
    }));

    const videosNameById: IBreadcrumb[] = videos.map(video => ({
        name: video.name,
        id: video.videoId
    }));

    const DynamicUserBreadcrumb = ({match}: { match: BreadcrumbMatch }) => (
        // @ts-ignore
        <span>{coursesNameById.find(video => video.id === match.params.courseId)?.name}</span>
    );

    const DynamicDirectionBreadcrumb = ({match}: { match: BreadcrumbMatch }) => (
        <span>{directionNameById[match.params.courseDirection || '']}</span>
    );

    const DynamicVideosBreadcrumb = ({match}: { match: BreadcrumbMatch }) => (
        <span>{videosNameById.find(video => video.id === match.params.videoId)?.name}</span>
    );

    const routes = [
        {path: '/', breadcrumb: 'Главная'},
        {path: '/:courseDirection', breadcrumb: DynamicDirectionBreadcrumb},
        {path: '/:courseDirection/:courseId', breadcrumb: DynamicUserBreadcrumb},
        {path: '/videos/', breadcrumb: 'Видео'},
        {path: '/videos/:videoId', breadcrumb: DynamicVideosBreadcrumb},
        {path: '/:courseDirection/:courseId/lessons', breadcrumb: 'Уроки'},
        {path: '/account', breadcrumb: 'Аккаунт'},
        {path: '/tags', breadcrumb: 'Теги'},
        {path: '/tags/:tagName', breadcrumb: tagName},
    ];

    const breadcrumbs = useBreadcrumbs(routes)

    return (
        <>
            <>
                <GBreadcrumbs>
                    {breadcrumbs.map(({match, breadcrumb}) =>
                        <GBreadcrumbs.Item
                            href={''}
                            onClick={(e) => {
                                e.preventDefault()
                                navigate(match.pathname)
                            }}
                            key={match.pathname}
                        >
                            {breadcrumb}
                        </GBreadcrumbs.Item>
                    )}
                </GBreadcrumbs>
            </>
            <Spacer h={3}/>
        </>
    );
};


export default Breadcrumbs;