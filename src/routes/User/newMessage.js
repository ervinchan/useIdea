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
import ArticleList from './ArticleList'
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/question.less'
import '../../static/less/u.laixin.less'

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
        var swiper_wheel = new Swiper('.slide-seat-315 .swiper-container', {
            loop: true,
            autoplay: true,
            pagination: {
                el: '.slide-seat-315 .u-pagination',
                bulletClass: 'bull',
                bulletActiveClass: 'active',
                clickable: true
            }
        });
        $(".jq-hidden").on("click", function (e) {
            $($(this).data("for")).toggleClass("hidden");
        });
        $(".msg-table li").click(function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active").siblings().removeClass("active");
            }
        });
        $(".u-tabs1 li").on("click", function () {
            let tabfor = $(this).attr("tabfor");
            $(this).addClass("active").siblings().removeClass("active");
            $(tabfor).addClass("active").siblings().removeClass("active")
        })
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
        const { discussList, collectList, questionList, } = this.state;


        return (
            <div className="">
                <div class="ue-minav">
                    <ul class="u-tabs1 clearfix">
                        <li tabfor=".tab-discuss" className="active">
                            <a href="javascript:;">新评论</a>
                        </li>
                        <li tabfor=".tab-collection"><a href="javascript:;">收藏<span>13</span></a>
                        </li>
                        <li tabfor=".tab-consult"><a href="javascript:;">请教</a>
                        </li>
                        <li tabfor=".tab-fans"><a href="javascript:;">粉丝<span>99+</span></a>
                        </li>
                        <li tabfor=".ue-article"><a href="javascript:;">关注更新<span>10</span></a>
                        </li>
                        <li tabfor=".tab-msg"><a href="javascript:;">站内消息<i class="badge">5</i></a>
                        </li>
                    </ul>
                </div>
                <div className="tab-cont">
                    <ArticleList data={discussList} className="tab-item tab-discuss active" />
                    <ArticleList data={collectList} className="tab-item tab-collection" />
                    <ArticleList data={questionList} className="tab-item tab-consult" />
                    <div class="tab-item tab-fans">
                        <ul class="lx-fans clearfix">
                            <li>
                                <div class="lx-item">
                                    <a href="javascript:;" class="face">
                                        <img src="images/user/userTx.jpg" />
                                    </a>
                                    <h1><a href="javascript:;" class="j_name">Vinvinvy</a></h1>
                                    <div class="lx_txt">
                                        食一碗人間煙火，品幾杯人生起落~
                                </div>
                                    <div class="lx_alt clearfix">
                                        <a href="javascript:;">作品<span>7</span></a>
                                        <a href="javascript:;">粉丝<span>136</span></a>
                                    </div>
                                    <a href="javascript:;" class="a_follow">关注</a>
                                </div>
                            </li>
                            <li>
                                <div class="lx-item">
                                    <a href="javascript:;" class="face">
                                        <img src="images/user/userTx.jpg" />
                                    </a>
                                    <h1><a href="javascript:;" class="j_name">Vinvinvy</a></h1>
                                    <div class="lx_txt">
                                        食一碗人間煙火，品幾杯人生起落~
                                </div>
                                    <div class="lx_alt clearfix">
                                        <a href="javascript:;">作品<span>7</span></a>
                                        <a href="javascript:;">粉丝<span>136</span></a>
                                    </div>
                                    <a href="javascript:;" class="a_follow">关注</a>
                                </div>
                            </li>
                            <li>
                                <div class="lx-item">
                                    <a href="javascript:;" class="face">
                                        <img src="images/user/userTx.jpg" />
                                    </a>
                                    <h1><a href="javascript:;" class="j_name">Vinvinvy</a></h1>
                                    <div class="lx_txt">
                                        食一碗人間煙火，品幾杯人生起落~
                                </div>
                                    <div class="lx_alt clearfix">
                                        <a href="javascript:;">作品<span>7</span></a>
                                        <a href="javascript:;">粉丝<span>136</span></a>
                                    </div>
                                    <a href="javascript:;" class="a_follow">已关注<span>取消关注</span></a>
                                </div>
                            </li>
                            <li>
                                <div class="lx-item">
                                    <a href="javascript:;" class="face">
                                        <img src="images/user/userTx.jpg" />
                                    </a>
                                    <h1><a href="javascript:;" class="j_name">Vinvinvy</a></h1>
                                    <div class="lx_txt">
                                        食一碗人間煙火，品幾杯人生起落~
                                </div>
                                    <div class="lx_alt clearfix">
                                        <a href="javascript:;">作品<span>7</span></a>
                                        <a href="javascript:;">粉丝<span>136</span></a>
                                    </div>
                                    <a href="javascript:;" class="a_follow">关注</a>
                                </div>
                            </li>
                            <li>
                                <div class="lx-item">
                                    <a href="javascript:;" class="face">
                                        <img src="images/user/userTx.jpg" />
                                    </a>
                                    <h1><a href="javascript:;" class="j_name">Vinvinvy</a></h1>
                                    <div class="lx_txt">
                                        食一碗人間煙火，品幾杯人生起落~
                                </div>
                                    <div class="lx_alt clearfix">
                                        <a href="javascript:;">作品<span>7</span></a>
                                        <a href="javascript:;">粉丝<span>136</span></a>
                                    </div>
                                    <a href="javascript:;" class="a_follow">已关注<span>取消关注</span></a>
                                </div>
                            </li>
                        </ul>
                        <div class="more-b">
                            <a href="javascript:;">更多动态</a>
                        </div>
                    </div>
                    <ul class="tab-item ue-article clearfix">
                        {this.createList()}
                    </ul>
                    <div class="tab-item tab-msg">
                        <ul class="msg-tab u-tabs1 clearfix">
                            <li tabfor=".msg-all">全部消息</li>
                            <li tabfor=".msg-sys">系统提醒</li>
                            <li tabfor=".msg-edit">编辑来信</li>
                        </ul>
                        <div className="tab-cont">
                            <div class="tab-item msg-all active">
                                <ul class="msg-table clearfix">
                                    <li>
                                        <h1><a href="javascript:;">恭喜！您的文章已通过编辑审核，将于近日发布至相关专栏。</a></h1>
                                        <span class="mdate">12月11日</span>
                                        <div class="mbox">
                                            您管理的帐号ideazhu@gmail.com已进入年审期，请登录mp.weixin.qq.com提交认证申请。<br />
                                            帐号：ideazhu@gmail.com<br />
                                            名称：文案圈周刊<br />
                                            到期时间：2019年01月19日<br />
                                            <a href="javascript:;">查看原文</a>
                                        </div>
                                    </li>
                                    <li>
                                        <h1><a href="javascript:;">恭喜！您的文章已通过编辑审核，将于近日发布至相关专栏。</a></h1>
                                        <span class="mdate">12月11日</span>
                                        <div class="mbox">
                                            您管理的帐号ideazhu@gmail.com已进入年审期，请登录mp.weixin.qq.com提交认证申请。<br />
                                            帐号：ideazhu@gmail.com<br />
                                            名称：文案圈周刊<br />
                                            到期时间：2019年01月19日<br />
                                            <a href="javascript:;">查看原文</a>
                                        </div>
                                    </li>
                                    <li>
                                        <h1><a href="javascript:;">恭喜！您的文章已通过编辑审核，将于近日发布至相关专栏。</a></h1>
                                        <span class="mdate">12月11日</span>
                                        <div class="mbox">
                                            您管理的帐号ideazhu@gmail.com已进入年审期，请登录mp.weixin.qq.com提交认证申请。<br />
                                            帐号：ideazhu@gmail.com<br />
                                            名称：文案圈周刊<br />
                                            到期时间：2019年01月19日<br />
                                            <a href="javascript:;">查看原文</a>
                                        </div>
                                    </li>
                                    <li>
                                        <h1><a href="javascript:;">恭喜！您的文章已通过编辑审核，将于近日发布至相关专栏。</a></h1>
                                        <span class="mdate">12月11日</span>
                                        <div class="mbox">
                                            您管理的帐号ideazhu@gmail.com已进入年审期，请登录mp.weixin.qq.com提交认证申请。<br />
                                            帐号：ideazhu@gmail.com<br />
                                            名称：文案圈周刊<br />
                                            到期时间：2019年01月19日<br />
                                            <a href="javascript:;">查看原文</a>
                                        </div>
                                    </li>
                                    <li>
                                        <h1><a href="javascript:;">恭喜！您的文章已通过编辑审核，将于近日发布至相关专栏。</a></h1>
                                        <span class="mdate">12月11日</span>
                                        <div class="mbox">
                                            您管理的帐号ideazhu@gmail.com已进入年审期，请登录mp.weixin.qq.com提交认证申请。<br />
                                            帐号：ideazhu@gmail.com<br />
                                            名称：文案圈周刊<br />
                                            到期时间：2019年01月19日<br />
                                            <a href="javascript:;">查看原文</a>
                                        </div>
                                    </li>
                                    <li class="visited">
                                        <h1><a href="javascript:;">恭喜！您的文章已通过编辑审核，将于近日发布至相关专栏。</a></h1>
                                        <span class="mdate">12月11日</span>
                                        <div class="mbox">
                                            您管理的帐号ideazhu@gmail.com已进入年审期，请登录mp.weixin.qq.com提交认证申请。<br />
                                            帐号：ideazhu@gmail.com<br />
                                            名称：文案圈周刊<br />
                                            到期时间：2019年01月19日<br />
                                            <a href="javascript:;">查看原文</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-item msg-sys">
                                <div class="nolist">
                                    <i class="icon-no-new"></i>
                                    <span>· 暂无系统消息 ·</span>
                                </div>
                            </div>
                            <div class="tab-item msg-edit">
                                <div class="nolist">
                                    <i class="icon-no-new"></i>
                                    <span>· 暂无编辑来信 ·</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

