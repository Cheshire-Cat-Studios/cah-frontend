<template>
    <Transition name="fade">
        <div
            v-show="showing"
            :class="showing && 'overflow-hidden'"
            class="fixed flex justify-center items-center w-screen h-screen bg-black bg-opacity-50 top-0 left-0 z-20"
            @click.self="close"
        >
            <div class="p-8 bg-white rounded-md relative">
                <a
                    aria-label="close"
                    class="absolute top-2 right-2"
                    @click.prevent="close"
                >
                    ×
                </a>
                <slot/>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

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
			console.log('CLOSE')
			this.$emit('close')
		}
	}
}
</script>
