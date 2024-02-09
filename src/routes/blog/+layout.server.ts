import { error } from '@sveltejs/kit';
import type { Post } from './[slug]/+layout.server';

export type PostPreview = Omit<Post, 'content'>;

export async function load() {
	try {
		const module = await import('../../posts/posts.json');
		const posts: PostPreview[] = module.default as PostPreview[];

		return {
			posts: posts,
			title: 'Blog | FightCardsHQ',
			description:
				'The premier destination for in-depth analysis of recent fights and informed predictions on upcoming bouts, all from a perspective of a 0 stripe white belt who has only ever light sparred.'
		};
	} catch (e) {
		throw error(500, 'Could not retrieve blogs');
	}
}
