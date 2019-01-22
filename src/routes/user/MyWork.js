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
                        <a className="thumb-img" href={`/#/Bookstore/Bookbuy/${item.id}`}><img src={item.imageSrc} /></a>
                        <div className="tag">{item.category.name}</div>
                        <h1><a href={`/#/Bookstore/Bookbuy/${item.id}`}>{item.title}</a></h1>
                        <div className="alt clearfix">
                            <a href="#" className="j_name"><img src={item.user.img} className="thumb-img" />{item.author}</a>
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

    render() {
        const { toolList } = this.state;

        return (
            <div className="">
                <ul class="ue-article clearfix">
                    <li>
                        <div class="ue_info">
                            <a href="#" class="face">
                                <img src="css/images/1x1.png" />
                            </a>
                            <div class="alt clearfix">
                                <a href="#" class="j_name">布谷云</a>
                                <span class="dot"></span>
                                <span>12月07日  20:45</span>
                            </div>
                            <div class="bat">文章栏目</div>
                        </div>
                        <div class="ue_box">
                            <a class="thumb-img" href="javascript:;"><img src="images/space/3.jpg" /></a>
                            <h1><a href="#">由你音乐榜：冬天很冷，给你让你听点热的</a></h1>
                            <div class="txt nowrap">
                                “路灯看久了，总觉得没有老家的星星亮”
                                </div>
                            <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>
                        </div>
                    </li>
                    <li>
                        <div class="ue_info">
                            <a href="#" class="face">
                                <img src="css/images/1x1.png" />
                            </a>
                            <div class="alt clearfix">
                                <a href="#" class="j_name">布谷云</a>
                                <span class="dot"></span>
                                <span>12月07日  20:45</span>
                            </div>
                            <div class="bat">文章栏目</div>
                        </div>
                        <div class="ue_box">
                            <a class="thumb-img" href="javascript:;"><img src="images/space/3.jpg" /></a>
                            <h1><a href="#">由你音乐榜：冬天很冷，给你让你听点热的</a></h1>
                            <div class="txt nowrap">
                                “路灯看久了，总觉得没有老家的星星亮”
                                </div>
                            <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>
                        </div>
                    </li>
                    <li>
                        <div class="ue_info">
                            <a href="#" class="face">
                                <img src="css/images/1x1.png" />
                            </a>
                            <div class="alt clearfix">
                                <a href="#" class="j_name">布谷云</a>
                                <span class="dot"></span>
                                <span>12月07日  20:45</span>
                            </div>
                            <div class="bat">文章栏目</div>
                        </div>
                        <div class="ue_box">
                            <a class="thumb-img" href="javascript:;"><img src="images/space/3.jpg" /></a>
                            <h1><a href="#">由你音乐榜：冬天很冷，给你让你听点热的</a></h1>
                            <div class="txt nowrap">
                                “路灯看久了，总觉得没有老家的星星亮”
                                </div>
                            <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>
                        </div>
                    </li>
                </ul>
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
            </div>
        );
    }
}

