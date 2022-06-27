import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default ({mode}) => {
	const env = {...process.env, ...loadEnv(mode, process.cwd())}

	return defineConfig({
		plugins: [vue()],
		server: {
			proxy: {
				// Proxying websockets or socket.io
				'/socket.io': {
					target: `ws://${process.env.HTTP_PROXY}`,
					ws: true
				}
			},
			host: true,
			secure: false,
			port: env.VITE_PORT,
		},
	})
}
