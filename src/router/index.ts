import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/client/IndexView.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/client/HomeView.vue"),
      },
      {
        path: "blogs",
        name: "blogs",
        component: () => import("@/views/client/HomeView.vue"),
      },
      {
        path: "blog/:bid",
        name: "blog",
        component: () => import("@/views/client/BlogView.vue"),
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/client/UserView.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/IndexView.vue"),
    children: [
      {
        path: "",
        name: "manage",
        component: () => import("@/views/admin/ManageView.vue"),
      },
      {
        path: "post",
        name: "post",
        component: () => import("@/views/admin/PostView.vue"),
      },
      {
        path: "comment",
        name: "comment",
        component: () => import("@/views/admin/CommentView.vue"),
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/admin/DashboardView.vue"),
      },
      {
        path: "users",
        name: "users",
        component: () => import("@/views/admin/UsersView.vue"),
      },
      {
        path: "usergroup",
        name: "usergroup",
        component: () => import("@/views/admin/UsergroupView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
