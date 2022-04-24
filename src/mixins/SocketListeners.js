export default {
	methods: {
		socketListeners(){
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
						this.cards_in_play = data.game.cards_in_play
						this.is_czar = data.game.is_current_czar
						this.is_czar_phase = data.game.is_czar_phase
						this.game_started = data.game.is_started
						this.is_host = data.game.is_host
					}
				)

			this.socket.on(
				'game-started',
				({is_czar}) => {
					this.is_czar = is_czar
					this.game_started = true
				}
			)

			this.socket
				.on(
					'player-selected',
					() => {
						this.cards_in_play_count++
					}
				)

			this.socket
				.on(
					'czar-phase-start',
					({cards_in_play, czar_name}) => {
						this.is_czar_phase = true
						this.cards_in_play = cards_in_play
						this.cards_in_play_count = 0

						this.fireEvent('car-phase-started', czar_name)
					}
				)

			this.socket
				.on(
					'player-joined',
					name => {
						this.players
							.push({
								name: name,
								score: 0,
							})
					}
				)

			this.socket
				.on(
					'round-end',
					({scoreboard, winner, hand, is_czar, card}) => {

						console.log(scoreboard)
						this.players = scoreboard
						this.cards_in_play = {}
						this.is_czar = is_czar
						this.hand = hand
						// this
						this.is_czar_phase = false
						this.own_cards_in_play = []
						this.black_card = card
						//TODO: computed prop for below?
						this.chosen_limit = (this.black_card.match(/_/g) || [1]).length

						this.fireEvent('round-end', winner.name)
					}
				)

			this.socket
				.on(
					'game-won',
					(data) => {
						this.game_won.name = data.name
						this.game_won.i = 10

						window.setInterval(
							() => {
								this.game_won.i
								&& (this.game_won.i--)

								!this.game_won.i
								&& location.reload()
							},
							1000
						)
					}
				)

			this.socket
				.on(
					'player-left',
					data => {
						console.log(data)

						this.chosen_cards = []
						this.players = data.scoreboard
						this.cards_in_play = data.cards_in_play || {}
						this.cards_in_play_count = data.cards_in_play_count || 0
						this.is_czar = data.is_czar
						this.hand = data.hand
						this.is_czar_phase = data.is_czar_phase
						this.own_cards_in_play = data.own_cards_in_play || []

						// this.black_card = card
						//TODO: computed prop for below?

						// console.log(
						// 	data.player_who_left,
						// 	data.left_player_was_czar
						// )

					}
				)
		}
	}
}