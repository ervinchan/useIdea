import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload, Modal } from 'antd';
//import $ from 'jquery'
import Service from '../../service/api.js'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/modal/style/index';
import '../../Constants'
import Loading from '../../common/Loading/Index'
import CoverModal from './coverModal'
//import userImg from "../../static/images/user/userTx.jpg"
import Utils from '../../static/js/utils/utils.js'
const TabPane = Tabs.TabPane;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class QyHead extends Component {
    /* global $ */
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            activeKey: 'news',
            fileList: [],
            collectList: [],
            visibleCover: false,
            userImg: "",
            userToolNum: {},
            backgroundImg: ""
        };
    }

    componentDidMount() {
        var that = this
        this.getNumberByUser();
        //this.getMyWork();
    }

    gotoRouter = (router) => {
        this.props.history.push(router)
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

    setUploadPorps = (files, handleImg) => {
        return Utils.uploadProps(files, (file, newUrl) => {
            handleImg(file, newUrl)
        }, this);
    }
    getNumberByUser = () => {
        Service.FindNumberByUserId({
            userId: userInfo && userInfo.id,
            myUserId: 'tourists'
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ userToolNum: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    setBackground = (url) => {
        this.setState({ backgroundImg: url })
    }
    render() {
        const { fileList, userToolNum, backgroundImg } = this.state;
        const { info, userPhoto, setUserPhoto, userImg } = this.props;
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
        let bgImg = backgroundImg || info.background
        return (
            <div className="ue-head" style={{ background: 'url(' + bgImg + ') center no-repeat' }}>
                <div className="wrapper">
                    <div className="userTx header-photo">

                        <a href="javascript:;">
                            <Upload
                                name="userPhoto"
                                className="avatar-uploader"
                                {...this.setUploadPorps(userPhoto, setUserPhoto)}
                            >
                                <img src={userImg || (info && info.photo)} />
                                <p><i className="icon-user-img"></i><span>更新个人头像</span></p>

                            </Upload>
                        </a>
                    </div>
                    <div className="nick-name">
                        <h1><b className="rank">{info && info.name}<i className="icon-rank"></i></b></h1>
                    </div>
                    <div className="nick-data">
                        <p>
                            <span>作品</span><a href={`/#/MyFans/${info && info.id}`} >{userToolNum && userToolNum.articleNum}</a>
                            <span>关注</span><a href={`/#/MyFans/${info && info.id}`} >{userToolNum && userToolNum.attentionNum}</a>
                            <span>粉丝</span><a href={`/#/MyFans/${info && info.id}`}>{userToolNum && userToolNum.fansNum}</a>
                        </p>
                    </div>
                    <div className="address"><i className="icon-address-w"></i>{info.provence && info.provence.name}  {info.city && info.city.name}</div>
                    <a href="javascript:;" className="add_upload" onClick={() => this.gotoRouter(`/ArticleEditor`)}>发表作品/经验</a>

                </div>
                <a href="javascript:;" className="edit-skin" onClick={this.editSkin}><i className="icon-camera"></i>编辑形象图</a>


                <CoverModal setBackground={this.setBackground} />
            </div>
        );
    }
}