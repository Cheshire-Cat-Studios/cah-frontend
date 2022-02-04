import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default ({mode}) => {
	const env = {...process.env, ...loadEnv(mode, process.cwd())}

	return defineConfig({
		plugins: [vue()],
		server: {
			host: true,
			port: env.VITE_PORT,
		},
	})
}
