import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import WheelBanner from '../../common/wheelBanner/Index'
import HotRead from '../../common/hotRead/Index'
import { POST } from '../../service/service'
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/question.less'

import defaultPhoto from "../../static/images/user/default.png"
const PAGESIZE = 3;
let userInfo = {}
export default class SpaceJobList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            toolList: []
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
        this.getHitsArticle(uid)
        this.getUserInfoDetail(uid)
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
    handlePageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getBooksList(this.props.match.params.tid, this.state.sortType, page)
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    createList = () => {
        const { data } = this.props
        const categorys = global.constants.categorys
        return data && data.map((item, index) => {
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
                        <h1><a href="javascript:;" onClick={() => this.gotoRouter(`${router}${item.id}`)}>{item.title}</a></h1>
                        <div class="txt nowrap">
                            {item.description}
                        </div>
                        <div class="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleCollect(item)}><i className="icon-heart"></i><span>{item.collectNum}</span></a><a href="javascript:;" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a><a href="javascript:;"><i className="icon-comment"></i><span>{item.commentNum}</span></a></div>
                    </div>
                </li>
            )
        })
    }

    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    getHitsArticle = (uid) => {
        Service.GetAllArticle({
            hits: 1,
            userId: uid
        }).then((response) => {
            if (response.data.status === 1) {
                let hitsArticleList = response.data.data
                this.setState({ hitsArticleList })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    createHitArticle = () => {
        const { hitsArticleList } = this.state;
        return hitsArticleList && hitsArticleList.slice(0, 10).map((item, index) => {

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
    createList = () => {
        const { data } = this.props
        const categorys = global.constants.categorys
        return data.list && data.list.map((item, index) => {
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
                <li>
                    <a class="thumb-img" href="javascript:;">
                        <img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                    </a>
                    <h1><a href="javascript:;" class="j_name">{item.user.name}</a></h1>
                    <h3>{Time}</h3>
                    <div class="bar"><a href="javascript:;"><i class="icon-qiye"></i>{item.user.name}</a><span><i class="icon-money"></i>{item.pay}</span></div>
                    <span class="cost"><i class="icon-address"></i>{item.penvicen}</span>
                </li>
            )
        })
    }
    render() {
        const { toolList } = this.state;


        return (
            <div class="wrapper g-space">
                <div class="g-left">
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
                    <div class="qy-info">
                        <p>{userInfo.subscription}</p>
                        <p>
                            <a href="javascript:;">展开</a>
                        </p>
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
                    <div class="qy-r-hotart">
                        <div class="qy-title">机构热文排行</div>
                        <ul class="qy-hotart">
                            {this.createHitArticle()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

