<template>
    <Transition name="fade">
        <div
            v-show="showing"
            :class="showing && 'overflow-hidden'"
            class="fixed flex justify-center items-center w-screen h-screen bg-black bg-opacity-50 top-0 left-0 z-20"
            @click.self="close"
        >
            <div class="p-8 bg-white rounded-md relative">
                <span
                    class="absolute top-2 right-2 cursor-pointer"
                    @click.prevent="close"
                >
                    ×
                </span>
                <slot/>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
	name: 'Modal',
	props: {
		showing: {
			required: true,
			type: Boolean
		}
	},
	methods: {
		close() {
			this.$emit('close')
		}
	}
}
</script>
