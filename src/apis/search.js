import http from '../service/http.js'

//搜索视频
export function searchVideo(data) {
	return http.post(`api/user/fe8cf1fb-ef90-41a6-87b0-a735b787a4c1/searchVideo/1`,data)
}
//搜索用户
export function searchUser(data) {
	return http.post(`api/user/fe8cf1fb-ef90-41a6-87b0-a735b787a4c1/searchUser/1`,data)
}