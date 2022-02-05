import React, {useState} from 'react';
import {Button, Fieldset, Input, Spacer, Text, useClipboard, useToasts} from "@geist-ui/core";
import {AuthorRequests} from "../../../../../../../api/authorRequests";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCourses} from "../../../../../../../redux/slices/coursesSlice/coursesSlice";
import {Copy} from "@geist-ui/react-icons";
import {getUser} from "../../../../../../../redux/slices/userSlice/userSlice";

const Settings = () => {
    const [load, setLoad] = useState(false)
    const {authorCourseId} = useParams<"authorCourseId">()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {uid} = useSelector(getUser);

    const handleDeleteCourse = async () => {
        setLoad(true)
        const courses = await AuthorRequests.deleteCourse(authorCourseId || '', uid)
        dispatch(setCourses(courses))
        setLoad(false)
        navigate('/author/courses');
    }

    const {copy} = useClipboard()
    const {setToast} = useToasts()
    const handleCopy = () => {
        copy(authorCourseId || "")
        setToast({text: 'ID Скопированно'})
    }

    return (
        <div>
            <Fieldset>
                <Fieldset.Title>ID курса</Fieldset.Title>
                <Fieldset.Subtitle>
                    <Text children="Это идентификатор курса в My Education Platform."/>
                    <Input
                        width={'260px'}
                        iconClickable={true}
                        onIconClick={handleCopy}
                        iconRight={<Copy/>}
                        value={authorCourseId}
                    />
                </Fieldset.Subtitle>
            </Fieldset>
            <Spacer/>
            <Fieldset style={{border: '1px solid #e00'}}>
                <Fieldset.Title>Удалить курс</Fieldset.Title>
                <Fieldset.Subtitle>
                    Безвозвратно удалите свой курс и все его содержимое. Это действие
                    необратимо, поэтому будьте осторожны.
                </Fieldset.Subtitle>
                <Fieldset.Footer>
                    <Text type="error"></Text>
                    <Button loading={load} onClick={handleDeleteCourse} auto scale={1 / 3} type="error">Удалить</Button>
                </Fieldset.Footer>
            </Fieldset>
        </div>
    );
};

export default Settings;