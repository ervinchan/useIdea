import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload } from 'antd';


//import $ from 'jquery'

import AdModal from './adModal'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/qy.icenter.less'
import 'antd/lib/tabs/style/index.less';
import Service from '../../service/api.js'
import '../../Constants'
import AdList from './AdList';
import Loading from '../../common/Loading/Index'
const TabPane = Tabs.TabPane;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class qyAd extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 'being',
            beingListData: [],
            historyListData: []
        };
    }

    componentDidMount() {
        var that = this
        $(".u-select [role=note]").on("click", function (e) {
            e = window.event || e;
            e.stopPropagation();
            $(".u-select [role=menu]").hide();
            $(this).next().show();
        });
        this.getADHistory();
        this.getADBeing();
    }
    handleTabChange = (key) => {
        console.log(key);
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    getADHistory = () => {
        Service.getADHistoryList({
            //flag: "false",
            userId: userInfo && userInfo.id
        }).then((response) => {
            if (response.data.status === 1) {
                let historyListData = response.data.data
                this.setState({ historyListData })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getADBeing = () => {
        Service.getADBeginList({
            //flag: "true",
            userId: userInfo && userInfo.id
        }).then((response) => {
            if (response.data.status === 1) {
                let beingListData = response.data.data
                this.setState({ beingListData })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    addAD = () => {
        /*global layer */
        layer.open({
            type: 1,
            area: '880px',
            title: false,
            skin: 'layui-fromad',
            closeBtn: 0,
            shade: 0.7,
            anim: 0,
            shadeClose: true,
            content: $(".ad-modal")
        });
    }
    render() {
        return (
            <div className="">
                <div className="ue-adtab u-tabs1">
                    <div className="ad-tab">
                        <a href="javascript:;" className="ad-addto" onClick={this.addAD}>+ 添加广告投放</a>
                        {/* <ul className="ad-tab clearfix">
                            <li tabfor=".tab-being">正在投放</li>
                            <li tabfor=".tab-history">历史投放</li>
                        </ul> */}
                        <Tabs className="clearfix" ref={e => this.tabDom = e} onChange={this.handleTabChange}>
                            <TabPane tab="正在投放" key="being"><AdList data={this.state.beingListData} history={this.props.history} /></TabPane>
                            <TabPane tab="历史投放" key="history"><AdList data={this.state.historyListData} history={this.props.history} /></TabPane>
                        </Tabs>
                    </div>
                    <div className="tab-being">


                    </div>
                    <div className="tab-history">
                        <div className="nolist">
                            <span>· 暂无历史投放 ·</span>
                        </div>
                    </div>
                </div>
                <AdModal />
            </div>
        );
    }
}