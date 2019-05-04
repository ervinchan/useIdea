import React, { Component } from 'react';

import { Pagination } from 'antd';
import Service from '../service/api.js'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
export default class Collect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curPage: 1,
        }
    }

    componentDidMount() {

    }

    handleCollect = (item) => {
        Service.AddCollect({
            userId: userInfo && userInfo.id,
            articleId: item.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.collectNum++
                this.setState({})
            }

            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { fn, item } = this.props;
        return (
            <a href="javascript:;" onClick={() => this.handleCollect(item)}><i class="icon-heart"></i><span>{item.collectNum}</span></a>
        )
    }
}