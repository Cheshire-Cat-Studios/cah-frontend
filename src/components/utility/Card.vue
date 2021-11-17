<template>
    <div
        :class="{
            'bg-black':!isWhite,
            'pointer-events-none opacity-50':!active,
            'bg-blue-600 text-white border-blue-600 -mt-6': selected,
        }"
        class="rounded select-none card relative border border-black p-4 shadow-xl w-40 h-64"
    >
        <p
            :class="!isWhite && 'text-white'"
            class="text-sm"
            v-html="cleanDescription"
        >
        </p>
        <div class="w-full absolute left-0 text-center bottom-0 mb-4">
            <card-logo
                class="mr-1 inline h-4 w-4"
                :is-white="isWhite && !selected"
            />
            <span
                :class="{
                   'bg-black text-white': isWhite,
                   'bg-white text-black': !isWhite,
                   'bg-white text-blue-600':selected,
                 }"
                class="text-2xs p-1"
            >
              Cards Against Humanity&trade;
            </span>
        </div>
    </div>

</template>
<script>
import CardLogo from './CardLogo.vue'

export default {
	name: 'Card',
	components: {
		'card-logo': CardLogo
	},
	props: {
		isWhite: {
			required: true,
			type: Boolean,
		},
		description: {
			required: true,
			type: String,
		},
		active: {
			required: false,
			type: Boolean,
			default: true,
		},
		selected: {
			required: false,
			type: Boolean,
			default: false,
		}
	},
	computed: {
		cleanDescription() {
			const underscoreHtml = '<span class="border-b-2 border-white inline-block w-16 mr-2" style=""></span>'

			return this.isWhite
				? this.description
				: this.description.replace(/_/g, underscoreHtml)
		}
	}
}
</script>
