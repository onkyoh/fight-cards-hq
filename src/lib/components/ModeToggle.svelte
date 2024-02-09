<script lang="ts">
	import { onMount } from 'svelte';

	let mode: string | null;

	onMount(() => {
		mode = localStorage.getItem('fightcardshq-mode');
	});

	function toggle() {
		window.document.body.classList.toggle('dark-mode');
		localStorage.setItem('fightcardshq-mode', window.document.body.className);
		mode = window.document.body.className;
	}
</script>

<button on:click={toggle}>{mode === 'dark-mode' ? '☀️' : '🌑'}</button>
