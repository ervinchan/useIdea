import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';
import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import WheelBanner from '../../common/wheelBanner/Index'
import BookMenu from '../../common/bookMenu/Menu'

import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/bookstore.less';


import banner from "../../static/images/1.jpg"
import banner2 from "../../static/images/2.jpg"
import { CLASS } from 'postcss-selector-parser';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const PAGESIZE = 3;

export default class Bookstore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            news: [],
            readList: []
        };
    }

    fetchData(nextProps) {
        let location = nextProps.location
        let match = nextProps.match
        let hasSearch = location.pathname.includes('search')
        let pid = match.params.tid
        if (hasSearch) {
            pid = location.pathname.split('=')[1]
            this.getBooksList(0, this.state.sortType, '', pid)
        } else {
            this.getBooksList(pid, this.state.sortType)
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            console.log(nextProps)
            this.fetchData(nextProps);
        }
    }

    componentDidMount() {
        let that = this
        let tid = this.props.match.params.tid
        let hasSearch = tid && tid.includes('search')
        if (hasSearch) {
            let pid = tid.split('=')[1]
            this.getBooksList(0, this.state.sortType, '', pid)
        } else {
            this.getBooksList(tid, this.state.sortType)
        }
        // console.log(this.props.match.params);
        // this.getBooksList(this.props.match.params.tid, this.state.sortType)
        this.getNews()
        this.getBanner()
        this.getReadData()
        $(function () {
            $(".u-select [role=note]").on("click", function (e) {
                e = window.event || e;
                e.stopPropagation();
                $(this).next().show();
            });
            $(".u-select li").on("click", function (e) {
                e = window.event || e;
                e.stopPropagation();
                let sortType = Number($(this).attr("type"))
                $($(this).parents("[role=menu]").data("for")).html($(this).text());
                $(this).parents("[role=menu]").hide();
                that.setState({ sortType })
                that.getBooksList(that.props.match.params.tid, sortType)
            });


        })
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

    getBanner = () => {
        let url = "/zsl/a/cms/article/adsList"
        axios.post(url)
            .then((response) => {
                let banner = response.data.data
                this.setState({ banner }, () => {
                    var swiper_wheel = new Swiper('.u-wheel .swiper-container', {
                        loop: true,
                        effect: 'fade',
                        autoplay: {
                            delay: 2000
                        },
                        pagination: {
                            el: '.u-wheel .u-pagination',
                            bulletClass: 'bull',
                            bulletActiveClass: 'active',
                            clickable: true
                        }
                    });
                })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    createBanner = () => {
        const { banner } = this.state
        let bigBanner = banner.slice(0, 3)
        return bigBanner.map((item, index) => {
            return (
                <a key={index} className="swiper-slide" href={item.link}>
                    <img src={item.image} />
                    <p>{item.title}</p>
                </a>
            )
        })
    }

    createBannerList = () => {
        const { banner } = this.state
        let smallBanner = banner.slice(3, 7)
        return smallBanner.map((item, index) => {
            return (
                <li key={index}>
                    <a href={item.link}>
                        <img src={item.image} />
                        <p>{item.title}</p>
                    </a>
                </li>
            )
        })
    }

    createNews = () => {
        const { news } = this.state
        return news.map((item, index) => {
            let Hours = FormatDate.apartHours(item.updateDate)
            let Time = Hours > 24 ? FormatDate.customFormat(item.updateDate, 'yyyy/MM/dd') : `${Hours}小时前`
            return (
                <li key={index}><span>{Time}</span><a href={item.href}>{item.content}</a></li>
            )
        })
    }

    getBooksList = (tid, sortType, pageNo, searchTxt) => {
        let url = '/zsl/a/book/bookManager/bookSoft?'
        let opts = {
            softType: sortType,
            pageNo: pageNo || 1,
            pageSize: PAGESIZE,
            bookName: searchTxt
        }
        if (tid && tid !== '0') {
            let tidArr = tid.split("&")
            let parentId = tidArr[1];
            let id = tidArr[0];
            Object.assign(opts, {
                parentId: parentId,
                id: id
            })
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                let BooksList = response.data.data
                this.setState({ BooksList })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getNews = () => {
        axios.post('/zsl/a/notice/bookNotice/notice')
            .then((response) => {
                let news = response.data.data
                this.setState({ news })
            })
            .catch((error) => {
                console.log(error)
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
    handlePre = () => {
        this.setState({ pre: 1 })
    }

    render() {
        const { BooksList, banner, readList } = this.state;
        let Books = BooksList && BooksList.list && BooksList.list.map((item, index) => {
            let bookImagUrl = item.bookImagUrl.split('|')[1]
            return (
                <li key={index}>
                    <a className="swiper-slide" href={`/#/Bookstore/Bookbuy/${item.id}`}>
                        <em><img src={bookImagUrl} /></em>
                        <h1>{item.bookName}</h1>
                        <h3> {item.author}</h3>
                        <div className="txt">{item.authorIntroduce}</div>
                    </a>
                </li>
            )
        })
        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <div className="m-wheel wrapper">
                    <div className="u-wheel">
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                {banner && this.createBanner()}
                            </div>
                        </div>
                        <div className="u-pagination wide"></div>
                    </div>
                    <div className="u-suite">
                        <ul className="clearfix">
                            {banner && this.createBannerList()}

                        </ul>
                    </div>
                </div>

                <div className="g-fanshu wrapper">
                    <div className="g-left">
                        <div className="fs-new">
                            <ul>
                                {this.createNews()}
                            </ul>
                        </div>
                        <div className="u-title3">
                            <b>蜗牛翻书</b>
                            <div className="u-select">
                                <div className="in_sort" role="note">热度排行</div>
                                <div data-for=".in_sort" role="menu">
                                    <ul>
                                        <li type="0">热度排行</li>
                                        <li type="1">上新排行</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="fs-list">
                            <ul className="clearfix">
                                {Books}

                            </ul>
                        </div>
                        {
                            BooksList && BooksList.list && (
                                <Pagination className="u-pages" current={this.state.curPage} onChange={this.handlePageChange} total={BooksList && BooksList.count} pageSize={PAGESIZE} itemRender={(page, type, originalElement) => {
                                    switch (type) {
                                        case 'prev':
                                            return [<a href="javascript:;">{type}</a>,
                                            <a href="javascript:;" ><i className="fa-angle-double-left"></i></a>]
                                        case 'next':
                                            return [
                                                <a href="javascript:;" ><i className="fa-angle-double-right"></i></a>,
                                                <a href="javascript:;">{type}</a>
                                            ]
                                        default:
                                            return <a href="javascript:;">{page}</a>;

                                    }
                                }} />
                            )
                        }
                        <div className="u-title3">
                            <b>阅读场景</b>
                            <a href="/#/ReadingTime" className="more"><i className="fa-reorder"></i> 查看全部</a>
                        </div>
                        <div className="fs-read">
                            <ul className="clearfix">
                                {readList.length && this.createReadList()}

                            </ul>
                        </div>
                    </div>
                    <BookMenu />
                </div>
                {/* 底部 */}
                <Footer />
            </div>
        );
    }
}

