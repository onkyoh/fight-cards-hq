<script lang="ts">
	export let fighter: IFighter;

	const displayRecord = (record: string) => {
		const trimmedRecord = record.trim();
		return trimmedRecord && !isNaN(parseInt(trimmedRecord[0])) ? trimmedRecord : 'N/A';
	};

	const displayImage = (img: string) => {
		return fighter.picture.includes('https') ? img : '/fallbackFighter.gif';
	};
</script>

<a class="fighter" href={fighter.link}>
	<img src={displayImage(fighter.picture)} alt={fighter.name} />
	<div>
		{fighter.name}
		<div class="country-record">
			<img src={fighter.country} alt={fighter.name + ' country of origin'} />{displayRecord(
				fighter.record
			)}
		</div>
	</div>
</a>
