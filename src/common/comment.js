import React, { Component } from 'react';

import { Pagination } from 'antd';
import Service from '../service/api.js'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
export default class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curPage: 1,
        }
    }

    componentDidMount() {

    }

    handlePageChange = (page, pageSize) => {
        this.setState({ curPage: page })
        this.props.getData(page)
    }

    render() {
        const { fn, item } = this.props;
        return (
            <a href="javascript:;"><i className="icon-comment"></i><span>{item.commentNum}</span></a>
        )
    }
}