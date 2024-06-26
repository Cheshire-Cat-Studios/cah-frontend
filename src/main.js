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

axios.defaults
	.headers
	.common
	['Authorization'] = bearer_token;

//async method def/call to await the axios call (should it be needed)
//TODO: consider tidying all this up/abstracting
(async () => {
	token
		? await axios.get(route('users.verify'))
			.then(response => {
				localStorage.setItem(
					'token',
					response.data.data.token
				)

				component = response.data.data.in_game
					? Game
					: Dashboard
			})
			.catch(error => {
				axios.defaults
					.headers
					.common
					['Authorization'] = undefined

				localStorage.removeItem('token')

				component = Register
			})
		: (component = Register)


	//TODO: spinners library doesnt work with vue 3, find or build an alternative
	createApp(component)
		// .use(VueSpinners)
		// .provide('testing', 'value')
		.mount('#app')

})()
