import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import * as Geist from "@geist-ui/core";
import {AuthorRequests} from '../../../../api/authorRequests';
import {useDispatch, useSelector} from "react-redux";
import {getCourses, setCourses, setSelectedCourse} from "../../../../redux/slices/coursesSlice/coursesSlice";
import {Button, Spacer} from "@geist-ui/core";
import {ICourse} from "../../../../redux/slices/coursesSlice/types";
import {getFirebaseUser, getUser} from "../../../../redux/slices/userSlice/userSlice";
import {Select} from '@geist-ui/core';
import SnipText from "../../../shared/SnipText";
import AuthorAccountPreview from '../AuthorAccountPreview';
import PageLayout from '../../../Layouts/PageLayout';
import {nanoid} from 'nanoid';

const AuthorCourses = () => {
    const [addCourseModal, setAddCourseModal] = useState<boolean>(false);
    const [courseName, setCourseName] = useState<string>("");
    const [courseDirection, setCourseDirection] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [addCourseLoading, setAddCourseLoading] = useState<boolean>(false);

    const {author} = useSelector(getUser);
    const firebaseUser = useSelector(getFirebaseUser);
    const courses = useSelector(getCourses);

    const [navigate, location] = [useNavigate(), useLocation()]

    const dispatch = useDispatch();

    const uid = firebaseUser ? firebaseUser.uid : '';

    const handleAddCourse = async () => {
        setAddCourseLoading(true)
        const newCourses = await AuthorRequests.addCourse({
            name: courseName,
            courseId: nanoid(),
            ownerId: uid,
            published: false,
            direction: courseDirection,
            lessons: [],
            accountId: '',
            description: '',
            cover: '',
            tags: [],
            createdAt: Date.now(),
            socialAccounts: []
        })
        setAddCourseModal(false);
        setCourseName("");
        dispatch(setCourses(newCourses));
        setAddCourseLoading(false);
    }

    const handleSelectCourse = (course: ICourse) => {
        return () => {
            dispatch(setSelectedCourse(course));
            navigate(`${location.pathname}/${course.courseId}`)
        }
    }

    const handleGetCourses = async () => {
        setLoading(true)
        const courses = await AuthorRequests.getCourses(uid);
        dispatch(setCourses(courses));
        setLoading(false)
    }

    useEffect(() => {
        if (author) {
            handleGetCourses()
        }
    }, [author])

    return (
        <PageLayout title='???????? ??????????' headerActions={[
            <Button
                onClick={() => setAddCourseModal(true)}
                width={"100%"}
                type="secondary"
                children={"?????????? ????????"}
            />
        ]}>
            <Geist.Grid.Container gap={2}>
                {loading
                    ? <Geist.Loading style={{height: '200px'}}/>
                    : courses.length > 0
                        ? courses.map(course =>
                            <Geist.Grid key={course.courseId} xs={24} sm={12} md={8}>
                                <Geist.Card
                                    style={{cursor: 'pointer'}} hoverable width="100%"
                                    onClick={handleSelectCourse(course)}
                                >
                                    <SnipText h4 text={course.name}/>
                                    <Geist.Divider/>
                                    <Geist.Spacer/>
                                    <Geist.Description
                                        title={"????????????"}
                                        content={course.published
                                            ? <Geist.Dot type="success">??????????????????????</Geist.Dot>
                                            : <Geist.Dot>????????????????</Geist.Dot>
                                        }
                                    />
                                    <Geist.Spacer h={1}/>
                                    <Geist.Description
                                        title={"??????????"}
                                        content={

                                                <AuthorAccountPreview ownerId={course.ownerId}
                                                                      accountId={course.accountId}/>

                                        }/>
                                </Geist.Card>
                            </Geist.Grid>)
                        : <Geist.Grid xs={24} alignItems="center" justify="center">
                            <Geist.Text children={"?????? ????????????"}/>
                        </Geist.Grid>
                }

                <Geist.Modal visible={addCourseModal} onClose={() => setAddCourseModal(false)}>
                    <Geist.Modal.Title>?????????? ????????</Geist.Modal.Title>
                    <Geist.Modal.Content>
                        <Geist.Input
                            placeholder={"?????????????? ???????????????? ??????????"}
                            value={courseName}
                            onChange={e => setCourseName(e.target.value)}
                            width={"100%"}
                        />
                        <Spacer/>
                        <Select
                            width={"100%"}
                            placeholder="???????????????? ??????????????????????"
                            onChange={(val: any) => setCourseDirection(val)}
                        >
                            <Select.Option value="programming">????????????????????????????????</Select.Option>
                            <Select.Option value="design">????????????</Select.Option>
                            <Select.Option value="marketing">??????????????????</Select.Option>
                            <Select.Option value="management">????????????????????</Select.Option>
                            <Select.Option value="analytics">??????????????????</Select.Option>
                            <Select.Option value="games">???????????????????? ??????</Select.Option>
                            <Select.Option value="creative">??????????????</Select.Option>
                            <Select.Option value="management">????????????</Select.Option>
                        </Select>
                    </Geist.Modal.Content>
                    <Geist.Modal.Action passive onClick={() => setAddCourseModal(false)}>????????????????</Geist.Modal.Action>
                    <Geist.Modal.Action loading={addCourseLoading}
                                        onClick={handleAddCourse}>??????????????????</Geist.Modal.Action>
                </Geist.Modal>
            </Geist.Grid.Container>
        </PageLayout>

    );
};

export default AuthorCourses;