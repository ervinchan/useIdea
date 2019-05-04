import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'
import Service from '../../service/api.js'
import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import WheelBanner from '../../common/wheelBanner/Index'
import HotRead from '../../common/hotRead/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/question.less'

import defaultPhoto from "../../static/images/user/default.png"
const PAGESIZE = 15;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class SpaceHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            JobList: [],
            articleList: []
        };
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
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
        let uid = this.props.match.params.uid
        this.getUserInfoDetail(uid);
        this.getArticleList(uid);

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

    getArticleList = (userId) => {
        Service.GetAllArticle({
            userId: userId
        })
            .then((response) => {
                this.setState({ articleList: response.data.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    createArticleList = () => {
        const { articleList } = this.state;
        const categorys = global.constants.categorys
        return articleList.list && articleList.list.map(item => {
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
                    router = `/Inspiration/Article/`
                    break;
            }
            return (
                <div class="item">
                    <a class="thumb-img" href="javascript:;" onClick={() => this.gotoRouter(`${router}${item.id}`)}><img src={item.image} />
                    </a>
                    <div class="tit"><a href="javascript:;" onClick={() => this.gotoRouter(`${router}${item.id}`)}>{item.title}</a></div>
                    <div class="txt">
                        <span>{Time}</span><br />
                        <span>Brand：{item.brand}</span>
                    </div>
                    <div class="bar">
                        <a href="javascript:;" class="user-img">
                            <img src="css/images/1x1.png" />
                        </a>
                        <span class="name">{item.user.name}</span>
                        <div class="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleCollect(item)}><i className="icon-heart"></i><span>{item.collectNum}</span></a><a href="javascript:;" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a><a href="javascript:;"><i className="icon-comment"></i><span>{item.commentNum}</span></a></div>

                    </div>
                </div>
            )
        })

    }

    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    handleLike = (item) => {
        Service.AddLike({
            id: item.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.likeNum++
                this.setState({})
            }
            /* global layer */
            layer.msg(response.data.message)
        })
    }
    handleCollect = (item) => {
        Service.AddCollect({
            userId: 1,
            articleId: item.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.collectNum++
                this.setState({})
            }

            /* global layer */
            layer.msg(response.data.message)
        })
    }

    createToolList = () => {
        const { toolList } = this.state
        return toolList && toolList.map((item, index) => {
            return (
                <li>
                    <div className="item">
                        <a className="thumb-img" href={`/#/Bookstore/Bookbuy/${item.id}`}><img src={item.image} /></a>
                        <div className="tag">{item.category.name}</div>
                        <h1><a href={`/#/Bookstore/Bookbuy/${item.id}`}>{item.title}</a></h1>
                        <div className="alt clearfix">
                            <a href="#" className="j_name"><img src={item.user.img} className="thumb-img" />{item.user.name}</a>
                            <span className="dot"></span>
                            <span>{item.description}</span>
                        </div>
                    </div>
                </li>
            )
        })
    }

    handleFavorite = (index) => {
        const { readList } = this.state;
        readList[index].favorite++;
        this.setState(readList);
    }

    handleLikes = (index) => {
        const { readList } = this.state;
        readList[index].like++;
        this.setState(readList);
    }

    handlePageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getBooksList(this.props.match.params.tid, this.state.sortType, page)
    }
    createList = () => {
        const { data } = this.props
        const categorys = global.constants.categorys
        return data && data.map((item, index) => {
            let Hours = FormatDate.apartHours(item.updateDate)
            let Time = Hours > 24 ? FormatDate.customFormat(item.updateDate, 'yyyy/MM/dd') : `${Hours + 1}小时前`;
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
                    router = `/Inspiration/Article/`
                    break;
            }
            return (
                <li>
                    <div class="ue_info">
                        <a href="javascript:;" class="face" onClick={() => this.gotoRouter(`${router}${item.id}`)}>
                            <img src={item.user.photo || defaultPhoto} />
                        </a>
                        <div class="alt clearfix">
                            <a href="javascript:;" class="j_name">{item.user.name}</a>
                            <span class="dot"></span>
                            <span>{Time}</span>
                        </div>
                        <div class="bat">{item.category.name}</div>
                    </div>
                    <div class="ue_box">
                        <a class="thumb-img" href="javascript:;"><img src={item.image} /></a>
                        <h1><a href="javascript:;" onClick={() => this.gotoRouter()}>{item.title}</a></h1>
                        <div class="txt nowrap">
                            {item.description}
                        </div>
                        <div class="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleCollect(item)}><i className="icon-heart"></i><span>{item.collectNum}</span></a><a href="javascript:;" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a><a href="javascript:;"><i className="icon-comment"></i><span>{item.commentNum}</span></a></div>
                    </div>
                </li>
            )
        })
    }
    createJobList = () => {
        const { JobList } = this.state;
        JobList.list && JobList.list.map((item) => {
            return <li><a href="javascript:;" onClick={this.gotoRouter(`/QyspaceJobInfo/${item.id}`)}>{item.name}</a></li>
        })

    }

    render() {
        const { articleList, JobList } = this.state;

        return (
            <div className="">
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
                    {
                        (articleList && articleList.list && articleList.list.length) &&

                        [<div class="m-artlist clearfix" role="list">
                            {this.createArticleList()}
                        </div>,
                        <a href="javascript:;" class="more-a">点击查看全部项目</a>]

                    }
                    {
                        (!articleList || !articleList.list || articleList.list.length <= 0) &&
                        <div class="nolist">
                            <i class="icon-no-art"></i>
                            <span>· 暂未发表文章 ·</span>
                        </div>
                    }

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
                    <div class="qy-r-jobs clearfix">
                        <div class="qy-title">最新招聘</div>
                        {
                            JobList.list &&

                            [<ul class="qy-rjob">
                                {this.createJobList()}
                            </ul>,
                            <a href="javascript:;" class="more-a">更多招聘+</a>]

                        }
                        {
                            !JobList.list &&
                            <div class="nolist">
                                <span>· 暂未发布招聘 ·</span>
                            </div>
                        }
                    </div>

                </div>
            </div>
        );
    }
}




