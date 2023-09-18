// 导入请求方式
import http from '../service/http.js'

export function getEmailAPI(params) {
    return http.get(`common/user/getCode/${params}`)
}

export function registerAPI(params) {
    return http.post(`common/user/register`, params)
}

export function loginByPasswordAPI(params) {
    return http.post(`common/user/loginByPassword`, params)
}
