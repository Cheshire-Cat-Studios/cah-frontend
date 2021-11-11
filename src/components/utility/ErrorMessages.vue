<template>
    <div v-if="show">
        <p
            v-for="message in messages"
            class="text-red-600"
        >
            {{ message }}
        </p>
    </div>
</template>
<script>
    export default {
        name: 'ErrorMessages',
        props: {
            show: {
            	type: Boolean,
                required: true,
            },
            messages: {
				type: String,
				required: true,
            }
        }
    }
</script>
