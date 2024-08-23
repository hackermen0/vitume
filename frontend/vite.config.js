import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */

export default {
	plugins: [sveltekit()],
	build : {
		target: "esnext"
	},
	ssr: {
		noExternal: ["svelte-hero-icons"],
	}
};

