import { createRouter, createWebHashHistory } from 'vue-router'

import main from './components/Main.vue';
import admin from './admin/index.vue';

const routes = [
    {
        name: 'Main', 
        path: '/', 
        component: main
    },
    {
        name: 'admin', 
        path: '/admin', 
        component: admin, 
        props: {titles: [{value: 'users', title: 'Пользователи'},{value: 'pizza', title: 'Пиццы'}, {value: 'ingridients', title: 'Ингридиенты'}]} 
    },
]
  
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;