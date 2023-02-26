import { createRouter, createWebHashHistory } from "vue-router";
import GrippaLogin from './components/GrippaLogin.vue'
import GrippaProfile from './components/GrippaProfile.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/', component: GrippaProfile
        },
        {
            path: '/login', component: GrippaLogin
        },
        {
            path: '/profile', component: GrippaProfile
        },
    ]
})
