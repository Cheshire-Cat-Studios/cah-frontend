<template>
    <Transition name="fade">
        <div
            v-show="showing"
            :class="showing && 'overflow-hidden'"
            class="fixed flex justify-center items-center w-screen h-screen bg-black bg-opacity-50 top-0 z-20"
            @click.self="close"
        >
            <div class="p-4 bg-white rounded-md">
                <a
                    aria-label="close"
                    class="cursor-pointer generic-modal-close"
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
