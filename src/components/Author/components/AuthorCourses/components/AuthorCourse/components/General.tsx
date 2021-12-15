import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    Fieldset,
    Note,
    Spacer,
    Tag,
    Text,
    useInput,
} from "@geist-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getLessons,
    getSelectedCourse,
    setLessons,
    setSelectedCourse
} from "../../../../../../../redux/slices/coursesSlice/coursesSlice";
import {AuthorRequests} from "../../../../../../../api/authorRequests";
import EditBlock from "./EditBlock";
import {IAuthor, ICourse, ITag} from "../../../../../../../redux/slices/coursesSlice/types";
import {deactivatedBlocks, generalTitleNames} from "../../../../../../../services/maps";

const General = () => {
    const {authorCourseId} = useParams<"authorCourseId">() || {authorCourseId: ''};
    const dispatch = useDispatch();

    const selectedCourse = useSelector(getSelectedCourse);

    const handleUpdateState = (key: keyof ICourse, value: string | IAuthor | ITag) => {
        dispatch(setSelectedCourse({
            ...selectedCourse,
            [`${key}`]: key === 'tags'
                ? handleUpdateTags(value as ITag)
                : value
        }));
    }

    const handleUpdateTags = (tag: ITag) => {
        return selectedCourse.tags.some(t => t.id === tag.id)
            ? selectedCourse.tags.filter(t => t.id !== tag.id)
            : [...selectedCourse.tags, tag];
    };

    useEffect(() => {
        (async () => {
            const lessons = await AuthorRequests.getLessons(authorCourseId || '')
            dispatch(setLessons(lessons));
        })()
    }, [authorCourseId])

    return (
        <>
            <Card>
                <Card.Body style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text mb={0} mt={0} h4>Статус</Text>
                    {selectedCourse.published
                        ? <Tag type="success">Опубликован</Tag>
                        : <Tag type="secondary">Черновик</Tag>
                    }
                </Card.Body>
            </Card>
            <Spacer/>
            {(Object.keys(selectedCourse) as Array<keyof ICourse>).map((key) => (
                <EditBlock
                    name={generalTitleNames[key] || key}
                    data={selectedCourse[key]}
                    handleUpdateState={handleUpdateState}
                    courseKey={key}
                    active={!deactivatedBlocks.includes(key)}
                    authorCourseId={authorCourseId || ''}
                />
            ))}
        </>
    );
};


export default General;