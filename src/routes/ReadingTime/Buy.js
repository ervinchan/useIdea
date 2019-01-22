import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, List, Avatar, Divider, Button, Card, Popover } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';
// import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import axios from 'axios'
import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import BookMenu from './Menu'
import BreadCrumb from '../../common/BreadCrumb/Index.js'
import FormatDate from '../../static/js/utils/formatDate.js'

import 'swiper/dist/css/swiper.min.css'


import banner from "../../static/images/1.jpg"
import banner2 from "../../static/images/2.jpg"

const TabPane = Tabs.TabPane;
const NODATA = "无数据";

export default class Bookstore extends Component {
    /*global $ */
    /*global layer */
    constructor(props) {
        super(props);
        this.state = {
            bookInfo: {},
            sameBookList: [
                {
                    "name": "野生中年不懂策略不该动笔写文案，90%的文案一犯再指南TOP",
                    "img": "",
                    "descri": "野生中年不懂策略不该动笔写文案，90",
                    "author": "盧建彰",
                    "id": 1
                },
                {
                    "name": "野生中年不懂策略不该动笔写文案",
                    "img": "",
                    "descri": "野生中年不懂策略不该动笔写文案",
                    "id": 2
                },
                {
                    "name": "野生中年不懂策略不该动笔写文案，90%的文案一犯再指南TOP",
                    "img": "",
                    "descri": "野生中年不懂策略不该动笔写文案，90",
                    "author": "盧建彰",
                    "id": 1
                },
                {
                    "name": "野生中年不懂策略不该动笔写文案",
                    "img": "",
                    "descri": "野生中年不懂策略不该动笔写文案",
                    "id": 2
                }
            ],
            readList: [],
        }
    }
    componentDidMount() {
        console.log(this.props.match.params);

        this.getBookDatas()
        this.getReadData()

        $("body").on("click", "[data-el]", function (e) {
            e = window.event || e;
            e.stopPropagation();
            switch ($(this).data("el")) {
                case ("weixin"):
                    //微信
                    console.log(layer)
                    layer.open({
                        type: 1,
                        area: ['270px', '330px'],
                        title: false,
                        skin: 'weixin-modal',
                        closeBtn: 0,
                        anim: 0,
                        shadeClose: true,
                        content: '<div class="weixin-box"><h1>文案圈周刊</h1><img src="/@2018/css/images/weixin.jpg" alt="微信公众号" /><h3>微信扫码关注，记录创作者的洞见</h3><p>联系编辑：zhuquex</p></div>'
                    });
                    break;
                case ("login"):
                    break;
            }
        });
    }

