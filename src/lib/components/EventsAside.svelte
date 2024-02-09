<script lang="ts">
	import { goto } from '$app/navigation';
	import { eventStore, selectEvent } from '../store/eventStore';
	let showEvents = false;
	function toggleEvents() {
		showEvents = !showEvents;
	}

	const formatDate = (date: string) => {
		const dateStr = date.split(' ');

		const newDate = `${dateStr[1]} ${dateStr[2] || dateStr[3]}`;
		return newDate.substring(0, newDate.length - 1);
	};

	async function handleEventSelection(index: number) {
		selectEvent(index);
		toggleEvents();
		await goto('/');
	}
</script>

<aside class={showEvents ? '' : 'close'}>
	<button id="events-open" aria-label="open events bar" on:click={toggleEvents}>📅</button>
	<button id="events-close" aria-label="close events bar" on:click={toggleEvents}>❌</button>

	{#if $eventStore.events && $eventStore.events.length > 0}
		<ul>
			{#each $eventStore.events as event, index}
				<li
					class={$eventStore.eventsIdx === index ? 'selected' : ''}
					on:click={() => handleEventSelection(index)}
					on:keydown
				>
					{formatDate(event.date)} - {event.title}
				</li>
			{/each}
		</ul>
	{/if}
</aside>
