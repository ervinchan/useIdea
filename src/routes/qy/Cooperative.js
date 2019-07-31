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

export default class Cooperative extends Component {
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
    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    createList = () => {
        const { data } = this.props
        const categorys = global.constants.categoryIds
        if (data && data.length) {
            return data && data.map((item, index) => {

                return (
                    <li onClick={() => this.gotoRouter(`/Qyspace/${item.id}`)}>
                        <a class="thumb-img" href="javascript:;">
                            <img src={item.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                        </a>
                    </li>
                )
            })
        } else {
            return (
                <div class="nolist">
                    <span>· 合作机构暂未更新 ·</span>
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