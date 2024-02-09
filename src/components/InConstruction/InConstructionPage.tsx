import React, {Component, FC} from 'react';
import styles from './InConstructionPage.module.css';
import in_construction_image from "../../assets/images/under_construction.png";

const InConstructionPage: FC = () => {
    return <div className={styles.container}>

        <img src={in_construction_image} className={styles.image}/>

        <h1>THIS PAGE IS UNDER CONSTRUCTION </h1>
        
        <p className={styles.paragraph}>
            There are many priorities in this projects and seems like this page is not one of them.
            As soon as this page is done, it will be deployed ASAP.
            I appreciate your patience and... Thanks for checking my project! :))
        </p>

    </div>
}

export default InConstructionPage;