<script lang="ts">
	import EventCard from './EventCard.svelte';
	import { eventStore, selectEvent } from '../store/eventStore';

	let startX: number | undefined;
	let currentX: number = 0;
	let dragging = false;

	const maxTranslation = 160; // Example max translation distance in pixels

	const onTouchStart = (e: TouchEvent) => {
		const touch = e.touches[0];
		startX = touch.clientX;
		dragging = true;
	};

	const onTouchMove = (e: TouchEvent) => {
		if (startX === undefined || !dragging) return;

		const touch = e.touches[0];
		let moveX = touch.clientX - startX;

		// Clamping moveX to within the maxTranslation bounds
		moveX = Math.max(Math.min(moveX, maxTranslation), -maxTranslation);

		// Prevent moving left if at the last event
		if ($eventStore.eventsIdx === $eventStore.events!.length - 1 && moveX < 0) {
			moveX = 0;
		}

		// Prevent moving right if at the first event
		if ($eventStore.eventsIdx === 0 && moveX > 0) {
			moveX = 0;
		}

		currentX = moveX;
	};

	const onTouchEnd = () => {
		if (startX !== undefined && currentX !== 0) {
			console.log(currentX);
			// Right swipe (previous event) - Check if not at the first item
			if (currentX >= maxTranslation && $eventStore.eventsIdx > 0) {
				selectEvent($eventStore.eventsIdx - 1);
			}
			// Left swipe (next event) - Check if not at the last item
			else if (
				currentX <= -maxTranslation &&
				$eventStore.eventsIdx < $eventStore.events!.length - 1
			) {
				selectEvent($eventStore.eventsIdx + 1);
			}
		}

		// Reset currentX to 0 instead of undefined for correct reset
		currentX = 0;
		dragging = false;
	};
</script>

<div
	class="card-container"
	style="transition: transform 0.3s ease-out; transform: translateX({-70 < currentX && currentX < 70
		? 0
		: currentX}px);"
	on:touchstart={onTouchStart}
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
		<span class="swipe-titles">Previous Card</span>
		<EventCard event={$eventStore.events[$eventStore.eventsIdx]} />
		<span class="swipe-titles">Next Card </span>
	{/if}
</div>
