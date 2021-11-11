<template>
    <button
        @click.stop="$emit('button-click')"
        v-html="text"
        :disabled="disabled"
        :class="disabled && 'opacity-50'"
        class="
            py-1
            px-3
            text-white
            bg-black
            rounded
            shadow-xl
            border
            hover:border-black
            hover:text-black
            hover:bg-white
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