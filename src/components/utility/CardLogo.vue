<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :fill="isWhite?'#000000':'#FFFFFF'"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enable-background="new 0 0 100 100"
        xml:space="preserve"
    >
        <path
            :fill="isWhite?'#000000':'#FFFFFF'"
            d="M94.021,11.858c-0.303-0.386-0.737-0.63-1.222-0.689l-49.98-6.022c-0.037-0.004-0.182-0.013-0.219-0.013  c-0.927,0-1.71,0.694-1.821,1.615l-1.017,8.439L7.081,27.119c-0.46,0.168-0.827,0.505-1.033,0.95  c-0.207,0.445-0.228,0.943-0.061,1.402l23.482,64.323c0.263,0.721,0.956,1.205,1.725,1.205c0.214,0,0.425-0.037,0.627-0.111  l37.895-13.835l14.455,1.741c0.037,0.004,0.182,0.013,0.219,0.013c0.927,0,1.71-0.694,1.821-1.615l8.191-67.985  C94.459,12.723,94.325,12.243,94.021,11.858z M31.214,93.117L7.722,28.877l31.793-11.633l-6.926,57.49  c-0.121,1.004,0.598,1.919,1.601,2.04l31.422,3.785L31.214,93.117z"
        />
    </svg>
</template>
<script>
export default {
	name: 'CardLogo',
	props: {
		isWhite: Boolean,
	}
}
</script>
