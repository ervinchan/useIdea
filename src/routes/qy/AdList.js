import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload, Pagination } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

//import $ from 'jquery'
import FormatDate from '../../static/js/utils/formatDate.js'
import Service from '../../service/api.js'

import Utils from '../../static/js/utils/utils.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import defaultPhoto from "../../static/images/user/default.png"
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/tabs/style/index.less';
const TabPane = Tabs.TabPane;
const PAGESIZE = 10
export default class AdList extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            activeKey: 'news',
            fileList: [],
            curPage: 1
        };
    }

    componentDidMount() {
        var that = this
    }
    handleTabChange = (key) => {
        console.log(key);
    }
    handleChangePhoto = () => {

    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    createList = () => {
        const { data } = this.props
        const categorys = global.constants.categorys
        return data.list && data.list.map((item, index) => {

            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.type}</td>
                    <td><a href={item.link}>{item.name}</a></td>
                    <td>{item.period}</td>
                    <td>{item.releaseTime}</td>
                    <td>{item.soldOutTime}</td>
                </tr>
            )
        })
    }
    handlePageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getBooksList(this.props.match.params.tid, this.state.sortType, page)
    }
    render() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        const { data } = this.props
        return (
            <div className="tab-being">
                <table className="acdtable">
                    <thead>
                        <tr>
                            <th className="index">序号</th>
                            <th className="type">类型</th>
                            <th className="title">标题</th>
                            <th className="cycle">投放周期</th>
                            <th className="stateTime">发布时间</th>
                            <th className="endTime">截至时间</th>
                        </tr>
                    </thead>
                    {/* 头部 */}
                    {/* <div className="tab-being">
                    <table className="acdtable">
                        <thead>
                            <tr>
                                <th style="width:80px">序号</th>
                                <th style="width:180px">类型</th>
                                <th>标题</th>
                                <th style="width:130px">投放周期</th>
                                <th style="width:160px">发布时间</th>
                                <th style="width:160px">截至时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>首页轮播焦点头条</td>
                                <td><a href="javascript:;">《2018.12.12响创意双12品牌大促形象传播推广》</a></td>
                                <td>24h</td>
                                <td>2018/12/21 09:00</td>
                                <td>2018/12/22 09:00</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>首页轮播焦点头条</td>
                                <td><a href="javascript:;">《2018.12.12响创意双12品牌大促形象传播推广》</a></td>
                                <td>24h</td>
                                <td>2018/12/21 09:00</td>
                                <td>2018/12/22 09:00</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="m-pages">
                        <div className="box clearfix">
                            <a href="javascript:;"><i className="fa-angle-double-left"></i>上一页</a>
                            <a href="javascript:;">1</a>
                            <b>2</b>
                            <a href="javascript:;">3</a>
                            <a href="javascript:;">4</a>
                            <a href="javascript:;">5</a>
                            <a href="javascript:;">6</a>
                            <a href="javascript:;"><i className="fa-angle-double-right"></i>下一页</a>
                            <span>当前1/3页，共24条</span>
                        </div>
                    </div>
                </div> */}
                    <tbody>
                        {this.createList()}
                    </tbody>
                </table>
                {/* <div className="m-pages">
                    <div className="box clearfix">
                        <a href="javascript:;"><i className="fa-angle-double-left"></i>上一页</a>
                        <a href="javascript:;">1</a>
                        <b>2</b>
                        <a href="javascript:;">3</a>
                        <a href="javascript:;">4</a>
                        <a href="javascript:;">5</a>
                        <a href="javascript:;">6</a>
                        <a href="javascript:;"><i className="fa-angle-double-right"></i>下一页</a>
                        <span>当前1/3页，共24条</span>
                    </div>
                </div> */}
                <div className="m-pages">
                    {
                        data.list && (
                            <Pagination key="Pagination" className="box clearfix" current={this.state.curPage} onChange={this.handlePageChange} total={data && data.count} pageSize={PAGESIZE} itemRender={(page, type, originalElement) => {

                                switch (type) {
                                    case 'prev':
                                        return [<a key={type} href="javascript:;">{type}</a>,
                                        <a href="javascript:;" ><i className="fa-angle-double-left"></i></a>]
                                    case 'next':
                                        return [
                                            <a key={type} href="javascript:;" ><i className="fa-angle-double-right"></i></a>,
                                            <a href="javascript:;">{type}</a>
                                        ]
                                    default:
                                        return <a key={page} href="javascript:;">{page}</a>;

                                }
                            }} />
                        )
                    }
                </div>
            </div>
        );
    }
}