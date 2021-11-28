<template>
    <button
        @click.stop="$emit('button-click')"
        v-html="text"
        :disabled="disabled"
        :class="disabled ? 'opacity-50' : 'hover:border-black hover:text-black hover:bg-white'"
        class="
            py-1
            px-3
            text-white
            bg-black
            rounded
            shadow-xl
            border
        "
    >
    </button>
</template>

<script>
export default {
	name: 'Button',
	props: {
		text: {
			required: true,
			type: String,
		},
		disabled: {
			required: false,
			type: Boolean,
			default: false,
		},
	}
}
</script>