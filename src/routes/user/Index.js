import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

//import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import Service from '../../service/api.js'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/tabs/style/index.less';
import '../../Constants'
import Loading from '../../common/Loading/Index'
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
        Service.GetCollectList({
            userId: JSON.parse(sessionStorage.getItem("userInfo")).id
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
        Service.GetLatestAction({
            userId: JSON.parse(sessionStorage.getItem("userInfo")).id
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
    render() {
        const { fileList } = this.state;
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        const tabTit = `来信中心`;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
            showUploadList: false
        };
        return (
            <div className="">
                {/* 头部 */}
                < Header />
                <div className="ue-head">
                    <div className="wrapper">
                        <div className="userTx">
                            <Upload className="upload-btn" {...props}>
                                <a href="javascript:;" onClick={this.handleChangePhoto}>
                                    <img src={userImg} />
                                    <p><i className="icon-user-img"></i><span>更新个人头像</span></p>
                                </a>
                            </Upload>
                        </div>
                        <div className="nick-name">
                            <h1><b>{userInfo.name}</b></h1>
                        </div>
                        <div className="nick-data">
                            <p>
                                <span>作品</span><a href="javascript:;">{userInfo.attentionNum}</a>
                                <span>关注</span><a href="javascript:;" onClick={() => this.gotoRouter(`/MyFans/${userInfo.id}`)}>{userInfo.attentionNum}</a>
                                <span>粉丝</span><a href="javascript:;" onClick={() => this.gotoRouter(`/MyFans/${userInfo.id}`)}>{userInfo.attention2Num}</a>
                            </p>
                        </div>
                        <div className="address"><i className="icon-address-w"></i>{userInfo.city}</div>
                        <a href="javascript:;" className="add_upload" onClick={() => this.gotoRouter(`/ArticleEditor`)}>发表作品/经验</a>
                    </div>
                </div>
                <div class="wrapper g-icenter minpage">
                    <div class="uc-tabnav">
                        {/* <ul class="clearfix">
                            <li><a href="u_mylaixin.html">来信中心<i class="badge">99+</i> </a></li>
                            <li class="active"><a href="u_mywork.html">我的作品</a></li>
                            <li><a href="u_myheart.html">我的心选</a></li>
                            
                        </ul> */}
                        <Tabs ref={e => this.tabDom = e} className="clearfix" onChange={this.handleTabChange}>
                            <TabPane tab={["来信中心", <i className="badge">99+</i>]} key="news" className="qj-news"><MyWork /></TabPane>
                            <TabPane tab="我的作品" key="reco"><MyWork data={this.state.listData} history={this.props.history} /></TabPane>
                            <TabPane tab="我的心选" key="reply"><MyHeart data={this.state.collectList} history={this.props.history} /></TabPane>
                        </Tabs>
                        <a href="javascript:;" class="edit" onClick={() => this.gotoRouter(`/InfoUpDate/${userInfo.id}`)}>更新个人资料</a>
                    </div>

                </div>
                < Footer />
            </div>
        );
    }
}