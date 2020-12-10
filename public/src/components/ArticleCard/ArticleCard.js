import React from 'react';
import { css, jsx } from '@emotion/react'
import flags from '../../resources/flags';
import logos from '../../resources/logos';

function ArticleCard(props) {
    // public url: string, public title: string,
    //     public source: string, public date ?: Date, public author ?: string

    const data = props.data;
    const flag = flags[data.nation];
    const logo = logos[data.source];

    return (
        <div
            css={css`
                padding: 8px;
                display: flex;
                flex-direction: row;
                align-items: center;
            `}>
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
            <img src={flag} alt={data.nation} title={data.nation}
                css={css`
                    width: 22px;
                    height: 16px;`} />
        </div>
    );
}

export default ArticleCard;