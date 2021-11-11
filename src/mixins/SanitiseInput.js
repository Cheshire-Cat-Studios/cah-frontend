export default {
    methods: {
        sanitiseInput(event) {
            event.target.value = event.target.value.trim()
        }
    }
};