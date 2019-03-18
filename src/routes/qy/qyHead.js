import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload, Modal } from 'antd';
//import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import axios from 'axios'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'

import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/modal/style/index';
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import CoverModal from './coverModal'
import userImg from "../../static/images/user/userTx.jpg"

const TabPane = Tabs.TabPane;

export default class QyHead extends Component {
    /* global $ */
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            activeKey: 'news',
            fileList: [],
            collectList: [],
            visibleCover: false
        };
    }

    componentDidMount() {
        var that = this
        //this.getMyWork();
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
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
    editSkin = () => {
        //this.setState({ visibleCover: true })
        /*global layer */
        layer.open({
            type: 1,
            area: '880px',
            title: false,
            skin: 'layui-fromimg',
            closeBtn: 0,
            shade: 0.7,
            anim: 0,
            shadeClose: true,
            content: $(".cover-modal")
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
            <div className="ue-head">
                <div className="wrapper">
                    <div className="userTx">
                        <Upload className="upload-btn" {...props}>
                            <a href="javascript:;">
                                <img src={userImg} />
                                <p><i className="icon-user-img"></i><span>更新机构头像</span></p>
                            </a>
                        </Upload>
                    </div>
                    <div className="nick-name">
                        <h1><b className="rank">{userInfo.name}<i className="icon-rank"></i></b></h1>
                    </div>
                    <div className="nick-data">
                        <p>
                            <span>作品</span><a href="javascript:;">{userInfo.attentionNum}</a>
                            <span>关注</span><a href="javascript:;" href={`/#/MyFans/${userInfo.id}`} >{userInfo.attentionNum}</a>
                            <span>粉丝</span><a href="javascript:;" href={`/#/MyFans/${userInfo.id}`}>{userInfo.attention2Num}</a>
                        </p>
                    </div>
                    <div className="address"><i className="icon-address-w"></i>{userInfo.city}</div>
                    <a href="javascript:;" className="add_upload" onClick={() => this.gotoRouter(`/ArticleEditor`)}>发表作品/经验</a>

                </div>
                <a href="javascript:;" className="edit-skin" onClick={this.editSkin}><i className="icon-camera"></i>编辑形象图</a>


                <CoverModal />
            </div>
        );
    }
}