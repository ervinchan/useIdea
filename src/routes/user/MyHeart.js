import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'
import Service from '../../service/api.js'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/question.less'

import defaultPhoto from "../../static/images/user/default.png"
const PAGESIZE = 3;

export default class MyHeart extends Component {

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
        Service.GetAllArticle({
            hits: 1,
            categoryId: categoryId || ''
        }).then((response) => {
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
                            <img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
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
                        <h1><a href="javascript:;" onClick={() => this.gotoRouter()}>{item.title}</a></h1>
                        <div className="txt nowrap">
                            {item.description}
                        </div>
                        <div className="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleCollect(item)}><i className="icon-heart"></i><span>{item.collectNum}</span></a><a href="javascript:;" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a><a href="javascript:;"><i className="icon-comment"></i><span>{item.commentNum}</span></a></div>
                    </div>
                </li>
            )
        })
    }

    render() {
        const { toolList } = this.state;

        return (
            <div className="">
                <ul className="ue-article clearfix">
                    {this.createList()}
                    {/* <li>
                        <div className="ue_info">
                            <a href="#" className="face">
                                <img src="css/images/1x1.png" />
                            </a>
                            <div className="alt clearfix">
                                <a href="#" className="j_name">布谷云</a>
                                <span className="dot"></span>
                                <span>12月07日  20:45</span>
                            </div>
                            <div className="bat">文章栏目</div>
                        </div>
                        <div className="ue_box">
                            <a className="thumb-img" href="javascript:;"><img src="images/space/3.jpg" /></a>
                            <h1><a href="#">京东618广告案例最全复盘，销售额1592亿再创新高！</a></h1>
                            <div className="txt nowrap">
                                今年618被世界杯的声量压过去了，但依然挡不住年中的消费狂欢。
                            </div>
                            <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>
                        </div>
                    </li>
                    <li>
                        <div className="ue_info">
                            <a href="#" className="face">
                                <img src="css/images/1x1.png" />
                            </a>
                            <div className="alt clearfix">
                                <a href="#" className="j_name">布谷云</a>
                                <span className="dot"></span>
                                <span>12月07日  20:45</span>
                            </div>
                            <div className="bat">文章栏目</div>
                        </div>
                        <div className="ue_box">
                            <a className="thumb-img" href="javascript:;"><img src="images/space/3.jpg" /></a>
                            <h1><a href="#">京东618广告案例最全复盘，销售额1592亿再创新高！</a></h1>
                            <div className="txt nowrap">
                                今年618被世界杯的声量压过去了，但依然挡不住年中的消费狂欢。
                            </div>
                            <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>
                        </div>
                    </li> */}
                </ul>
                {/* <div className="u-pages">
                    <div className="box clearfix">
                        <a href="javascript:;">Prev</a>
                        <a href="javascript:;"><i className="fa-angle-double-left"></i></a>
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
                        <a href="javascript:;"><i className="fa-angle-double-right"></i></a>
                        <a href="javascript:;">Next</a>
                    </div>
                </div> */}
            </div>
        );
    }
}

