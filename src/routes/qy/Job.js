import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload } from 'antd';
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

export default class JobList extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            activeKey: 'news',
            fileList: []
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
            let Time = FormatDate.formatTime(item.updateDate)
            let router = ``
            switch (item.category.id) {
                case categorys[0].id:
                    router = `/Question/Article/`
                    break;
                case categorys[1].id:

                case categorys[1].id:
                    router = `/Bookstore/Bookbuy/`
                    break;
                default:
                    router = `/Inspiration/Article/`
                    break;
            }
            return (
                <li>
                    <a class="thumb-img" href="javascript:;">
                        <img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                    </a>
                    <h1><a href="javascript:;" class="j_name">{item.user.name}</a></h1>
                    <h3>{Time}</h3>
                    <div class="bar"><a href="javascript:;"><i class="icon-qiye"></i>{item.user.name}</a><span><i class="icon-money"></i>{item.pay}</span></div>
                    <span class="cost"><i class="icon-address"></i>{item.penvicen}</span>
                </li>
            )
        })
    }
    render() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        return (
            <div className="">
                {/* 头部 */}
                {this.createList()}

            </div>
        );
    }
}