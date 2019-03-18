import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, List, Avatar, Divider, Button, Card, Popover } from 'antd';
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
import '../../static/less/qy.space.less'
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
const TabPane = Tabs.TabPane;

export default class UserCenter extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            news: [],
        };
    }

    componentDidMount() {
        var that = this
        const userId = this.props.match.params.uid
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
        this.getNews(userId)
        this.getNewsArticles(userId)
    }

    getNews = (userId) => {
        POST({
            url: "/a/cms/article/latestAction?",
            opts: {
                userId: userId
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ news: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getNewsArticles = (userId) => {
        POST({
            url: "/a/cms/article/getAllArticle?",
            opts: {
                userId: userId
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ newsArticles: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    handleTabChange = (key) => {
        console.log(key);
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    render() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        return (
            <div className>
                < Header />
                < QyHead />
                <div class="wrapper g-space">
                    {/* <div class="ue-tabnav">
            <ul class="clearfix">
                <li><a href="qy_space_home.html">机构首页</a></li> 
                <li><a href="qy_space_article.html">项目文章</a></li>
                <li class="active"><a href="qy_space_job.html">最新招聘</a></li>
            </ul>
        </div>            */}
                    <div class="g-left">
                        <div class="qy-jobinfo">
                            <div class="qy-title1"><b>资深文案 SCW</b></div>
                            <div class="jtag clearfix">
                                <span>带薪年假</span>
                                <span>五险一金</span>
                                <span>在职培训</span>
                            </div>
                            <div class="jalt">
                                <ul class="clearfix">
                                    <li><span>发布日期：</span>2018/07/13</li>
                                    <li><span>工作地点：</span>上海  徐汇区</li>
                                    <li><span>职位月薪：</span>6-10K/月</li>
                                    <li><span>工作经验：</span>1-3年</li>
                                    <li><span>学历要求：</span>本科以上</li>
                                    <li><span>招聘人数：</span>2人</li>
                                </ul>
                            </div>
                            <div class="jitem">
                                <div class="tit">Job Description:</div>
                                <div class="jhtml">
                                    1. Must be a skilled writer who is able to perform in a broad spectrum of advertising disciplines (print, TV, etc.)<br />
                                    2. Must be able to translate strategic direction (as outlined in a Creative Brief) into powerful advertising communications.<br />
                                    3. Work as a team with art director.<br />
                                    4. Recommend measures to improve work process methods and quality of product.<br />
                                    5. May include other duties as assigned.<br />
                                </div>
                            </div>
                            <div class="jitem">
                                <div class="tit">Job Requirement:</div>
                                <div class="jhtml">
                                    1. Bachelor degree preferred<br />
                                    2. At least 1 years of relevant working experience in agency<br />
                                    3. Must have strong writing abilities--articulate and persuasive across advertising disciplines<br />
                                    4. Ability to work under pressure and meet deadlines<br />
                                    5, Word processing skills--able to use Microsoft Word or other word processing programs<br />
                                    6. Strong presentation and negotiation skills<br />
                                    7. Have physical and mental requirements to meet the above listed job responsibilities<br />
                                </div>
                            </div>
                            <div class="jitem">
                                <div class="tit">简历投递:</div>
                                <div class="jhtml">
                                    hr@zhong-group.com<br />
                                </div>
                            </div>
                            <div class="jdepict">邮件标题：姓名+应聘岗位+工作年限+来自响创意</div>
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
                        <script>

                        </script>
                        <div class="qy-info">
                            <p>
                                In 1949, three enterprising gentlemen, Bill Bernbach, Ned Doyle and Maxwell Dane gave the advertising industry a wake-up call. In short, they said: Let’s stop talking at people and instead start conversations that lead to action and mutual benefit.</p>
                            <p><br /></p>
                            <p>This heritage tells us who we are, what we believe and how we should behave. It inspires us to continually challenge standard convention. From Bill Bernbach to Keith Reinhard to the present generation of DDB leaders.From Bill Bernbach to Keith Reinhard  DDB leaders
                        <a href="javascript:;">展开</a>
                            </p>
                        </div>
                        <div class="qy-title1"><b>相近热门岗位</b></div>
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
                        <div class="qy-r-hotart">
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

                < Footer />
            </div>
        );
    }
}