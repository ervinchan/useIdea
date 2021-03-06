import React, { Component } from 'react';
import { Upload, Icon, message, Radio } from 'antd';
import $ from 'jquery'
import axios from 'axios'
import Utils from '../../static/js/utils/utils.js'
import Swiper from 'swiper/dist/js/swiper.min.js'
import Validate from '../../static/js/utils/validate.js'
import Service from '../../service/api.js'
import '../../static/less/reginfo.less';
import 'antd/lib/radio/style/index';

import Header from '../../common/header/Index.js'
import regBanner from '../../static/images/reg/1.jpg';
import logo from "../../static/images/reg_logo.png";
//const regInfo = JSON.parse(sessionStorage.getItem("regInfo"))
const RadioGroup = Radio.Group;
export default class RegInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            district: null,
            city: null,
            province: null,
            type: "国有",
            userPhoto: [],
            avatarPhoto: [],
            info: {}
        }
    }

    componentDidMount() {
        //搜索
        var r_bannerswiper = new Swiper('.r-banner .swiper-container', {
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3800
            },
            pagination: {
                el: '.r-banner .u-pagination',
                bulletClass: 'bull',
                bulletActiveClass: 'active',
                clickable: true
            }
        });
        //下拉选择
        $(".u-select [role=note]").on("click", function (e) {
            e = window.event || e;
            e.stopPropagation();
            $(".u-select [role=menu]").hide();
            $(this).next().show();
        });

        $(".u-select li").on("click", function (e) {
            e = window.event || e;
            e.stopPropagation();
            $($(this).parents("[role=menu]").data("for")).html($(this).text());
            $(this).parents("[role=menu]").hide();
        });
        this.getRegionDatas()
        this.regInfo = this.props.location.state
    }
    componentWillReceiveProps(nextProps) {
        this.regInfo = nextProps.location.state
    }

    handleEmail = (e) => {
        this.setState({ 'regEmail': e.target.value })
    }

    handlePsw = (e) => {
        this.setState({ 'regPsw': e.target.value })
    }

    handlePswConfirm = (e) => {
        this.setState({ 'regPswConfirm': e.target.value })
    }

    RegConfirm = () => {
        const { type, info, userPhoto, avatarPhoto, district, city, province, districtItem, cityItem, regEmail, regUserName } = this.state;
        /*global layer */
        let g = global.constants;
        g.loading = true;
        var that = this
        var oMyForm = new FormData();
        if (!Validate.checkEmail(info.email)) {
            layer.msg("请填写正确的邮箱")
            return this.setState({ emailError: true })
        }
        if (!Validate.checkPhone(info.mobile)) {
            layer.msg("请填写正确的手机号码")
            return this.setState({ phoneError: true })
        }
        for (var x in this.regInfo) {
            oMyForm.append(x, this.regInfo[x]);
        }
        oMyForm.append("shortName", info.shortName || "");
        oMyForm.append("officeLink", info.officeLink || "");
        oMyForm.append("provence", (province && province.id) || info.provence.id);
        oMyForm.append('city', cityItem && cityItem.id || info.city.id);
        oMyForm.append('district', districtItem && districtItem.id || info.district.id);
        oMyForm.append("name", info.name || "");
        oMyForm.append("position", info.position || "");
        oMyForm.append("officeName", info.officeName || "");
        oMyForm.append('officeType', type || "");
        oMyForm.append('mobile', info.mobile || "");
        oMyForm.append('officeIntroduction', info.officeIntroduction || "");
        oMyForm.append('email', info.email || "");
        avatarPhoto.forEach((file) => {
            oMyForm.append('file', file);
        });
        userPhoto.forEach((file) => {
            oMyForm.append('image', file);
        });
        let params = {
            email: this.regInfo.email,
            loginName: this.regInfo.loginName,
            isCompany: "true"
        }
        Service.companyReg({
            form: oMyForm
        }).then((response) => {
            g.loading = false
            if (response.data.status === 1) {
                //sessionStorage.removeItem("regInfo");
                this.props.history.push({ pathname: "/regFinish", state: { user: params } })

            } else {
                layer.alert(response.data.message, function () {
                    layer.closeAll()
                })
            }
        })
            .catch((error) => {
                g.loading = false
                console.log(error)
            })
        // axios({
        //     url: "/zsl/a/cms/article/consultationSave?",
        //     method: "post",
        //     data: oMyForm,
        //     processData: false,// 告诉axios不要去处理发送的数据(重要参数)
        //     contentType: false,   // 告诉axios不要去设置Content-Type请求头
        // }).then((response) => {
        //     g.loading = false

        //     layer.alert(response.data.message, () => {
        //         if (response.data.status === 1) {
        //             this.props.history.push(`/`)
        //         }
        //         layer.closeAll()
        //     })
        // })
        //     .catch((error) => {
        //         g.loading = false
        //         console.log(error)
        //     })
    }

    getRegionDatas = () => {
        Service.getArea({
            type: 2
        })
            .then((response) => {
                if (response.data.status === 1) {
                    let regionDatas = response.data.data
                    this.setState({ regionDatas })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    checkAgree = () => {
        this.setState({ agree: !this.state.agree })
    }

    changeDisplayPsw = () => {
        this.setState({ displayPsw: !this.state.displayPsw })
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    createRegion = () => {
        const { regionDatas } = this.state;
        return regionDatas && regionDatas.map((item) => {
            return <li onClick={() => this.setCity(item)}>{item.name}</li>
        })
    }
    setCity = (item) => {
        // let city = item.childList
        // let province = item
        // this.setState({ city, province, district: [], cityItem: null, districtItem: null })
        let province = item
        const { info } = this.state;
        Service.getArea({
            id: item.id
        })
            .then((response) => {
                if (response.data.status === 1) {
                    let city = response.data.data
                    const cityItem = { city: '', district: '' }
                    this.setState({ city, province, district: [], cityItem, districtItem: null, info: Object.assign(info, cityItem) })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    createCity = () => {
        const { city } = this.state;
        return city && city.map((item) => {
            return <li onClick={() => this.setDistrict(item)}>{item.name}</li>
        })
    }

    setDistrict = (item) => {
        // let district = item.childList
        // let cityItem = item
        // this.setState({ cityItem, district, districtItem: null })
        let cityItem = item
        Service.getArea({
            id: item.id
        })
            .then((response) => {
                if (response.data.status === 1) {
                    let district = response.data.data
                    this.setState({ cityItem, district, districtItem: null })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    createDistrict = () => {
        const { district } = this.state;
        return district && district.map((item) => {
            return <li onClick={() => this.onSelectedDistrict(item)}>{item.name}</li>
        })
    }
    onSelectedDistrict = (item) => {
        this.setState({ districtItem: item })
    }
    onChangeType = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            type: e.target.value,
        });
    }
    setUserPhoto = (file, newUrl) => {
        this.setState(state => ({
            userPhoto: [...state.userPhoto, file],
            coverImg: newUrl
        }), () => {
            $(".r-user-img").find("input[type=file]").css({
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
    };
    setImg = (file, newUrl) => {
        this.setState(state => ({
            avatarPhoto: [...state.avatarPhoto, file],
            imageUrl: newUrl
        }), () => {

            $(".upload-avatar").find("input[type=file]").css({
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                zIndex: 1,
                display: "block"
            })

        });
    };

    // setUploadPorps = (handleImg) => {
    //     const { userPhoto } = this.state
    //     return {
    //         onRemove: (file) => {
    //             this.setState((state) => {
    //                 const index = state.fileList.indexOf(file);
    //                 const newFileList = state.fileList.slice();
    //                 newFileList.splice(index, 1);
    //                 return {
    //                     fileList: newFileList,
    //                 };
    //             });
    //         },
    //         beforeUpload: (file) => {

    //             var reader = new FileReader();
    //             reader.readAsDataURL(file);
    //             reader.onload = (e) => handleImg(e, file, reader)

    //             return false;
    //         },
    //         showUploadList: false
    //     }
    // }
    setUploadPorps = (files, handleImg) => {
        return Utils.uploadProps(files, (file, newUrl) => {
            handleImg(file, newUrl)
            // this.setState(state => ({
            //     userPhoto: [...state.userPhoto, file],
            //     coverImg: newUrl
            // }), () => {
            //     $(".r-user-img").find("input[type=file]").css({
            //         position: "absolute",
            //         left: 0,
            //         top: 0,
            //         width: "100%",
            //         height: "100%",
            //         opacity: 0,
            //         zIndex: 1,
            //         display: "block"
            //     })

            // })
        });
    }

    changeInfo = (e, field) => {
        const { info } = this.state;
        info[field] = e.target.value
        this.setState({ info: info }, () => {

        })
    }

    render() {
        const { province, type, info, cityItem, districtItem, userPhoto, avatarPhoto, coverImg, imageUrl } = this.state

        const props = Utils.uploadProps(userPhoto, (file, newUrl) => {
            this.setState(state => ({
                fileList: [...state.userPhoto, file],
                coverImg: newUrl
            }), () => {
                $(".r-user-img").find("input[type=file]").css({
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
            <div className="">
                <Header />
                <div className="reg-banner">
                    <img src="" />
                </div>
                <div className="reg-wrapper-qy clearfix">
                    <div className="reg-panel r-basic clearfix">
                        <div className="procedure">
                            <h1>机构号入驻流程</h1>
                            <ul>
                                <li><span>1</span>在线填写入驻申请</li>
                                <li><span>2</span>工作人员将在1-2个工作日完成机构信息审核</li>
                                <li><span>3</span>查收机构邮箱，获取初始账号</li>
                            </ul>
                        </div>
                        <div className="r-user-img">
                            <div className="r-title1">基本信息</div>
                            <Upload
                                name="userPhoto"
                                className="avatar-uploader"
                                {...this.setUploadPorps(userPhoto, this.setUserPhoto)}
                            >
                                <a href="javascript:;" className="thumb-img photo-upload">
                                    {
                                        coverImg ?
                                            <img src={coverImg} alt="avatar" /> :
                                            <p><i className="icon-user-img"></i><span>点击上传头像</span></p>
                                    }


                                </a>
                            </Upload>
                            <div className="txt">机构头像不低于150*150px</div>
                        </div>
                        <div className="u-inline width-250">
                            <label className="u-form-label">机构简称</label>
                            <div className="u-form-input">
                                <input type="text" className="u-input" name="input1" placeholder="请输入机构简称" value={info.shortName} onChange={(e) => this.changeInfo(e, 'shortName')} />
                                <span className="red">*</span>
                            </div>
                        </div>
                        <div className="u-inline">
                            <label className="u-form-label">性质</label>
                            <div className="checkbox-custom">
                                {/* <ul className="clearfix">
                                    <li>
                                        <input type="radio" id="inputR1" name="inputRadios" className="u-radio" />
                                        <label for="inputR1">国有</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="inputR2" name="inputRadios" className="u-radio" />
                                        <label for="inputR2">合资</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="inputR3" name="inputRadios" className="u-radio" />
                                        <label for="inputR3">外资</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="inputR4" name="inputRadios" className="u-radio" />
                                        <label for="inputR4">民营</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="inputR5" name="inputRadios" className="u-radio" />
                                        <label for="inputR5">非营销性组织</label>
                                    </li>
                                </ul> */}
                                <RadioGroup onChange={this.onChangeType} value={this.state.type}>
                                    <Radio value={"国有"}>国有</Radio>
                                    <Radio value={"合资"}>合资</Radio>
                                    <Radio value={"外资"}>外资</Radio>
                                    <Radio value={"民营"}>民营</Radio>
                                    <Radio value={"非营销性组织"}>非营销性组织</Radio>
                                </RadioGroup>
                                <span className="red">*</span>
                            </div>
                        </div>
                        <div className="u-inline">
                            <label className="u-form-label">办公地点</label>
                            <ul className="select-group clearfix">
                                <li>
                                    <div className="u-select">
                                        <div className="in_province" role="note">{(province && province.name) || (info.provence && info.provence.name) || "省份"}</div>
                                        <div data-for=".in_province" role="menu">
                                            <ul>
                                                {this.createRegion()}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="u-select">
                                        <div className="in_city" role="note">{(cityItem && cityItem.name) || (info.city && info.city.name) || "城市"}</div>
                                        <div data-for=".in_city" role="menu">
                                            <ul>
                                                {this.createCity()}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="u-select">
                                        <div className="in_area" role="note">{(districtItem && districtItem.name) || (info.district && info.district.name) || "县区"}</div>
                                        <div data-for=".in_area" role="menu">
                                            <ul>
                                                {this.createDistrict()}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="u-inline">
                            <label className="u-form-label">官网</label>
                            <div className="u-form-input">
                                <input type="text" className="u-input" name="input1" placeholder="官网选填" value={info.officeLink} onChange={(e) => this.changeInfo(e, 'officeLink')} />
                            </div>
                        </div>
                        <div className="u-inline">
                            <label className="u-form-label">机构全称</label>
                            <div className="u-form-input">
                                <input type="text" className="u-input" name="input1" placeholder="请正确填写营业执照上的机构全称" value={info.name} onChange={(e) => this.changeInfo(e, 'name')} /><span className="red">*</span>
                            </div>
                        </div>
                        <div className="r-paper clearfix upload-avatar">
                            <Upload
                                name="avatar"
                                className="avatar-uploader"
                                // {...this.setUploadPorps(this.setImg)}
                                {...this.setUploadPorps(avatarPhoto, this.setImg)}
                            >
                                <a href="javascript:;" className="thumb-img">

                                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : <div className="ant-upload-text">上传营业执照</div>}

                                </a>
                            </Upload>
                        </div>
                        <div className="u-helptxt">
                            请上传清晰的营销执照复印件或照片；<br />
                            本页标注<span className="red">*</span> 处内容，一经提交无法修改，提交前请核对。
                        </div>
                    </div>
                    <div className="reg-panel r-info clearfix">
                        <div className="g-left">
                            <div className="r-title1">机构简介</div>
                            <div className="u-inline">
                                <div className="u-form-input">
                                    <textarea className="u-textarea" placeholder="字数要求需多余100，少于600字" value={info.officeIntroduction} onChange={(e) => this.changeInfo(e, 'officeIntroduction')} maxLength={600}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="g-right">
                            <div className="r-title1">运营者信息</div>
                            <div className="u-inline titr">
                                <label className="u-form-label">联系人</label>
                                <div className="u-form-input">
                                    <input type="text" className="u-input" name="input1" placeholder="联系人" value={info.officeName} onChange={(e) => this.changeInfo(e, 'officeName')} />
                                </div>
                            </div>
                            <div className="u-inline titr">
                                <label className="u-form-label">职务</label>
                                <div className="u-form-input">
                                    <input type="text" className="u-input" name="input1" placeholder="职务" value={info.position} onChange={(e) => this.changeInfo(e, 'position')} />
                                </div>
                            </div>
                            <div className="u-inline titr">
                                <label className="u-form-label">联系方式</label>
                                <div className="u-form-input">
                                    <input type="text" className="u-input" name="input1" placeholder="联系方式" value={info.mobile} onChange={(e) => this.changeInfo(e, 'mobile')} />
                                </div>
                            </div>
                            <div className="u-inline  width-250">
                                <label className="u-form-label">工作邮箱</label>
                                <div className="u-form-input">
                                    <input type="text" className="u-input" name="input1" placeholder="工作邮箱" value={info.email} onChange={(e) => this.changeInfo(e, 'email')} />
                                </div>
                            </div>
                            <div className="u-helptxt">
                                * 使用机构邮箱注册，能加快审核
                            </div>
                        </div>
                    </div>
                    <div className="f-right"><a href="javascript:;" className="reg-submit" onClick={this.RegConfirm}>提交验证</a></div>
                </div>
            </div>
        )
    }
}
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
