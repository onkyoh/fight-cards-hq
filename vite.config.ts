// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Radar from 'vite-plugin-radar';

export default defineConfig({
	plugins: [
		sveltekit(),
		Radar({
			analytics: {
				gtm: 'G-6Q7GSW5NYN'
			},
			defer: true
		})
	]
});
