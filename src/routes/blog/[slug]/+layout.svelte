<script lang="ts">
	import { page } from '$app/stores';

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(window.location.href);
			alert('Link copied to clipboard!');
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}
</script>

<svelte:head>
	<title>{$page.data.title} | FightCardsHQ</title>

	<meta property="og:title" content={$page.data.title} />
	<meta property="og:description" content={$page.data.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://fightcardshq.com/blog/${$page.data.slug}`} />
	<meta property="og:image" content={`/src/posts/ufc-298-prediction/${$page.data.img.src}`} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={$page.data.title} />
	<meta name="twitter:description" content={$page.data.description} />
	<meta name="twitter:image" content={`/src/posts/ufc-298-prediction/${$page.data.img.src}`} />
</svelte:head>

<div class="blog-nav">
	<button on:click={() => window.history.back()}>🔙 </button>
	<button on:click={copyLink}>🔗</button>
</div>

<slot />
