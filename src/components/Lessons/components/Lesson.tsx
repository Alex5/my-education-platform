import React, {FC} from 'react';
import {Loading, Spacer} from "@geist-ui/core";
import Testimonials from "../../Testimonials";
import {ILesson} from "../../../redux/slices/coursesSlice/types";

interface LessonProps {
    load: boolean;
    selectedLesson: ILesson
}

const Lesson: FC<LessonProps> = ({load, selectedLesson}) => {
    return (
        <>
            {load
                ? <Loading/>
                : <iframe width="100%" height="415" src={selectedLesson.videoLink}
                          title="YouTube video player" frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen/>
            }
            <Spacer/>
            {/*<div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>*/}
            {/*    {courseStatus.start &&*/}
            {/*    <Button*/}
            {/*        type={"secondary"}*/}
            {/*        loading={load}*/}
            {/*        onClick={handleNextLesson}*/}
            {/*        children={"Следующий урок"}/>*/}
            {/*    }*/}
            {/*</div>*/}
            <Testimonials videoId={selectedLesson.videoId}/>
        </>
    );
};

export default Lesson;