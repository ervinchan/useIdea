import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable';
import Loading from './common/Loading/Index'
import Service from './service/api.js'
import './service/interceptors.js';
import './static/less/reset.less';
import './index.less';
import './static/less/swiper.less';
import './static/less/global.less';
import './static/less/module.less';

//import App from './App';
import * as serviceWorker from './serviceWorker';

//const Loading = () => <div className="positionC"><Spin tip="加载中..." /></div>;

Service.GetADPosList().then((response) => {
    global.constants.loading = false
    if (response.data.status === 1) {
        sessionStorage.setItem("AD", JSON.stringify(response.data.data))
    }
})

const Home = Loadable({
    loader: () => import('./routes/Home/Index'),
    loading: Loading,
});

const Question = Loadable({
    loader: () => import('./routes/Question/Index'),
    loading: Loading,
});

const QuestionArticle = Loadable({
    loader: () => import('./routes/Question/Article'),
    loading: Loading,
});

const Bookstore = Loadable({
    loader: () => import('./routes/Bookstore/Index'),
    loading: Loading,
});

const Bookbuy = Loadable({
    loader: () => import('./routes/Bookstore/Buy'),
    loading: Loading,
});

const ReadingTime = Loadable({
    loader: () => import('./routes/ReadingTime/Index'),
    loading: Loading,
});
const Bigidea = Loadable({
    loader: () => import('./routes/Inspiration/Bigidea'),
    loading: Loading,
});
const Interview = Loadable({
    loader: () => import('./routes/Inspiration/Interview'),
    loading: Loading,
});
const Viewpoint = Loadable({
    loader: () => import('./routes/Inspiration/Viewpoint'),
    loading: Loading,
});
const Tool = Loadable({
    loader: () => import('./routes/Inspiration/Tool'),
    loading: Loading,
});
const Article = Loadable({
    loader: () => import('./routes/Inspiration/Article'),
    loading: Loading,
});

const GoodCopy = Loadable({
    loader: () => import('./routes/GoodCopy/Index'),
    loading: Loading,
});

const Job = Loadable({
    loader: () => import('./routes/Job/Index'),
    loading: Loading,
});

const JobList = Loadable({
    loader: () => import('./routes/Job/List'),
    loading: Loading,
});

const ArticleEditor = Loadable({
    loader: () => import('./common/articleEdit/Index'),
    loading: Loading,
});

const Login = Loadable({
    loader: () => import('./common/login/Index'),
    loading: Loading,
});
const Reg = Loadable({
    loader: () => import('./common/reg/Index'),
    loading: Loading,
});
const UserCenter = Loadable({
    loader: () => import('./routes/User/Index'),
    loading: Loading,
});
const MyWork = Loadable({
    loader: () => import('./routes/User/MyWork'),
    loading: Loading,
});
const MyHeart = Loadable({
    loader: () => import('./routes/User/MyHeart'),
    loading: Loading,
});
const MyFans = Loadable({
    loader: () => import('./routes/User/MyFans'),
    loading: Loading,
});
const UserNews = Loadable({
    loader: () => import('./routes/User/News'),
    loading: Loading,
});
const UserUpDate = Loadable({
    loader: () => import('./routes/User/UpDate'),
    loading: Loading,
});
const LoginQy = Loadable({
    loader: () => import('./common/login/Company'),
    loading: Loading,
});
const RegQy = Loadable({
    loader: () => import('./common/reg/Company'),
    loading: Loading,
});
const RegInfo = Loadable({
    loader: () => import('./common/reg/Info'),
    loading: Loading,
});
const RegFinish = Loadable({
    loader: () => import('./common/reg/Finish'),
    loading: Loading,
});

// const newMessage = Loadable({
//     loader: () => import('./routes/User/newMessage'),
//     loading: Loading,
// });
// const QyWork = Loadable({
//     loader: () => import('./routes/qy/Work'),
//     loading: Loading,
// });
// const QyJob = Loadable({
//     loader: () => import('./routes/qy/Job'),
//     loading: Loading,
// });
const QyInfo = Loadable({
    loader: () => import('./routes/qy/Info'),
    loading: Loading,
});
const QyAd = Loadable({
    loader: () => import('./routes/qy/Ad'),
    loading: Loading,
});
const QyHome = Loadable({
    loader: () => import('./routes/qy/Index'),
    loading: Loading,
});
const QyJobAdd = Loadable({
    loader: () => import('./routes/qy/JobAdd'),
    loading: Loading,
});
const Qyspace = Loadable({
    loader: () => import('./routes/qy/Space'),
    loading: Loading,
});
// const QyspaceArticle = Loadable({
//     loader: () => import('./routes/qy/SpaceArticle'),
//     loading: Loading,
// });
// const QyspaceJobList = Loadable({
//     loader: () => import('./routes/qy/SpaceJobList'),
//     loading: Loading,
// });
const QyspaceJobInfo = Loadable({
    loader: () => import('./routes/qy/SpaceJobInfo'),
    loading: Loading,
});


