import React, { Component } from 'react';

import $ from 'jquery'
import axios from 'axios'
import Utils from '../../static/js/utils/utils.js'
import Swiper from 'swiper/dist/js/swiper.min.js'
import Service from '../../service/api.js'

export default class WheelBanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            banner: [],
            bannerBList: []
        }
    }

    componentDidMount() {
        this.getBanner()
        this.getBannerB()
    }

    getBanner = () => {
        Service.GetADList({
            categoryId: this.props.categoryId,
            id: "588e4f30e9634523b34b5c913bfa4cd2"
        }).then((response) => {
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
    }

    getBannerB = () => {
        Service.GetADList({
            categoryId: this.props.categoryId,
            id: "243e981b6d30424c8f3fac513382483a"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerBList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }

    createBanner = () => {
        const { banner } = this.state
        return banner.map((item, index) => {
            return (
                <a key={index} className="swiper-slide" href={item.link}>
                    <img src={item.image} />
                    <p>{item.title}</p>
                </a>
            )
        })
    }

    createBannerList = () => {
        const { bannerBList } = this.state
        let smallBanner = bannerBList.slice(0, 3)
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

    render() {
        const { banner } = this.state
        return (
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
        )
    }
}