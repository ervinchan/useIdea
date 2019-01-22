class FormatDate {
    static init() {
        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,                 //月份 
                "d+": this.getDate(),                    //日 
                "h+": this.getHours(),                   //小时 
                "m+": this.getMinutes(),                 //分 
                "s+": this.getSeconds(),                 //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds()             //毫秒 
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }
    }
    static apartHours(date) {
        let now = new Date();    //结束时间
        let difTime = now.getTime() - new Date(date).getTime();   //时间差的毫秒数 

        //计算出相差天数
        let days = Math.floor(difTime / (24 * 3600 * 1000))

        //计算出小时数

        let leave1 = difTime % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        return Math.floor(difTime / (3600 * 1000))
    }
    static customFormat(date, format) {
        let oldTime = (new Date(date)).getTime();
        return new Date(oldTime).format(format);
    }
}
FormatDate.init()
export default FormatDate