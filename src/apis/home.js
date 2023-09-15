// 导入请求方式
import http from '../service/http.js'
export function getHomeVideoListAPI(params) {
	return http.get('common/video/getPopularVideo', params)
}