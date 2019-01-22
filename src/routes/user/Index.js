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
import userImg from "../../static/images/user/userTx.jpg"
import MyWork from './MyWork.js';
import MyHeart from './MyHeart.js';
const TabPane = Tabs.TabPane;

export default class UserCenter extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            questionList: [],
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
    }

    getQuestionList = () => {
        let url = '/zsl/a/cms/comment/consultationList?'
        // let opts = {
        //     categoryId: "ce009ff186fa4203ab07bd1678504228",
        //     keywords: keyword
        // }
        // for (var key in opts) {
        //     opts[key] && (url += "&" + key + "=" + opts[key])
        // }
        axios.post(url)
            .then((response) => {
                let questionList = response.data.data
                this.setState({ questionList })

            })
            .catch((error) => {
                console.log(error)
            })
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

    render() {
        const tabTit = `来信中心`
        return (
            <div className="">
                {/* 头部 */}
                < Header />
                <div className="ue-head">
                    <div className="wrapper">
                        <div className="userTx">
                            <a href="javascript:;">
                                <img src={userImg} />
                                <p><i className="icon-user-img"></i><span>更新个人头像</span></p>
                            </a>
                        </div>
                        <div className="nick-name">
                            <h1><b>布谷云</b></h1>
                        </div>
                        <div className="nick-data">
                            <p>
                                <span>作品</span><a href="javascript:;">0</a>
                                <span>关注</span><a href="javascript:;">16</a>
                                <span>粉丝</span><a href="javascript:;">136</a>
                            </p>
                        </div>
                        <div className="address"><i className="icon-address-w"></i>上海  卢湾</div>
                        <a href="u_myaccount.html" className="add_upload">发表作品/经验</a>
                    </div>
                </div>
                <div class="wrapper g-icenter minpage">
                    <div class="ue-tabnav">
                        {/* <ul class="clearfix">
                            <li><a href="u_mylaixin.html">来信中心<i class="badge">99+</i> </a></li>
                            <li class="active"><a href="u_mywork.html">我的作品</a></li>
                            <li><a href="u_myheart.html">我的心选</a></li>
                            
                        </ul> */}
                        <Tabs ref={e => this.tabDom = e} className="clearfix" onChange={this.handleTabChange}>
                            <TabPane tab={["来信中心", <i className="badge">99+</i>]} key="news" className="qj-news"><MyWork /></TabPane>
                            <TabPane tab="我的作品" key="reco"><MyWork data={this.state.listData} /></TabPane>
                            <TabPane tab="我的心选" key="reply"><MyHeart /></TabPane>
                        </Tabs>
                        <a href="u_myaccount.html" class="edit">更新个人资料</a>
                    </div>

                </div>
                < Footer />
            </div>
        );
    }
}