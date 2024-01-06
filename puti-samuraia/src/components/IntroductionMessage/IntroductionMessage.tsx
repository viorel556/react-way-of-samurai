import React from "react";
import classes from "./IntroductionMessaage.module.css";

export const IntroductionMessage = () => {

    return (
        <div className={classes.introMessage}>
            <h2>Social Network Project </h2>

            <p> Hey, fellow developer! </p>

            <p>This is an awesome guided project developed by <a href="https://www.youtube.com/@ITKAMASUTRA">Dymich</a>.
            </p>
            <p>It is mostly created for newbies in front-end and for developers interested to learn more about React &
                Redux. It covers the followings: </p>

            <ul>
                <li>React</li>
                <li>Redux</li>
                <li>Flux Architecture</li>
                <li>Some JS gaps you certainly have</li>
                <li>Handling Network Requests</li>
            </ul>

            <p>You can find the full course <a
                href="https://www.youtube.com/watch?v=gb7gMluAeao&list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8">here</a>.
            </p>

            <p>Some legends are saying that those who finished this course-project changed their lives forever for good
                and
                entered Tech some few years ago. At the time you're reading this the market-requirements are way
                higher. </p>

            <p>However, stay focused, consistent and if you put the hours, the results will come! </p>

            <p>Thank you Dymich!</p>
        </div>
    )
}