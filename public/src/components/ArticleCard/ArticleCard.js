import React from 'react';
import './ArticleCard.css';

function ArticleCard(props) {
    // public url: string, public title: string,
    //     public source: string, public date ?: Date, public author ?: string

    const data = props.data;

    return (
        <div className='article-card'>
            <a href={data.url}>{data.title}</a>
            <p>{data.source}</p>
        </div>
    );
}

export default ArticleCard;