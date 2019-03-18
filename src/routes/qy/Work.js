import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload } from 'antd';
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
import userImg from "../../static/images/user/userTx.jpg"
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
                <ul class="ue-minav clearfix">
                    <li>
                        <a href="qy_mywork.html">最新作品</a>                
                    </li>
                    <li class="active">
                        <a href="qy_myjob.html">最新岗位</a>
                    </li>
                </ul>               
                <div class="g-left"> 
                    <div class="m-joblist">
                        <ul class="clearfix">
                            <li>
                                <a class="thumb-img" href="javascript:;">
                                    <img src="images/user/6.jpg" />
                                </a>
                                <h1><a href="javascript:;">资深文案 SCW</a></h1>
                                <h3>2018/11/09</h3>
                                <div class="bar"><a href="javascript:;"><i class="icon-qiye"></i>网易云音乐</a><span><i class="icon-money"></i>8K-15K</span></div>
                                <span class="cost"><i class="icon-address"></i>上海 卢湾</span>
                            </li>
                            <li>
                                <a class="thumb-img" href="javascript:;">
                                    <img src="images/user/6.jpg" />
                                </a>
                                <h1><a href="javascript:;">资深文案 SCW</a></h1>
                                <h3>2018/11/09</h3>
                                <div class="bar"><a href="javascript:;"><i class="icon-qiye"></i>网易云音乐</a><span><i class="icon-money"></i>8K-15K</span></div>
                                <span class="cost"><i class="icon-address"></i>上海 卢湾</span> 
                            </li>
                            <li>
                                <a class="thumb-img" href="javascript:;">
                                    <img src="images/user/6.jpg" />
                                </a>
                                <h1><a href="javascript:;">资深文案 SCW</a></h1>
                                <h3>2018/11/09</h3>
                                <div class="bar"><a href="javascript:;"><i class="icon-qiye"></i>网易云音乐</a><span><i class="icon-money"></i>8K-15K</span></div>
                                <span class="cost"><i class="icon-address"></i>上海 卢湾</span> 
                            </li>
                            <li>
                                <a class="thumb-img" href="javascript:;">
                                    <img src="images/user/6.jpg" />
                                </a>
                                <h1><a href="javascript:;">资深文案 SCW</a></h1>
                                <h3>2018/11/09</h3>
                                <div class="bar"><a href="javascript:;"><i class="icon-qiye"></i>网易云音乐</a><span><i class="icon-money"></i>8K-15K</span></div>
                                <span class="cost"><i class="icon-address"></i>上海 卢湾</span> 
                            </li>
                            <li>
                                <a class="thumb-img" href="javascript:;">
                                    <img src="images/user/6.jpg" />
                                </a>
                                <h1><a href="javascript:;">资深文案 SCW</a></h1>
                                <h3>2018/11/09</h3>
                                <div class="bar"><a href="javascript:;"><i class="icon-qiye"></i>网易云音乐</a><span><i class="icon-money"></i>8K-15K</span></div>
                                <span class="cost"><i class="icon-address"></i>上海 卢湾</span> 
                            </li>
                        </ul>
                    </div>
                    <div class="u-pages">
                        <div class="box clearfix">
                            <a href="javascript:;">Prev</a>
                            <a href="javascript:;"><i class="fa-angle-double-left"></i></a>
                            <a href="javascript:;">1</a>
                            <b>2</b>
                            <a href="javascript:;">3</a>
                            <a href="javascript:;">4</a>
                            <a href="javascript:;">5</a>
                            <a href="javascript:;">6</a>
                            <a href="javascript:;">7</a>
                            <a href="javascript:;">8</a>
                            <a href="javascript:;">9</a>
                            <a href="javascript:;">10</a>
                            <span>…</span>
                            <a href="javascript:;"><i class="fa-angle-double-right"></i></a>
                            <a href="javascript:;">Next</a>
                        </div>
                    </div>
                    <div class="qy-envi">
                        <h1><b>创作环境</b></h1>
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <a href="javascript:;"><img src="images/user/4.jpg" /></a>
                                </div>
                                <div class="swiper-slide">
                                    <a href="javascript:;"><img src="images/user/4.jpg" /></a></div>
                                <div class="swiper-slide">
                                    <a href="javascript:;"><img src="images/user/4.jpg" /></a></div>
                            </div>
                        </div>
                        <div class="u-pagination wide"></div>
                    </div>
                    <div class="qy-info">
                        <p>
                        In 1949, three enterprising gentlemen, Bill Bernbach, Ned Doyle and Maxwell Dane gave the advertising industry a wake-up call. In short, they said: Let’s stop talking at people and instead start conversations that lead to action and mutual benefit.</p>
                        <p><br /></p>
                        <p>This heritage tells us who we are, what we believe and how we should behave. It inspires us to continually challenge standard convention. From Bill Bernbach to Keith Reinhard to the present generation of DDB leaders.From Bill Bernbach to Keith Reinhard  DDB leaders
                            <a href="javascript:;">展开</a>
                        </p>                     
                    </div>
                </div>
                <div class="g-right">
                    <div class="qy-r-team">
                        <div class="qy-title">近期合作机构</div>
                        <ul class="hot-team clearfix">
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
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>  
                        </ul>
                    </div>
                    <div  class="qy-r-hotart">
                        <div class="qy-title">机构热文排行</div>
                        <ul class="qy-hotart">
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>1</span>
                                    <img src="images/r1.jpg" />
                                </a>
                                <h1><a href="#">天猫拾光之旅：双11十年，都藏在这些彩蛋里了！</a></h1>                        
                            </li>
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>2</span>
                                    <img src="images/r2.jpg" />
                                </a>
                                <h1><a href="#">《风味人间》的画面，每一帧都写着馋</a></h1>
                                
                            </li>
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>3</span>
                                    <img src="css/images/95x65.png" />
                                </a>
                                <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>                        
                            </li>
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>4</span>
                                    <img src="css/images/95x65.png" />
                                </a>
                                <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                
                            </li>
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>5</span>
                                    <img src="css/images/95x65.png" />
                                </a>
                                <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                
                            </li>
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>6</span>
                                    <img src="css/images/95x65.png" />
                                </a>
                                <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>                        
                            </li>
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>7</span>
                                    <img src="css/images/95x65.png" />
                                </a>
                                <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                
                            </li>
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>8</span>
                                    <img src="css/images/95x65.png" />
                                </a>
                                <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>                        
                            </li>
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>9</span>
                                    <img src="css/images/95x65.png" />
                                </a>
                                <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                
                            </li>
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>10</span>
                                    <img src="css/images/95x65.png" />
                                </a>
                                <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>                        
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}