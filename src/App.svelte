<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";

  import CardContainer from "./lib/CardContainer.svelte";
  import EventsBar from "./lib/EventsBar.svelte";

  import type { IData, IEvent } from "./types";

  let events: IEvent[] = [];
  let eventsIdx = 0;
  let showEvents = false;

  function toggleEvents() {
    showEvents = !showEvents;
  }

  function selectEvent(index: number) {
    eventsIdx = index;
  }

  onMount(async () => {
    const cache: string | null = localStorage.getItem("data");
    if (cache) {
      const cachedData: IData = JSON.parse(cache);
      const currentTime = Date.now();
      const updatedTime = new Date(cachedData.updatedAt).getTime();
      if (
        cachedData.data &&
        currentTime > updatedTime &&
        currentTime < updatedTime + 86400000
      ) {
        events = cachedData.data;
        return;
      }
    }
    const res = await axios.get("https://mmafightcardsapi.adaptable.app/");
    if (res?.data?.data) {
      localStorage.setItem("data", JSON.stringify(res.data));
      events = res.data.data;
    }
  });
</script>

<main>
  <CardContainer {eventsIdx} {events} {selectEvent} {toggleEvents} />
  <EventsBar {eventsIdx} {events} {selectEvent} {toggleEvents} {showEvents} />
</main>
