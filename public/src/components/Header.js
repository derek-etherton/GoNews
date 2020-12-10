import React from 'react';
import { css, jsx } from '@emotion/react'


function Header() {

    return (
        <div css={css`
            background-color: #f8f8ff;
            padding: 8px 16px`}
        >
            <h1 css={css`
            font-size: 1.5em`}>Igo News</h1>
        </div>
    );
}

export default Header;