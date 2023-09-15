import {createRouter, createWebHashHistory} from "vue-router";


const routes = [
    {
        redirect: '/home', // 路由重定向
        component: () => import("@/views/Home.vue")
    },
    {
        path: '/home',
        component: () => import("@/views/Home.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
