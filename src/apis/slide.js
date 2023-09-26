import http from '../service/http.js'
// http://127.0.0.1:3000/api/user/{userId}/triggerLike/{videoId}
//点赞
export function triggerLike(params) {
	return http.get(`api/user/${params.userId}/triggerLike/${params.videoId}`)
}
//列表内点赞
export function triggerLikeComment(params) {
	return http.get(`api/user/${params.userId}/triggerLikeComment/${params.videoId}/${params.commentId}`)
}

//评论列表
export function getVideoComment(videoId) {
    http://127.0.0.1:3000/
	return http.get(`api/video/${videoId}/getVideoComment/page/1`)
}
//评论
export function commentVideo(data) {
	return http.post(`api/user/commentVideo`,data)
}