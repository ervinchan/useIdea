import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'
import Service from '../../service/api.js'
import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import WheelBanner from '../../common/wheelBanner/Index'
import HotRead from '../../common/hotRead/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/bigidea.less';

const PAGESIZE = 16;

export default class Interview extends Component {
    categoryIds = global.constants.categoryIds['专访幕后']
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

    getInterViews = (categoryId, page) => {
        Service.GetAllArticle({
            categoryId: categoryId || '',
            pageNo: page || 1,
            pageSize: PAGESIZE
        })
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
                        <a class="thumb-img" href={`/#/Inspiration/Article/${item.id}`}><img src={item.image} /></a>
                        <div class="tag">{item.category.name}</div>
                        <h1><a href={`/#/Inspiration/Article/${item.id}`}>{item.title}</a></h1>
                        <div class="author">{item.brand}</div>
                        <a class="more" href={`/#/Inspiration/Article/${item.id}`}>MORE<i class="fa-angle-right"></i></a>
                    </div>
                </li>
            )
        })
    }


    handlePageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getInterViews(this.props.match.params.tid, page)
    }

    render() {
        const { inrerviewList } = this.state;

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <WheelBanner categoryId={"299c0a633b87429aa72c66656121427c"} />

                <div class="u-title2 wrapper">
                    <h1 class="font-28 pt20">幕后创造者</h1>
                </div>
                <div class="u-inventor wrapper">
                    <ul class="clearfix">
                        {this.createInterViewList()}
                    </ul>

                </div>
                {
                    inrerviewList && inrerviewList.list && inrerviewList.count > PAGESIZE && (
                        <Pagination key="Pagination" className="u-pages" current={this.state.curPage} onChange={this.handlePageChange} total={inrerviewList && inrerviewList.count} pageSize={PAGESIZE} itemRender={(page, type, originalElement) => {
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
                <HotRead />
                {/* 底部 */}
                <Footer />
            </div>
        );
    }
}

