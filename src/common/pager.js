import React, { Component } from 'react';

import { Pagination } from 'antd';
import Service from '../service/api.js'

export default class Pager extends Component {

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
        debugger
        const { data, pageSize } = this.props;
        const { curPage } = this.state;
        const PAGESIZE = pageSize || global.constants.PAGESIZE
        return (
            <div>
                {
                    data.count > PAGESIZE && (
                        <Pagination className="u-pages" current={curPage} onChange={this.handlePageChange} total={data && data.count} pageSize={PAGESIZE} itemRender={(page, type, originalElement) => {
                            switch (type) {
                                case 'prev':
                                    return [<a href="javascript:;">{type}</a>,
                                    <a href="javascript:;" ><i className="fa-angle-double-left"></i></a>]
                                case 'next':
                                    return [
                                        <a href="javascript:;" ><i className="fa-angle-double-right"></i></a>,
                                        <a href="javascript:;">{type}</a>
                                    ]
                                default:
                                    return <a href="javascript:;">{page}</a>;

                            }
                        }} />
                    )
                }
            </div>
        )
    }
}