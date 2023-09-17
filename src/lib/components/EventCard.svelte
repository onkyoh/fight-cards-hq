<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import ModeToggle from './ModeToggle.svelte';
	import Matchup from './Matchup.svelte';

	export let event: IEvent;
	export let toggleEvents: () => void;

	let timeLeft: number;

	function dateToMs(dateStr: string) {
		const dateArray = dateStr.split(' ').filter((idx) => idx !== '');

		let eventDate = {
			year: 0,
			month: 0,
			date: 0,
			hour: 0,
			minute: 0
		};

		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		//month
		eventDate.month = months.indexOf(dateArray[1]);

		//year
		new Date().getMonth() <= eventDate.month
			? (eventDate.year = new Date().getFullYear())
			: (eventDate.year = new Date().getFullYear() + 1);

		//date
		eventDate.date = parseInt(dateArray[2].slice(0, -1));

		let hour: number | string[] = dateArray[3].split(':');
		//minute
		eventDate.minute = parseInt(hour[1]);

		//hour
		hour = parseInt(hour[0]);

		dateArray[4] === 'PM' || (hour === 12 && dateArray[4] === 'AM')
			? (eventDate.hour = hour + 12)
			: (eventDate.hour = hour);

		return new Date(
			eventDate.year,
			eventDate.month,
			eventDate.date,
			eventDate.hour,
			eventDate.minute
		).getTime();
	}

	const tick = () => {
		timeLeft -= 1000;
	};

	const timer = setInterval(tick, 1000);

	function formatTimer(duration: number) {
		if (!duration) return 'TBD';
		let remaining = {
			seconds: Math.floor((duration / 1000) % 60),
			minutes: Math.floor((duration / (1000 * 60)) % 60),
			hours: Math.floor((duration / (1000 * 60 * 60)) % 24),
			days: Math.floor(duration / (1000 * 60 * 60 * 24))
		};

		for (let time in remaining) {
			if (remaining.hasOwnProperty(time)) {
				if (remaining[time as keyof typeof remaining] < 0) {
					remaining[time as keyof typeof remaining] = 0;
				}
			}
		}

		return `${remaining.days}:${remaining.hours}:${remaining.minutes}:${remaining.seconds}`;
	}

	$: timeLeft = dateToMs(event.date) - new Date().getTime();

	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<header>
	<ModeToggle />
	<h3>{event.title}</h3>
	<button id="menu" on:click={toggleEvents}>🥊</button>
</header>

<h4>{event.date}</h4>
<h4 id="timer">{formatTimer(timeLeft)}</h4>
<h5>MAIN</h5>
<ul>
	{#each event.fights.filter((fight) => fight.main) as fight}
		<Matchup matchup={fight} />
	{/each}
</ul>
{#if event.fights.filter((fight) => !fight.main).length > 0}
	<h5>PRELIMS</h5>
	<ul>
		{#each event.fights.filter((fight) => !fight.main) as fight}
			<Matchup matchup={fight} />
		{/each}
	</ul>
{/if}
