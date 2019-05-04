import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

//import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import Service from '../../service/api.js'
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
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class CoverModal extends Component {
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
                userId: userInfo && userInfo.id
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
                userId: userInfo && userInfo.id
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
            <div className="cover-modal">
                <div className="title">封面形象图上传中心<i className="icon-close1" onClick={this.handleCancel}></i></div>
                <div className="imfrom">
                    <div className="imalt">
                        机构形象图标准尺寸1920*400像素
                    </div>
                    <div className="initial_pic">
                        <div className="btn_b"><a href="javascript:;">+ 上传设计好的形象图</a></div>
                        <div className="loading_block">
                            <h1>正在上传</h1>
                            <p><span></span></p>
                        </div>
                    </div>
                    <div className="helptxt">* 图片不合规范，请上传1920*400像素标准尺寸图片，文件大小2Mb以内</div>
                    <div className="imbtn">
                        <a href="javascript:;" className="active">提交上传</a>
                        <a href="javascript:;" data-el="closeAll">取消</a>
                    </div>
                </div>
            </div>
        )
    }
}
