<script lang="ts">
	async function copyLink() {
		try {
			await navigator.clipboard.writeText(window.location.href);
			alert('Link copied, thanks for sharing!');
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}
</script>

<svelte:head>
	<meta property="og:type" content="article" />
</svelte:head>

<div class="blog-nav">
	<button on:click={() => window.history.back()}>🔙 </button>
	<button on:click={copyLink}>🔗</button>
</div>

<slot />
