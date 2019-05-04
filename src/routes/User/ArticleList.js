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
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/question.less'

import defaultPhoto from "../../static/images/user/default.png"

export default class ArticleList extends Component {

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
    }

    createList = () => {
        const { data, dataType } = this.props;
        if (dataType === "评论文章" || dataType === "请教回应") {
            return data && data.list && data.list.map(item => {
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
                        <div class="lx_txt">
                            {item.content}
                        </div>
                        <div class="lx-bar f-right">
                            <a href="javascript:;" class="reply" onClick={() => this.handleLike(item)}><i class="icon-reply"></i>回复</a>
                            {/* <a href="javascript:;" class="thumbs"><i class="icon-thumbs"></i>赞</a> */}
                            <a href="javascript:;" class="thumbs" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a>
                        </div>
                    </li>

                )
            })
        } else if (dataType === "收藏文章") {
            return data && data.map(item => {
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

    render() {
        const { toolList } = this.state;
        const { className, data } = this.props;
        return (
            <div class={className}>
                <ul class="lx-article clearfix">
                    {this.createList()}
                </ul>
                <div class="more-b" style={{ display: data.list && data.list.length < 20 ? 'none' : 'block' }}>
                    <a href="javascript:;">更多动态</a>
                </div>
            </div>
        );
    }
}

