<template>
    <div>
        <div
            class="h-20 w-full flex justify-center items-center"
        >
            <span class="text-2xl p-1 bg-black text-white shadow-lg">
                Cards Against Humanity&trade;
            </span>
        </div>

        <vue-button
            @button-click="show_game_create_modal = true"
            text="Create a game"
        />

        <div class="container mx-auto">
            <p class="pt-10 pb-20">
                Welcome! Now you've successfully registered a player name you can start playing!
                Please choose a game in progress from the list on the left hand side or use the
                menu on the right hand side to set up your own game.
            </p>
            <div class="flex">
                <game-search/>
            </div>
        </div>
        <modal
            @close="(show_game_create_modal = false)"
            :showing="show_game_create_modal"
        >
            <game-create/>
        </modal>
    </div>
</template>

<script>
import GameCreate from '../partials/GameCreate.vue'
import GameSearch from '../partials/GameSearch.vue'
import Modal from '../utility/Modal.vue'
import VueButton from '../utility/VueButton.vue'
// import VueSelect from '../utility/VueSelect.vue'

export default {
	name: 'Dashboard',
	components: {
		// VueSelect,
		Modal,
		VueButton,
		GameCreate,
		GameSearch,
	},
	data: (vm) => ({
		show_game_create_modal: false,
	}),
}
</script>