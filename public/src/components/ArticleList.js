import React from 'react';
import ArticleCard from './ArticleCard';
import { css } from '@emotion/react'

class ArticleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { articles: '', isLoading: true };
    }

    async componentDidMount() {
        // todo: add page # as url param
        const response = await this.getArticles()
            .catch(error => { console.error(error) });

        this.setState({ articles: response, isLoading: false });
    }

    async getArticles() {
        const response = await fetch('http://localhost:8080/api/articles');

        if (!response.ok) {
            const message = `Error: ${response.status}`
            throw new Error(message);
        }

        const json = await response.json();
        return json;
    }

    render() {
        return (
            <div>
                { this.state.isLoading &&
                    <div>
                        Loading...
                    </div>
                }
                { this.state.articles &&
                    <div css={css`padding: 8px;
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: row;`}>
                        {this.state.articles.map((article, index) => {
                            return <ArticleCard data={article} key={index}></ArticleCard>
                        })}
                    </div>
                }
            </div>
        );
    }
}

export default ArticleList;