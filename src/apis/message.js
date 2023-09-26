// 导入请求方式
import http from '../service/http.js'
//粉丝列表
export function Fans(params) {
	return http.get(`api/user/${params}/Fans/page/1/${params}`)
}
//关注 回关
export function triggerFollow(params) {
	return http.get(`api/user/${params.userid}/triggerFollow/${params.id}`)
}

//点赞列表
export function byLike(params) {
	return http.get(`api/user/${params}/byLike/page/1`)
}
//@列表
export function getAt(params) {
	return http.get(`/api/user/${params}/getAt/page/1`)
}
//评论列表
export function byComment(params) {
	return http.get(`/api/user/${params}/byComment/page/1`)
}
//联系人
export function getContact(params) {
	return http.get(`/api/user/${params}/getContact`)
}