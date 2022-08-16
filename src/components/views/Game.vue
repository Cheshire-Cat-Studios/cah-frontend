<template>
    <div class="p-10">
        <div
            v-if="game_won.name"
            class="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-40 z-20"
        >
            <div
                class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            >
                <confetti-explosion
                    :particleCount="200"
                    :particleSize="30"
                    :force="0.5"
                    :stageHeight="1500"
                />
            </div>
            <div
                class="p-8 border-black shadow-2xl text-center bg-white z-20"
            >
                <span class="text-2xl font-bold">
                    Score limit reached!
                </span>
                <br/>
                <span class="text-4xl font-bold">
                    {{ game_won.name }}
                </span>
                <br/>
                <span>
                    has won the game!
                </span>
                <br/>
                <span>
                    You will be returned to the dashboard in {{ game_won.i }} second{{ game_won.i === 1 ? 's' : '' }}
                </span>
            </div>
        </div>
        <div class="mb-4">
            <div class="flex">
                <div class="px-2 mr-20">
                    <card
                        :is-white="false"
                        :description="black_card"
                    />
                    <div class="py-4 flex flex-col">
                        <h1
                            @click="fireEvent('car-phase-started', 'test')"
                            class="font-bold text-center mb-2"
                        >
                            Scoreboard
                        </h1>
                        <div class="h-32 overflow-y-auto">
                            <div
                                v-for="(player,index) in players"
                                :key="index"
                                :class="player.score && player.score === maxScore && 'bg-green-500 animated flash'"
                                class="p-1 min-h-8 flex justify-between items-center"
                            >
                                <span
                                    class="flex justify-between items-center flex-1 text-sm"
                                >
                                    {{ player.name }}
                                    <span>
                                        <i
                                            v-show="player.is_czar"
                                            class="icon-crown mx-2"
                                        />
                                        <i
                                            v-show="player.is_self"
                                            class="icon-user mr-2"
                                        />
                                    </span>
                                </span>
                                <span
                                    class="min-w-4 text-right"
                                >
                                    {{ player.score }}
                                </span>
                            </div>
                        </div>
                        <button
                            @click="show_leave_game_modal = true"
                            class="border border-red-500 text-red-500 font-bold px-4 px-2 mx-auto z-40"
                        >
                           Leave
                        </button>
                    </div>
                </div>
                <div
                    id="cards-in-play"
                    class="w-full"
                >
                    <div
                        v-if="is_czar_phase"
                        class="flex flex-wrap flex-1"
                    >
                        <div
                            v-for="(cards, uuid) in cards_in_play"
                            @click="is_czar && (chosen_set = uuid)"
                            :class="is_czar && 'cursor-pointer'"
                            class="flex mr-10"
                        >
                            <card
                                v-for="(card,key) in cards"

                                :key="key"
                                :is-white="true"
                                :description="card"
                                :selected="uuid === chosen_set"

                                class="mb-6 mr-6 hover:-mt-4 negative-margins-hover animate__animated animate__fadeInUp"
                            />
                        </div>
                    </div>
                    <div
                        v-else
                    >
                        <div class="flex flex-wrap flex-1">
                            <div
                                v-if="own_cards_in_play?.length"
                                class="flex mb-10 mr-10"
                            >
                                <card
                                    v-for="(card,key) in own_cards_in_play"

                                    :key="key"
                                    :is-white="true"
                                    :description="card"

                                    class="mb-6 mr-6 hover:-mt-4 negative-margins-hover cursor-pointer animate__animated animate__fadeInUp"
                                />
                            </div>

                            <div
                                v-for="i in cards_in_play_count"
                                class="flex mb-10 mr-10"
                            >
                                <div
                                    v-for="x in chosen_limit"
                                    class="rounded select-none card relative border border-gray-300 p-4 shadow-xl w-40 h-64 bg-gray-300 mr-6 animate__animated animate__fadeInUp"
                                >
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div id="hand" class="text-center">
            <vue-button
                text="Confirm Selection"
                :disabled="!canConfirm()"
                @click="confirmSelection"
            />
            <div
                class="flex flex-wrap flex-row relative mt-20"
            >
                <span
                    v-if="is_czar || !game_started"
                    class="animate__animated animate__fadeIn text-3xl font-bold top-1/2 w-full transform -translate-y-1/2 z-10 absolute py-10 bg-black text-white w-full h-full flex justify-center items-center bg-opacity-75 shadow-xl"
                >
                    {{ !game_started ? 'The game hasn\'t started yet!' : 'You are the card czar!' }}
                </span>

                <card
                    v-for="(card,key) in hand"

                    @click="selectCard(key)"

                    :selected="chosen_cards.includes(key)"
                    :active="is_czar === false && !own_cards_in_play.length && ((chosen_cards.length < chosen_limit) || chosen_cards.includes(key))"
                    :key="key"
                    :is-white="true"
                    :description="card"
                    :selected-index="chosen_cards.indexOf(key)"

                    class="transition-margin duration-700 mb-6 mr-6 hover:-mt-4 negative-margins-hover cursor-pointer animate__animated animate__fadeInUp"
                />
            </div>
        </div>
        <div
            v-show="event.started_at"
            class="pt-1/10 absolute w-screen h-screen top-0 left-0 flex items-start justify-center"
        >
            <div
                v-show="event.started_at"

                ref="eventCard"
                class="p-5 text-xl bg-black text-center text-white roll-in-left shadow-2xl overflow-hidden "
            >
                <div v-show="event.type === 'car-phase-started'">
                    <span>
                        All players have chosen their cards.
                    </span>
                    <br/>
                    <span class="text-4xl font-bold">
                        {{ event.user_name }}
                    </span>
                    <br/>
                    <span>
                        will choose the winner
                    </span>
                </div>
                <div v-show="event.type === 'round-end'">
                    <span>
                        The Czar has chosen
                    </span>
                    <br/>
                    <span class="text-4xl font-bold">
                         {{ event.user_name }}
                    </span>
                    <br/>
                    <span>
                        has won the round!
                    </span>
                </div>
            </div>
        </div>
        <div
            v-if="!game_started"
            class="w-screen h-screen absolute top-0 left-0 flex items-center justify-center"
        >
            <span
                v-if="is_host"
                @click="socket.emit('start-game')"
                class="px-6 py-4 text-4xl font-bold rounded-md cursor-pointer bg-green-400 z-40 hover:opacity-75"
            >
                Start Game
            </span>
        </div>
        <modal
            :showing="show_leave_game_modal"
            @close="show_leave_game_modal = false"
        >
            <div class="flex flex-col">
                <p class="font-bold text-xl mb-4">
                    Are you sure you wish to do this? This action cannot be undone!
                </p>
                <button
                    @click="leaveGame()"
                    class="border border-red-500 text-red-500 font-bold px-4 px-2 mx-auto"
                >
                    Leave
                </button>
            </div>
        </modal>
    </div>
