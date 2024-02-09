<script lang="ts">
	import type { Post } from './+layout.server';

	export let data: Post;
</script>

<article class="blog">
	<header>
		<picture>
			<source
				media="(max-width: 600px)"
				srcset={`/posts/${data.slug}/${data.img.src}-m.webp`}
				type="image/webp"
			/>

			<source
				media="(min-width: 601px)"
				srcset={`/posts/${data.slug}/${data.img.src}.webp`}
				type="image/webp"
			/>

			<img
				src={`/src/posts/${data.slug}/${data.img.src}`}
				alt={`${data.img.alt}`}
				height="400"
				width="600"
				decoding="async"
			/>
		</picture>

		<h1>{data.title.substring(0, data.title.length - ' | FightCardsHQ'.length)}</h1>

		<span>Adnan Radwan | {data.date}</span>
	</header>

	<hr />

	{@html data.content}
</article>
