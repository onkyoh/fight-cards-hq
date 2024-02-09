<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.data.title} | FightCardsHQ</title>
</svelte:head>

<slot />
