import { createRouter, createWebHistory } from 'vue-router'
import Test from '../components/Test.vue'
import axios from 'axios'

const routes = [
	{
		path: '/test',
		name: 'Test',
		component: Test
	},
	{
		path: '/test',
		name: 'Test',
		component: Test
	},

]

const router = createRouter({
	history: createWebHistory(),
	routes,
	// base: process.env.BASE_URL,
})

router.beforeEach(async (to, from, next) => {
	console.log('HIT')

	axios.post('')

	next()
})

export default router
