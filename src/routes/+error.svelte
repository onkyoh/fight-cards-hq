<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	<h1>{$page.status} | {$page.error?.message}</h1>
	<p><a href="/">View Upcoming Fights</a> or <a href="/blog">Check out the blog</a></p>
</div>

<style>
	div {
		margin: auto;
		width: fit-content;

		text-align: center;
	}
	h1 {
		font-size: 2.5rem;
	}
</style>
