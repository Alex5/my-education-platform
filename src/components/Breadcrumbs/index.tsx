import React from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {Breadcrumbs as GBreadcrumbs, Spacer} from "@geist-ui/react";
import useBreadcrumbs, {BreadcrumbMatch} from 'use-react-router-breadcrumbs';
import styled from "styled-components";


const Breadcrumbs = () => {
    const {courseId} = useParams<"courseId">();
    const {courseDirection} = useParams<"courseDirection">();
    const navigate = useNavigate();

    const coursesNameById = {
        'sfycqhBAFUc8in0EbZDd': 'React Router 6',
        'IGHUKWq5SNZG2bsWYZG5': 'Авторизация в React-приложении с Firebase и Redux-Toolkit',
    }
    const directionNameById = {[`${courseDirection}`]: 'Программирование'}

    const DynamicUserBreadcrumb = ({match}: { match: BreadcrumbMatch }) => (
        // @ts-ignore
        <span>{coursesNameById[match.params.courseId]}</span>
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