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
import Collect from '../../common/collect'
import Like from '../../common/like'
import Comment from '../../common/comment'
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/question.less'
import '../../static/less/u.laixin.less'

import defaultPhoto from "../../static/images/user/default.png"
const PAGESIZE = 6;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class NewMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            newCommentList: {},
            collectList: {},
            questionList: {},
            fans: {},
            focus: {},
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
        const { newCommentList } = this.state;
        let pageNo = newCommentList.list && Math.ceil(newCommentList.list.length / PAGESIZE) + 1
        Service.GetPersonalComment({
            categoryIdFlag: 1,
            userId: userInfo.id,
            pageSize: PAGESIZE,
            pageNo: pageNo || 1
        })
            .then((response) => {
                let newCommentList = response.data.data
                this.setState({ newCommentList })
            })
    }

    getCollect = () => {
        const { collectList } = this.state;
        let pageNo = collectList.list && Math.ceil(collectList.list.length / PAGESIZE) + 1
        Service.GetCollectList({
            userId: userInfo.id,
            pageSize: PAGESIZE,
            pageNo: pageNo || 1
        })
            .then((response) => {
                let collectList = response.data.data
                this.setState({ collectList })
            })
    }

    getQuestion = () => {
        const { questionList } = this.state;
        let pageNo = questionList.list && Math.ceil(questionList.list.length / PAGESIZE) + 1
        Service.GetQuestion({
            categoryId: global.constants.categoryIds['请教'].id,
            userId: userInfo.id,
            pageSize: PAGESIZE,
            pageNo: pageNo || 1
        })
            .then((response) => {
                let questionList = response.data.data
                this.setState({ questionList })
            })
    }

    getFans = () => {
        const { fans } = this.state;
        let pageNo = fans.list && Math.ceil(fans.list.length / PAGESIZE) + 1
        Service.GetFansList({
            userId: userInfo.id,
            pageSize: PAGESIZE,
            pageNo: pageNo || 1
        })
            .then((response) => {
                let fans = response.data.data
                this.setState({ fans })
            })
    }

    getFocus = () => {
        const { focus } = this.state;
        let pageNo = focus.list && Math.ceil(focus.list.length / PAGESIZE) + 1
        Service.GetCollectList({
            userId: userInfo.id,
            updateTime: 1,
            pageSize: PAGESIZE,
            pageNo: pageNo || 1
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
                        <div className="f-bartool clearfix">
                            <Collect item={item} />
                            <Like item={item} />
                            <Comment item={item} />
                        </div>
                    </div>
                </li>
            )
        })
    }
    handleFoucs = (uid) => {
        Service.AddAttention({
            attention2UserId: uid,
            userId: JSON.parse(sessionStorage.getItem("userInfo")).id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {

                this.setState({ isFans: response.data.status })
            }

            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }

    createFansList = () => {
        const { fans } = this.state;
        return fans.list && fans.list.map(item => {
            return (
                <li>
                    <div class="lx-item">
                        <a href="javascript:;" class="face">
                            <img src={item.photo || defaultPhoto} />
                        </a>
                        <h1><a href="javascript:;" class="j_name">{item.name}</a></h1>
                        <div class="lx_txt">
                            {item.description}
                        </div>
                        <div class="lx_alt clearfix">
                            {/* <a href="javascript:;" onClick={() => { this.gotoRouter(`/UserNews/${item.id}`) }}>作品<span>{item.attention2Num}</span></a> */}
                            <a href="javascript:;" onClick={() => { this.gotoRouter(`/MyFans/${item.id}`) }}>粉丝<span>{item.attention2Num}</span></a>
                        </div>
                        <a href="javascript:;" class="a_follow" onClick={() => this.handleFoucs(item.id)}>已关注</a>
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
                            <a href="javascript:;">新评论{/*<span>{newCommentList.length}</span>*/}</a>
                        </li>
                        <li tabfor=".tab-collection"><a href="javascript:;">收藏
                        {/* <span>{collectList.count}</span> */}
                        </a>
                        </li>
                        <li tabfor=".tab-consult"><a href="javascript:;">请教{/*<span>{questionList.count}</span>*/}</a>
                        </li>
                        <li tabfor=".tab-fans"><a href="javascript:;">粉丝{/*<span>{fans.count}</span>*/}</a>
                        </li>
                        <li tabfor=".ue-article"><a href="javascript:;">关注更新{/*<span>{focus.count}</span>*/}</a>
                        </li>
                        <li tabfor=".tab-msg"><a href="javascript:;">站内消息<i className="badge" style={{ display: sysNews.allNews.length ? 'block' : 'none' }}>{sysNews.allNews.length}</i></a>
                        </li>
                    </ul>
                </div>
                <div className="tab-cont">
                    <ArticleList data={newCommentList} history={this.props.history} getDatas={this.getNewComment} dataType="评论文章" className="tab-item tab-discuss active" />
                    <ArticleList data={collectList} history={this.props.history} getDatas={this.getCollect} dataType="收藏文章" className="tab-item tab-collection" />
                    <ArticleList data={questionList} history={this.props.history} getDatas={this.getQuestion} dataType="请教回应" className="tab-item tab-consult" />
                    <div className="tab-item tab-fans">
                        <ul className="lx-fans clearfix">
                            {this.createFansList()}
                            <div className="nolist" style={{ display: fans.list ? 'none' : 'block' }}>
                                <i className="icon-no-new"></i>
                                <span>· 暂无数据 ·</span>
                            </div>
                        </ul>
                        <div className="more-b" style={{ display: fans.list && (fans.list.length < fans.count) ? 'block' : 'none' }}>
                            <a href="javascript:;" onClick={() => this.getFans()}>更多动态</a>
                        </div>
                    </div>
                    <ul className="tab-item ue-article clearfix">
                        {this.createList()}
                        <div className="more-b" style={{ display: focus.list && (focus.list.length < focus.count) ? 'block' : 'none' }}>
                            <a href="javascript:;" onClick={() => this.getFocus()}>更多动态</a>
                        </div>
                        <div className="nolist" style={{ display: focus.list ? 'none' : 'block' }}>
                            <i className="icon-no-new"></i>
                            <span>· 暂无数据 ·</span>
                        </div>
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

