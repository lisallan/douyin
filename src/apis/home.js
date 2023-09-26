// 导入请求方式
import http from '../service/http.js'
//首页
export function getHomeVideoListAPI(params) {
	return http.get('api/common/video/getPopularVideo', params)
}
//登陆
export function loginByPassword(data) {
	return http.post('api/common/user/loginByPassword', data)
}

//个人信息
export function getUserInfo(params) {
	return http.get(`api/user/${params}/getUserInfo/undefined`)
}
//获赞
export function byLikesNum(params) {
	return http.get(`api/user/${params}/byLikesNum`)
}
//获关
export function FollowersNum(params) {
	return http.get(`api/user/${params}/FollowersNum`)
}
//粉丝
export function FansNum(params) {
	return http.get(`api/user/${params}/FansNum`)
}