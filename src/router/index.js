import {createRouter, createWebHashHistory} from "vue-router";


const routes = [
    {
        redirect: '/home', // 路由重定向
        component: () => import("@/views/Home/Home.vue")
    },
    {
        path: '/home',
        component: () => import("@/views/Home/Home.vue")
    },
    {
        path: '/followed',
        component: () => import("@/views/followed.vue")
    },
    {
        path: '/uploadVideo',
        component: () => import("@/views/uploadVideo.vue")
    },
    {
        path: '/message',
        component: () => import("@/views/Message.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
