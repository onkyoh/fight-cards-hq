<script lang="ts">
	import { onMount } from 'svelte';
	import type { PostPreview } from './+layout.server';

	export let data: {
		posts: PostPreview[];
	};

	let selectedTags: string[] = [];

	let uniqueTags = [...new Set(data.posts.flatMap((post) => post.tags))];

	$: filteredPosts =
		selectedTags.length > 0
			? data.posts.filter((post) => selectedTags.every((tag) => post.tags.includes(tag)))
			: data.posts;

	onMount(() => {
		localStorage.setItem('fightcardshq-newestblog', data.posts[0].title);
	});
</script>

<section class="blogs">
	<ul class="tags-list">
		{#each uniqueTags as tag}
			<li>
				<label class={`tags ${selectedTags.includes(tag) ? 'selected' : ''}`}>
					<input type="checkbox" bind:group={selectedTags} value={tag} hidden />
					{tag}
				</label>
			</li>
		{/each}
	</ul>

	<ul class="blog-list">
		{#each filteredPosts as post}
			<li class="blog">
				<a href={`/blog/${post.slug}`}>
					<picture>
						<source
							media="(max-width: 600px)"
							srcset={`/posts/${post.slug}/${post.img.src}-m.webp`}
							type="image/webp"
						/>

						<source
							media="(min-width: 601px)"
							srcset={`/posts/${post.slug}/${post.img.src}.webp`}
							type="image/webp"
						/>

						<img
							src={`/posts/${post.slug}/${post.img.src}`}
							alt={`${post.img.alt}`}
							height="400"
							width="600"
							decoding="async"
						/>
					</picture>

					<h2>{post.title}</h2>
					<span>Adnan Radwan | {post.date}</span>
					<p>{post.description}</p>
				</a>
				<hr />
			</li>
		{/each}
	</ul>
</section>
