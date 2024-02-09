import React, {FC} from "react";
import classes from "./IntroductionMessaage.module.css";
import Icon from "@ant-design/icons";


export const IntroductionMessage: FC = () => {

    return (
        <div className={classes.introMessage}>
            <h1>Social Network Project </h1>

            <h3> Hey, fellow developer! </h3>

            <p>This is an awesome guided project, originally developed by <a href="https://www.youtube.com/@ITKAMASUTRA">Dymich</a>.
            </p>
            <p>It is mostly created for newbies in front-end and for developers interested to learn more about React &
                Redux. It covers the followings: </p>

            <ul>
                <li>React</li>
                <li>Redux</li>
                <li>Formik</li>
                <li>Flux Architecture</li>
                <li>REST API</li>
                <li>Websockets</li>
                <li>Typescript</li>
                <li>Ant-Design</li>
                <li>Some JS gaps you certainly have</li>
            </ul>

            <p>You can find the full course <a
                href="https://www.youtube.com/watch?v=gb7gMluAeao&list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8">here</a>.
            </p>

            <p>Some legends are saying that those who finished this course-project changed their lives forever for good
                and entered Tech some few years ago. At the time you're reading this, the market-requirements are way
                higher. </p>

            <p>However, stay focused, consistent and if you put the hours, the results will come! </p>

            <p>Thank you Dymich!</p>
        </div>
    )
}