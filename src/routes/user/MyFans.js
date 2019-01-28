import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, List, Avatar, Divider, Button, Card, Popover } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

//import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import axios from 'axios'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'

import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/tabs/style/index.less';
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import MyWork from './MyWork.js';
import MyHeart from './MyHeart.js';
import Item from 'antd/lib/list/Item';
const TabPane = Tabs.TabPane;

export default class UserCenter extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            myFocusList: [],
            myFansList: [],
            activeKey: 'news'
        };
    }

    componentDidMount() {
        var that = this
        var swiper_qj_banner = new Swiper('.qj-banner .swiper-container', {
            autoHeight: true,
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                waitForTransition: false
            },
            pagination: {
                el: '.qj-banner .u-pagination',
                bulletClass: 'bull',
                bulletActiveClass: 'active',
                clickable: true
            }
        });
        var swiper_read = new Swiper('.m-read .swiper-container', {
            slidesPerView: 4,
            slidesPerColumn: 2,
            spaceBetween: 10,
            slidesPerGroup: 8,
            pagination: {
                el: '.m-read .u-pagination',
                bulletClass: 'bull',
                bulletActiveClass: 'active',
                clickable: true
            }
        });
        $(".u-select [role=note]").on("click", function (e) {
            e = window.event || e;
            e.stopPropagation();
            $(".u-select [role=menu]").hide();
            $(this).next().show();
        });
        this.getMyFans();
        this.getMyFocus();
    }

    createList = (name) => {
        const listData = [];
        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
        return (
            <div className="item">
                <a href="javascript:;" className="thumb-img">
                    <img src="css/images/1x1.png" />
                </a>
                <h1><a href="/#/Question/Article">请问大家有没有好用的微信排版工具？</a></h1>
                <div className="alt"><span>昨天 21:32</span></div>
                <a href="javascript:;" className="sponsor">赞助商提供</a>
            </div>
        )
    }
    handleTabChange = (key) => {
        console.log(key);
    }

    getMyFocus = () => {
        POST({
            url: "/a/attention/userAttentionUserids/attentionList?",
            opts: {
                userId: global.constants.userInfo.id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ myFocusList: response.data.data.userList })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getMyFans = () => {
        POST({
            url: "/a/attention/userAttentionUserids/attention2List?",
            opts: {
                userId: global.constants.userInfo.id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ myFansList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    createMyFocus = () => {
        const { myFocusList } = this.state;
        return myFocusList.map((item, index) => {
            return (
                <li>
                    <div class="lx-item">
                        <a href="javascript:;" class="face">
                            <img src={item.photo} />
                        </a>
                        <h1><a href="javascript:;" class="j_name">{item.name}</a></h1>
                        <div class="lx_txt">
                            {item.description}
                        </div>
                        <div class="lx_alt clearfix">
                            <a href="javascript:;" onClick={() => { this.gotoRouter(`/UserNews/${item.id}`) }}>作品<span>{item.attention2Num}</span></a>
                            <a href="javascript:;" onClick={() => { this.gotoRouter(`/MyFans/${item.id}`) }}>粉丝<span>{item.attention2Num}</span></a>
                        </div>
                        <a href="javascript:;" class="a_follow" onClick={() => this.handleFoucs(item.id)}>关注</a>
                    </div>
                </li>
            )
        })

    }
    handleFoucs = (uid) => {
        const { articleInfo } = this.state;
        POST({
            url: "/a/attention/userAttentionUserids/attention?",
            opts: {
                attention2UserId: uid,
                userId: global.constants.userInfo.id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {

                this.setState({ isFans: response.data.status })
            }

            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }
    createMyFans = () => {
        const { myFansList } = this.state;
        return myFansList.map((item, index) => {
            return (
                <li>
                    <div class="lx-item">
                        <a href="javascript:;" class="face">
                            <img src={item.photo} />
                        </a>
                        <h1><a href="javascript:;" class="j_name">{item.name}</a></h1>
                        <div class="lx_txt">
                            {item.description}
                        </div>
                        <div class="lx_alt clearfix">
                            <a href="javascript:;">作品<span>{item.attention2Num}</span></a>
                            <a href="javascript:;">粉丝<span>{item.attention2Num}</span></a>
                        </div>
                        <a href="javascript:;" class="a_follow" onClick={() => this.handleFoucs(item.id)}>关注</a>
                    </div>
                </li>
            )
        })
    }

    render() {
        const userInfo = global.constants.userInfo
        return (
            <div className="">
                {/* 头部 */}
                < Header />
                <div className="ue-head">
                    <div className="wrapper">
                        <div className="userTx">
                            <a href="javascript:;">
                                <img src={userInfo.photo} />
                                <p><i className="icon-user-img"></i><span>更新个人头像</span></p>
                            </a>
                        </div>
                        <div class="nick-name">
                            <h1><b>{userInfo.name}</b><a href="javascript:;" class="follow" onClick={() => this.handleFoucs(userInfo.id)}>关注</a></h1>
                        </div>
                        <div className="nick-data">
                            <p>
                                <span>作品</span><a href="javascript:;">{userInfo.attentionNum}</a>
                                <span>关注</span><a href="javascript:;">{userInfo.attentionNum}</a>
                                <span>粉丝</span><a href="javascript:;" onClick={() => this.gotoRouter(`/MyFans/${userInfo.id}`)}>{userInfo.attention2Num}</a>
                            </p>
                        </div>
                        <div className="address"><i className="icon-address-w"></i>上海  卢湾</div>
                        <div class="userFx">
                            <a href="javascript:;" class="uweixin"><i class="icon-weixin-in"></i></a>
                            <a href="javascript:;" class="uweibo"><i class="icon-weibo-in"></i></a>
                            <a href="javascript:;" class="uzhihu"><i class="icon-zhihu-in"></i></a>
                            <a href="javascript:;" class="udou"><i class="icon-dou-in"></i></a>
                        </div>

                    </div>
                </div>
                <div class="wrapper g-icenter minpage">
                    <div class="ue-minav">
                        {/* <ul class="clearfix">
                            <li><a href="u_mylaixin.html">来信中心<i class="badge">99+</i> </a></li>
                            <li class="active"><a href="u_mywork.html">我的作品</a></li>
                            <li><a href="u_myheart.html">我的心选</a></li>
                            
                        </ul> */}
                        <Tabs ref={e => this.tabDom = e} className="clearfix" onChange={this.handleTabChange}>
                            <TabPane tab={["我关注的人", <i className="badge">{userInfo.attentionNum}</i>]} key="news" className="qj-news lx-fans clearfix">{this.createMyFocus()}</TabPane>
                            <TabPane tab={["我的粉丝", <i className="badge">{userInfo.attention2Num}</i>]} key="reco" className="qj-news lx-fans clearfix">{this.createMyFans()}</TabPane>
                        </Tabs>
                        {/* <a href="u_myaccount.html" class="edit">更新个人资料</a> */}
                    </div>

                </div>
                < Footer />
            </div>
        );
    }
}