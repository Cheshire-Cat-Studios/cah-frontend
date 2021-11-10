import {createApp} from 'vue'
import App from './App.vue'
import VueSpinners from 'vue-spinners'
import axios from 'axios'
import router from './router/index'
import route from './helpers/route'
import Game from './components/views/Game.vue'
import Dashboard from './components/views/Dashboard.vue'
import Register from './components/views/Register.vue'

import 'animate.css/animate.css'
import './css/index.css'

const token = localStorage.getItem('token')

let component = null,
	bearer_token = undefined

token
&& (bearer_token = `Bearer ${token}`)

axios.defaults.headers.common['Authorization'] = bearer_token;

(async () => {
	token
		? await axios.get(route('users.verify'))
			.then(response => {
				component = response.data.data.in_game
					? Game
					: Dashboard
			})
			.catch(error => {
				axios.defaults.headers.common['Authorization'] = undefined
				localStorage.removeItem('token')

				// console.log(error)
				component = Register
			})
		: (component = Register)

	createApp(component)
		.use(VueSpinners)
		// .use(router)
		.provide('testing', 'value')
		.mount('#app')

})()
