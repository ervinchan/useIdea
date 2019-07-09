import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import WheelBanner from '../../common/wheelBanner/Index'
import HotRead from '../../common/hotRead/Index'
import Service from '../../service/api.js'
import Like from '../../common/like'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/question.less'

import defaultPhoto from "../../static/images/user/default.png"
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class ArticleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            toolList: [],
            replyId: '',
            replyContent: ''
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
    }

    createList = () => {
        const { data, dataType, replyContent } = this.props;
        if (dataType === "评论文章" || dataType === "请教回应") {
            return data && data.list && data.list.map(item => {
                let Time = FormatDate.formatTime(item.createDate);
                return (
                    <li>
                        <a href="javascript:;" class="face" onClick={() => this.gotoRouter(`/Qyspace/${item.user.id}`)}>
                            <img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                        </a>
                        <div class="lx_alt clearfix">
                            <a href="javascript:;" class="j_name" onClick={() => this.gotoRouter(`/Qyspace/${item.user.id}`)}>{item.user.name}</a>
                            <span>{dataType}</span>
                            <span class="dot"></span>
                            <span>{Time}</span>
                        </div>
                        <div class="lx_box">
                            <a class="thumb-img" href="javascript:;"><img src={item.image || "images/user/u1.png"} onClick={() => this.gotoRouter(`/Qyspace/${item.user.id}`)} /></a>
                            <h1><a href="javascript:;" onClick={() => this.gotoRouter(`/Qyspace/${item.user.id}`)}>{item.title}</a></h1>
                            <p>{Time}</p>
                        </div>
                        <div class="lx_txt">
                            {item.content}
                        </div>
                        <div class="lx-bar f-right">
                            {/* <a href="javascript:;" class="reply" onClick={() => this.handleReply(item)}><i class="icon-reply"></i>回复</a> */}
                            {/* <a href="javascript:;" class="thumbs"><i class="icon-thumbs"></i>赞</a> */}
                            {/* <a href="javascript:;" class="thumbs" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a> */}
                            <Like item={item} />
                        </div>
                        <div class="lx-artfrom" style={{ display: (item.id === this.state.replyId ? "" : "none") }}><textarea placeholder="我来补充两句。" value={replyContent} onChange={this.handleChangeReply}></textarea><a href="javascript:;" class="escbtn" data-el="lxesc" onClick={this.cancleReply}>取消回复</a><a href="javascript:;" class="enbtn active" onClick={() => this.submitComment(item, replyContent)}>回 复</a></div>

                    </li>

                )
            })
        } else if (dataType === "收藏文章") {
            return data.list && data.list.map(item => {
                let Time = FormatDate.formatTime(item.createDate);
                return (
                    <li>
                        <a href="javascript:;" class="face" onClick={() => this.gotoRouter(`/Qyspace/${item.user.id}`)}>
                            <img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                        </a>
                        <div class="lx_alt clearfix">
                            <a href="javascript:;" class="j_name">{item.user.name}</a>
                            <span>{dataType}</span>
                            <span class="dot"></span>
                            <span>{Time}</span>
                        </div>
                        <div class="lx_box">
                            <a class="thumb-img" href="javascript:;"><img src="images/user/u1.png" /></a>
                            <h1><a href="javascript:;">{item.title}</a></h1>
                            <p>{Time}</p>
                        </div>
                    </li>

                )
            })
        }

    }

    handlePageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getBooksList(this.props.match.params.tid, this.state.sortType, page)
    }

    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    cancleReply = () => {
        this.setState({ replyId: '', replyContent: '' });
    }

    handleReply = (item) => {
        this.setState({ replyId: item.id })
    }
    handleChangeReply = (e) => {
        this.setState({ replyContent: e.target.value })
    }
    submitComment = (item, content) => {
        if (userInfo && userInfo.id) {
            Service.SubmitComment({
                title: item.title,
                categoryId: item.category.id,
                contentId: item.id,
                replyId: item.id || '',
                name: userInfo && userInfo.name,
                isValidate: "0",
                content: content,
                userId: userInfo && userInfo.id
            }).then((response) => {
                global.constants.loading = false
                if (response.data.status === 1) {
                    this.cancleReply();
                    this.getArticleComment(item.id, item.category.id)
                }

                /* global layer */
                layer.msg(response.data.message)
            })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            layer.alert('请先登录')
        }

    }

    render() {
        const { toolList } = this.state;
        const { className, data } = this.props;

        debugger
        return (
            <div class={className}>
                <ul class="lx-article clearfix">
                    {this.createList()}
                    <div className="nolist" style={{ display: data.list ? 'none' : 'block' }}>
                        <i className="icon-no-new"></i>
                        <span>· 暂无数据 ·</span>
                    </div>
                </ul>
                <div class="more-b" style={{ display: data.list && (data.list.length < data.count) ? 'block' : 'none' }}>
                    <a href="javascript:;" onClick={() => this.getDatas()}>更多动态</a>
                </div>
            </div>
        );
    }
}

