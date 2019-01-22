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
import BookMenu from '../../common/bookMenu/Menu'
import SwiperList from '../../common/swiperList/Index'
import HotRead from '../../common/hotRead/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/bigidea.less';
import { list } from 'postcss';

const PAGESIZE = 3;

export default class Tool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            toolList: []
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

        this.getTools("7a8bbb7d262142cbb7ae5bf884935e81")
    }

    getTools = (categoryId) => {
        let url = '/zsl/a/cms/article/getAllArticle?'
        let opts = {
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
                                bulletClass: 'bull',
                                bulletActiveClass: 'active',
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
        return toolList.list && toolList.list.map((item, index) => {
            return (
                <li>
                    <div class="item">
                        <a class="thumb-img" href={`/#/Inspiration/Article/${item.id}`}><img src={item.imageSrc} /></a>
                        <div class="tag">{item.category.name}</div>
                        <h1><a href={`/#/Inspiration/Article/${item.id}`}>{item.title}</a></h1>
                        <div class="alt clearfix">
                            <a href="#" class="j_name"><img src={item.user.img} class="thumb-img" />{item.author}</a>
                            <span class="dot"></span>
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
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <WheelBanner />

                <div class="wrapper g-tools">
                    <div class="u-title2">
                        <h1 class="font-28 pt20">创作工具包</h1>
                    </div>
                    <div class="u-inventor">
                        <ul class="clearfix">
                            {this.createToolList()}
                        </ul>
                    </div>
                    {
                        toolList && toolList.list && (
                            <Pagination key="Pagination" className="u-pages" current={this.state.curPage} onChange={this.handlePageChange} total={toolList && toolList.count} pageSize={PAGESIZE} itemRender={(page, type, originalElement) => {
                                switch (type) {
                                    case 'prev':
                                        return [<a key={type} href="javascript:;">{type}</a>,
                                        <a href="javascript:;" ><i className="fa-angle-double-left"></i></a>]
                                    case 'next':
                                        return [
                                            <a key={type} href="javascript:;" ><i className="fa-angle-double-right"></i></a>,
                                            <a href="javascript:;">{type}</a>
                                        ]
                                    default:
                                        return <a key={page} href="javascript:;">{page}</a>;

                                }
                            }} />
                        )
                    }
                </div>
                <HotRead />
                {/* 底部 */}
                <Footer />
            </div>
        );
    }
}

