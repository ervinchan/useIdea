
import { POST, FormData } from './service';
import { CLASS } from 'postcss-selector-parser';

class API {
    //登录
    static Login(data) {
        return POST({
            url: "/filter/loginSuccess?",
            opts: data
        })
    }
    //注册
    static UserReg(data) {
        return POST({
            url: "/filter/email?",
            opts: data
        })
    }

    //检查用户名是否可用
    static CheckLoginName(data) {
        return POST({
            url: "/filter/loginSuccess?",
            opts: data
        })
    }

    //导航栏
    static GetNav(data) {
        return POST({
            url: "/a/cms/category/filter/navigationBar?",
            opts: data
        })
    }

    //获取文章列表
    static GetAllArticle(data) {
        return POST({
            url: "/a/cms/article/filter/getAllArticle?",
            opts: data
        })
    }

    //获取文章内容
    static GetArticleContent(data) {
        return POST({
            url: "/a/cms/article/filter/getArticleContent?",
            opts: data
        })
    }

    //获取文章收藏用户列表
    static GetCollectUsers(data) {
        return POST({
            url: "/a/artuser/articleCollect/filter/collectUsers?",
            opts: data
        })
    }

    //获取图书列表
    static GetBooks(data) {
        return POST({
            url: "/a/book/bookManager/filter/bookSoft?",
            opts: data
        })
    }

    //热门作者
    static GetHostAuthor() {
        return POST({
            url: "/a/cms/article/filter/getHostAuthor?"
        })
    }

    //点赞
    static AddLike(data) {
        return POST({
            url: "/a/cms/article/filter/like?",
            opts: data
        })
    }

    //收藏
    static AddCollect(data) {
        return POST({
            url: "/a/artuser/articleCollect/filter/collectArticle?",
            opts: data
        })
    }

    //请教分类
    static FindClassifying(data) {
        return POST({
            url: "/a/cms/article/filter/findClassifying?",
            opts: data
        })
    }
    //获取请教列表\评论列表
    static GetQuestion(data) {
        return POST({
            url: "/a/cms/comment/filter/consultationArticleList?",
            opts: data
        })
    }
    //获取评论列表
    static GetCommentList(data) {
        return POST({
            url: "/a/cms/comment/filter/consultationList?",
            opts: data
        })
    }
    //请教提交
    static QuestionBuild(data) {
        return FormData({
            url: "/a/cms/article/filter/consultationSave?",
            opts: data.form
        })
    }
    //投诉
    static Complaints(data) {
        return POST({
            url: "/a/cms/article/filter/complaints?",
            opts: data
        })
    }
    //评论提交
    static SubmitComment(data) {
        return POST({
            url: "/f/comment?",
            opts: data
        })
    }

    //获取图书分类菜单
    static GetBooksMenu(data) {
        return POST({
            url: "/a/classificationtree/classificationtree/filter/findClassification?",
            opts: data
        })
    }
    //获取阅读场景列表
    static GetReads(data) {
        return POST({
            url: "/a/cms/article/filter/readScene?",
            opts: data
        })
    }
    //
    static GetBooksNotice(data) {
        return POST({
            url: "/a/notice/bookNotice/filter/notice?",
            opts: data
        })
    }

    //热门岗位
    static GetHotPost(data) {
        return POST({
            url: "/a/cms/article/filter/getHostPost?",
            opts: data
        })
    }
    //招聘过滤地区
    static JobCity(data) {
        return POST({
            url: "/a/jobcity/jobCity/filter/findAllJobCity?",
            opts: data
        })
    }
    //地区选择
    static findJobCity(data) {

        return POST({
            url: "/a/jobcity/jobCity/filter/findJobCity?",
            opts: data
        })
    }
    //招聘过滤条件
    static JobFilters(data) {
        return POST({
            url: "/a/sys/dict/filter/jobSelect?",
            opts: data
        })
    }
    //获取招聘列表
    static GetAllJob(data) {
        return POST({
            url: "/a/cms/article/filter/getAllJobArticle??",
            opts: data
        })
    }


    //热门关键字
    static HotKeywords(data) {
        return POST({
            url: "/a/cms/article/filter/getHostKeywords?",
            opts: data
        })
    }

    //文章分类
    static FindAllClassify(data) {
        return POST({
            url: "/a/articleclassify/cmsArticleClassify/filter/findAllClassify?",
            opts: data
        })
    }

