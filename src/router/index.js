import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/UslugeView.vue')
		},
		{
			path: '/moje-rezervacije',
			name: 'moje-rezervacije',
			component: () => import('../views/HomeView.vue')
		},
		{
			path: '/lokacije',
			name: 'lokacije',
			component: () => import('../views/LokacijeView.vue')
		},
		{
			path: '/rezerviraj',
			name: 'rezerviraj',
			component: () => import('../views/ReserveView.vue')
		},
		{
			path: '/prijava',
			name: 'prijava',
			component: () => import('../views/LoginView.vue')
		},
		{
			path: '/registracija',
			name: 'registracija',
			component: () => import('../views/RegisterView.vue')
		}
	],
});

router.beforeEach((to, from, next) => {
	const userToken = localStorage.getItem('washNowUserToken');

	const publicPages = ['/lokacije', '/', '/prijava', '/registracija'];
	const isPublic = publicPages.includes(to.path);

	if (!userToken && !isPublic) {
		return next('/prijava');
	}

	return next();
});

export default router
