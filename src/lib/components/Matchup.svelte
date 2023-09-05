<script lang="ts">
    export let matchup: IFight;
  </script>
  
  <li>
    <a href={matchup.fighterA.link}>{matchup.fighterA.name}</a>
    <span>VS</span>
    <a href={matchup.fighterB.link}>{matchup.fighterB.name}</a>
  </li>