<template>
    <div>
        <div
            class="h-20 w-full flex justify-center items-center"
        >
            <span class="text-2xl p-1 bg-black text-white shadow-lg">
                Cards Against Humanity&trade;
            </span>
        </div>

        <div>
            <p>
                Welcome! Now you've successfully registered a player name you can start playing!
                Please choose a game in progress from the list on the left hand side or use the
                menu on the right hand side to set up your own game.
            </p>
            <div class="flex">
                <div class="w-3/6">
                    <!--                <game-search/>-->
                </div>
                <div class="w-3/6">
                    <!--                <game-create/>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Dashboard'
}
</script>