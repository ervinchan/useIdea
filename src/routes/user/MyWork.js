import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'
import Utils from '../../static/js/utils/utils.js'
import Collect from '../../common/collect'
import Like from '../../common/like'
import Comment from '../../common/comment'
import 'antd/lib/pagination/style/index.css';

import defaultPhoto from "../../static/images/user/default.png"

export default class MyWork extends Component {
    PAGESIZE = 6
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
        this.props.getData(this.props.params.tid, page)
    }
    handleLike = (item) => {
        Service.AddLike({
            id: item.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.likeNum++
                this.setState({})
            }
            /* global layer */
            layer.msg(response.data.message)
        })
    }
    handleCollect = (item) => {
        Service.AddCollect({
            userId: 1,
            articleId: item.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.collectNum++
                this.setState({})
            }

            /* global layer */
            layer.msg(response.data.message)
        })
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    createList = () => {
        const { data } = this.props
        const categorys = global.constants.categorys
        if (data.list) {
            return data && data.list && data.list.map((item, index) => {
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
                            <h1><a href="javascript:;" onClick={() => this.gotoRouter(`${router}${item.id}`)}>{item.title}</a></h1>
                            <div className="txt nowrap">
                                {item.description}
                            </div>
                            <div className="f-bartool clearfix">
                                <Collect item={item} />
                                <Like item={item} />
                                <Comment item={item} />
                            </div>
                        </div>
                    </li>
                )
            })
        } else {
            if (this.props.tab === "最新动态") {
                return (
                    <div className="nolist">
                        <i className="icon-no-new"></i>
                        <span>· 暂未留下动态 ·</span>
                    </div>
                )
            } else {
                return (
                    <div className="nolist">
                        <i className="icon-no-art"></i>
                        <span>· 暂未发表文章 ·</span>
                    </div>
                )
            }

        }

    }

    render() {
        const { toolList } = this.state;
        const { data } = this.props

        return (
            <div className="">
                <ul className="ue-article clearfix">
                    {this.createList()}
                </ul>
                {
                    data && data.list && data.count > this.PAGESIZE && (
                        <Pagination key="Pagination" className="u-pages" current={this.state.curPage} onChange={this.handlePageChange} total={data && data.count} pageSize={this.PAGESIZE} itemRender={(page, type, originalElement) => {
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

