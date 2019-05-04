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
        const { data, handlePageChange } = this.props;
        const { curPage } = this.state;
        return (
            <div>
                {
                    data.count > global.constants.PAGESIZE && (
                        <Pagination className="u-pages" current={curPage} onChange={handlePageChange} total={data && data.count} pageSize={global.constants.PAGESIZE} itemRender={(page, type, originalElement) => {
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