    //同类好书
    static SameBooks(data) {
        return POST({
            url: "/a/book/bookManager/filter/sameBookType?",
            opts: data
        })
    }



    //文章发布分类
    static ArticleClassify(data) {
        return POST({
            url: "/a/cms/category/filter/updateArticleClassify?",
            opts: data
        })
    }

    //文章发布上传
    static ArticleBuild(data) {
        return FormData({
            url: "/a/cms/article/filter/consultationSave?",
            opts: data.form
        })
    }

    //首页顶部广告
    static GetBanners(data) {
        return POST({
            url: "/a/cms/article/filter/adsList?",
            opts: data
        })
    }

    //广告位列表   
    static GetADPosList(data) {
        return POST({
            url: "/a/ad/adInfomation/filter/findAllAdInfomationList?",
            opts: data
        })
    }
    //广告列表
    static GetADList(data) {
        return POST({
            url: "/a/ad/adInfomation/filter/findAdWindowAdInfomationList?",
            opts: data
        })
    }

    //广告管理接口-投放列表   
    static getADHistoryList(data) {
        return POST({
            url: "/a/cms/article/filter/adhistoryList?",
            opts: data
        })
    }


    /*用户中心*/
    //我的心选
    static GetCollectList(data) {
        return POST({
            url: "/a/artuser/articleCollect/filter/collectList?",
            opts: data
        })
    }
    //最新动态
    static GetLatestAction(data) {
        return POST({
            url: "/a/cms/article/filter/latestAction?",
            opts: data
        })
    }
    //关注列表
    static GetAttentionList(data) {
        return POST({
            url: "/a/attention/userAttentionUserids/filter/attentionList?",
            opts: data
        })
    }
    //粉丝列表
    static GetFansList(data) {
        return POST({
            url: "/a/attention/userAttentionUserids/filter/attention2List?",
            opts: data
        })
    }
    //关注
    static AddAttention(data) {
        return POST({
            url: "/a/attention/userAttentionUserids/filter/attention?",
            opts: data
        })
    }

    //企业注册
    static companyReg(data) {
        return FormData({
            url: "/filter/email?",
            opts: data.form
        })
    }

    //验证用户是否存在
    static validateLoginName(data) {
        return POST({
            url: "/filter/ValidateName?",
            opts: data
        })
    }

    //获取用户信息    
    static getUserInfo(data) {
        return POST({
            url: "/a/sys/sysOfficeInformation/filter/findOfficeInfomation?",
            opts: data
        })
    }

    //获取用户信息    
    static updateInformation(data) {
        return FormData({
            url: "/a/sys/user/filter/updateInformation?",
            opts: data.form
        })
    }

    //获取地区列表
    static getArea(data) {
        return POST({
            url: "/filter/getArea?",
            opts: data
        })
    }

    //获取用户详细信息
    static getUserInfoDetail(data) {
        return POST({
            url: "/a/sys/user/filter/findInformation1?",
            opts: data
        })
    }

    //获取企业详细信息
    static getQyInfoDetail(data) {
        return POST({
            url: "/a/sys/user/filter/findOfficeInformation1?",
            opts: data
        })
    }

    //退出登錄
    static Logout(data) {
        return POST({
            url: "/a/sys/user/filter/clearCache?",
            opts: data
        })
    }

    //发布招聘

    static addJob(data) {
        return FormData({
            url: "/a/cms/article/filter/saveJob?",
            opts: data.form
        })
    }

    //广告投放
    static adRequirement(data) {
        return FormData({
            url: "/a/ad/adRequirement/filter/findADRequirement?",
            opts: data.form
        })
    }

    //站内消息
    static GetSysNews(data) {
        return POST({
            url: "/a/sysinfo/sysSendInformation/filter/findSysInformation?",
            opts: data
        })
    }

    //文章评论
    static GetArticleComment(data) {
        return POST({
            url: "/a/cms/comment/filter/findCommentByArticle?",
            opts: data
        })
    }

    //作品、关注、粉丝数
    static FindNumberByUserId(data) {
        return POST({
            url: "/a/cms/article/filter/findNumberByUserId?",
            opts: data
        })
    }

    //点赞    
    static HandleArticleLike(data) {
        return POST({
            url: "/a/cms/comment/filter/updateCommentLikeNum?",
            opts: data
        })
    }
}
export default API