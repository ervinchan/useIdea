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
        const categorys = global.constants.categoryIds
        if (data.list) {
            return data.list && data.list.map((item, index) => {
                debugger
                let Time = FormatDate.formatTime(item.updateDate)
                let router = ``
                switch (item.category.id) {
                    case categorys['请教'].id:
                        router = `/Question/Article/`
                        break;
                    case categorys['书单上新'].id:

                    case categorys['阅读场景'].id:
                        router = `/Bookstore/Bookbuy/`
                        break;
                    case categorys['招聘'].id:
                        router = `/QyspaceJobInfo/`
                        break;
                    default:
                        router = `/Inspiration/Article/`
                        break;
                }
                return (
                    <li onClick={() => this.gotoRouter(`${router}${item.id}`)}>
                        <a class="thumb-img" href="javascript:;">
                            <img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                        </a>
                        <h1><a href="javascript:;" class="j_name">{item.title}</a></h1>
                        <h3>{Time}</h3>
                        <div class="bar"><a href="javascript:;"><i class="icon-qiye"></i>{item.user.name}</a><span><i class="icon-money"></i>{item.pay}</span></div>
                        <span class="cost"><i class="icon-address"></i>{item.area && item.area.name} {item.city && item.city.name}</span>
                    </li>
                )
            })
        } else {
            return (
                <div class="nolist">
                    <span>· 暂未发布招聘 ·</span>
                </div>
            )
        }

    }
    render() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        return (
            <div className="m-joblist">
                {/* 头部 */}
                {this.createList()}

            </div>
        );
    }
}