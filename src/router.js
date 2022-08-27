import { createWebHistory, createRouter } from "vue-router";

import Main from "@/layout/main.vue";
import Login from "@/components/login.vue";
import Register from "@/components/register.vue";
import ForgotPassword from "@/components/forgot-password.vue";

import Home from "@/views/home.vue";
import Together from "@/views/together.vue";
import TogetherDetail from "@/views/togetherdetail.vue";
import TogetherEdit from "@/views/togetheredit.vue";
import Member from "@/views/member.vue";
import Post from "@/views/post.vue";
import PostDetail from "@/views/postdetail.vue";
import PostEdit from "@/views/postedit.vue";
import Profile from "@/views/profile.vue";
import Memo from "@/views/memo.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "together",
        name: "Together",
        component: Together,
      },
      {
        path: "togetherdetail",
        name: "TogetherDetail",
        component: TogetherDetail,
      },
      {
        path: "togetheredit",
        name: "TogetherEdit",
        component: TogetherEdit,
      },
      {
        path: "member",
        name: "Member",
        component: Member,
      },
      {
        path: "post",
        name: "Post",
        component: Post,
      },
      {
        path: "postdetail",
        name: "PostDetail",
        component: PostDetail,
      },
      {
        path: "postedit",
        name: "PostEdit",
        component: PostEdit,
      },
      {
        path: "profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "memo",
        name: "Memo",
        component: Memo,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//  삭제 금지 ( example )
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
