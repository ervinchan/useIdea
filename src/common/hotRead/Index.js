import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import $ from 'jquery'
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import Collect from '../../common/collect'
import Like from '../../common/like'
import Comment from '../../common/comment'
import Swiper from 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.min.css'
import LazyLoad from 'react-lazyload';
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

        Service.GetAllArticle({
            hits: 1,
            categoryId: categoryId || ''
        })
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
    }

    //热门阅读
    createHotBooksList = () => {
        const { hotBooks } = this.state;
        let itemDom = []
        return hotBooks.map((item, index) => {
            let slide = null
            itemDom.push(
                <div className="item" key={item.id}>
                    <a className="thumb-img" href={`/#/Inspiration/Article/${item.id}`}>
                        <LazyLoad><img src={item.image} /></LazyLoad>
                    </a>
                    <h1><a href={`/#/Inspiration/Article/${item.id}`}>{item.title}</a></h1>
                    <div className="f-bartool clearfix">
                        <Collect item={item} />
                        <Like item={item} />
                        <Comment item={item} />
                    </div>

                </div>
            )
            if (index !== 0 && (index + 1) % 8 === 0) {

                slide = (
                    <div key={index} className="swiper-slide">
                        {itemDom}
                    </div>
                )
                itemDom = []
                return (
                    slide
                )
            } else if (index === hotBooks.length - 1) {
                slide = (
                    <div key={index} className="swiper-slide">
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
    // handleLike = (item) => {
    //     Service.AddLike({
    //         id: item.id
    //     }).then((response) => {
    //         global.constants.loading = false
    //         if (response.data.status === 1) {
    //             item.likeNum++
    //             this.setState({})
    //         }
    //         /* global layer */
    //         layer.msg(response.data.message)
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    // handleCollect = (item) => {
    //     Service.AddCollect({
    //         userId: 1,
    //         articleId: item.id
    //     }).then((response) => {
    //         global.constants.loading = false
    //         if (response.data.status === 1) {
    //             item.collectNum++
    //             this.setState({})
    //         }

    //         /* global layer */
    //         layer.msg(response.data.message)
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    render() {
        return (
            <div className="m-read-fade wrapper">
                <div className="u-title2">
                    <h1>热门阅读</h1>
                </div>
                <div className="fixed_bottom"></div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {this.createHotBooksList()}
                    </div>
                </div>
                <div className="u-pagination wide"></div>
            </div>
        )
    }
}