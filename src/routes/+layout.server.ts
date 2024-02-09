import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	const res = await fetch('https://mmafightcardsapi.adaptable.app/');

	if (!res.ok) {
		throw error(500, 'Error, try refreshing');
	}

	const { data } = await res.json();
	return {
		data,
		title: 'FightCardsHQ',
		description:
			'Discover the latest upcoming MMA events from multiple organizations in one convenient place. Our website aggregates fight cards and presents them in a clean, easy-to-use format, so you never miss a fight. Stay up-to-date on the latest match-ups and fight cards with our comprehensive event listings.'
	};
}
