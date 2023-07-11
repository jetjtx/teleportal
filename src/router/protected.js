import Layout from '@/views/layout'

async function guardMyroute(to, from, next) {
    var match = document.cookie.match(RegExp('(^| )stoken=([^;]+)'))
    if (!match && to.name !== 'signin') next({ name: 'signin' })
    else next()
}

async function ck(to, from, next) {
    document.cookie = 'stoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    next()
}

export const protectedRoutes = [
    {
        path: '/admin/signin',
        name: 'signin',
        component: () => import('@/views/SignIn.vue'),
        beforeEnter: ck
    },
    {
        path: '/',
        component: Layout,
        redirect: '/admin/dashboard',
        children: [
            {
                path: '/admin/dashboard',
                name: 'dashboard',
                component: () => import('@/views/dashboard/Dashboard.vue'),
                beforeEnter: guardMyroute
            }
        ]
    },
    {
        path: '/admin',
        component: Layout,
        beforeEnter: guardMyroute,
        children: [
            {   
                path: 'posts',
                name: 'posts',
                component: () => import('@/views/posts/Posts.vue'),
            },
            {   
                path: 'reject',
                name: 'reject',
                component: () => import('@/views/posts/Reject.vue'),
            },
            {   
                path: 'approve',
                name: 'approve',
                component: () => import('@/views/posts/Approve.vue'),
            },
            {   
                path: 'settings',
                name: 'settings',
                component: () => import('@/views/settings/Settings.vue'),
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/NotFound.vue'),
    }
]