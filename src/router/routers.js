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
        component: () => import('../views/messagePages/content/fans.vue'),
        name: 'fans',
        path: '/message/fans',
    },
    {
        component: () => import('../views/messagePages/content/good.vue'),
        name: 'good',
        path: '/message/good',
    },
    {
        component: () => import('../views/messagePages/content/min.vue'),

        name: 'min',
        path: '/message/min',
    },
    {
        component: () => import('../views/messagePages/content/comment.vue'),

        name: 'comment',
        path: '/message/comment',
    },
    {
        component: () => import('../views/messagePages/content/contacts.vue'),

        name: 'contacts',
        path: '/message/contacts',
    },
    {
        component: () => import('../views/personalPages/index.vue'),
        name: 'personal',
        path: '/personal',
    },
    
    {
        component: () => import('../views/loginPages/Land.vue'),
        name: 'Land',
        path: '/Land',
    },
    {
        component: () => import('../views/searchPage.vue'),
        path: '/Search'
    },
    {
        component: () => import('../views/Detailspage.vue'),
        name: 'Detailspage',
        path: '/Detailspage',
    }
]
export {
    constantRoutes
}