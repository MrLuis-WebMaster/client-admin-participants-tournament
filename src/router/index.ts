import { createRouter, createWebHistory  } from "vue-router"
// @ts-ignore
import List from "../pages/List/List.vue"
// @ts-ignore
import Home from "../pages/Home/Home.vue"

const routes = [
    { path: '/', component: Home },
    { path: '/list-participants', component: List },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})