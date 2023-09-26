import http from '../service/http.js'
// 喜欢的作品
export function triggerLike(params) {
	return http.get(`/api/user/${params}/Likes/page/1`)
}
// 作品
export function Videos(params) {
	return http.get(`/api/user/${params}/Videos/page/1`)
}
// 关注的人作品
export function FollowerVideo(params) {
	return http.get(`/api/user/${params}/FollowerVideo/page/1`)
}