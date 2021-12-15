import React, {FC, useState} from 'react';
import {Button, Collapse, Fieldset, Grid, Image, Input, Loading, Spacer, Text, useToasts} from "@geist-ui/react";
import {IKey} from "../../../../../../../redux/types";
import {AuthorRequests} from "../../../../../../../api/authorRequests";
import {setSelectedCourse} from "../../../../../../../redux/slices/coursesSlice/coursesSlice";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {IAuthor, ICourse, ITag} from "../../../../../../../redux/slices/coursesSlice/types";
import SwitchBlockContent from "./SwitchBlockContent";

interface EditBlockProps {
    name: string;
    handleUpdateState: (key: keyof ICourse, targetValue: any) => void
    data: any;
    courseKey: keyof ICourse;
    active: boolean;
    authorCourseId: string
}

const EditBlock: FC<EditBlockProps> = (
    {
        name,
        handleUpdateState,
        data,
        courseKey,
        active,
        authorCourseId
    }) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [, setToast] = useToasts();

    const handleUpdate = (key: keyof ICourse, data: string | IAuthor | ITag[]) => {
        return async () => {
            setLoading(true)
            const course = await AuthorRequests.updateCourse(authorCourseId || '', key, data);
            dispatch(setSelectedCourse(course));
            setLoading(false)
            setToast({
                text: 'Всё хорошо :3',
                type: 'success'
            })
        }
    }

    return (
        active ? (
                <>
                    <Fieldset>
                        <Fieldset.Title>{name}</Fieldset.Title>
                        <Fieldset.Subtitle>
                            <SwitchBlockContent
                                handleUpdateState={handleUpdateState}
                                courseKey={courseKey}
                                data={data}
                            />
                        </Fieldset.Subtitle>
                        <Fieldset.Footer>
                            <span>Сохранить изменения</span>
                            {courseKey === 'lessons'
                                ? <Button onClick={() => navigate(`/author/courses/${authorCourseId}/edit`)} auto
                                          scale={1 / 3}>Редактировать</Button>
                                : <Button loading={loading} onClick={handleUpdate(courseKey, data)} auto
                                          scale={1 / 3}>Сохранить</Button>
                            }

                        </Fieldset.Footer>
                        {courseKey === 'cover' && (
                            <Collapse shadow scale={1 / 2} title={'Предварительный просмотр'}>
                                <Image src={data}/>
                            </Collapse>
                        )}
                    </Fieldset>
                    <Spacer/>
                </>
            )
            : <></>
    );
};

export default EditBlock;