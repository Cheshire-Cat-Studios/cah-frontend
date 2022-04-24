<template>
    <div class="max-w-screen w-200 p-4">
        <div
            :class="awaitingResponse && 'opacity-50'"
        >
            <div class="grid grid-cols-6 gap-y-4 mb-6">
                <span class="col-span-4">
                    Game name:
                </span>
                <input
                    class="py-1 px-5 outline-none placeholder-gray-400 text-gray-600 w-full col-span-2 animate__animated"
                    type="text"
                    placeholder="Insert game name here"
                    name="name"
                    v-model="form_fields.name"
                    :class="!!errors?.name && 'animate__shakeX shake border border-red-600'"
                />
                <div class="col-span-6">
                    <error-messages
                        :show="!!errors?.name"
                        :messages="errors?.name || []"
                    />
                </div>
                <span class="col-span-4">
                    Password (leave blank for no password):
                </span>
                <input
                    v-model="form_fields.password"
                    class="py-1 px-5 outline-none placeholder-gray-400 text-gray-600 w-full col-span-2 animate__animated"
                    type="text"
                    placeholder="No password"
                    :class="!!errors?.password && 'animate__shakeX shake border border-red-600'"
                />
                <div class="col-span-6">
                    <error-messages
                        :show="!!errors?.password"
                        :messages="errors?.password || []"
                    />
                </div>
                <span class="col-span-4">
                    Max score:
                </span>
                <div class="ml-auto col-span-2 w-full">
                    <vue-select
                        class="w-full animate__animated"
                        :class="!!errors?.max_score && 'animate__shakeX shake border border-red-600'"
                        @change="form_fields.max_score = parseInt($event.target?.value)"
                        :selected-option="form_fields.max_score"
                        :options="select_data.max_score"
                    />
                </div>
                <div class="col-span-6">
                    <error-messages
                        :show="!!errors?.max_score"
                        :messages="errors?.max_score || []"
                    />
                </div>
                <span class="col-span-4">
                    Max player count:
                </span>
                <div class="ml-auto col-span-2 w-full">
                    <vue-select
                        class="w-full animate__animated"
                        :class="!!errors?.max_players && 'animate__shakeX shake border border-red-600'"
                        @change="form_fields.max_players = parseInt($event.target?.value)"
                        :selected-option="form_fields.max_players"
                        :options="select_data.max_players"
                    />
                </div>
                <div class="col-span-6">
                    <error-messages
                        :show="!!errors?.max_players"
                        :messages="errors?.max_players || []"
                    />
                </div>
                <span class="col-span-4">
                    Round time limit (leave 0 for no limit):
                </span>
                <div class="ml-auto col-span-2 w-full">
                    <vue-select
                        class="w-full animate__animated"
                        :class="!!errors?.round_time_limit_mins && 'animate__shakeX shake border border-red-600'"
                        @change="form_fields.round_time_limit_mins = parseInt($event.target?.value)"
                        :selected-option="form_fields.round_time_limit_mins"
                        :options="select_data.round_time_limit_mins"
                    />
                </div>
                <div class="col-span-6">
                    <error-messages
                        :show="!!errors?.round_time_limit_mins"
                        :messages="errors?.round_time_limit_mins || []"
                    />
                </div>
                <span class="col-span-4">
                    Game time limit (leave 0 for no limit):
                </span>
                <div class="ml-auto col-span-2 w-full">
                    <vue-select
                        class="w-full animate__animated"
                        :class="!!errors?.game_time_limit_mins && 'animate__shakeX shake border border-red-600'"
                        @change="form_fields.game_time_limit_mins = parseInt($event.target?.value)"
                        :selected-option="form_fields.game_time_limit_mins"
                        :options="select_data.game_time_limit_mins"
                    />
                </div>
                <div class="col-span-6">
                    <error-messages
                        :show="!!errors?.game_time_limit_mins"
                        :messages="errors?.game_time_limit_mins || []"
                    />
                </div>

            </div>

            <button
                :disabled="awaitingResponse"
                @click="createGame"
                class="py-1 px-3 text-white bg-black rounded shadow-xl border hover:border-black hover:text-black hover:bg-white"
            >
                Create game
            </button>
        </div>
<!--        <div-->
<!--            v-show="awaitingResponse"-->
<!--            class="absolute w-full h-full top-0"-->
<!--        >-->
<!--            <div class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">-->
<!--                <square :loading="false"></square>-->
<!--                <span class="loading font-bold text-lg text-shadow-xl">Creating game</span>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>
<script>
import VueSelect from '../utility/VueSelect.vue'
import ErrorMessages from '../utility/ErrorMessages.vue'
import SanitiseInput from '../../mixins/SanitiseInput'
import axios from 'axios'
import route from '../../helpers/route'

export default {
	name: 'GameCreate',
	components: {
		ErrorMessages,
		'vue-select': VueSelect
	},
	mixins: [SanitiseInput],
	data() {
		return {
			errors: {},
			awaitingResponse: false,
			form_fields: {
				name: 'testing game',
				password: '',
				max_score: 10,
				max_players: 3,
				round_time_limit_mins: 10,
				game_time_limit_mins: 50,
			},
			select_data: {
				max_score: {
					0: 'Max score',
					5: 5,
					10: 10,
					15: 15,
					20: 20
				},
				max_players: {
					0: 'Max players',
					3: 3,
					4: 4,
					5: 5,
					6: 6,
					7: 7,
					8: 8,
					9: 9,
					10: 10
				},
				round_time_limit_mins: [
					'Max round time(mins)',
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					12,
					13,
					14,
					15,
					16,
					17,
					18,
					19,
					20
				],
				game_time_limit_mins: {
					0: 'Max game time(mins)',
					20: 20,
					10: 10,
					30: 30,
					40: 40,
					50: 50,
					60: 60,
					70: 70,
					80: 80,
					90: 90,
					100: 100,
					110: 110,
					120: 120
				}
			}
		}
	},
	methods: {
		createGame() {
			this.errors = {}
			this.awaitingResponse = true

			axios.post(route('games.create'), this.form_fields)
				.then((response) => {
                    location.reload()
				})
				.catch((error) => {
					// console.log(error.response)
					this.errors = error.response
						.data
						.data
				})
		}
	}
}
</script>