const App = () => (
    <Router>
        <Switch>
            <Redirect from='/refresh' to='/' />
            <Route exact path="/" breadcrumbName="首页" component={Home} />
            <Route exact path="/Question/:txt?" breadcrumbName="请教" component={Question} />
            <Route exact path="/Question/Article/:aid?" breadcrumbName="请教" component={QuestionArticle} />
            <Route exact path="/Bookstore" breadcrumbName="蜗牛翻书" component={Bookstore} />
            <Route exact path="/Bookstore/NewBooks/:tid?" breadcrumbName="书单上新" component={Bookstore} />
            <Route exact path="/Bookstore/Bookbuy/:id" breadcrumbName="书单详情" component={Bookbuy} />
            <Route exact path="/Bookstore/ReadingTime" breadcrumbName="阅读场景" component={ReadingTime} />
            <Route exact path="/Inspiration" breadcrumbName="见识灵感" component={Bigidea} />
            <Route exact path="/Inspiration/Interview/:tid?" breadcrumbName="专访幕后" component={Interview} />
            <Route exact path="/Viewpoint" breadcrumbName="醒来再读" component={Viewpoint} />
            <Route exact path="/Inspiration/Tool" breadcrumbName="工具包" component={Tool} />
            <Route exact path="/Inspiration/Article/:aid?" breadcrumbName="文章" component={Article} />
            <Route exact path="/GoodCopy" breadcrumbName="口吃文案" component={GoodCopy} />
            <Route exact path="/Job" breadcrumbName="招聘" component={Job} />
            <Route exact path="/Job/List/:city/:txt?" breadcrumbName="招聘列表" component={JobList} />
            <Route exact path="/ArticleEditor" breadcrumbName="" component={ArticleEditor} />

            <Route exact path="/Login" breadcrumbName="登录" component={Login} />
            <Route exact path="/Reg" breadcrumbName="注册" component={Reg} />
            <Route exact path="/UserCenter/:uid?" breadcrumbName="用户中心" component={UserCenter} />
            <Route exact path="/MyNews/:uid?" component={MyWork} />
            <Route exact path="/InfoUpDate/:uid?" component={UserUpDate} />
            <Route exact path="/MyHeart" component={MyHeart} />
            <Route exact path="/MyFans/:uid?" component={MyFans} />
            <Route exact path="/UserNews/:uid?" component={UserNews} />
            <Route exact path="/LoginQy" breadcrumbName="企业登录" component={LoginQy} />
            <Route exact path="/RegQy" breadcrumbName="企业注册" component={RegQy} />
            <Route exact path="/RegInfo" breadcrumbName="企业注册信息" component={RegInfo} />
            <Route exact path="/RegFinish/:user?" breadcrumbName="注册成功" component={RegFinish} />

            {/* <Route exact path="/newMessage/:uid?" component={newMessage} />
            <Route exact path="/QyWork/:uid?" component={QyWork} /> */}
            {/* <Route exact path="/QyJob/:uid?" component={QyJob} /> */}
            <Route exact path="/QyInfo/:uid?" component={QyInfo} />
            <Route exact path="/QyAd/:uid?" component={QyAd} />
            <Route exact path="/QyHome/:uid?" component={QyHome} />
            <Route exact path="/QyJobAdd/:uid?" component={QyJobAdd} />
            <Route exact path="/Qyspace/:uid?" component={Qyspace} />
            {/* <Route exact path="/QyspaceArticle/:uid?" component={QyspaceArticle} /> */}
            {/* <Route exact path="/QyspaceJobList/:uid?" component={QyspaceJobList} /> */}
            <Route exact path="/QyspaceJobInfo/:id?" component={QyspaceJobInfo} />
        </Switch>
    </Router>
);

ReactDOM.render(App(), document.getElementById('root'));

/* 取消热更新 */
if (module.hot) {
    module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();