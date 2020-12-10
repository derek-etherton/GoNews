import React from 'react';
import { css, jsx } from '@emotion/react'
import ArticleList from './ArticleList';
import Header from './Header';


function ArticlePage() {

    return (
        <React.Fragment>
            <Header />
            <ArticleList />
        </React.Fragment>
    );
}

export default ArticlePage;