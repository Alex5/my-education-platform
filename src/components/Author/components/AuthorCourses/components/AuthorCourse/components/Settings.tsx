import React, {useState} from 'react';
import {Button, Fieldset, Text} from "@geist-ui/react";
import {AuthorRequests} from "../../../../../../../api/authorRequests";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCourses} from "../../../../../../../redux/slices/coursesSlice/coursesSlice";

const Settings = () => {
    const [load, setLoad] = useState(false)
    const {authorCourseId} = useParams<"authorCourseId">()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteCourse = async () => {
        setLoad(true)
        const courses = await AuthorRequests.deleteCourse(authorCourseId || '')
        dispatch(setCourses(courses))
        setLoad(false)
        navigate('/author/courses');
    }

    return (
        <div>
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