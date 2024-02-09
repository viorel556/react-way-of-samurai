import React from 'react';
import classes from './News.module.css';
import InConstructionPage from "../InConstruction/InConstructionPage.tsx";

 // FIXME[MEDIUM](***): we need to connect an external API to this page to render some news
// you already have an account with https://www.thenewsapi.com/documentation
const News = (props) => {
    return (
        <div>
            <InConstructionPage />
        </div>
    );
}

export default News;