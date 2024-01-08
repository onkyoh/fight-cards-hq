<script lang="ts">
	import Fighter from './Fighter.svelte';

	export let matchup: IFight;
</script>

<li>
	<Fighter fighter={matchup.fighterA} />

	<span class="weight">{matchup.weight}</span>

	<Fighter fighter={matchup.fighterB} />
</li>
