<template>
    <div class="relative inline-flex outline-none outline-none">
        <svg
            class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
        >
            <path
                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                fill="#648299"
                fill-rule="nonzero"
            />
        </svg>
        <select
            @change="change"
            :class="selectClass"
            class="outline-none py-1 pl-5 pr-10 appearance-none w-full"
        >
            <option
                class="text-gray-600"
                :key="key"
                :selected="selectedOption ? selectedOption === key : !key"
                :value="key"
                v-for="(option,key) in options"
            >
                {{option}}
            </option>
        </select>
    </div>
</template>
<script>
    export default {
        name: 'VueSelect',
        props: {
            options: [
                Object,
                Array
            ],
            selectedOption: [
                Number,
                String
            ]
        },
        methods: {
            change: function (event) {
                this.$emit('change', !isNaN(event.target.value) ? parseInt(event.target.value) : event.target.value)
            }
        },
        computed: {
            selectClass: function () {
                return !parseInt(this.selectedOption) ? 'text-gray-400' : 'text-gray-600'
            }
        }
    }
</script>
