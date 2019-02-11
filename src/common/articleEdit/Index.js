import React, { Component } from 'react';
import { Upload } from 'antd';
import axios from 'axios'
import $ from 'jquery'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import Editor from 'rc-wang-editor'
import 'swiper/dist/css/swiper.min.css'
import ed from 'wangeditor'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/article.less';
import coverImg from '../../static/images/1050x550.png'

export default class ActicleEditor extends Component {
    editor = new ed('#editorContainer')
    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            HotKeywords: [],
            keywords: [],
            articleDescript: '',
            fileList: [],
            brand: "",
            categoryList: [],
            coverImg: coverImg,
            uploadImg: null
        };
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.location.pathname != this.props.location.pathname) {
        //     console.log(nextProps)
        //     this.fetchData(nextProps);
        // }
    }

    componentDidMount() {
        $("body").on("click", ".u-select [role=note]", function (e) {
            e = window.event || e;
            e.stopPropagation();
            $(".u-select [role=menu]").hide();
            $(this).next().show();
        });
        let that = this
        //this.editor.customConfig.uploadImgShowBase64 = true;
        this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
        this.editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'image',  // 插入图片
            'undo',  // 撤销
            'redo'  // 重复
        ]
        this.editor.customConfig.onchange = this.setEditorVal
        this.editor.customConfig.uploadImgServer = '/zsl/a/cms/article/uploadArticleSave'
        this.editor.customConfig.uploadImgParams = {
            userId: global.constants.userInfo.id,
            categoryId: "ce009ff186fa4203ab07bd1678504228"
        }
        this.editor.create()
        // this.getDatas("ce009ff186fa4203ab07bd1678504228")
        this.getHotKeywords()
        this.getCategory()
    }

    getCategory = () => {
        POST({
            url: "/a/cms/category/updateArticleClassify?",

        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ categoryList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    createCategory = () => {
        const { categoryList } = this.state
        return categoryList.map((item, index) => {
            return <li key={index} onClick={() => this.setCategoryId(item)}>{item.name}</li>
        })
    }
    setCategoryId = (item) => {
        this.setState({ addCategoryId: item.id, addCategoryName: item.name })
    }

    // getDatas = (categoryId) => {
    //     let url = '/zsl/a/cms/article/getAllArticle?'
    //     let opts = {
    //         categoryId: categoryId || ''
    //     }
    //     for (var key in opts) {
    //         opts[key] && (url += "&" + key + "=" + opts[key])
    //     }
    //     axios.post(url, opts)
    //         .then((response) => {
    //             if (categoryId) {
    //                 let toolList = response.data.data
    //                 this.setState({ toolList })
    //             } else {
    //                 let hotBooks = response.data.data
    //                 this.setState({ hotBooks }, () => {
    //                     var swiper_read = new Swiper('.m-read-fade .swiper-container', {
    //                         effect: 'fade',
    //                         pagination: {
    //                             el: '.m-read-fade .u-pagination',
    //                             bulletClass: 'bull',
    //                             bulletActiveClass: 'active',
    //                             clickable: true
    //                         }
    //                     });
    //                 })
    //             }

    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    // createList = () => {
    //     const { toolList } = this.state
    //     return toolList.list && toolList.list.map((item, index) => {
    //         return (
    //             <li>
    //                 <a className="thumb-img" href={`/#/Bookstore/Bookbuy/${item.id}`}><img src={item.image} /><span>{item.category.name}</span></a>
    //                 <h1><a href={`/#/Bookstore/Bookbuy/${item.id}`}>{item.title}</a></h1>
    //                 <div className="alt clearfix">
    //                     <a href="#" className="j_name"><img src={item.user.img} className="thumb-img" />{item.author}</a>
    //                     <span className="dot"></span>
    //                     <span>{item.description}</span>
    //                 </div>
    //             </li>
    //         )
    //     })
    // }

    handleChangeTitle = (e) => {
        this.setState({ articleTit: e.target.value })
    }

    handleChangeDescript = (e) => {
        this.setState({ articleDescript: e.target.value })
    }

    setEditorVal = (val) => {
        this.setState({ EditorVal: val })
    }

    getHotKeywords = (categoryId) => {
        POST({
            url: "/a/cms/article/getHostKeywords?",
            opts: {
                categoryId: categoryId || ''
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                let HotKeywords = response.data.data
                this.setState({ HotKeywords })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    createHotKeywords = () => {
        const { HotKeywords } = this.state;
        return HotKeywords.map((item, index) => {
            return <span key={index} onClick={() => this.setKeywords(item)}>{item.keywords}</span>
        })
    }
    setKeywords = (item) => {
        let keywords = this.state.keywords;
        if (item.keywords) {
            keywords.push(item.keywords)
        } else if (item.target.value) {
            keywords.push(item.target.value)
        }
        this.setState({ keywords: keywords, keyword: "" })
    }
    createKeywords = () => {
        const { keywords } = this.state;
        return keywords.slice(0, 8).map((item, index) => {
            return <li><span>{item}</span><i className="icon-close" onClick={() => this.deleteKeywords(index)}></i></li>
        })
    }
    deleteKeywords = (index) => {
        const { keywords } = this.state;
        keywords.splice(index, 1)
        this.setState({ keywords: keywords })
    }
    handleChangeKeyword = (e) => {
        this.setState({ keyword: e.target.value })
    }
    handleChangeBrand = (e) => {
        this.setState({ brand: e.target.value })
    }

    submitArticle = () => {

        /*global layer */
        const { articleTit, articleDescript, EditorVal, keywords, brand, fileList, addCategoryId } = this.state
        if (!articleTit) {
            layer.msg("请填写标题");
            return false;
        } else if (!articleDescript) {
            layer.msg("请输入推荐语");
            return false;
        } else if (!EditorVal) {
            layer.msg("请输入文章内容");
            return false;
        } else if (!addCategoryId) {
            layer.msg("请选择文章栏目");
            return false;
        } else if (!fileList[0]) {
            layer.msg("请添加封面图片");
            return false;
        } else if (!keywords[0]) {
            layer.msg("请添加关键词");
            return false;
        }
        let g = global.constants;
        g.loading = true;
        var that = this
        var oMyForm = new FormData();
        this.editor.change && this.editor.change()
        oMyForm.append("userId", g.userInfo.id);
        oMyForm.append("categoryId", addCategoryId);
        //oMyForm.append("classifying", addCategoryId);
        oMyForm.append("title", articleTit || "");
        oMyForm.append("content", EditorVal || "");
        oMyForm.append("brand", brand || "");
        oMyForm.append("keywords", keywords.slice(0, 8).join(','));
        oMyForm.append("description", articleDescript || "");
        fileList.forEach((file) => {
            oMyForm.append('homeImage', file);
        });
        axios({
            url: "/zsl/a/cms/article/consultationSave?",
            method: "post",
            data: oMyForm,
            processData: false,// 告诉axios不要去处理发送的数据(重要参数)
            contentType: false,   // 告诉axios不要去设置Content-Type请求头
        }).then((response) => {
            g.loading = false
            layer.alert(response.data.message, () => {
                this.props.history.push(`/`)
                layer.closeAll()
            })
        })
            .catch((error) => {
                g.loading = false
                console.log(error)
            })
    }

    render() {
        const { keywords, keyword, fileList, coverImg, addCategoryName } = this.state;
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
                var newUrl = ""
                var reader = new FileReader();
                reader.readAsDataURL(file);
                var that = this
                reader.onload = function (e) {
                    // 图片base64化
                    newUrl = this.result;
                    that.setState(state => ({
                        fileList: [...state.fileList, file],
                        coverImg: newUrl
                    }));
                };

                return false;
            },
            fileList,
            showUploadList: false
        };
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
                                <input type="text" placeholder="请在这里输入标题" onChange={this.handleChangeTitle} />
                            </div>
                            <div className="ed-recommend">
                                <textarea placeholder="请为本文写一句恰当的推荐语" onChange={this.handleChangeDescript}></textarea>
                            </div>
                            <div className="u-editor">
                                <div id="editorContainer" ref="editorElem" />
                                {/* <Editor
                                    customConfig={{
                                        "height": 325,
                                        "menus": [
                                            'head',  // 标题
                                            'bold',  // 粗体
                                            'fontSize',  // 字号
                                            'fontName',  // 字体
                                            'italic',  // 斜体
                                            'underline',  // 下划线
                                            'strikeThrough',  // 删除线
                                            'foreColor',  // 文字颜色
                                            'backColor',  // 背景颜色
                                            'link',  // 插入链接
                                            'list',  // 列表
                                            'justify',  // 对齐方式
                                            'quote',  // 引用
                                            'image',  // 插入图片
                                            'undo',  // 撤销
                                            'redo'  // 重复
                                        ]
                                    }}
                                    onChange={this.setEditorVal}
                                    style={{ height: 500 }}
                                /> */}
                            </div>
                        </div>
                        <div className="art-keyword clearfix">
                            <div className="u-add">
                                <h1>添加分类关键词</h1>
                                <div className="editbox" data-tag="经典长文案,品牌塑造,大创意,策略思维,新媒体营销">
                                    <ul>
                                        {this.createKeywords()}
                                        {
                                            <li className="in_add"><input type="text" value={keyword} onChange={this.handleChangeKeyword} onBlur={this.setKeywords} /></li>
                                        }
                                    </ul>
                                </div>
                                <div className="alt">
                                    * 内容关键词最多添加8个。精准设置关键词，可提升内容搜索精准匹配度
                            </div>
                            </div>
                            <div className="u-hot">
                                <h1>热门分类关键词</h1>
                                <div className="tag clearfix">
                                    {this.createHotKeywords()}
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
                            <a href="javascript:;" onClick={this.submitArticle}>保存底稿并离开</a>
                            <a href="javascript:;" className="active" onClick={this.submitArticle}>确认发布</a>
                        </div>
                    </div>
                    <div className="g-right">
                        <div className="art-thumbnail">
                            <Upload className="upload-btn" {...props}>
                                <img src={coverImg} />
                                <h3>封面头图，最佳尺寸建议1050*550px</h3>
                            </Upload>
                        </div>
                        <ul className="art-inputitem">
                            <li>
                                <span><b>* </b>文章栏目</span>
                                <i className="fa-caret-down"></i>
                                <div className="u-select">
                                    <div className="in_fenlei" role="note">{addCategoryName || "选择分类"}</div>
                                    <div data-for=".in_fenlei" role="menu">
                                        <ul>
                                            {this.createCategory()}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <span><b>* </b>项目品牌</span>
                                <input type="text" placeholder="请输入品牌名称" onChange={this.handleChangeBrand} />
                                <p>( 非品牌项目内容可不填 )</p>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* 底部 */}
                <Footer />
                <Loading />
            </div>
        );
    }
}


