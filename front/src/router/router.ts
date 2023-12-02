import { createRouter, createWebHashHistory } from 'vue-router'

import main from '../components/Main.vue';
import admin from '../admin/index.vue';

const routes = [
    { name: 'Main', path: '/', component: main },
    { name: 'admin', path: '/admin', component: admin },
]
  
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;