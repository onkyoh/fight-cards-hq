import {error} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load() {

    const res = await fetch("https://mmafightcardsapi.adaptable.app/")

    if (!res.ok) throw error(500, {
        message: 'Error, refresh page'
    });

    const doc = await res.json()

    return { doc }
}