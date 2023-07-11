function l(view) {
    return() => import(`@/views/${view}.vue`)
}

export const publicRoutes = [
    {
        path: '/',
        name: 'home',
        component: l('HomeView'),
        meta: {
            transition: 'fade',
        }
    },
    {
        path: '/signin',
        name: 'signin',
        component: l('SignInView'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: l('SignUpView')
    },
    {
        path: '/forgotpassword',
        name: 'forgotpassword',
        component: l('ForgotPasswordView'),
        meta: { // https://github.com/SpenderJ/CNB-Application/blob/122a82541634a9bcd142b38b8351b417bfafb28e/front/src/App.vue#L70
          hideHeader: false,
          hideFooter: true,
        }
    },
    { path: '/old', redirect: '/' },
    // { path: '/:catchAll(.*)', name: "NotFound", redirect: '/' },
    // https://stackoverflow.com/questions/63526486/vue-router-catch-all-wildcard-not-working
    { path: '/:pathMatch(.*)*',   name: "NotFound", component: l('NotFound') },
];