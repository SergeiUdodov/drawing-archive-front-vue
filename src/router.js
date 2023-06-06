import { createRouter, createWebHistory } from 'vue-router'
import DrawingsComponent from './components/DrawingsComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import UserSettings from './components/UserSettings.vue'
import AddDrawing from './components/AddDrawing.vue'
import UpdateDrawing from './components/UpdateDrawing.vue'

const routes = [
    {path: '/', component: DrawingsComponent},
    {path: '/login', component: LoginComponent},
    {path: '/register', component: RegisterComponent},
    {path: '/settings', component: UserSettings},
    {path: '/addDrawing', component: AddDrawing},
    {path: '/updateDrawing', component: UpdateDrawing}

];

const router = createRouter({
    history: createWebHistory(),
    routes
  });

export default router;