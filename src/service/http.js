/* 这个文件是封装请求方式的 */

// 导入axios实例
import request from './request.js'

const http = {
    // 封装get请求
    /*
    	@params url 代表的是请求地址
    	@params params 代表传递的请求参数

     */
    get(url, params) {
        const config = {
            method: 'get', // 请求方式
            url // 请求地址
        }
        // 如果请求接口的时候传递了params那么我们就把params放到config里面，否在就不把params放在config里面了
        if (params) config.params = params
        return request(config)
    }

}
export default http
