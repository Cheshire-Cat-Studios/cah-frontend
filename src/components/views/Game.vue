<template>
    <div class="p-5">
        <div class="mb-4">
            <div class="flex">
                <div class="px-2">
                    <card
                        :is-white="false"
                        :description="blackCard"
                    />
                    <div class="py-4">
                        <h1 class="font-bold text-center mb-2">Scoreboard</h1>
                        <div class="h-32 overflow-y-scroll">
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
                <div id="cards-in-play">
                    <div v-if="!isCzarPhase" class="flex flex-wrap">
                        <!--                        <div-->
                        <!--                                v-for="(card,index) in allChosenCards"-->
                        <!--                                :key="index"-->
                        <!--                        >-->
                        <!--                            <div :test="card"-->
                        <!--                                 class="animated fadeInUp rounded card mb-4 mr-1 w-40 h-64 bg-gray-700"></div>-->
                        <!--                        </div>-->
                    </div>
                    <div>

                    </div>
                    <!--<card-->
                    <!--v-for="(card,key) in hand"-->
                    <!--:key="key"-->
                    <!--:active="!(haveChosenCard || isCzar)"-->
                    <!--:is-white="true"-->
                    <!--:description="card"-->
                    <!--/>-->
                </div>
            </div>
        </div>
        <div id="hand" class="text-center">
            <vue-button
                text="Confirm Selection"
                :disabled="hand.filter(card => card.chosen).length < chosenLimit"
                @click="choseCards"
            />

            <div class="flex flex-wrap flex-row relative">
                <!--            <span-->
                <!--              v-if="(chosenLimit === chosenCards.length) || isCzar"-->
                <!--              class="text-3xl font-bold top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 absolute"-->
                <!--            >-->
                <!--              {{chosenLimit === chosenCards.length ? 'You have already selected your card(s)' : 'You are the card czar!'}}-->
                <!--            </span>-->
                <card
                    v-for="(card,key) in hand"

                    @click.native="selectCard(card)"

                    :selected="card.chosen"
                    :active="cardsActive()"
                    :key="key"
                    :is-white="true"
                    :description="card.description"

                    :class="card.chosen && 'bg-blue-600 text-white border-blue-600 -mt-6'"
                    class="mb-6 mr-6 hover:-mt-4 negative-margins-hover cursor-pointer"
                />
                <!--              -->
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
	data() {
		return {
			socket: io(import.meta.env.VITE_BACKEND_URL),
			isCzar: false,
			isCzarPhase: false,
			chosenLimit: 1,
			players: [
				{
					name: '0123456789',
					chosen: true,
					score: 10
				},
				{
					name: 'two',
					chosen: true,
					score: 11
				},
				{
					name: 'three',
					chosen: true,
					score: 10
				},
				{
					name: 'four',
					chosen: true,
					score: 10
				},
				{
					name: 'five',
					chosen: true,
					score: 10
				},
				{
					name: 'six',
					chosen: true,
					score: 10
				},
				{
					name: 'seven',
					chosen: true,
					score: 10
				},
				{
					name: 'eight',
					chosen: true,
					score: 10
				},
				{
					name: 'nine',
					chosen: true,
					score: 10
				},
				{
					name: 'ten',
					chosen: true,
					score: 10
				},
			],
			blackCard: 'I do not know with what weapons World War III will be fought, but World War IV will be fought with _.',
			hand: [
				{
					id: 12,
					description: 'Extremely tight trousers.',
					chosen: false,
				},
				{
					id: 12,
					description: 'Extremely tight trousers.',
					chosen: false,
				},
				{
					id: 12,
					description: 'Extremely tight trousers.',
					chosen: false,
				},
				{
					id: 12,
					description: 'Extremely tight trousers.',
					chosen: false,
				},
				{
					id: 12,
					description: 'Extremely tight trousers.',
					chosen: false,
				},
				{
					id: 12,
					description: 'Extremely tight trousers.',
					chosen: false,
				},
				{
					id: 12,
					description: 'Extremely tight trousers.',
					chosen: false,
				},
				{
					id: 12,
					description: 'Extremely tight trousers.',
					chosen: false,
				},
				{
					id: 12,
					description: 'Extremely tight trousers.',
					chosen: false,
				},
				{
					id: 12,
					description: 'Extremely tight trousers.',
					chosen: false,
				}
			],
		}
	},
	computed: {
		allChosenCards() {
			return this.players.filter(player => player.chosen ?? false)
		},
		maxScore() {
			return Math.max.apply(Math, this.players.map(player => player.score))
		},
	},
	methods: {
		cardsActive() {
			return !(
				this.isCzarPhase
				|| this.isCzar
				|| this.chosenLimit === this.hand.filter(hand => hand.chosen).length
			)
		},
		selectCard(card) {
			if (card.chosen) {
				(card.chosen = false)
			} else {
				if (!this.cardsActive()) {
					return
				}
				card.chosen = true
			}
		},
		choseCards() {
			const chosen_cards = this.hand.filter(hand => hand.chosen)

			console.log('EMITTING', chosen_cards)


			this.socket.emit('cards-chosen', {data: chosen_cards})
		}
	},
	mounted() {
		this.socket.on(
			'connect',
			(() => {
				console.log('connected')
				this.socket.emit(
					'verify',
					{
						user: {
							id: localStorage.getItem('userId'),
							secret: localStorage.getItem('secret'),
						},
						game: {
							id: localStorage.getItem('gameId')
						}
					}
				)
			})
				.bind(this)
		)
	}
}
</script>