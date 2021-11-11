<template>
    <span
        @click="change"
        :class="wrapperClass"
        class="border rounded-full flex items-center cursor-pointer w-12"
    >
        <span
            :class="insideClass"
            class="rounded-full border w-6 h-6 shadow-inner shadow"
        >
        </span>
    </span>
</template>
<script>
    export default {
        name: 'VueSwitch',
        props: {
            checked: Boolean
        },
        computed: {
            wrapperClass: function () {
                return {
                    'border-white  bg-black justify-end': this.checked,
                    'border-black  bg-white justify-start': !this.checked
                }
            },
            insideClass: function () {
                return {
                    'bg-white border-black': this.checked,
                    'bg-black border-white': !this.checked
                }
            }
        },
        methods: {
            change: function () {
                this.$emit('change', !this.checked)
            }
        }
    }
</script>
