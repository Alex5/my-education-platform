import React, {useEffect} from 'react';
import {Card, Spacer, Tag, Text} from "@geist-ui/core";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getSelectedCourse,
    setLessons,
    setSelectedCourse
} from "../../../../../../../redux/slices/coursesSlice/coursesSlice";
import {AuthorRequests} from "../../../../../../../api/authorRequests";
import EditBlock from "./EditBlock";
import {ICourse} from "../../../../../../../redux/slices/coursesSlice/types";
import {generalTitleNames} from "../../../../../../../services/maps";
import {BLOCK_KEYS} from "./types";
import {ISocialInfo} from "../../../../AuthorSocialMediaAccounts";

const General = () => {
    const {authorCourseId} = useParams<"authorCourseId">() || {authorCourseId: ''};
    const dispatch = useDispatch();

    const selectedCourse = useSelector(getSelectedCourse);

    const handleUpdateState = (key: keyof ICourse, value: any) => {
        const switchKeyData = () => {
            switch (key) {
                case 'tags':
                    return handleUpdateTags(value as string)
                default:
                    return value;
            }
        }

        const updateData = {
            ...selectedCourse,
            [`${key}`]: switchKeyData()
        }

        dispatch(setSelectedCourse(updateData));
    }

    const handleUpdateTags = (tag: string) => {
        return selectedCourse.tags.some(t => t === tag)
            ? selectedCourse.tags.filter(t => t !== tag)
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
                    <Tag type={selectedCourse.published ? "success" : "secondary"}>
                        {selectedCourse.published ? "Опубликован" : "Черновик"}
                    </Tag>
                </Card.Body>
            </Card>
            <Spacer/>
            {BLOCK_KEYS.map((key) => (
                <EditBlock
                    name={generalTitleNames[key] || key}
                    data={selectedCourse[key]}
                    handleUpdateState={handleUpdateState}
                    courseKey={key}
                    authorCourseId={authorCourseId || ''}
                />
            ))}
        </>
    );
};


export default General;