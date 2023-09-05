<script lang="ts">
  
    export let events: IEvent[];
    export let eventsIdx: number;
    export let selectEvent: (index: number) => void;
    export let toggleEvents: () => void;
    export let showEvents: boolean;
  
    const formatDate = (date: string) => {
      const dateStr = date.split(" ");
      const newDate = `${dateStr[1]} ${dateStr[2]}`;
      return newDate.substring(0, newDate.length - 1);
    };
  </script>
  
  <aside class={showEvents ? "" : "close"}>
    <button on:click={toggleEvents}>❌</button>
  
    <ul>
      {#each events as event, index}
        <li
          class={eventsIdx === index ? "selected" : ""}
          on:click={() => {
            selectEvent(index);
            toggleEvents();
          }}
          on:keydown
        >
          {formatDate(event.date)} - {event.title}
        </li>
      {/each}
    </ul>
  </aside>