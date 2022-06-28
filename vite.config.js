import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({mode}) => {
	const env = {...process.env, ...loadEnv(mode, process.cwd())},
		server = {}

	env.VITE_PORT
	&& (server.port = env.VITE_PORT)

	env.VITE_HTTP_PROXY
	&& (server.hmr = {
		clientPort: env.VITE_HTTP_PROXY,
		port: env.VITE_HTTP_PROXY // vite@2.5.2 and newer: clientPort
	})

	return defineConfig({
		plugins: [vue()],
		server
	})
}