    getReadData = () => {

        let url = "/zsl/a/cms/article/readScene"
        axios.post(url)
            .then((response) => {
                let readList = response.data.data
                this.setState({ readList })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getBookDatas = () => {
        let url = '/zsl/a/book/bookManager/bookSoft?'
        let opts = {
            bookId: this.props.match.params.id
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                let bookInfo = response.data.data[0]
                this.setState({ bookInfo }, () => {
                    $(function () {
                        var swiper_book = new Swiper('.fs-book .swiper-container', {
                            slidesPerView: 3,
                            spaceBetween: 10,
                            slidesPerGroup: 3,
                            loop: true,
                            navigation: {
                                nextEl: '.fs-book .m-next',
                                prevEl: '.fs-book .m-prev'
                            },
                            pagination: {
                                el: '.fs-book .u-pagination',
                                bulletClass: 'bull',
                                bulletActiveClass: 'active',
                                clickable: true
                            }
                        });

                        var galleryThumbs = new Swiper('.fs-preview .gallery-thumbs', {
                            spaceBetween: 10,
                            slidesPerView: 'auto',
                            freeMode: true,
                            watchSlidesVisibility: true,
                            watchSlidesProgress: true
                        });
                        var galleryTop = new Swiper('.fs-preview .gallery-top', {
                            spaceBetween: 10,
                            navigation: {
                                nextEl: '.fs-preview .m-next',
                                prevEl: '.fs-preview .m-prev'
                            },
                            thumbs: {
                                swiper: galleryThumbs,
                                slideThumbActiveClass: 'active'
                            }
                        });
                    })
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    createSameBookList = () => {
        const { sameBookList } = this.state;

        return sameBookList.map((item, index) => {
            return (
                <a key={index} className="swiper-slide" href={`/Bookbuy/${item.id}`}>
                    <em><img src={item.img} /> </em>
                    <h1>{item.name}</h1>
                    <h3> {item.author}</h3>
                    <div className="txt">{item.descri}</div>
                </a>
            )
        })
    }

    createReadList = () => {
        const { readList } = this.state;

        return readList.map((item, index) => {
            return (
                <li key={index}>
                    <div className="swiper-slide">
                        <a className="thumb-img" href={item.link}><img src={item.image} />
                        </a>
                        <h1><a href="#">{item.title}</a></h1>
                        <div className="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleFavorite(index)}><i className="icon-heart"></i><span>{item.favorite}</span></a><a href="javascript:;" onClick={() => this.handleLikes(index)}><i className="icon-thumbs"></i><span>{item.like}</span></a><a href="javascript:;"><i className="icon-comment"></i><span>{item.comment}</span></a></div>

                    </div>
                </li>
            )
        })
    }

    createImg = (bookImg) => {
        return bookImg && bookImg.map((item, index) => {
            return <div className="swiper-slide"><img src={item} /></div>
        })
    }

    render() {
        const { bookInfo, readList } = this.state

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <div className="wrapper u-position">
                    {/* <BreadCrumb /> */}
                    您当前的位置：<a href="#">蜗牛翻书</a><span className="fa-angle-double-right"></span><a href="#">创意生成</a><span className="fa-angle-double-right"></span><a href="#">创作经验：《创意力》</a>
                </div>
                {
                    bookInfo &&
                    <div className="g-fanshu wrapper">
                        <div className="g-left">
                            <div className="fs-preview">
                                <div className="swiper-container gallery-top">
                                    <div className="swiper-wrapper">
                                        {this.createImg(bookInfo.imagUrl)}

                                    </div>
                                </div>
                                <div className="swiper-container gallery-thumbs">
                                    <div className="swiper-wrapper">
                                        {this.createImg(bookInfo.imagUrl)}
                                    </div>
                                </div>
                                <div className="m-next"></div>
                                <div className="m-prev"></div>
                            </div>
                            <div className="fs-item-buy clearfix">
                                <div className="g-left">
                                    <div className="itemname">
                                        <h1>{bookInfo.book_name}</h1>
                                        <div className="txt">{bookInfo.author}</div>
                                    </div>
                                    <div className="itemdepict">
                                        <h1>{bookInfo.bookName}</h1>
                                        <div className="txt">
                                            <p dangerouslySetInnerHTML={{ __html: bookInfo.authorIntroduce }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="g-right">
                                    <div className="itembuy">
                                        <a href={bookInfo.buyLink} className="buy"><span><i className="icon-buy1"></i>立即购买</span></a>
                                        <ul className="clearfix">
                                            <li className="shop"><a href={bookInfo.buyLink}><i className="icon-buy-shop"></i>直接访问店铺</a></li>
                                            <li className="weixin"><a href="javascript:;" data-el="weixin"><i className="icon-buy-weixin"></i>联系选书编辑</a></li>
                                        </ul>
                                    </div>
                                    <ul className="iteminfo">
                                        <li><span>图书类型</span>{bookInfo.bookType || NODATA}</li>
                                        <li><span>发行年</span>{FormatDate.customFormat(bookInfo.publishDate, 'yyyy/MM/dd') || NODATA}</li>
                                        <li><span>出版社</span>{bookInfo.publishingHouse || NODATA}</li>
                                        <li><span>语言</span>{bookInfo.language || NODATA}</li>
                                        <li><span>规格</span>{bookInfo.specification || NODATA}</li>
                                        <li><span>出版地</span>{bookInfo.placeOfPublication || NODATA}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="fs-detail-content clearfix">
                                <div dangerouslySetInnerHTML={{ __html: bookInfo.particulars }} />
                            </div>
                            <div className="m-fs-book fs-book">
                                <div className="u-title3">
                                    <b>同类好书</b>
                                </div>
                                <div className="swiper-container">
                                    <div className="swiper-wrapper">
                                        {this.createSameBookList()}
                                    </div>
                                </div>
                                <div className="u-pagination wide"></div>
                                <div className="m-prev"></div>
                                <div className="m-next"></div>
                            </div>
                            <div className="u-title3">
                                <b>阅读场景</b>
                                <a href="javascript:;" className="more"><i className="fa-reorder"></i> 查看全部</a>
                            </div>
                            <div className="fs-read">
                                <ul className="clearfix">
                                    {readList.length && this.createReadList()}
                                </ul>
                            </div>
                        </div>
                        <BookMenu getBooksList={this.getBooksList} />
                    </div>
                }

                {/* 底部 */}
                <Footer />
            </div>
        );
    }
}

