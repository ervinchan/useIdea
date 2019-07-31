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
export default class UserCenter extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            activeKey: 'news',
            fileList: [],
            collectList: [],
            userPhoto: [],
            userImg: ""
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
        //this.getCollectList();
        //this.getMyWork();
        this.getUserInfoDetail(userInfo.id)
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

    // getCollectList = () => {
    //     POST({
    //         url: "/a/artuser/articleCollect/collectList?",
    //         opts: {
    //             userId: userInfo && userInfo.id
    //         }
    //     }).then((response) => {
    //         global.constants.loading = false
    //         if (response.data.status === 1) {
    //             this.setState({ collectList: response.data.data.articles })
    //         }
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    getMyWork = (pageNo = 1) => {

        Service.GetLatestAction({
            userId: userInfo && userInfo.id,
            pageSize: this.PAGESIZE,
            pageNo: pageNo
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
    setUserPhoto = (file, newUrl) => {
        this.setState(state => ({
            userPhoto: [...state.userPhoto, file],
            userImg: newUrl
        }), () => {
            $(".avatar-uploader").find("input[type=file]").css({
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                zIndex: 1,
                display: "block"
            })

        })
    }
    render() {
        const { fileList, userPhoto, userImg } = this.state;

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
                < QyHead info={userInfo} setUserPhoto={this.setUserPhoto} userPhoto={userPhoto} userImg={userImg} history={this.props.history} />
                <div class="wrapper g-icenter minpage">
                    <div class="uc-tabnav">
                        {/* <ul class="clearfix">
                            <li><a href="u_mylaixin.html">来信中心<i class="badge">99+</i> </a></li>
                            <li class="active"><a href="u_mywork.html">我的作品</a></li>
                            <li><a href="u_myheart.html">我的心选</a></li>
                            
                        </ul> */}
                        <Tabs ref={e => this.tabDom = e} className="clearfix" onChange={this.handleTabChange}>
                            <TabPane tab="我的首页" key="home"><Home data={this.state.listData} history={this.props.history} /></TabPane>
                            <TabPane tab={["来信中心", <i className="badge" style={{ display: 'none' }}>99+</i>]} key="news" className="qj-news"><News data={this.state.listData} /></TabPane>
                            <TabPane tab="作品/职位" key="work"><Work data={this.state.listData} history={this.props.history} /></TabPane>
                            <TabPane tab="广告管理" key="ad"><AdManage data={this.state.collectList} history={this.props.history} /></TabPane>
                        </Tabs>
                        <a href="javascript:;" class="edit" onClick={() => this.gotoRouter(`/QyInfo/${userInfo && userInfo.id}`)}>完善机构资料</a>
                    </div>

                </div>
                < Footer />
            </div>
        );
    }
}