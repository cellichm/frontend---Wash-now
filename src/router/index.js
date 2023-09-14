import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/usluge',
			name: 'usluge',
			component: () => import('../views/UslugeView.vue')
		},
		{
			path: '/lokacije',
			name: 'lokacije',
			component: () => import('../views/LokacijeView.vue')
		},
		{
			path: '/korisnici',
			name: 'korisnici',
			component: () => import('../views/KorisniciView.vue')
		}
	]
})

export default router
