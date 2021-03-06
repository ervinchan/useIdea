import React, { Component } from 'react';
import $ from 'jquery'
import codeImg from '../../static/images/code.jpg'
import './footer.less';

import { Spin } from 'antd';

const Loading = '<div className="positionC"><Spin tip="加载中..." /></div>'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        $(function () {
            var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
            $("#footer").append(unescape("%3Cspan id='cnzz_stat_icon_1277720146'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol +
                "s23.cnzz.com/z_stat.php%3Fid%3D1277720146%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
        })
    }
    render() {
        return (
            <div id="footer">
                <div className="fixed_bottom"></div>
                <div className="m-footer">
                    <div className="wrapper clearfix">
                        <div className="link">
                            <h1>
                                <b>响创意</b><br />记录创造者的洞见
                                </h1>
                            <p>
                                <a href="#">关于我们</a>
                                <a href="#">版权声明</a>
                                <a href="#">隐私保护</a>
                                <a href="#">联系我们</a>
                            </p>
                        </div>
                        <div className="info">
                            <img src={codeImg} />
                            <br />
                            <div className="contact-list">
                                <a href="javascript:;" title="微博"><i className="icon-weibo"></i></a>
                                <a href="javascript:;" title="商城"><i className="icon-buy"></i></a>
                                <a href="javascript:;" title="视频"><i className="icon-tv"></i></a>
                                <a href="javascript:;" title="知乎"><i className="icon-zhihu1"></i></a>
                            </div>
                            <h3>
                                商务合作及媒介沟通请联系：ideazhu@gmail.com
                                </h3>
                            <h5>Copyright©响创意2018-2019  沪ICP备18048586号</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}