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
        const { className } = this.props;
        return (
            <div class={className}>
                <ul class="lx-article clearfix">
                    <li>
                        <a href="javascript:;" class="face">
                            <img src="images/user/userTx.jpg" />
                        </a>
                        <div class="lx_alt clearfix">
                            <a href="javascript:;" class="j_name">Vinvinvy</a>
                            <span>评论文章</span>
                            <span class="dot"></span>
                            <span>12月07日  20:45</span>
                        </div>
                        <div class="lx_box">
                            <a class="thumb-img" href="javascript:;"><img src="images/user/u1.png" /></a>
                            <h1><a href="javascript:;">最全案例合集：一个不够酷的品牌该怎样变酷？</a></h1>
                            <p>2018-06-19 16:09</p>
                        </div>
                        <div class="lx_txt">
                            台湾的行销很少靠所谓的社交媒体 因为很好的内容就会引发受众的转发 即使是最传统TVC 也能触动人心。
                            </div>
                        <div class="lx-bar f-right">
                            <a href="javascript:;" class="reply" data-el="lx-reply"><i class="icon-reply"></i>回复</a>
                            <a href="javascript:;" class="thumbs"><i class="icon-thumbs"></i>赞</a>
                        </div>
                    </li>
                    <li>
                        <a href="javascript:;" class="face">
                            <img src="images/user/userTx.jpg" />
                        </a>
                        <div class="lx_alt clearfix">
                            <a href="javascript:;" class="j_name">Vinvinvy</a>
                            <span>评论文章</span>
                            <span class="dot"></span>
                            <span>12月07日  20:45</span>
                        </div>
                        <div class="lx_box">
                            <a class="thumb-img" href="javascript:;"><img src="images/user/u1.png" /></a>
                            <h1><a href="javascript:;">最全案例合集：一个不够酷的品牌该怎样变酷？》</a></h1>
                            <p>2018-06-19 16:09</p>
                        </div>
                        <div class="lx_txt">
                            台湾的行销很少靠所谓的社交媒体 因为很好的内容就会引发受众的转发 即使是最传统TVC 也能触动人心。
                            </div>
                        <div class="lx-bar f-right">
                            <a href="javascript:;" class="reply" data-el="lx-reply"><i class="icon-reply"></i>回复</a>
                            <a href="javascript:;" class="thumbs active"><i class="icon-thumbs"></i>已赞</a>
                        </div>
                    </li>
                </ul>
                <div class="more-b">
                    <a href="javascript:;">更多动态</a>
                </div>
            </div>
        );
    }
}

