import Router from 'vue-router';
import Vue from 'vue/dist/vue.js';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'LiveMusic',
            component: () => import('@/components/partials/music/liveMusic')
        },
        {
            path: '/about-us',
            name: 'AboutUs',
            component: () => import('@/components/partials/music/aboutUs')
        },
        {
            path: '/our-services',
            name: 'OurServices',
            component: () => import('@/components/partials/music/ourServices')
        },
        {
            path: '/contact-us',
            name: 'ContactUs',
            component: () => import('@/components/partials/music/contactUs')
        }
    ]
});
