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
import Service from '../../service/api.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/tabs/style/index.less';
import '../../static/less/qy.space.less'
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import defaultPhoto from "../../static/images/user/default.png"
const TabPane = Tabs.TabPane;

const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class UserCenter extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            hotArticles: [],
            userPhoto: [],
            userImg: "",
            jobInfo: {},
            jobList: {}
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
        this.getNews(userInfo && userInfo.id)
        this.getHotArticles(userInfo && userInfo.id)
        this.getJobInfo()


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

    getJobInfo = () => {
        Service.GetAllArticle({
            categoryId: global.constants.categorys[8].id,
            id: this.props.match.params.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                let data = response.data.data
                this.setState({ jobInfo: data })
                this.getUserInfoDetail(data.user.id)
                this.getJobList(data.user.id)
            }
        })
            .catch((error) => {
                console.log(error)
            })
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
    getHotArticles = (userId) => {
        Service.GetAllArticle({
            userId: userId,
            hits: 1
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ hotArticles: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    handleTabChange = (key) => {
        console.log(key);
    }

    getJobList = (userId) => {
        Service.GetAllArticle({
            userId: userId,
            categoryId: global.constants.categorys[8].id,
            createTimeSort: 1
        })
            .then((response) => {
                this.setState({ jobList: response.data.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    createList = () => {
        const { jobList } = this.state
        const categorys = global.constants.categorys
        return jobList.list && jobList.list.map((item, index) => {
            let Time = FormatDate.formatTime(item.updateDate)
            let router = ``
            switch (item.category.id) {
                case categorys[0].id:
                    router = `/Question/Article/`
                    break;
                case categorys[1].id:

                case categorys[1].id:
                    router = `/Bookstore/Bookbuy/`
                    break;
                default:
                    router = `/QyspaceJobInfo/`
                    break;
            }
            return (
                <li>
                    <a class="thumb-img" href="javascript:;" onClick={() => this.gotoRouter(`${router}${item.id}`)}>
                        <img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                    </a>
                    <h1><a href="javascript:;">{item.title}</a></h1>
                    <h3>{Time}</h3>
                    <div class="bar"><a href="javascript:;"><i class="icon-qiye"></i>{item.company}</a><span><i class="icon-money"></i>{item.pay}</span></div>
                    <span class="cost"><i class="icon-address"></i>{item.jcity}</span>
                </li>
                // <li>
                //     <div class="ue_info">
                //         <a href="javascript:;" class="face" onClick={() => this.gotoRouter(`${router}${item.id}`)}>
                //             <img src={item.user.photo || defaultPhoto} />
                //         </a>
                //         <div class="alt clearfix">
                //             <a href="javascript:;" class="j_name">{item.user.name}</a>
                //             <span class="dot"></span>
                //             <span>{Time}</span>
                //         </div>
                //         <div class="bat">{item.category.name}</div>
                //     </div>
                //     <div class="ue_box">
                //         <a class="thumb-img" href="javascript:;"><img src={item.image} /></a>
                //         <h1><a href="javascript:;" onClick={() => this.gotoRouter(`${router}${item.id}`)}>{item.title}</a></h1>
                //         <div class="txt nowrap">
                //             {item.description}
                //         </div>
                //         <div class="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleCollect(item)}><i className="icon-heart"></i><span>{item.collectNum}</span></a><a href="javascript:;" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a><a href="javascript:;"><i className="icon-comment"></i><span>{item.commentNum}</span></a></div>
                //     </div>
                // </li>
            )
        })
    }

    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    createHotArticle = () => {
        const { hotArticles } = this.state;
        return hotArticles && hotArticles.slice(0, 10).map((item, index) => {
            return (
                <li key={index} onClick={() => this.gotoRouter(`/Inspiration/Article/${item.id}`)}>
                    <a href="javascript:;" className="thumb-img">
                        <span>{index + 1}</span>
                        <img src={item.image} />
                    </a>
                    <h1><a href="javascript:;">{item.title}</a></h1>
                </li>
            )
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
    createTags = () => {
        const { jobInfo } = this.state;
        if (jobInfo.keywords) {
            const keywords = jobInfo.keywords.split(',')
            return keywords.map((item) => <span>{item}</span>)
        }

    }
    render() {
        const { jobInfo, userPhoto, userImg } = this.state;
        return (
            <div className>
                < Header />
                < QyHead info={userInfo} setUserPhoto={this.setUserPhoto} userPhoto={userPhoto} userImg={userImg} history={this.props.history} />
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
                            <div class="qy-title1"><b>{jobInfo.title}</b></div>
                            <div class="jtag clearfix">
                                {this.createTags()}
                                {/* <span>带薪年假</span>
                                <span>五险一金</span>
                                <span>在职培训</span> */}
                            </div>
                            <div class="jalt">
                                <ul class="clearfix">
                                    <li><span>发布日期：</span>{jobInfo.createDate}</li>
                                    <li><span>工作地点：</span>{jobInfo.jcity}</li>
                                    <li><span>职位月薪：</span>{jobInfo.pay}/月</li>
                                    <li><span>工作经验：</span>{jobInfo.experience}</li>
                                    <li><span>学历要求：</span>{jobInfo.education}</li>
                                    <li><span>招聘人数：</span>{jobInfo.jobNum}人</li>
                                </ul>
                            </div>
                            <div class="jitem">
                                <div class="tit">Job Description:</div>
                                <div class="jhtml">
                                    {jobInfo.description}
                                </div>
                            </div>
                            <div class="jitem">
                                <div class="tit">Job Requirement:</div>
                                <div class="jhtml">
                                    {jobInfo.jobDescription}
                                </div>
                            </div>
                            <div class="jitem">
                                <div class="tit">简历投递:</div>
                                <div class="jhtml">
                                    {jobInfo.email}<br />
                                </div>
                            </div>
                            <div class="jdepict">邮件标题：姓名+应聘岗位+工作年限+来自响创意</div>
                        </div>
                        <div class="qy-envi">
                            <h1><b>创作环境</b></h1>
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
                            <div class="u-pagination wide"></div>
                        </div>
                        <script>

                        </script>
                        <div class="qy-info">
                            <p>{userInfo.subscription}</p>
                            <p>
                                <a href="javascript:;">展开</a>
                            </p>
                        </div>
                        <div class="qy-title1"><b>相近热门岗位</b></div>
                        <div class="m-joblist">
                            <ul class="clearfix">
                                {this.createList()}
                            </ul>
                        </div>
                        {/* <div class="u-pages">
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
                        </div> */}
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
                        <div class="qy-r-hotart">
                            <div class="qy-title">机构热文排行</div>
                            <ul class="qy-hotart">
                                {this.createHotArticle()}

                            </ul>
                        </div>
                    </div>
                </div>

                < Footer />
            </div>
        );
    }
}