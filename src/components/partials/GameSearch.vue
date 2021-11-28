<template>
    <div class="about">
        <div class="flex">
            <div>
                <div class="mb-5">
                    <span class="mr-5 ">Filter by game name:</span>
                    <input
                        v-model="filters.name"
                        class="py-1 text-center outline-none placeholder-gray-400 text-gray-600"
                        type="text"
                        placeholder="Insert game name here"
                    />
                </div>
                <div class="mb-5 flex">
                    <span class="mr-5">Filter by player count:</span>
                    <vue-select
                        @change="filters.player_count = $event"
                        :selected-option="filters.player_count"
                        :options="player_count_select.options"
                    />
                </div>
                <div class="mb-5 flex text-center">
                    <span class="mr-5">Only show private games:</span>
                    <vue-switch @change="filters.private = $event" :checked="filters.private"/>
                </div>
                <div class="mb-5 flex">
                    <span class="mr-5">Only show open games:</span>
                    <vue-switch @change="filters.only_open = $event" :checked="filters.only_open"/>
                </div>
            </div>
            <div>
                <div class="grid grid-cols-8">
                    <div class="px-4 py-2 text-center border-b-2 border-r border-black col-span-2">
                        Game Name
                    </div>
                    <div class="px-4 py-2 text-center border-b-2 border-l border-r border-black">
                        Players
                    </div>
                    <div class="px-4 py-2 text-center border-b-2 border-l border-r border-black">
                        Private
                    </div>
                    <div class="px-4 py-2 text-center border-b-2 border-l border-r border-black">
                        Max Score
                    </div>
                    <div class="px-4 py-2 text-center border-b-2 border-l border-r border-black">
                        Game Time Limit
                    </div>
                    <div class="px-4 py-2 text-center border-b-2 border-l border-r border-black">
                        Round Time Limit
                    </div>
                    <div class="px-4 py-2 text-center border-b-2 border-l border-black">
                    </div>
                </div>
                <div
                    v-show="!games.length"
                    class="col-span-8 text-center p-4"
                >
                    No games match your search criteria, please try amending your search filters or create a game using
                    the button above!
                </div>

                <div
                    :key="index"
                    v-for="(game,index) in games"
                    class="grid grid-cols-8"
                >
                    <span class="border flex justify-center items-center col-span-2">
                        {{ game.name }}
                    </span>
                    <span class="border flex justify-center items-center">
                        {{ game.player_count }}/{{ game.max_players }}
                    </span>
                    <span class="border flex justify-center items-center">
                        {{ game.private ? '&check;' : 'X' }}
                    </span>
                    <span class="border flex justify-center items-center">
                        {{ game.max_score }}
                    </span>
                    <span class="border flex justify-center items-center">
                        {{ game.game_time_limit_mins }}
                    </span>
                    <span class="border flex justify-center items-center">
                        {{ game.round_time_limit_mins }}
                    </span>
                    <span class="border flex justify-center items-center p-4">
                        <vue-button
                            text="Join game"
                            :disabled="game.max_players <= game.player_count"
                            @click="selectGame(game)"
                            :class="(game.max_players <= game.player_count) && 'cursor-not-allowed opacity-50'"
                        />
                    </span>
                </div>
            </div>
        </div>
        <modal
            @close="show_modal= false"
            :showing="show_modal"
            class="text-center"
        >
            <span class="text-4xl font-bold mb-4">
                {{ selected_game?.name }}
            </span>

            <p class="text-xl mb-4">
                This game is private and requires a password
            </p>

            <input
                v-model="password"
                class="py-1 text-center outline-none placeholder-gray-400 text-gray-600 w-full mb-4"
                type="password"
                placeholder="Insert password here"
            />

            <error-messages
                :show="!!errors?.password"
                :messages="errors?.password ? [errors?.password] : []"
            />

            <vue-button
                text="Join Game"
                class="mt-5"
                :disabled="!password"
                v-on:click="joinGame()"
            />
        </modal>
    </div>
</template>
<script>
import VueButton from '../utility/VueButton.vue'
import VueSwitch from '../utility/VueSwitch.vue'
import VueSelect from '../utility/VueSelect.vue'
import ErrorMessages from '../utility/ErrorMessages.vue'
import axios from 'axios'
import Modal from '../utility/Modal.vue'
import route from '../../helpers/route'

export default {
	name: 'GameSearch',
	components: {
		Modal,
		VueButton,
		VueSwitch,
		VueSelect,
		ErrorMessages,
	},
	data: function () {
		return {
			errors: {},
			password_errors: [],
			show_modal: false,
			selected_game: null,
			games: [],
			password: '',
			filters: {
				name: '',
				private: false,
				only_open: false,
				player_count: 0,
			},
			player_count_select: {
				options: [
					'Min player count',
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10
				]
			}
		}
	},
	watch: {
		filters: {
			handler() {
				this.filterGames()
			},
			deep: true
		}
	},
	mounted() {
		this.filterGames()

		this.heartbeat()
	},
	methods: {
		heartbeat() {
			setTimeout(
				() => {
					this.filterGames()
					this.heartbeat()
				},
				5000
			)
		},
		filterGames() {
			axios.get(route('games.index'), {params: this.filters})
				.then(response => {
					this.games = response.data.data.games
				})
		},
		selectGame(game) {
			this.password = null
			this.selected_game = game

			game.private
				? (this.show_modal = true)
				: this.joinGame()
		},
		joinGame() {
			// let self = this
			this.errors = []

			axios.post(
				route('games.join', this.selected_game.uuid),
				{
					password: this.password,
				}
			)
				.then(() => {
					location.reload()
				})
				.catch(error => {
					this.errors = error.response.data.data

					error.response?.status === 403
						? location.reload()
						: console.log(error.response.data) // flash error
				})
		}
	}
}
</script>