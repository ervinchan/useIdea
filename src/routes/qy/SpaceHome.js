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
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/question.less'

import defaultPhoto from "../../static/images/user/default.png"
const PAGESIZE = 3;

export default class SpaceHome extends Component {

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
        this.getArticleInfo("7a8bbb7d262142cbb7ae5bf884935e81")
    }

    getArticleInfo = (categoryId) => {
        let url = '/zsl/a/cms/article/getAllArticle?'
        let opts = {
            hits: 1,
            categoryId: categoryId || ''
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                if (categoryId) {
                    let toolList = response.data.data
                    this.setState({ toolList })
                } else {
                    let hotBooks = response.data.data
                    this.setState({ hotBooks }, () => {
                        var swiper_read = new Swiper('.m-read-fade .swiper-container', {
                            effect: 'fade',
                            pagination: {
                                el: '.m-read-fade .u-pagination',
                                bulletclassName: 'bull',
                                bulletActiveclassName: 'active',
                                clickable: true
                            }
                        });
                    })
                }

            })
            .catch((error) => {
                console.log(error)
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
                            <img src={item.user.photo  || defaultPhoto} />
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

    render() {
        const { toolList } = this.state;

        return (
            <div className="">
                <div class="g-left">
                    <div class="qy-info">
                        <p>
                            In 1949, three enterprising gentlemen, Bill Bernbach, Ned Doyle and Maxwell Dane gave the advertising industry a wake-up call. In short, they said: Let’s stop talking at people and instead start conversations that lead to action and mutual benefit.</p>
                        <p><br /></p>
                        <p>This heritage tells us who we are, what we believe and how we should behave. It inspires us to continually challenge standard convention. From Bill Bernbach to Keith Reinhard to the present generation of DDB leaders.From Bill Bernbach to Keith Reinhard  DDB leaders
                        <a href="javascript:;">展开</a>
                        </p>
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
                    <div class="u-title">
                        <b>最新文章</b>
                    </div>
                    <div class="m-artlist clearfix" role="list">
                        <div class="item">
                            <a class="thumb-img" href="javascript:;"><img src="images/user/5.jpg" />
                            </a>
                            <div class="tit"><a href="javascript:;">网易云音乐一次次“营销刷屏”，内部人士公开分享营销心得</a></div>
                            <div class="txt">
                                <span>今天 22:32</span><br />
                                <span>Brand：网易云音乐</span>
                            </div>
                            <div class="bar">
                                <a href="javascript:;" class="user-img">
                                    <img src="css/images/1x1.png" />
                                </a>
                                <span class="name">网易云音乐</span>
                                <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                            </div>
                        </div>
                        <div class="item">
                            <a class="thumb-img" href="javascript:;"><img src="images/user/5.jpg" />
                            </a>
                            <div class="tit"><a href="javascript:;">网易云音乐一次次“营销刷屏”，内部人士公开分享营销心得</a></div>
                            <div class="txt">
                                <span>今天 22:32</span><br />
                                <span>Brand：网易云音乐</span>
                            </div>
                            <div class="bar">
                                <a href="javascript:;" class="user-img">
                                    <img src="css/images/1x1.png" />
                                </a>
                                <span class="name">网易云音乐</span>
                                <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                            </div>
                        </div>
                        <div class="item">
                            <a class="thumb-img" href="javascript:;"><img src="images/user/5.jpg" />
                            </a>
                            <div class="tit"><a href="javascript:;">网易云音乐一次次“营销刷屏”，内部人士公开分享营销心得</a></div>
                            <div class="txt">
                                <span>今天 22:32</span><br />
                                <span>Brand：网易云音乐</span>
                            </div>
                            <div class="bar">
                                <a href="javascript:;" class="user-img">
                                    <img src="css/images/1x1.png" />
                                </a>
                                <span class="name">网易云音乐</span>
                                <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                            </div>
                        </div>
                        <div class="item">
                            <a class="thumb-img" href="javascript:;"><img src="images/user/5.jpg" />
                            </a>
                            <div class="tit"><a href="javascript:;">网易云音乐一次次“营销刷屏”，内部人士公开分享营销心得</a></div>
                            <div class="txt">
                                <span>今天 22:32</span><br />
                                <span>Brand：网易云音乐</span>
                            </div>
                            <div class="bar">
                                <a href="javascript:;" class="user-img">
                                    <img src="css/images/1x1.png" />
                                </a>
                                <span class="name">网易云音乐</span>
                                <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                            </div>
                        </div>
                    </div>
                    <a href="javascript:;" class="more-a">点击查看全部项目</a>
                    <div class="nolist">
                        <i class="icon-no-art"></i>
                        <span>· 暂未发表文章 ·</span>
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
                    <div class="qy-r-jobs clearfix">
                        <div class="qy-title">最新招聘</div>
                        <ul class="qy-rjob">
                            <li><a href="javascript:;">美术指导/Art Director </a></li>
                            <li><a href="javascript:;">Art Director </a></li>
                            <li><a href="javascript:;">美术指导/Art Director </a></li>
                            <li><a href="javascript:;">美术指导/Art Director </a></li>
                            <li><a href="javascript:;">美术指导/Art Director </a></li>
                            <li><a href="javascript:;">Art Director </a></li>
                        </ul>
                        <a href="javascript:;" class="more-a">更多招聘+</a>
                    </div>
                    <div class="nolist">
                        <span>· 暂未发布招聘 ·</span>
                    </div>
                </div>
            </div>
        );
    }
}




