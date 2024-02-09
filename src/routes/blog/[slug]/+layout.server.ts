import { error } from '@sveltejs/kit';

export interface Post {
	title: string;
	slug: string;
	description: string;
	date: string;
	content: string;
	tags: string[];
	img: {
		src: string;
		alt: string;
	};
}

export async function load({ params }) {
	try {
		const module = await import(`../../../posts/${params.slug}.json`);
		const post: Post = module.default as Post;

		return {
			...post
		};
	} catch (e) {
		throw error(404, 'Blog not found');
	}
}
