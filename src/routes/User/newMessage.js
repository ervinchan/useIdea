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
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/question.less'
import '../../static/less/u.laixin.less'

import defaultPhoto from "../../static/images/user/default.png"
const PAGESIZE = 3;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class NewMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            newCommentList: [],
            collectList: [],
            questionList: [],
            fans: [],
            focus: [],
            sysNews: {
                allNews: [],
                sysNews: [],
                editorNews: []
            }

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
        this.getNewComment();
        this.getCollect();
        this.getQuestion();
        this.getFans();
        this.getFocus();
        this.getSysNews('', 'allNews');
        this.getSysNews('1', 'sysNews');
        this.getSysNews('2', 'editorNews');
    }

    getNewComment = () => {
        Service.GetCommentList({
            categoryIdFlag: 1,
            userId: userInfo.id
        })
            .then((response) => {
                let newCommentList = response.data.data
                this.setState({ newCommentList })
            })
    }

    getCollect = () => {
        Service.GetCollectList({
            userId: userInfo.id
        })
            .then((response) => {
                let collectList = response.data.data
                this.setState({ collectList })
            })
    }

    getQuestion = () => {
        Service.GetQuestion({
            categoryId: global.constants.categoryIds['请教'].id,
            userId: userInfo.id
        })
            .then((response) => {
                let questionList = response.data.data
                this.setState({ questionList })
            })
    }

    getFans = () => {
        Service.GetFansList({
            userId: userInfo.id
        })
            .then((response) => {
                let fans = response.data.data
                this.setState({ fans })
            })
    }

    getFocus = () => {
        Service.GetCollectList({
            userId: userInfo.id,
            updateTime: 1
        })
            .then((response) => {
                let focus = response.data.data
                this.setState({ focus })
            })
    }

    getSysNews = (type, name) => {
        Service.GetSysNews({
            userId: userInfo.id,
            type
        })
            .then((response) => {
                if (response.data.status === 1) {
                    const { sysNews } = this.state;
                    sysNews[name] = response.data.data
                    this.setState({ sysNews })
                }

            })
    }

    handlePageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getBooksList(this.props.match.params.tid, this.state.sortType, page)
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
            .catch((error) => {
                console.log(error)
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
            .catch((error) => {
                console.log(error)
            })
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    createList = () => {
        const { focus } = this.state
        const categorys = global.constants.categorys
        return focus.list && focus.list.map((item, index) => {
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
                    <div className="ue_info">
                        <a href="javascript:;" className="face" onClick={() => this.gotoRouter(`${router}${item.id}`)}>
                            <img src={item.user.photo || defaultPhoto} />
                        </a>
                        <div className="alt clearfix">
                            <a href="javascript:;" className="j_name">{item.user.name}</a>
                            <span className="dot"></span>
                            <span>{Time}</span>
                        </div>
                        <div className="bat">{item.category.name}</div>
                    </div>
                    <div className="ue_box">
                        <a className="thumb-img" href="javascript:;"><img src={item.image} /></a>
                        <h1><a href="javascript:;" onClick={() => this.gotoRouter(`${router}${item.id}`)}>{item.title}</a></h1>
                        <div className="txt nowrap">
                            {item.description}
                        </div>
                        <div className="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleCollect(item)}><i className="icon-heart"></i><span>{item.collectNum}</span></a><a href="javascript:;" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a><a href="javascript:;"><i className="icon-comment"></i><span>{item.commentNum}</span></a></div>
                    </div>
                </li>
            )
        })
    }

    createFansList = () => {
        const { fans } = this.state;
        fans.map(item => {
            return (
                <li>
                    <div className="lx-item">
                        <a href="javascript:;" className="face">
                            <img src="images/user/userTx.jpg" />
                        </a>
                        <h1><a href="javascript:;" className="j_name">Vinvinvy</a></h1>
                        <div className="lx_txt">
                            食一碗人間煙火，品幾杯人生起落~
                    </div>
                        <div className="lx_alt clearfix">
                            <a href="javascript:;">作品<span>7</span></a>
                            <a href="javascript:;">粉丝<span>136</span></a>
                        </div>
                        <a href="javascript:;" className="a_follow">关注</a>
                        <a href="javascript:;" className="a_follow">已关注<span>取消关注</span></a>
                    </div>
                </li>
            )
        })

    }

    createMessage = (data) => {
        return data.list && data.list.map(item => {
            let Time = FormatDate.formatTime(item.updateDate)
            return (
                <li>
                    <h1><a href="javascript:;">{item.title}</a></h1>
                    <span className="mdate">{Time}</span>
                    <div className="mbox">
                        {item.content}<br />
                        帐号：{item.user.name}<br />
                        名称：{item.userName}<br />
                        到期时间：{item.timeOut}<br />
                        <a href="javascript:;">查看原文</a>
                    </div>
                </li>
            )
        })

    }

    render() {
        const { newCommentList, collectList, questionList, fans, focus, sysNews } = this.state;
        return (
            <div className="">
                <div className="ue-minav">
                    <ul className="u-tabs1 clearfix">
                        <li tabfor=".tab-discuss" className="active">
                            <a href="javascript:;">新评论</a>
                        </li>
                        <li tabfor=".tab-collection"><a href="javascript:;">收藏<span>{collectList.length}</span></a>
                        </li>
                        <li tabfor=".tab-consult"><a href="javascript:;">请教</a>
                        </li>
                        <li tabfor=".tab-fans"><a href="javascript:;">粉丝<span>{fans.length}</span></a>
                        </li>
                        <li tabfor=".ue-article"><a href="javascript:;">关注更新<span>{focus.length}</span></a>
                        </li>
                        <li tabfor=".tab-msg"><a href="javascript:;">站内消息<i className="badge" style={{ display: sysNews.allNews.length ? 'block' : 'none' }}>{sysNews.allNews.length}</i></a>
                        </li>
                    </ul>
                </div>
                <div className="tab-cont">
                    <ArticleList data={newCommentList} history={this.props.history} dataType="评论文章" className="tab-item tab-discuss active" />
                    <ArticleList data={collectList} history={this.props.history} dataType="收藏文章" className="tab-item tab-collection" />
                    <ArticleList data={questionList} history={this.props.history} dataType="请教回应" className="tab-item tab-consult" />
                    <div className="tab-item tab-fans">
                        <ul className="lx-fans clearfix">
                            {this.createFansList()}
                        </ul>
                        <div className="more-b" style={{ display: fans.length < 20 ? 'none' : 'block' }}>
                            <a href="javascript:;">更多动态</a>
                        </div>
                    </div>
                    <ul className="tab-item ue-article clearfix">
                        {this.createList()}
                    </ul>
                    <div className="tab-item tab-msg">
                        <ul className="msg-tab u-tabs1 clearfix">
                            <li tabfor=".msg-all" className='active'>全部消息</li>
                            <li tabfor=".msg-sys">系统提醒</li>
                            <li tabfor=".msg-edit">编辑来信</li>
                        </ul>
                        <div className="tab-cont">
                            <div className="tab-item msg-all active">
                                <ul className="msg-table clearfix">
                                    {this.createMessage(sysNews.allNews)}
                                </ul>
                                <div className="nolist" style={{ display: sysNews.allNews.length ? 'none' : 'block' }}>
                                    <i className="icon-no-new"></i>
                                    <span>· 暂无消息 ·</span>
                                </div>
                            </div>
                            <div className="tab-item msg-sys">
                                <ul className="msg-table clearfix">
                                    {this.createMessage(sysNews.sysNews)}
                                </ul>
                                <div className="nolist" style={{ display: sysNews.sysNews.length ? 'none' : 'block' }}>
                                    <i className="icon-no-new"></i>
                                    <span>· 暂无系统消息 ·</span>
                                </div>
                            </div>
                            <div className="tab-item msg-edit">
                                <ul className="msg-table clearfix">
                                    {this.createMessage(sysNews.editorNews)}
                                </ul>
                                <div className="nolist" style={{ display: sysNews.editorNews.length ? 'none' : 'block' }}>
                                    <i className="icon-no-new"></i>
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

