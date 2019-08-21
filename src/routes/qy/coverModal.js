import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

//import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import Service from '../../service/api.js'
import QyHead from './qyHead'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/tabs/style/index.less';
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import Utils from '../../static/js/utils/utils.js';
const TabPane = Tabs.TabPane;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class CoverModal extends Component {
    /* global $ */
    uploadDom = null;
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            activeKey: 'news',
            fileList: [],
            collectList: [],
            coverImg: null
        };
    }

    componentDidMount() {
        var that = this
        var swiper_qj_banner = new Swiper('.qj-banner .swiper-container', {
            autoHeight: true,
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                waitForTransition: false
            },
            pagination: {
                el: '.qj-banner .u-pagination',
                bulletClass: 'bull',
                bulletActiveClass: 'active',
                clickable: true
            }
        });
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
        $(".u-select [role=note]").on("click", function (e) {
            e = window.event || e;
            e.stopPropagation();
            $(".u-select [role=menu]").hide();
            $(this).next().show();
        });
        //this.getCollectList();
        //this.getMyWork();
    }
    submitBackground = (key) => {
        const { fileList } = this.state
        var oMyForm = new FormData();
        // fileList.forEach((file) => {
        //     oMyForm.append('background', file);
        // });
        oMyForm.append('background', fileList);
        oMyForm.append("userId", JSON.parse(sessionStorage.getItem("userInfo")).id);
        oMyForm.append("myUserId", JSON.parse(sessionStorage.getItem("userInfo")).id);
        Service.uploadBackground({
            form: oMyForm
        }).then(res => {
            if (res.data.status === 1) {
                this.handleCancel()
                this.props.setBackground(res.data.data)
            } else {
                layer.msg(res.message)
            }

        })
    }
    handleChangePhoto = () => {

    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    handleCancel = (e) => {
        /*global layer */
        layer.closeAll()
    }
    render() {
        const { coverImg, fileList } = this.state;
        const props = Utils.uploadProps(fileList, (file, newUrl) => {
            this.setState(state => ({
                fileList: file,
                coverImg: newUrl
            }), () => {
                $(".initial_pic").find("input[type=file]").css({
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    zIndex: 1,
                    display: "block"
                })

            })


        });
        return (
            <div className="cover-modal">
                <div className="title">封面形象图上传中心<i className="icon-close1" onClick={this.handleCancel}></i></div>
                <div className="imfrom">
                    <div className="imalt">
                        机构形象图标准尺寸1920*400像素
                    </div>
                    <div className="initial_pic">
                        {/* <div className="btn_b"><a href="javascript:;">+ 上传设计好的形象图</a></div> */}
                        <Upload className="upload-btn" {...props} ref={(e) => this.uploadDom = e}>
                            <img className="img" src={coverImg} />
                            <a className=" btn_b" href="javascript:;">+ 上传设计好的形象图</a>
                        </Upload>
                        <div className="loading_block">
                            <h1>正在上传</h1>
                            <p><span></span></p>
                        </div>
                    </div>
                    <div className="helptxt">* 图片不合规范，请上传1920*400像素标准尺寸图片，文件大小2Mb以内</div>
                    <div className="imbtn">
                        <a href="javascript:;" className="active" onClick={this.submitBackground}>提交上传</a>
                        <a href="javascript:;" data-el="closeAll" onClick={this.handleCancel}>取消</a>
                    </div>
                </div>
            </div>
        )
    }
}
