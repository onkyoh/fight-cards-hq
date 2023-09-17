<script lang="ts">
	import '../lib/styles/app.css';

	import CardContainer from '../lib/components/CardContainer.svelte';
	import EventsBar from '../lib/components/EventsBar.svelte';

	/** @type {import('./$types').PageData} */

	export let data: IData;
	let eventsIdx = 0;
	let showEvents = false;

	function toggleEvents() {
		showEvents = !showEvents;
	}

	function selectEvent(index: number) {
		eventsIdx = index;
	}
</script>

<main>
	<CardContainer {eventsIdx} events={data.doc.data} {selectEvent} {toggleEvents} />
	<EventsBar {eventsIdx} events={data.doc.data} {selectEvent} {toggleEvents} {showEvents} />
</main>
