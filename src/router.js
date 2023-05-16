import { createRouter, createWebHistory } from 'vue-router'
import DrawingsComponent from './components/DrawingsComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import UserSettings from './components/UserSettings.vue'
import AddDrawing from './components/AddDrawing.vue'
import UpdateDrawing from './components/UpdateDrawing.vue'

const routes = [
    {path: '/', component: LoginComponent},
    {path: '/drawings', component: DrawingsComponent},
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