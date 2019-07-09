import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
// import Slider from "react-slick";
// import { StickyContainer, Sticky } from 'react-sticky';
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
// import Utils from '../../static/js/utils/utils.js'
import Service from '../../service/api.js'
import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import BookMenu from '../../common/bookMenu/Menu'
import WheelBanner from '../../common/wheelBanner/Index'
import Collect from '../../common/collect'
import Like from '../../common/like'
import Comment from '../../common/comment'
import marquee from 'marquee'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/bookstore.less';


// const Search = Input.Search;
// const TabPane = Tabs.TabPane;
const PAGESIZE = 20;

export default class Bookstore extends Component {
    categoryIds = global.constants.categoryIds['书单上新']
    constructor(props) {
        super(props);
        this.state = {
            sortType: "0",
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
        if (nextProps.location.pathname !== this.props.location.pathname) {
            console.log(nextProps)
            this.fetchData(nextProps);
        }
    }

    componentDidMount() {

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
        this.getReadData()

        let that = this
        $(function () {
            $(".u-select [role=note]").on("click", function (e) {
                e = window.event || e;
                e.stopPropagation();
                $(this).next().show();
            });
            $(".u-select li").on("click", function (e) {
                e = window.event || e;
                e.stopPropagation();
                let sortType = $(this).attr("type")

                that.setState({ sortType }, () => {
                    // $($(this).parents("[role=menu]").data("for")).html($(this).text());
                    $(this).parents("[role=menu]").hide();
                })
                that.getBooksList(that.props.match.params.tid, sortType)
            });
        })
    }
    componentDidUpdate() {

    }

    getReadData = () => {
        Service.GetReads()
            .then((response) => {
                let readList = response.data.data
                this.setState({ readList })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    createNews = () => {
        const { news } = this.state
        return news.map((item, index) => {
            let Time = FormatDate.formatTime(item.updateDate);
            return (
                <li key={index}><span>{Time}</span><a href={item.href}>{item.content}</a></li>
            )
        })
    }

    getBooksList = (tid, sortType, pageNo, searchTxt) => {
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
        Service.GetBooks(opts)
            .then((response) => {
                let BooksList = response.data.data
                this.setState({ BooksList })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getNews = () => {
        Service.GetBooksNotice()
            .then((response) => {
                let news = response.data.data
                this.setState({ news })
                if (news.length > 4) {
                    marquee('fs-new ul', {
                        speed: 180, // default speed = 1000, set speed to 4x
                        freezeDelay: 1000 // freeze for a second once one marquee iteration is complete
                    });
                }

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
                        <a className="thumb-img" href={`#/Bookstore/Bookbuy/${item.id}`}><img src={item.image} alt={item.title} />
                        </a>
                        <h1><a href={`#/Bookstore/Bookbuy/${item.id}`}>{item.title}</a></h1>
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
                        <div className="txt">{item.editorRecommend}</div>
                    </a>
                </li>
            )
        })
        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                {/* <div className="m-wheel wrapper">
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
                </div> */}
                <WheelBanner categoryId={this.categoryIds.id} />

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
                                <div className="in_sort" role="note">{this.state.sortType === '0' ? '热度排行' : '上新排行'}</div>
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
                            <a href="/#/Bookstore/ReadingTime" className="more"><i className="fa-reorder"></i> 查看全部</a>
                        </div>
                        <div className="fs-read">
                            <ul className="clearfix">
                                {readList.length && this.createReadList()}

                            </ul>
                        </div>
                    </div>
                    <BookMenu categoryid={this.categoryIds.id} />
                </div>
                {/* 底部 */}
                <Footer />
            </div>
        );
    }
}

