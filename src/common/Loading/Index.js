
import React, { Component } from 'react';
import '../../Constants'

import { Spin } from 'antd';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="positionC" style={{ display: global.constants.loading ? '' : 'none' }}><Spin tip="加载中..." /></div>
        )
    }
}
