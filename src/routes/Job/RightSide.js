import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import $ from 'jquery'
import FormatDate from '../../static/js/utils/formatDate.js'

import Service from '../../service/api.js'
import Utils from '../../static/js/utils/utils.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'

import defaultPhoto from "../../static/images/user/default.png"
const PAGESIZE = 3;

export default class JobListRightSide extends Component {
    categoryIds = global.constants.categoryIds['招聘']
    constructor(props) {
        super(props);
        this.state = {
            bannerCList: [],
            bannerDList: []
        };
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        let that = this
        this.getHotCompany();
        this.getBannerC()
        this.getBannerD()
    }
    getBannerC = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "37e7de978cc14723b8d51ec902ed0f73"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerCList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }
    getBannerD = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "df2c63345f9b42beb860f9150d4002f7"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerDList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }
    createBannerC = () => {
        const { bannerCList } = this.state
        return bannerCList.map((item, index) => {
            return <a href={item.link} target="_blank" className="seat-x110 lighten"><img src={item.image} /></a>
        })
    }
    createBannerD = () => {
        const { bannerDList } = this.state
        return bannerDList.map((item, index) => {
            return <a href={item.link} target="_blank" className="seat-x315 lighten"><img src={item.image} /></a>
        })
    }
    getHotCompany = (categoryId) => {
        Service.GetAllArticle({
            hits: 1,
            categoryId: this.categoryIds.id
        }).then((response) => {
            let hotCompanyList = response.data.data
            this.setState({ hotCompanyList })
        })
    }

    createHotCompanyList = () => {
        const { hotCompanyList } = this.state;
        return hotCompanyList && hotCompanyList.map((item, index) => {
            return (
                <li>
                    <div className="infos">
                        <a className="thumb-img" href="javascript:;" onClick={() => this.gotoRouter(`/Qyspace/${item.id}`)}>
                            <img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                        </a>
                        <h1><a href="javascript:;" onClick={() => this.gotoRouter(`/Qyspace/${item.id}`)}>{item.company}</a></h1>
                        <div className="bar">
                            <span><i className="icon-address-o"></i>{item.jcity}</span><span><i className="icon-large"></i>{item.hits}个</span>
                        </div>
                    </div>
                    <div className="txt">{`“${item.description}”`}</div>
                </li>
            )
        })
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    render() {
        const { } = this.state;

        return (
            <div className="g-right">
                {this.createBannerC()}
                {this.createBannerD()}
                <div className="hot-qiye">
                    <div className="tit">热门公司</div>
                    <ul className="clearfix">
                        {this.createHotCompanyList()}
                    </ul>
                </div>
            </div>
        );
    }
}

