import { createWebHistory, createRouter } from "vue-router";

import Main from '@/layout/main.vue';
import Login from '@/components/login.vue';
import Register from '@/components/register.vue';
import ForgotPassword from '@/components/forgot-password.vue';

import Home from '@/views/home.vue';
import Together from '@/views/together.vue';
import Member from '@/views/member.vue';
import Talk from '@/views/talk.vue';
import Qa from '@/views/qa.vue';
import Profile from '@/views/profile.vue';
import Note from '@/views/note.vue';

const routes = [
  {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
          {
              path: '',
              name: 'Home',
              component: Home
          },
          {
            path: 'together',
            name: 'Together',
            component: Together
          },
          {
            path: 'member',
            name: 'Member',
            component: Member
          },
          {
            path: 'talk',
            name: 'Talk',
            component: Talk
          },
          {
            path: 'qa',
            name: 'Qa',
            component: Qa
          },
          {
              path: 'profile',
              name: 'Profile',
              component: Profile
          },
          {
            path: 'note',
            name: 'Note',
            component: Note
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
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;