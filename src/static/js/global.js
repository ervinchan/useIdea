$(function () {
    $(".u-tabs").tab({ event: "mouseover" });
    $(".u-tabs1").tab({ event: "click" });

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

    //搜索
    $(".m-head").on("click", ".f-item.search", function (e) {
        e = window.event || e;
        e.stopPropagation();
        $(".search-wrap").addClass("active");
        $(".search-wrap input").focus();
    });

    $(document).on("click", function (e) {
        e = window.event || e;
        e.stopPropagation();
        $(".u-select [role=menu]").hide();
        $(".search-wrap").removeClass("active");
        $(".search-wrap input").val("");
    }).on("keydown", function (e) {
        e = window.event || e;
        e.stopPropagation();
        if (e.keyCode == 27) {
            layer.closeAll();
        }
    });

    $("body").on("click", "[data-el]", function (e) {
        e = window.event || e;
        e.stopPropagation();
        switch ($(this).data("el")) {
            case ("weixin"):
                //微信
                layer.open({
                    type: 1,
                    area: ['270px', '330px'],
                    title: false,
                    skin: 'weixin-modal',
                    closeBtn: 0,
                    anim: 0,
                    shadeClose: true,
                    content: '<div class="weixin-box"><h1>文案圈周刊</h1><img src="css/images/weixin.jpg" alt="微信公众号" /><h3>微信扫码关注，记录创作者的洞见</h3><p>联系编辑：zhuquex</p></div>'
                });
                break;
            case ("reply"):
                var $reply = '<div class="replyfrom"><textarea placeholder="我来补充两句。"></textarea><a href="javascript:;" class="thumb"><img src="css/images/1x1.png" /></a><a href="javascript:;" class="artbtn">留 言</a><a href="javascript:;" class="escbtn" data-el="replyesc">稍后再说</a></div>';
                if ($(this).parent().nextAll().length > 0) {
                    $(this).parent().nextAll(".replyfrom").remove();
                } else {
                    $(this).parent().after($reply);
                }
                break;
            case ("replyesc"):
                $(this).parents(".replyfrom").remove();
                break;
        }
    });

    //全部显示
    $(".jq-hidden").on("click", function (e) {
        $($(this).data("for")).toggleClass("hidden");
    });

    $(".m-menu-shu .menu>li>a").on("click", function (e) {
        $(this).next().slideToggle(300);
    });

    //招聘选择城市
    $(".jb-search .jb-select").on("click", function (e) {
        var strVar = "<div class=\"layui-city\"><h1>选择城市<\/h1><div class=\"city-list\"><table>\n";
        strVar += "<tr><td><span>B<\/span><a href=\"javascript:select_city('北京');\">北京<\/a><\/td><td><span>L<\/span><a href=\"javascript:select_city('连云港');\">连云港<\/a><a href=\"javascript:select_city('兰州');\">兰州<\/a><\/td><\/tr>\n";
        strVar += "<tr><td><span>C<\/span><a href=\"javascript:select_city('成都');\">成都<\/a><a href=\"javascript:select_city('重庆');\">重庆<\/a><a href=\"javascript:select_city('常熟');\">常熟<\/a><a href=\"javascript:select_city('长沙');\">长沙<\/a><\/td><td><span>N<\/span><a href=\"javascript:select_city('南京');\">南京<\/a><a href=\"javascript:select_city('宁波');\">宁波<\/a><\/td><\/tr>\n";
        strVar += "<tr><td><span>D<\/span><a href=\"javascript:select_city('东莞');\">东莞<\/a><a href=\"javascript:select_city('大连');\">大连<\/a><\/td><td><span>Q<\/span><a href=\"javascript:select_city('青岛');\">青岛<\/a><a href=\"javascript:select_city('齐齐哈尔');\">齐齐哈尔<\/a><a href=\"javascript:select_city('秦皇岛');\">秦皇岛<\/a><\/td><\/tr>\n";
        strVar += "<tr><td><span>F<\/span><a href=\"javascript:select_city('福州');\">福州<\/a><a href=\"javascript:select_city('佛山');\">佛山<\/a><\/td><td><span>S<\/span><a href=\"javascript:select_city('上海');\">上海<\/a><a href=\"javascript:select_city('深圳');\">深圳<\/a><a href=\"javascript:select_city('苏州');\">苏州<\/a><a href=\"javascript:select_city('石家庄');\">石家庄<\/a><a href=\"javascript:select_city('北京');\">沈阳<\/a><a href=\"javascript:select_city('三亚');\">三亚<\/a><\/td><\/tr>\n";
        strVar += "<tr><td><span>T<\/span><a href=\"javascript:select_city('天津');\">天津<\/a><a href=\"javascript:select_city('台湾');\">台湾<\/a><\/td><td><span>B<\/span><a href=\"javascript:select_city('北京');\">北京<\/a><\/td><\/tr>\n";
        strVar += "<tr><td><span>H<\/span><a href=\"javascript:select_city('杭州');\">杭州<\/a><a href=\"javascript:select_city('合肥');\">合肥<\/a><\/td><td><span>W<\/span><a href=\"javascript:select_city('武汉');\">武汉<\/a><a href=\"javascript:select_city('无锡');\">无锡<\/a><a href=\"javascript:select_city('芜湖');\">芜湖<\/a><\/td><\/tr>\n";
        strVar += "<tr><td><span>J<\/span><a href=\"javascript:select_city('济南');\">济南<\/a><\/td><td><span>X<\/span><a href=\"javascript:select_city('西安');\">西安<\/a><a href=\"javascript:select_city('厦门');\">厦门<\/a><a href=\"javascript:select_city('香港');\">香港<\/a><\/td><\/tr>\n";
        strVar += "<tr><td><span>K<\/span><a href=\"javascript:select_city('昆山');\">昆山<\/a><a href=\"javascript:select_city('昆明');\">昆明<\/a><\/td><td><span>Z<\/span><a href=\"javascript:select_city('郑州');\">郑州<\/a><\/td><\/tr>\n";
        strVar += "<\/table><\/div><\/div>\n";
        layer.open({
            type: 1,
            area: '700px',
            title: false,
            skin: 'layui-fromui',
            closeBtn: 0,
            anim: 0,
            shadeClose: true,
            content: strVar
        });
    });
    $(window).on("click", ".layui-city .city-list a", function (e) {
        $(".jb-search .search-select").html($(this).text());
    });

    $(window).scroll(function () {
        var bar_scroll = $(window).scrollTop() + $(window).height();
        //浮动
        var $fixed = $("[data-fixed]");
        if ($fixed.length > 0) {
            var bar_top = $($fixed.data("fixed")).offset().top;
            if ($(window).scrollTop() >= bar_top) {
                $fixed.addClass("fixed");
            } else {
                $fixed.removeClass("fixed");
            }
            if (bar_scroll > $(".fixed_bottom").offset().top) {
                $fixed.removeClass("fixed");
            }
        }
        if ($(".p-nav-a").length > 0) {
            if ($(window).scrollTop() >= $(".g-index").offset().top) {
                $(".p-nav-a").addClass("fixed");
            } else {
                $(".p-nav-a").removeClass("fixed");
            }
        }
        if ($(".art-wrapper").length > 0) {
            if ($(window).scrollTop() >= $(".art-wrapper").offset().top) {
                $(".art-wrapper").addClass("fixed");
            } else {
                $(".art-wrapper").removeClass("fixed");
            }
        }
        if ($(".fixed-column").length > 0) {
            if ($(window).scrollTop() > 100) {
                $(".fixed-column").show();
            } else {
                $(".fixed-column").hide();
            }
        }
    });

    $(".fixed-column .scrollTop").click(function () {
        $("html,body").animate({ scrollTop: "0px" }, 300);
    });

    //空列表
    $("[role=list]").each(function () {
        if ($(this).find("*").length == 0) {
            $(this).html("<div class='nolist'></div>");
        };
    });


});

// function select_city(name) {
//     $(".jb-search .search-select").html(name);
//     layer.closeAll();
// } 