
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