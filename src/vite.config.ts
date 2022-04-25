import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		outDir: '../out/'
	},
	define: {
		'process.env': process.env
	}
})