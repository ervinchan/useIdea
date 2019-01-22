import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery'

export default class JobMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuDatas: []
        };
    }

    componentDidMount() {
        let that = this;
        let url = '/zsl/a/cms/category/navigationBar?'
        let opts = {
            id: "981892a5c2394fe7b01ce706d917699e",
            allchildcategory: true
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                let menuDatas = response.data.data
                this.setState({ menuDatas })
                $(function () {

                })
            })
            .catch((error) => {
                console.log(error)
            })

    }

    searchBooks = () => {
        console.log(this.props)
        let searchTxt = $("#bookSearchTxt").val()
        window.location.href = `/#/Bookstore/search=${searchTxt}`
        // this.props.history.replaceState({ tid: $("#bookSearchTxt").val() }, "/Bookstore")
    }

    createBooksMenu = () => {
        const { menuDatas } = this.state;
        return this.loop(menuDatas)
    }

    loop = (data) => {
        return data.map((item, index) => {
            let Lis = []
            if (item.childList.length) {
                return <li key={index}>
                    <div className="navs"><b>{item.name}</b>{this.createChild(item.childList)}</div>
                    {this.loopChildren(item, item.childList)}

                </li>
            }
        })
    }

    createChild = (items) => {
        let Lis = items.map((item, index) => {
            if (index === items.length - 1) {
                return [<a href="javascript:;" onClick={this.gotoRouter}>{item.name}</a>, <i className="fa-angle-right"></i>]
            }
            return <a href="javascript:;" onClick={this.gotoRouter}>{item.name}</a>
        })
        return Lis
    }

    loopChildren = (parent, items) => {
        let useSubDom = false
        let Lis = items && items.map((item, index) => {
            if (!useSubDom) {
                useSubDom = item.childList ? true : false
            }

            return item.childList && item.childList.map((item, index) => {
                if (item.childList) {
                    return item.childList.map((t, index) => {
                        return <li><span>{item.name}</span><a href="javascript:;" onClick={this.gotoRouter}>{t.name}</a></li>
                    })
                }

            })
        })
        return (
            <div className="sub" style={{ display: useSubDom ? '' : 'none' }}>
                <ul className="nav">{Lis}</ul>
                <ul className="brand">
                    <li><a href="#"><img src="css/images/1x1.png" /></a></li>
                    <li><a href="#"><img src="css/images/1x1.png" /></a></li>
                    <li><a href="#"><img src="css/images/1x1.png" /></a></li>
                    <li><a href="#"><img src="css/images/1x1.png" /></a></li>
                    <li><a href="#"><img src="css/images/1x1.png" /></a></li>
                    <li><a href="#"><img src="css/images/1x1.png" /></a></li>
                </ul>
            </div>
        )
    }

    transTreeData = (data) => {
        if (data.length > 0) {
            var curPid = '0' //pid=0,为最上层节点 ,即无父节点 
            var parent = findChild(curPid);//数组 
            return parent;
        } else {
            return [];
        }
        //找子节点 
        function findChild(curPid) {
            var _arr = [];
            var items = data;
            var length = items.length;
            for (var i = 0; i < length; i++) {
                if (items[i].parentId === curPid) {
                    var _obj = items[i];
                    _obj.childList = findChild(_obj.id);
                    _arr.push(_obj);
                }
            }
            return _arr;
        }
    }

    gotoRouter = () => {

    }

    render() {
        return (
            <div className="jb-menu">
                <div className="tit">热门职位</div>
                <ul className="menu">
                    {this.createBooksMenu()}
                </ul>
            </div>
        );
    }
}

