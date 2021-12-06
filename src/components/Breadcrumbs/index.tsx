import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Breadcrumbs as GBreadcrumbs, Spacer} from "@geist-ui/react";
import useBreadcrumbs, {BreadcrumbMatch} from 'use-react-router-breadcrumbs';
import {PublicRequests} from "../../api/publicRequests";


const Breadcrumbs = () => {
    const [courseNames, setCourseNames] = useState({});
    const {courseDirection} = useParams<"courseDirection">();
    const navigate = useNavigate();

    const directionNameById = {
        [`${courseDirection}`]: 'Программирование'
    }

    const DynamicUserBreadcrumb = ({match}: { match: BreadcrumbMatch }) => (
        // @ts-ignore
        <span>{courseNames[match.params.courseId]}</span>
    );

    const DynamicDirectionBreadcrumb = ({match}: { match: BreadcrumbMatch }) => (
        // @ts-ignore
        <span>{directionNameById[match.params.courseDirection]}</span>
    );

    const routes = [
        {path: '/', breadcrumb: 'Главная'},
        {path: '/:courseDirection', breadcrumb: DynamicDirectionBreadcrumb},
        {path: '/:courseDirection/:courseId', breadcrumb: DynamicUserBreadcrumb},
        {path: '/:courseDirection/:courseId/lessons', breadcrumb: 'Уроки'},
        {path: '/account', breadcrumb: 'Аккаунт'},
    ];

    const breadcrumbs = useBreadcrumbs(routes)

    useEffect(() => {
        PublicRequests.getCourseNamesMap().then(courseNames => {
            setCourseNames(courseNames);
        })
    }, [])

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