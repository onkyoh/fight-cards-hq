<script lang="ts">
	import EventCard from './EventCard.svelte';
	import { eventStore, selectEvent } from '../store/eventStore';

	let startX: number | undefined;
	let endX: number | undefined;

	const onMouseDown = (e: MouseEvent) => {
		startX = e.offsetX;
	};

	const onMouseUp = (e: MouseEvent) => {
		if (startX && startX - e.offsetX > 50) {
			if ($eventStore.eventsIdx === $eventStore.events!.length - 1) return;
			selectEvent($eventStore.eventsIdx + 1);
		}
		if (startX && startX - e.offsetX < -50) {
			if ($eventStore.eventsIdx === 0) return;
			selectEvent($eventStore.eventsIdx - 1);
		}
		startX = undefined;
	};

	const onTouchDown = (e: TouchEvent) => {
		const container = e.target as HTMLElement;
		const rect = container.getBoundingClientRect();
		startX = e.touches[0].clientX - rect.left;
	};

	const onTouchMove = (e: TouchEvent) => {
		const container = e.target as HTMLElement;
		const rect = container.getBoundingClientRect();
		endX = e.touches[0].clientX - rect.left;
	};

	const onTouchEnd = (e: TouchEvent) => {
		if (startX && endX && startX - endX > 50) {
			if ($eventStore.eventsIdx === $eventStore.events!.length - 1) return;
			selectEvent($eventStore.eventsIdx + 1);
		}
		if (startX && endX && startX - endX < -50) {
			if ($eventStore.eventsIdx === 0) return;
			selectEvent($eventStore.eventsIdx - 1);
		}
		startX = undefined;
		endX = undefined;
	};
</script>

<div
	class="card-container"
	on:mousedown={onMouseDown}
	on:mouseup={onMouseUp}
	on:touchstart={onTouchDown}
	on:touchmove={onTouchMove}
	on:touchend={onTouchEnd}
>
	{#if $eventStore.events && $eventStore.events.length > 0}
		<div>
			{#each $eventStore.events as event, index}
				<span
					on:click={() => selectEvent(index)}
					on:keydown
					class={$eventStore.eventsIdx === index ? 'big' : ''}
					>{$eventStore.eventsIdx === index ? '●' : '•'}</span
				>
			{/each}
		</div>
		<EventCard event={$eventStore.events[$eventStore.eventsIdx]} />
	{/if}
</div>
