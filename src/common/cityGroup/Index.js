import React, { Component } from 'react';

import $ from 'jquery'
import axios from 'axios'
import Utils from '../../static/js/utils/utils.js'
import Swiper from 'swiper/dist/js/swiper.min.js'


export default class WheelBanner extends Component {

    constructor(props) {
        super(props);
        this.state = {

            cityGroup: []
        }
    }

    componentDidMount() {
        /*global layer */
        this.getCityGroup();
    }

    getCityGroup = () => {
        let url = '/zsl/a/jobcity/jobCity/findJobCity'
        axios.post(url)
            .then((response) => {
                if (response.data.status === 1) {
                    this.setState({ cityGroup: response.data.data })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    createCityGroup = () => {
        const { cityGroup } = this.state;
        let dom = ''
        let itemDom = [];
        return cityGroup.map((item, index) => {
            let city = [];
            let group = null;
            city = item.childList.map((item, index) => {
                return <a href="javascript:;" onClick={() => this.props.selectCity(item.city)}>{item.city}</a>
            })
            itemDom.push(
                <td><span>{item.code}</span>{city}</td>
            )
            if (index !== 0 && (index + 1) % 2 === 0) {
                group = <tr>{itemDom}</tr>
                itemDom = []
            } else if (index === cityGroup.length - 1) {
                group = <tr>{itemDom}</tr>
                itemDom = []
            }
            return group
        })
    }



    render() {
        const { banner } = this.state
        return (
            <div className="layui-city" style={{ "display": (this.props.visible ? "" : "none") }}>
                <h1>选择城市</h1>
                <div className="city-list">
                    <table>
                        <tbody>
                            {this.createCityGroup()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}