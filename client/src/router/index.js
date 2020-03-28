import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index.vue"
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Nofind from "../views/404.vue"

Vue.use(VueRouter);
//* 一般来说进入一个app都是直接先进入login页,然后再进入主页比较合理,但是每次都要登录比较麻烦 . 
//* 如果直接进入index页,比较方便
const routes = [{
    path: "/",
    redirect: "/index"
}, {
    path: "/index",
    name: "index",
    component: Index
}, {
    path: "/register",
    name: "register",
    component: Register
}, {
    path: "/login",
    name: "login",
    component: Login
}, {
    path: "*",
    name: "/404",
    component: Nofind
}]

const router = new VueRouter({
    mode: "history",
    routes
});

//* 设置进入前的路由守卫
router.beforeEach((to, from, next) => {
    //* 根据是否有授权码判断是否为登录状态,是则放行,否则拦截
    const isLogin = localStorage.eleToken ? true : false
        //* 每次进入app都是重定向到index页的,所以这里要处理index到其他页面放行
    if (to.path == "/login" || to.path == "/register") {
        next()
    } else {
        isLogin ? next() : next('/login')
    }
})


;

export default router