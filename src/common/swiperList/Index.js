import React, { Component } from 'react';

import $ from 'jquery'
import axios from 'axios'
import Utils from '../../static/js/utils/utils.js'
import Swiper from 'swiper/dist/js/swiper.min.js'


export default class SwiperList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            readList: []
        }
    }

    componentDidMount() {
        this.getReadData()
    }

    getReadData = () => {

        let url = "/zsl/a/cms/article/readScene"
        axios.post(url)
            .then((response) => {
                let readList = response.data.data
                this.setState({ readList })
                var swiper_read = new Swiper('.m-read .swiper-container', {
                    slidesPerView: 4,
                    slidesPerColumn: 2,
                    spaceBetween: 10,
                    slidesPerGroup: 8,
                    pagination: {
                        el: '.m-read .u-pagination',
                        bulletClass: 'bull',
                        bulletActiveClass: 'active',
                        clickable: true
                    }
                });
            })
            .catch((error) => {
                console.log(error)
            })
    }


    createReadList = () => {
        const { readList } = this.state;

        return readList.map((item, index) => {
            return (
                <div key={index} className="swiper-slide">
                    <a className="thumb-img" href={item.link}><img src={item.image} />
                    </a>
                    <h1><a href="#">{item.title}</a></h1>
                    <div className="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleFavorite(index)}><i className="icon-heart"></i><span>{item.favorite}</span></a><a href="javascript:;" onClick={() => this.handleLikes(index)}><i className="icon-thumbs"></i><span>{item.like}</span></a><a href="javascript:;"><i className="icon-comment"></i><span>{item.comment}</span></a></div>

                </div>
            )
        })
    }


    render() {
        const { readList } = this.state
        return (
            <div class="m-read wrapper">
                <div class="u-title2">
                    <h1>热门阅读</h1>
                </div>
                <div class="fixed_bottom"></div>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        {readList.length && this.createReadList()}
                    </div>
                </div>
                <div class="u-pagination wide"></div>
            </div>
        )
    }
}