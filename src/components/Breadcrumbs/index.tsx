import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Breadcrumbs as GBreadcrumbs, Spacer} from "@geist-ui/react";
import useBreadcrumbs, {BreadcrumbMatch} from 'use-react-router-breadcrumbs';
import {PublicRequests} from "../../api/publicRequests";
import {useSelector} from "react-redux";
import {getVideos} from "../../redux/slices/videosSlice";
import {getCourses} from "../../redux/slices/coursesSlice/coursesSlice";
import {useMediaQuery} from '@geist-ui/core';

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

    const location = useLocation();
    const isAuthorUrl = location.pathname !== "/" && !location.pathname.includes('/author') && !location.pathname.includes('/videos');
    const isXS = useMediaQuery('xs')

    return (
        <>
            <GBreadcrumbs style={{display: 'flex', flexWrap: 'wrap'}}>
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
            <Spacer/>
        </>
    );
};


export default Breadcrumbs;