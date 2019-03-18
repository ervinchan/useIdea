import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

//import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import axios from 'axios'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import QyHead from './qyHead'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/tabs/style/index.less';
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import userImg from "../../static/images/user/userTx.jpg"
import Work from './Work.js';
import Home from './Home.js';
import AdManage from './Ad.js'
import News from '../User/newMessage.js'
const TabPane = Tabs.TabPane;

export default class AdModal extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            activeKey: 'news',
            fileList: [],
            collectList: []
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
        this.getCollectList();
        this.getMyWork();
    }
    handleTabChange = (key) => {
        console.log(key);
    }
    handleChangePhoto = () => {

    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    getCollectList = () => {
        POST({
            url: "/a/artuser/articleCollect/collectList?",
            opts: {
                userId: JSON.parse(sessionStorage.getItem("userInfo")).id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ collectList: response.data.data.articles })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getMyWork = () => {
        POST({
            url: "/a/cms/article/latestAction?",
            opts: {
                userId: JSON.parse(sessionStorage.getItem("userInfo")).id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ listData: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    handleCancel = (e) => {
        /*global layer */
        layer.closeAll()
    }
    render() {
        return (
            <div className="ad-modal">
                <div id="" className="layui-layer-content">
                    <div className="title">响创意广告投放申请<i className="icon-close1" onClick={this.handleCancel}></i>        </div>
                    <div className="adfrom">
                        <div className="u-inline width-full">
                            <label className="u-form-label">广告投放标题</label>
                            <div className="u-form-input">
                                <input type="text" className="u-input" placeholder="2019.5.20（时间） 响创意（品牌名）品牌形象TVC传播推广（项目名）" />
                            </div>
                        </div>
                        <div className="u-inline width-full">
                            <label className="u-form-label"><i>*</i>投放类型<span>( *可多选 )</span> </label>
                            <div className="checkbox-custom">
                                <ul className="clearfix">
                                    <li>
                                        <input type="checkbox" id="inputR1" name="inputRadios" className="u-radio" />
                                        <label for="inputR1">案例作品图文</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="inputR2" name="inputRadios" className="u-radio" />
                                        <label for="inputR2">微信推广案例</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="inputR3" name="inputRadios" className="u-radio" />
                                        <label for="inputR3">首页轮播头条</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="inputR4" name="inputRadios" className="u-radio" />
                                        <label for="inputR4">侧栏焦点广告</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="inputR5" name="inputRadios" className="u-radio" />
                                        <label for="inputR5">打包KOL推广</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="inputR6" name="inputRadios" className="u-radio" />
                                        <label for="inputR6">专访案例报道</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="inputR7" name="inputRadios" className="u-radio" />
                                        <label for="inputR7">活动征集推广</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="inputR8" name="inputRadios" className="u-radio" />
                                        <label for="inputR8">其它合作形式</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="u-inline width-full">
                            <label className="u-form-label"><i>*</i>工作联系</label>
                            <div className="u-form-input width-200">
                                <input type="text" className="u-input" placeholder="ideazhu@gmail.com" />
                            </div>
                            <div className="adtip">工作邮箱</div>
                            <div className="u-form-input width-200">
                                <input type="text" className="u-input" />
                            </div>
                            <div className="adtip">微信ID</div>
                        </div>
                        <div className="u-inline width-full">
                            <label className="u-form-label">投放周期</label>
                            <div className="u-select width-200">
                                <div className="in_province" role="note">1次</div>
                                <div data-for=".in_province" role="menu">
                                    <ul>
                                        <li>24h</li>
                                        <li>3天</li>
                                        <li>1周</li>
                                        <li>1个月</li>
                                        <li>其它时长</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="u-inline width-full">
                            <label className="u-form-label">附件内容</label>
                            <div className="u-form-input">
                                <input type="text" className="u-input" placeholder="填写内容预览链接，或附件网盘及提取码" />
                            </div>
                            <div className="u-helptxt">投放内容经编辑审核后，会在24小时内与您取得联系，沟通具体传播方案和报价。</div>
                        </div>
                        <div className="adbtn">
                            <a href="javascript:;" data-el="closeAll">取 消</a>
                            <a href="javascript:;" className="active">提交需求</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
