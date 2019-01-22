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
import HotRead from '../../common/hotRead/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/bigidea.less';
import { list } from 'postcss';

const PAGESIZE = 3;

export default class Interview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            news: [],
            inrerviewList: []
        };
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        this.getInterViews("299c0a633b87429aa72c66656121427c")

    }

    getInterViews = (categoryId) => {
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
                    let inrerviewList = response.data.data
                    this.setState({ inrerviewList })
                } else {
                    let inrerviewList = response.data.data
                    this.setState({ inrerviewList })
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }

    createInterViewList = () => {
        const { inrerviewList } = this.state
        return inrerviewList.list && inrerviewList.list.map((item, index) => {
            return (
                <li>
                    <div class="item">
                        <a class="thumb-img" href={`/#/Inspiration/Article/${item.id}`}><img src="{item.imageSrc} " /></a>
                        <div class="tag">{item.category.name}</div>
                        <h1><a href={`/#/Inspiration/Article/${item.id}`}>{item.title}</a></h1>
                        <div class="author">{item.author}</div>
                        <a class="more" href={`/#/Inspiration/Article/${item.id}`}>MORE<i class="fa-angle-right"></i></a>
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
        const { readList } = this.state;

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <WheelBanner />

                <div class="u-title2 wrapper">
                    <h1 class="font-28 pt20">幕后创造者</h1>
                </div>
                <div class="u-inventor wrapper">
                    <ul class="clearfix">
                        {this.createInterViewList()}
                    </ul>
                </div>
                <HotRead />
                {/* 底部 */}
                <Footer />
            </div>
        );
    }
}

