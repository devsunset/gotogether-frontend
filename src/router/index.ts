import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

import Main from '@/components/main/main.vue';
import Login from '@/components/login/login.vue';
import Register from '@/components/register/register.vue';
import ForgotPassword from '@/components/forgot-password/forgot-password.vue';

import Dashboard from '@/views/dashboard/dashboard.vue';
import Profile from '@/views/profile/profile.vue';


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: 'profile',
                name: 'Profile',
                component: Profile
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
