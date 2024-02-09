<script lang="ts">
	import { eventStore, setEvents } from '$lib/store/eventStore';

	import ModeToggle from '$lib/components/ModeToggle.svelte';
	import EventsAside from '$lib/components/EventsAside.svelte';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let newerBlog = false;

	onMount(() => {
		const mode = localStorage.getItem('fightcardshq-mode');
		const newestBlog = localStorage.getItem('fightcardshq-newestblog');
		if (mode === 'dark-mode') {
			window.document.body.classList.add('dark-mode');
		}
		if (newestBlog && newestBlog === 'UFC 298: Volkanovski vs. Topuria Prediction') {
			newerBlog = true;
		}
	});

	$: if ($page.data.data) {
		setEvents({ eventsData: $page.data.data, eventsIdx: $eventStore.eventsIdx || 0 });
	}
</script>

<svelte:head>
	<title>{$page.data.title}</title>

	<meta name="description" content={$page.data.description} />

	<meta property="og:title" content={$page.data.title} />

	<meta property="og:description" content={$page.data.description} />
	<meta property="og:url" content={`https://fightcardshq.com${$page.url.pathname}`} />
	<meta
		property="og:image"
		content={$page.data?.img?.src
			? `/posts/ufc-298-prediction/${$page.data.img.src}`
			: '/android-chrome-512x512.png'}
	/>

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={$page.data.title} />
	<meta name="twitter:description" content={$page.data.description} />
	<meta
		name="twitter:image"
		content={$page.data?.img?.src
			? `/posts/ufc-298-prediction/${$page.data.img.src}`
			: '/android-chrome-512x512.png'}
	/>
	<link rel="stylesheet" href="/styles/app.css" />
</svelte:head>

<main>
	<slot />
	<EventsAside />

	<nav>
		<ul>
			<li>
				<a href="/" style={$page.url.pathname === '/' ? 'text-decoration: underline;' : ''}
					>Upcoming</a
				>
			</li>
			<li>
				<a
					href="/blog"
					style={$page.url.pathname.includes('/blog') ? 'text-decoration: underline;' : ''}
					>Blog{newerBlog ? '' : '❗️'}</a
				>
			</li>
			<li>
				<ModeToggle />
			</li>
		</ul>
	</nav>
</main>
