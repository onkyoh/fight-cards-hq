import { writable } from 'svelte/store';

interface IEventStore {
	events: IEvent[] | null;
	eventsIdx: number;
}

const initialStore: IEventStore = {
	events: null,
	eventsIdx: 0
};

export const eventStore = writable<IEventStore>(initialStore);

export const selectEvent = (idx: number) => {
	eventStore.update((store) => {
		return { ...store, eventsIdx: idx };
	});
};

export const setEvents = ({
	eventsData,
	eventsIdx
}: {
	eventsData: IEvent[];
	eventsIdx: number;
}) => {
	eventStore.set({ events: eventsData, eventsIdx });
};