</template>
<script>
import VueButton from '../utility/VueButton.vue'
import Card from '../utility/Card.vue'
import Modal from '../utility/Modal.vue'
import ConfettiExplosion from 'vue-confetti-explosion'
import io from 'socket.io-client'
import SocketListeners from '../../mixins/SocketListeners'

export default {
	name: 'Game',
	components: {
		'vue-button': VueButton,
		'card': Card,
		ConfettiExplosion,
        Modal,
	},
	mixins: [SocketListeners],
	data: () => ({
		event_timelimit: {
			total: 4000,
			exit: 3000,
		},
		event: {
			started_at: null,
			type: null,
			user_name: null,
		},
		socket: io(
			import.meta.env.VITE_BACKEND_URL,
			{
				query: {
					token: localStorage.getItem('token'),
				}
			}
		),
		is_host: false,
		is_czar: false,
		is_czar_phase: false,
		chosen_limit: 1,
		players: [],
		black_card: '',
		hand: [],
		chosen_cards: [],
		cards_in_play: {},
		own_cards_in_play: [],
		cards_in_play_count: 0,
		chosen_set: null,
		game_won: {
			name: null,
			i: null,
		},
        show_leave_game_modal: false,
		game_started: false,
	}),
	computed: {
		maxScore() {
			return Math.max.apply(Math, this.players.map(player => player.score))
		},
	},
	methods: {
		canConfirm() {
			if (this.is_czar !== this.is_czar_phase) {
				return false
			}

			if (this.is_czar) {
				return !!this.chosen_set
			}

			return !this.own_cards_in_play.length
				&& this.chosen_cards.length === this.chosen_limit
		},
		selectCard(key) {
			this.chosen_cards.includes(key)
				? this.chosen_cards = this.chosen_cards.filter(card_key => card_key !== key)
				: (
					this.chosen_cards.length < this.chosen_limit
					&& this.chosen_cards.push(key)
				)
		},
		confirmSelection() {
			this.is_czar
				? this.chooseSet()
				: this.chooseCards()
		},
		chooseSet() {
			this.socket.emit('czar-chosen', this.chosen_set)

			this.chosen_set = null
			this.is_czar = false
		},
		chooseCards() {
			this.socket.emit('cards-chosen', this.chosen_cards)

			this.own_cards_in_play = this.hand.filter((description, index) => this.chosen_cards.includes(index))
			this.hand = this.hand.filter((description, index) => !this.chosen_cards.includes(index))
			this.chosen_cards = []
		},
		leaveGame(){
            this.socket.emit('leave')

            location.reload()
        },
		fireEvent(type, user_name) {
			if (!this.event.started_at) {
				this.event = {
					started_at: new Date().getTime(),
					type,
					user_name,
				}

				setTimeout(
					() => {
						this.$refs.eventCard
							?.classList
							?.add('roll-out-right')

						setTimeout(
							() => {
								this.resetEvent()
							},
							this.event_timelimit.total - this.event_timelimit.exit
						)
					},
					this.event_timelimit.exit
				)

			} else {

			}
		},
		resetEvent() {
			this.$refs.eventCard
				?.classList
				?.remove('roll-out-right')

			this.event = {
				started_at: null,
				type: null,
				user_name: null,
			}
		}
	},
	mounted() {
		console.log('hit')
        console.log(import.meta.env.VITE_BACKEND_URL)
		this.socketListeners()
	}
}
</script>