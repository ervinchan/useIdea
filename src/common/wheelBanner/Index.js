import React, { Component } from 'react';

import $ from 'jquery'
import axios from 'axios'
import Utils from '../../static/js/utils/utils.js'
import Swiper from 'swiper/dist/js/swiper.min.js'


export default class WheelBanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            banner: []
        }
    }

    componentDidMount() {
        this.getBanner()
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
        let smallBanner = banner.slice(3)
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