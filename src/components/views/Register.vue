<template>
    <div class="mt-20 mx-auto w-500 max-w-full text-center">
        <h1 class="text-2xl">
            Welcome to
            <span class="p-1 bg-black text-white shadow-lg">Cards Against Humanity&trade;</span>
        </h1>

        <p class="mt-10">
            Welcome to the totally legit and licensed Cards Against Humanity&trade; web game.
            In order to play you need a player name, please enter one below.
        </p>

        <input
                v-model="name"
                :class="false && 'animate__shakeX border-red-600'"
                class="animate__animated outline-none text-center py-2 my-5 w-4/5 shadow-lg border"
                type="text"
                placeholder="Insert player name here..."
        />

        <vue-button
                @button-click="submit"
                v-show="name.length > 2"
                class="animate__animated animate__fadeIn"
                text="Register user"
        >
        </vue-button>
    </div>
</template>

<script>
import VueButton from '../utility/VueButton.vue'
import route from '../../helpers/route'
import axios from 'axios'

export default {
	name: 'Register',
	components: {
		VueButton,
	},
	data: vm => ({
		name: '',
		error: null,
	}),
	methods: {
		submit() {
			axios.post(
				route('users.create'),
				{
					name: this.name,
				}
			)
            .then( response => {
				localStorage.setItem('token',response.data.data.token)

                location.reload()
            })
            .catch(error => {
				console.log(error.response.data.errors)
			})
		}
	},
}
</script>