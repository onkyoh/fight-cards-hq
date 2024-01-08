<script lang="ts">
	export let fighter: IFighter;

	const displayRecord = (record: string) => {
		const trimmedRecord = record.trim();
		return trimmedRecord && !isNaN(parseInt(trimmedRecord[0])) ? trimmedRecord : 'N/A';
	};
</script>

<a class="fighter" href={fighter.link}>
	<div class="name-picture">
		<img src={fighter.picture} alt={fighter.name} />
		{fighter.name}
	</div>

	<div class="country-record">
		<img src={fighter.country} alt={fighter.name + ' country of origin'} />{displayRecord(
			fighter.record
		)}
	</div>
</a>
