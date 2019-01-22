import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import WheelBanner from '../../common/wheelBanner/Index'
import BookMenu from '../../common/bookMenu/Menu'
import SwiperList from '../../common/swiperList/Index'
import HotRead from '../../common/hotRead/Index'
import Editor from 'rc-wang-editor'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/article.less';
import { list } from 'postcss';

const PAGESIZE = 3;

export default class ActicleEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            toolList: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            console.log(nextProps)
            this.fetchData(nextProps);
        }
    }

    componentDidMount() {
        this.getDatas("ce009ff186fa4203ab07bd1678504228")
    }

    getDatas = (categoryId) => {
        let url = '/zsl/a/cms/article/getAllArticle?'
        let opts = {
            categoryId: categoryId || ''
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                if (categoryId) {
                    let toolList = response.data.data
                    this.setState({ toolList })
                } else {
                    let hotBooks = response.data.data
                    this.setState({ hotBooks }, () => {
                        var swiper_read = new Swiper('.m-read-fade .swiper-container', {
                            effect: 'fade',
                            pagination: {
                                el: '.m-read-fade .u-pagination',
                                bulletClass: 'bull',
                                bulletActiveClass: 'active',
                                clickable: true
                            }
                        });
                    })
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }

    createList = () => {
        const { toolList } = this.state
        return toolList.list && toolList.list.map((item, index) => {
            return (
                <li>
                    <a className="thumb-img" href={`/#/Bookstore/Bookbuy/${item.id}`}><img src={item.imageSrc} /><span>{item.category.name}</span></a>
                    <h1><a href={`/#/Bookstore/Bookbuy/${item.id}`}>{item.title}</a></h1>
                    <div className="alt clearfix">
                        <a href="#" className="j_name"><img src={item.user.img} className="thumb-img" />{item.author}</a>
                        <span className="dot"></span>
                        <span>{item.description}</span>
                    </div>
                </li>
            )
        })
    }

    render() {
        const { toolList } = this.state;

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                <div className="g-arteditor wrapper">
                    <div className="g-left">
                        {/* <div className="weixin-tool">
                            <div className="tit">
                                <b>微信文章一键导入工具</b><span>今日还可转采<i>5</i>次</span>
                            </div>
                            <div className="entry">
                                <input type="text" placeholder="在此粘贴正式发布过的微信文章链接，视频需手动添加" />
                                <a href="javascript:;">转采文章</a>
                            </div>
                            <div className="bar">
                                转采进度：0%
                            </div>
                        </div> */}
                        <div className="art-editor">
                            <div className="ed-title">
                                <input type="text" placeholder="请在这里输入标题" />
                            </div>
                            <div className="ed-recommend">
                                <textarea placeholder="请为本文写一句恰当的推荐语"></textarea>
                            </div>
                            <div className="u-editor">
                                <Editor customConfig={{
                                    "uploadImgShowBase64": true,
                                    "height": 500
                                }} style={{ height: 500 }} />
                            </div>
                        </div>
                        <div className="art-keyword clearfix">
                            <div className="u-add">
                                <h1>添加分类关键词</h1>
                                <div className="editbox" data-tag="经典长文案,品牌塑造,大创意,策略思维,新媒体营销">
                                    <ul>
                                        {/* <li><span>经典长文案</span><i className="icon-close"></i></li>
                                        <li><span>品牌塑造</span><i className="icon-close"></i></li>
                                        <li><span>大创意</span><i className="icon-close"></i></li>
                                        <li><span>策略思维</span><i className="icon-close"></i></li>
                                        <li><span>新媒体营销</span><i className="icon-close"></i></li>
                                        <li className="in_add"><input type="text" /></li> */}
                                    </ul>
                                </div>
                                <div className="alt">
                                    * 内容关键词最多添加8个。精准设置关键词，可提升内容搜索精准匹配度
                            </div>
                            </div>
                            <div className="u-hot">
                                <h1>热门分类关键词</h1>
                                <div className="tag clearfix">
                                    <span>大创意</span><span>social广告</span><span>文案集</span><span>精选合集</span><span>双11</span><span>事件营销</span><span>PPT模版</span><span>字体资源</span><span>下载</span><span>关键词</span><span>关键词</span><span>关键词</span><span>热点营销</span><span>营销方法</span><span>洞察</span><span>大咖专访</span><span>盘点榜单</span><span>关键词</span>
                                </div>
                            </div>
                        </div>
                        <div className="art-avow">
                            <div className="u-title">
                                <b>权利申明</b>
                            </div>
                            <div className="txt">
                                确认发布表示您确认所发布的为原创内容，您对此内容拥有完全版权，并愿意承担因版权矛盾引发的相关结果。投稿表示您同意授权响创意平台对内容、排版和封面配图进行细微调整。如需对稿件做重大修改，编辑会与作者联系确认。
                </div>
                        </div>
                        <div className="art-submit">
                            <a href="#">保存底稿并离开</a>
                            <a href="#" className="active">确认发布</a>
                        </div>
                    </div>
                    <div className="g-right">
                        <div className="art-thumbnail">
                            <img src="css/images/1050x550.png" />
                            <h3>封面头图，最佳尺寸建议1050*550px</h3>
                        </div>
                        <ul className="art-inputitem">
                            <li>
                                <span><b>* </b>文章栏目</span>
                                <i className="fa-caret-down"></i>
                                <div className="u-select">
                                    <div className="in_fenlei" role="note">选择分类</div>
                                    <div data-for=".in_fenlei" role="menu">
                                        <ul>
                                            <li>吃口文案</li>
                                            <li>见识灵感</li>
                                            <li>醒来再读</li>
                                            <li>专访幕后</li>
                                            <li>工具包</li>
                                            <li>阅读场景</li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <span><b>* </b>项目品牌</span>
                                <input type="text" placeholder="请输入品牌名称" />
                                <p>( 非品牌项目内容可不填 )</p>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* 底部 */}
                <Footer />

            </div>
        );
    }
}


