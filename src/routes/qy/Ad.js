import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload } from 'antd';


//import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import axios from 'axios'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import qyHead from './qyHead'
import AdModal from './adModal'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/qy.icenter.less'
import 'antd/lib/tabs/style/index.less';
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
const TabPane = Tabs.TabPane;

export default class qyAd extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            activeKey: 'news',
            fileList: [],
            collectList: []
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
        this.getCollectList();
        this.getMyWork();
    }
    handleTabChange = (key) => {
        console.log(key);
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    getCollectList = () => {
        POST({
            url: "/a/artuser/articleCollect/collectList?",
            opts: {
                userId: JSON.parse(sessionStorage.getItem("userInfo")).id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ collectList: response.data.data.articles })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getMyWork = () => {
        POST({
            url: "/a/cms/article/latestAction?",
            opts: {
                userId: JSON.parse(sessionStorage.getItem("userInfo")).id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ listData: response.data.data })
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
        const { fileList } = this.state;
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        const tabTit = `来信中心`;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
            showUploadList: false
        };
        return (
            <div className="">
                <div className="ue-adtab u-tabs1">
                    <div className="ad-tab">
                        <a href="javascript:;" className="ad-addto" onClick={this.addAD}>+ 添加广告投放</a>
                        <ul className="ad-tab clearfix">
                            <li tabfor=".tab-being">正在投放</li>
                            <li tabfor=".tab-history">历史投放</li>
                        </ul>
                    </div>
                    <div className="tab-being">
                        <table className="acdtable">
                            <thead>
                                {/* <tr>
                                    <th style="width:80px">序号</th>
                                    <th style="width:180px">类型</th>
                                    <th>标题</th>
                                    <th style="width:130px">投放周期</th>
                                    <th style="width:160px">发布时间</th>
                                    <th style="width:160px">截至时间</th>
                                </tr> */}
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>首页轮播焦点头条</td>
                                    <td><a href="javascript:;">《2018.12.12响创意双12品牌大促形象传播推广》</a></td>
                                    <td>24h</td>
                                    <td>2018/12/21 09:00</td>
                                    <td>2018/12/22 09:00</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>首页轮播焦点头条</td>
                                    <td><a href="javascript:;">《2018.12.12响创意双12品牌大促形象传播推广》</a></td>
                                    <td>24h</td>
                                    <td>2018/12/21 09:00</td>
                                    <td>2018/12/22 09:00</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="m-pages">
                            <div className="box clearfix">
                                <a href="javascript:;"><i className="fa-angle-double-left"></i>上一页</a>
                                <a href="javascript:;">1</a>
                                <b>2</b>
                                <a href="javascript:;">3</a>
                                <a href="javascript:;">4</a>
                                <a href="javascript:;">5</a>
                                <a href="javascript:;">6</a>
                                <a href="javascript:;"><i className="fa-angle-double-right"></i>下一页</a>
                                <span>当前1/3页，共24条</span>
                            </div>
                        </div>
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