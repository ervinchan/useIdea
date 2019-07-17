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
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import userImg from "../../static/images/user/userTx.jpg"
import Work from './Work.js';
import Home from './Home.js';
import AdManage from './Ad.js'
import News from '../User/newMessage.js'
const TabPane = Tabs.TabPane;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class AdModal extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            activeKey: 'news',
            fileList: [],
            collectList: [],
            type: [
                { name: "案例作品图文", id: "inputR1" },
                { name: "微信推广案例", id: "inputR2" },
                { name: "首页轮播头条", id: "inputR3" },
                { name: "侧栏焦点广告", id: "inputR4" },
                { name: "打包KOL推广", id: "inputR5" },
                { name: "专访案例报道", id: "inputR6" },
                { name: "活动征集推广", id: "inputR7" },
                { name: "其它合作形式", id: "inputR8" }
            ],
            period: [
                { name: "24h" },
                { name: "3天" },
                { name: "1周" },
                { name: "1个月" },
                { name: "其它时长" }
            ],
            adType: [],
            info: {},
            periodName: "24h"
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
    handleTabChange = (key) => {
        console.log(key);
    }
    handleChangePhoto = () => {

    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    handleCancel = (e) => {
        /*global layer */
        layer.closeAll()
    }

    submitAdRequirement = () => {
        /*global layer */
        const { info, periodName, adType } = this.state;
        if (!info.title) {
            return layer.msg("请填写标题")
        } else if (!adType.length) {
            return layer.msg("请选择广告类型")
        } else if (!(info.email || info.wechatId)) {
            return layer.msg("请填联系方式")
        }
        let params = {
            title: info.title || "",
            adType: adType || "",
            email: info.email || "",
            wechatId: info.wechatId || "",
            period: periodName || "",
            content: info.content || "",
            userId: userInfo.id,
            myUserId: userInfo.id
        }
        var oMyForm = new FormData();

        for (let key in params) {
            oMyForm.append(key, params[key]);
        }
        Service.adRequirement({
            form: oMyForm
        })
            .then((response) => {
                global.constants.loading = false
                if (response.data.status === 1) {
                    layer.closeAll();
                    layer.msg("投放成功，请等待审核")
                } else {
                    layer.msg(response.data.message)
                }
            })
    }

    createTypeRadio = () => {
        const { type } = this.state;
        return type.map((item) => {
            return (
                <li>
                    <input type="checkbox" id={item.id} name="inputRadios" className="u-radio" onClick={(e) => this.setModalTypes(e, item.name)} />
                    <label for={item.id}>{item.name}</label>
                </li>
            )
        })
    }
    setModalTypes = (e, name) => {
        const { adType } = this.state;
        if (e.target.checked && !adType.includes(name)) {
            let adTypes = [...adType];
            adTypes.push(name)
            this.setState({ adType: adTypes })
        } else {
            let index = adType.indexOf(name);
            let adTypes = [...adType];
            adTypes.splice(index, 1)
            this.setState({ adType: adTypes });

        }
    }

    createPeriod = () => {
        const { period } = this.state;
        return period.map(item => <li onClick={(e) => this.setPeriod(e, item.name)}>{item.name}</li>)
    }

    setPeriod = (e, name) => {
        this.setState({ periodName: name })
    }

    changeInfo = (e, field) => {
        const { info } = this.state;
        info[field] = e.target.value
        this.setState({ info: info }, () => {

        })
    }
    render() {
        const { info, periodName } = this.state;
        return (
            <div className="ad-modal">
                <div id="" className="layui-layer-content">
                    <div className="title">响创意广告投放申请<i className="icon-close1" onClick={this.handleCancel}></i>        </div>
                    <div className="adfrom">
                        <div className="u-inline width-full">
                            <label className="u-form-label">广告投放标题</label>
                            <div className="u-form-input">
                                <input type="text" className="u-input" placeholder="2019.5.20（时间） 响创意（品牌名）品牌形象TVC传播推广（项目名）" value={info.title} onChange={(e) => this.changeInfo(e, 'title')} />
                            </div>
                        </div>
                        <div className="u-inline width-full">
                            <label className="u-form-label"><i>*</i>投放类型<span>( *可多选 )</span> </label>
                            <div className="checkbox-custom">
                                <ul className="clearfix">
                                    {this.createTypeRadio()}
                                </ul>
                            </div>
                        </div>
                        <div className="u-inline width-full">
                            <label className="u-form-label"><i>*</i>工作联系</label>
                            <div className="u-form-input width-200">
                                <input type="text" className="u-input" placeholder="ideazhu@gmail.com" value={info.email} onChange={(e) => this.changeInfo(e, 'email')} />
                            </div>
                            <div className="adtip">工作邮箱</div>
                            <div className="u-form-input width-200">
                                <input type="text" className="u-input" value={info.wechatId} onChange={(e) => this.changeInfo(e, 'wechatId')} />
                            </div>
                            <div className="adtip">微信ID</div>
                        </div>
                        <div className="u-inline width-full">
                            <label className="u-form-label">投放周期</label>
                            <div className="u-select width-200">
                                <div className="in_province" role="note">{periodName}</div>
                                <div data-for=".in_province" role="menu">
                                    <ul>
                                        {this.createPeriod()}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="u-inline width-full">
                            <label className="u-form-label">附件内容</label>
                            <div className="u-form-input">
                                <input type="text" className="u-input" placeholder="填写内容预览链接，或附件网盘及提取码" value={info.content} onChange={(e) => this.changeInfo(e, 'content')} />
                            </div>
                            <div className="u-helptxt">投放内容经编辑审核后，会在24小时内与您取得联系，沟通具体传播方案和报价。</div>
                        </div>
                        <div className="adbtn">
                            <a href="javascript:;" onClick={this.handleCancel}>取 消</a>
                            <a href="javascript:;" className="active" onClick={this.submitAdRequirement}>提交需求</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
