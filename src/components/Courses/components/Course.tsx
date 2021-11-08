import React from 'react';
import {useParams} from "react-router-dom";
import {Button} from "@geist-ui/react";

const Course = () => {
    let { courseId } = useParams<"courseId">();

    function capitalizeString(s: string): string {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return (
        <div>
            <h2>
                Welcome to the {courseId!.split("-").map(capitalizeString).join(" ")} course!
            </h2>

            <p>This is a great course. You're gonna love it!</p>

            <Button onClick={() => window.history.back()}>See all courses</Button>
        </div>
    );
};

export default Course;