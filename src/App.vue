<template>
    <div id="app">
        <div
                class="h-20 w-full flex justify-center items-center"
        >
            <span class="text-2xl p-1 bg-black text-white shadow-lg">
                Cards Against Humanity&trade;
            </span>
        </div>
    </div>
</template>
<script>
export default {
	name: 'Register',
	components: {
		// 'error-message': ErrorMessage
	},
	mixins: [
		// SanitiseInput
	],
    props:['viewComponent'],
	data() {

	},
	methods: {

	}
}
</script>
