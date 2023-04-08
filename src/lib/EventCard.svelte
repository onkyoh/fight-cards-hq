<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { IEvent } from "../types";

  import ModeToggle from "./ModeToggle.svelte";
  import Matchup from "./Matchup.svelte";

  export let event: IEvent;
  export let toggleEvents: () => void;

  let timeLeft: number;

  function dateToMs(dateStr: string) {
    const dateArray = dateStr.split(" ");

    for (let i = 0; i < dateArray.length; i++) {
      if (dateArray[i] === "") {
        dateArray.splice(i, 1);
      }
    }

    const [weekday, monthStr, dayStr, timeStr, ofDay, tzStr] = dateArray;

    const month = new Date(Date.parse(`${monthStr} 1, 2000`)).getMonth();

    let [hours, minutes] = timeStr
      .split(":")
      .map((str: string) => parseInt(str));

    const day = parseInt(dayStr.replace(",", ""));

    if (ofDay === "PM") {
      hours += 12;
    }

    hours += 4; //ET to GMT

    const utcDate = new Date(Date.UTC(2023, month, day, hours, minutes));

    return utcDate.getTime();
  }

  const tick = () => {
    timeLeft -= 1000;
  };

  const timer = setInterval(tick, 1000);

  function formatTimer(duration) {
    if (!duration) return "TBD";
    let remaining = {
      seconds: Math.floor((duration / 1000) % 60),
      minutes: Math.floor((duration / (1000 * 60)) % 60),
      hours: Math.floor((duration / (1000 * 60 * 60)) % 24),
      days: Math.floor(duration / (1000 * 60 * 60 * 24)),
    };

    for (let time in remaining) {
      if (remaining[time] < 0) remaining[time] = 0;
    }

    return `${remaining.days}:${remaining.hours}:${remaining.minutes}:${remaining.seconds}`;
  }

  $: timeLeft = dateToMs(event.date) - new Date().getTime();

  onMount(() => {
    timeLeft = dateToMs(event.date) - new Date().getTime();
  });

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<header>
  <ModeToggle />
  <h3>{event.title}</h3>
  <button id="menu" on:click={toggleEvents}>🥊</button>
</header>

<h4>{event.date}</h4>
<h4 id="timer">{formatTimer(timeLeft)}</h4>
<ul>
  <h5>MAIN</h5>
  {#each event.fights.filter((fight) => fight.main) as fight}
    <Matchup matchup={fight} />
  {/each}
</ul>
{#if event.fights.filter((fight) => !fight.main).length > 0}
  <ul>
    <h5>PRELIMS</h5>
    {#each event.fights.filter((fight) => !fight.main) as fight}
      <Matchup matchup={fight} />
    {/each}
  </ul>
{/if}
