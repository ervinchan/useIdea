import React, { Component } from 'react';

import { Pagination } from 'antd';
import Service from '../service/api.js'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
export default class Like extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {

    }

    handleLike = (item) => {
        Service.AddLike({
            userId: userInfo && userInfo.id,
            id: item.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.likeNum++
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
            <a href="javascript:;" onClick={() => this.handleLike(item)}><i class="icon-thumbs"></i><span>{item.likeNum}</span></a>
        )
    }
}