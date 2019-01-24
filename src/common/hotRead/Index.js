import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import axios from 'axios'
import $ from 'jquery'
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import Swiper from 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.min.css'

export default class HotRead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hotBooks: []
        };
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        this.getHotBooks();
    }

    getHotBooks = (categoryId) => {
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
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //热门阅读
    createHotBooksList = () => {
        const { hotBooks } = this.state;
        let itemDom = []
        return hotBooks.map((item, index) => {
            let slide = null
            itemDom.push(
                <div class="item">
                    <a class="thumb-img" href={`/#/Inspiration/Article/${item.id}`}><img src={item.image} />
                    </a>
                    <h1><a href={item.link}>{item.title}</a></h1>
                    <div className="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleCollect(item)}><i className="icon-heart"></i><span>{item.collectNum}</span></a><a href="javascript:;" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a><a href="javascript:;"><i className="icon-comment"></i><span>{item.commentNum}</span></a></div>

                </div>
            )
            if (index !== 0 && (index + 1) % 8 === 0) {

                slide = (
                    <div key={index} class="swiper-slide">
                        {itemDom}
                    </div>
                )
                itemDom = []
                return (
                    slide
                )
            } else if (index === hotBooks.length - 1) {
                slide = (
                    <div key={index} class="swiper-slide">
                        {itemDom}
                    </div>
                )
                console.log(itemDom, index)
                return (
                    slide
                )
            }

        })
    }
    handleLike = (item) => {
        POST({
            url: "/a/cms/article/like?",
            opts: {
                id: item.id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.likeNum++
                this.setState({})
            }
            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }
    handleCollect = (item) => {
        POST({
            url: "/a/artuser/articleCollect/collectArticle?",
            opts: {
                userId: 1,
                articleId: item.id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.collectNum++
                this.setState({})
            }

            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <div class="m-read-fade wrapper">
                <div class="u-title2">
                    <h1>热门阅读</h1>
                </div>
                <div class="fixed_bottom"></div>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        {this.createHotBooksList()}
                    </div>
                </div>
                <div class="u-pagination wide"></div>
            </div>
        )
    }
}