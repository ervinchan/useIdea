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
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/question.less'

import defaultPhoto from "../../static/images/user/default.png"
const PAGESIZE = 3;

export default class MyWork extends Component {

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
    handleLike = (item) => {
        POST({
            url: "/a/cms/article/like?",
            opts: {
                id: item.id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.likeNum++
                this.setState({})
            }
            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }
    handleCollect = (item) => {
        POST({
            url: "/a/artuser/articleCollect/collectArticle?",
            opts: {
                userId: 1,
                articleId: item.id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.collectNum++
                this.setState({})
            }

            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
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

    render() {
        const { toolList } = this.state;


        return (
            <div class="wrapper g-space">
                {/* <div class="ue-tabnav">
                    <ul class="clearfix">
                        <li><a href="qy_space_home.html">机构首页</a></li> 
                        <li><a href="qy_space_article.html">项目文章</a></li>
                        <li class="active"><a href="qy_space_job.html">最新招聘</a></li>
                    </ul>
                </div>            */}
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
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

