
import config from './config';
import axios from 'axios';
import '../Constants'

//接口1方法
export function POST(data) {
    let url = config.name + data.url
    let opts = data.opts
    for (var key in opts) {
        opts[key] && (url += "&" + key + "=" + opts[key])
    }
    global.constants.loading = true
    return axios.post(url, opts)
}

export function FormData(data) {
    return axios({
        url: config.name + data.url,
        method: "post",
        data: data.opts,
        processData: false,// 告诉axios不要去处理发送的数据(重要参数)
        contentType: false,   // 告诉axios不要去设置Content-Type请求头
    })
}