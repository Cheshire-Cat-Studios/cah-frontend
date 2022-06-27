import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default ({mode}) => {
	const env = {...process.env, ...loadEnv(mode, process.cwd())}

	return defineConfig({
		plugins: [vue()],
		server: {
			hmr: {
				clientPort: 80,
				port: 80 // vite@2.5.2 and newer: clientPort
			}
		}
	})
}
