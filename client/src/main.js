import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import SearchBar from './components/SearchBar.vue';

const routes = [
    { path: '/search', name: 'SearchBar', component: SearchBar }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);

// Use router
app.use(router);

// Mount #app
app.mount('#app');
