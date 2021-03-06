import React, { FC, useState } from 'react';
import { Button, Collapse, Fieldset, Image, Spacer, useToasts } from "@geist-ui/core";
import { AuthorRequests } from "../../../../../../../api/authorRequests";
import { setSelectedCourse } from "../../../../../../../redux/slices/coursesSlice/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ICourse, ITag } from "../../../../../../../redux/slices/coursesSlice/types";
import SwitchBlockContent from "./SwitchBlockContent";
import { getSelectedAccount } from '../../../../../../../redux/slices/authorSlice/author.slice';
import Iframe from '../../../../shared/Iframe';

interface EditBlockProps {
    name: string;
    handleUpdateState: (key: keyof ICourse, targetValue: any) => void
    data: any;
    courseKey: keyof ICourse;
    authorCourseId: string
}

const EditBlock: FC<EditBlockProps> = (
    {
        name,
        handleUpdateState,
        data,
        courseKey,
        authorCourseId
    }) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setToast } = useToasts();
    const account = useSelector(getSelectedAccount);

    const id = account ? account.id : '';

    const handleUpdate = async (key: keyof ICourse, data: string | ITag[]) => {
        setLoading(true)
        const course = await AuthorRequests.updateCourse(authorCourseId || '', key, key === 'accountId' ? id : data);
        dispatch(setSelectedCourse(course));
        setLoading(false)
        setToast({
            text: 'Всё хорошо :3',
            type: 'success'
        })
    }

    const handleSave = () => {
        courseKey === 'lessons'
            ? navigate(`/author/courses/${authorCourseId}/edit`)
            : handleUpdate(courseKey, data)
    }

    return (
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
                    <Button
                        loading={loading}
                        onClick={handleSave}
                        scale={1 / 3}
                        auto
                        children={courseKey === 'lessons' ? "Редактировать" : "Сохранить"}
                    />
                </Fieldset.Footer>
                {courseKey === 'cover' && (
                    <Collapse shadow scale={1 / 2} title={'Предварительный просмотр'}>
                       <Image src={data} />
                    </Collapse>
                )}
            </Fieldset>
            <Spacer />
        </>
    );
};

export default EditBlock;