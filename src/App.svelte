<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";

  import CardContainer from "./lib/CardContainer.svelte";
  import EventsBar from "./lib/EventsBar.svelte";

  import type { IEvent } from "./types";

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
    const cachedData: string = localStorage.getItem("data");
    if (cachedData) {
      events = JSON.parse(cachedData);
    }
    const res = await axios.get("https://mmafightcardsapi.adaptable.app/");
    if (res?.data?.data) {
      localStorage.setItem("data", JSON.stringify(res.data.data));
      events = res.data.data;
    }
  });
</script>

<main>
  <CardContainer {eventsIdx} {events} {selectEvent} {toggleEvents} />
  <EventsBar {eventsIdx} {events} {selectEvent} {toggleEvents} {showEvents} />
</main>
