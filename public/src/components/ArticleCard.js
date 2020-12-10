import React from 'react';
import { css, jsx } from '@emotion/react'
import flags from '../resources/flags';
import logos from '../resources/logos';

function ArticleCard(props) {
    // public url: string, public title: string,
    //     public source: string, public date ?: Date, public author ?: string

    const data = props.data;
    const flag = flags[data.nation];
    const logo = logos[data.source];

    const date = formatDate(new Date(data.date));

    return (
        <div
            css={css`
                box-shadow: 0 2px 4px 0 rgba(0,0,0,0.3);
                &:hover {
                    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.3);
                }
                margin: 8px;
                padding: 16px 8px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                @media (min-width: 1620px) {
                    width: 48%;
                }
            `}>
            <div css={css`
                        display: flex;
                        align-items: center;`} >
                <img src={logo} alt={data.source} title={data.source}
                    css={css`
                        width: 48px;
                        height: auto;`} />
                <a href={data.url}
                    target='_blank'
                    css={css`
                        margin: 0 16px;
                        color: red;
                        &:hover {
                            color: black;
                        }
                    `}>
                    {data.title}
                </a>
                <p css={css`
                        white-space: nowrap;
                        font-size: 70%;
                        margin-right: 8px;
                    `}>
                    {date}
                </p>
            </div>
            <img src={flag} alt={data.nation} title={data.nation}
                css={css`
                    width: 22px;
                    height: 16px;`} />
        </div>
    );
}

function formatDate(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    return y + '-' + m + '-' + d;
}

export default ArticleCard;