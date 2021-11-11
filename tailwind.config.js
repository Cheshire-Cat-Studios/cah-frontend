module.exports = {
	purge: [
		'src/**/*.vue'
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			spacing: {
				'500': '500px',
			},
			inset: {
				'1/2': '50%',
			},
			fontSize: {
				'2xs': '0.5rem',
			},
			width: {
				'200': '50rem'
			},
		},
		variants: {
			extend: {
				negativeMargin: [
					'hover',
					'responsive',
				],
			},
		},
		plugins: [],
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
