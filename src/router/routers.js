const constantRoutes = [

    {
        path: '/',
        redirect: '/home'
    },
    {
        component: () => import('../views/index.vue'),
        name: 'home',
        path: '/home',
    },
    {
        component: () => import('../views/friendPages/index.vue'),
        name: 'friend',
        path: '/friend',
    },
    {
        component: () => import('../views/messagePages/index.vue'),
        name: 'message',
        path: '/message',
    },
    {
        component: () => import('../views/personalPages/index.vue'),
        name: 'personal',
        path: '/personal',
    },
]
export {
    constantRoutes
}