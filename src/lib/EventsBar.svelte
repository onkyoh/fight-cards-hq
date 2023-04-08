<script lang="ts">
  import type { IEvent } from "../types";

  export let events: IEvent[];
  export let eventsIdx: number;
  export let selectEvent: (index: number) => void;
  export let toggleEvents: () => void;
  export let showEvents: boolean;
</script>

<aside class={showEvents ? "" : "close"}>
  <button on:click={toggleEvents}>❌</button>

  <ul>
    {#each events as event, index}
      <li
        class={eventsIdx === index && "selected"}
        on:click={() => selectEvent(index)}
        on:keydown
      >
        {event.title}
      </li>
    {/each}
  </ul>
</aside>
