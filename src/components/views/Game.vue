<template>
    <div class="p-5">
        <div class="mb-4">
            <div class="flex">
                <div class="px-2 mr-20">
                    <card
                        :is-white="false"
                        :description="black_card"
                    />
                    <div class="py-4">
                        <h1 class="font-bold text-center mb-2">
                            Scoreboard
                        </h1>
                        <div class="h-32 overflow-y-auto">
                            <div
                                v-for="(player,index) in players"
                                :key="index"
                                :class="{'bg-green-500 animated flash': player.score === maxScore}"
                                class="p-1 h-8"
                            >
                                <span class="float-left">{{ player.name }}:</span>
                                <span class="float-right">{{ player.score }}</span>
                            </div>
                        </div>
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
                        <div v-for="cards in cards_in_play">
                            <card
                                v-for="(card,key) in cards"

                                :key="key"
                                :is-white="true"
                                :description="card"

                                class="mb-6 mr-6 hover:-mt-4 negative-margins-hover cursor-pointer"
                            />
                        </div>
                    </div>
                    <div
                        v-else
                    >
                        <div class="flex flex-wrap flex-1">
                            <div>
                                <card
                                    v-for="(card,key) in own_cards_in_play"

                                    :key="key"
                                    :is-white="true"
                                    :description="card"

                                    class="mb-6 mr-6 hover:-mt-4 negative-margins-hover cursor-pointer"
                                />
                            </div>

                            <div
                                v-for="i in cards_in_play_count"
                                class="ml-6"
                            >
                                <div
                                    v-for="x in chosen_limit"
                                    class="rounded select-none card relative border border-gray-300 p-4 shadow-xl w-40 h-64 bg-gray-300 ml-2"
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
                :disabled="chosen_cards.length < chosen_limit"
                @click="choseCards"
            />

            <div
                class="flex flex-wrap flex-row relative mt-20"
            >
                <span
                    v-if="is_czar"
                    class="text-3xl font-bold top-1/2 w-full transform -translate-y-1/2 z-10 absolute py-10 bg-black text-white w-full h-full flex justify-center items-center bg-opacity-75 shadow-xl"
                >
                    You are the card czar!
                </span>

                <card
                    v-for="(card,key) in hand"

                    @click="selectCard(key)"

                    :selected="chosen_cards.includes(key)"
                    :active="is_czar === false && !own_cards_in_play.length && ((chosen_cards.length < chosen_limit) || chosen_cards.includes(key))"
                    :key="key"
                    :is-white="true"
                    :description="card"

                    class="mb-6 mr-6 hover:-mt-4 negative-margins-hover cursor-pointer"
                />
            </div>
        </div>
    </div>
</template>
<script>
import VueButton from '../utility/VueButton.vue'
import Card from '../utility/Card.vue'

import io from 'socket.io-client'

export default {
	name: 'Game',
	components: {
		'vue-button': VueButton,
		'card': Card,
	},
	data: (vm) => ({
		socket: io(
			import.meta.env.VITE_BACKEND_URL,
			{
				query: {
					token: localStorage.getItem('token'),
				}
			}
		),
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
	}),
	computed: {
		maxScore() {
			return Math.max.apply(Math, this.players.map(player => player.score))
		},
	},
	methods: {
		selectCard(key) {
			this.chosen_cards.includes(key)
				? this.chosen_cards = this.chosen_cards.filter(card_key => card_key !== key)
				: (
					this.chosen_cards.length < this.chosen_limit
					&& this.chosen_cards.push(key)
				)
		},
		choseCards() {
			console.log('EMITTING', this.chosen_cards)

			this.socket.emit('cards-chosen', this.chosen_cards)

            this.own_cards_in_play = this.hand.filter((description, index) => this.chosen_cards.includes(index))
			this.hand = this.hand.filter((description, index) => !this.chosen_cards.includes(index))
            this.chosen_cards = []
		}
	},
	mounted() {
		this.socket
            .on(
			'connect',
			() => {
				console.log('connected')
			}
		)

		this.socket
            .on(
			'game-state',
			data => {
				this.players = data.game.players
				this.black_card = data.game.current_card
				this.hand = data.hand
				this.chosen_limit = (this.black_card.match(/_/g) || [1]).length
                this.own_cards_in_play = data.game.own_cards_in_play || []
                this.cards_in_play_count = data.game.cards_in_play_count
                this.is_czar = data.game.is_current_czar

                console.log(data)
			}
		)

        this.socket
            .on(
            	'player-selected',
                () => {
            		console.log('hit')
            		this.cards_in_play_count ++
                }
            )
	}
}
</script>