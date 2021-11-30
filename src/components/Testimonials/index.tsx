import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Description, Fieldset, Loading, Spacer, Text, Textarea} from "@geist-ui/react";
import {PublicRequests} from "../../api/publicRequests";
import {UserRequests} from "../../api/userRequests";
import {useDispatch, useSelector} from "react-redux";
import {getTestimonials, setTestimonials} from "../../redux/slices/coursesSlice";
import {nanoid} from "nanoid";
import {AuthContext} from "../../index";
import {serverTimestamp, Timestamp} from "firebase/firestore";
import {useParams} from "react-router-dom";

const Testimonials = () => {
    const [load, setLoad] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    const {courseId} = useParams<"courseId">()

    const dispatch = useDispatch();
    const testimonials = useSelector(getTestimonials);
    const {auth} = useContext(AuthContext);

    const handleAddTestimonial = async () => {
        setLoad(true)
        const testimonials = await UserRequests.addTestimonial(courseId || '', {
            text: text,
            date: serverTimestamp() as Timestamp,
            id: nanoid(),
            name: auth.currentUser?.displayName || ''
        })
        dispatch(setTestimonials(testimonials));
        setLoad(false)
    }

    useEffect(() => {
        setLoad(true)
        PublicRequests
            .getTestimonials(courseId || '')
            .then(testimonials => {
                dispatch(setTestimonials(testimonials));
                setLoad(false);
            })
    }, [courseId])

    return (
        <Fieldset>
            <Fieldset.Title children="Отзывы"/>
            <Fieldset.Subtitle>
                {load
                    ? <Loading/>
                    : testimonials && testimonials.map(testimonial =>
                    <Card hoverable mb={1} key={testimonial.id}>
                        <Description title={testimonial.name} content={testimonial.text}/>
                        <Text type={"secondary"}>{testimonial.date.toDate().toLocaleDateString('ru-RU')}</Text>
                    </Card>
                )
                }
                <Spacer/>
                <Fieldset>
                    <Fieldset.Title style={{fontSize: '16px', fontWeight: 400}}>Оставить
                        отзыв</Fieldset.Title>
                    <Fieldset.Subtitle>
                        <Textarea onChange={e => setText(e.target.value)} width={"100%"} placeholder="Текст отзыва"/>
                    </Fieldset.Subtitle>
                    <Fieldset.Footer>
                        <span/>
                        <Button loading={load} onClick={handleAddTestimonial} auto scale={1 / 3}>Сохранить</Button>
                    </Fieldset.Footer>
                </Fieldset>
            </Fieldset.Subtitle>
        </Fieldset>
    );
};

export default Testimonials;