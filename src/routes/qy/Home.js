import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

//import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import Service from '../../service/api.js'
import qyHead from './qyHead'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/tabs/style/index.less';
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import userImg from "../../static/images/user/userTx.jpg"
const TabPane = Tabs.TabPane;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class qyHome extends Component {
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
        var r_bannerswiper = new Swiper('.qy-envi .swiper-container', {
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000
            },
            pagination: {
                el: '.qy-envi .u-pagination',
                bulletClass: 'bull',
                bulletActiveClass: 'active',
                clickable: true
            }
        });
        this.getCollectList();
        this.getMyWork();
        this.getUserInfo();
        this.getUserInfoDetail(userInfo.id);
    }

    getUserInfoDetail = (userId) => {
        Service.getUserInfoDetail({
            userId: userId
        })
            .then((response) => {
                let userInfoDetail = response.data.data;
                Object.assign(userInfo, userInfoDetail);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    handleTabChange = (key) => {
        console.log(key);
    }
    handleChangePhoto = () => {

    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    getUserInfo = () => {
        Service.getUserInfo({
            userId: userInfo && userInfo.id
        }).then((response) => {

        })
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
    render() {
        const { fileList } = this.state;
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
                <div class="g-left">
                    <div class="qy-info">
                        <p>{userInfo.subscription}</p>
                        <p>
                            <a href="javascript:;">展开</a>
                        </p>
                    </div>
                    <div class="qy-envi">
                        <h1><b>创作环境</b></h1>
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                {
                                    userInfo.file1 &&
                                    <div class="swiper-slide">
                                        <a href="javascript:;"><img src={userInfo.file1} /></a>
                                    </div>
                                }
                                {
                                    userInfo.file2 &&
                                    <div class="swiper-slide">
                                        <a href="javascript:;"><img src={userInfo.file2} /></a></div>
                                }
                                {
                                    userInfo.file3 &&
                                    <div class="swiper-slide">
                                        <a href="javascript:;"><img src={userInfo.file3} /></a></div>
                                }
                            </div>
                        </div>
                        <div class="u-pagination wide"></div>
                    </div>
                    <div class="u-title">
                        <b>最新文章</b>
                    </div>
                    <div class="nolist">
                        <i class="icon-no-art"></i>
                        <span>· 暂未发表文章 ·</span>
                    </div>
                </div>
                <div class="g-right">
                    <div class="qy-r-team">
                        <div class="qy-title">近期合作机构</div>
                        <ul class="hot-team clearfix">
                            {/* <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li> */}
                        </ul>
                    </div>
                    <div class="nolist">
                        <span>· 合作机构暂未更新 ·</span>
                    </div>
                    <div class="qy-r-jobs clearfix">
                        <div class="qy-title">最新招聘 <a href="javascript:;" class="add" onClick={() => this.gotoRouter(`/QyJobAdd/${userInfo.id}`)}>发布招聘+</a></div>
                        <div class="nolist">
                            <span>· 暂未发布招聘 ·</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}