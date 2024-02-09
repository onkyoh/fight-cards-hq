<script lang="ts">
	export let fighter: IFighter;

	const displayRecord = (record: string) => {
		const trimmedRecord = record.trim();
		return trimmedRecord && !isNaN(parseInt(trimmedRecord[0])) ? trimmedRecord : 'N/A';
	};

	const displayImage = (img: string) => {
		return !fighter.picture || !fighter.picture.includes('https') ? '/fallbackFighter.gif' : img;
	};
</script>

<a class="fighter" href={fighter.link}>
	<img
		src={displayImage(fighter.picture)}
		alt={fighter.name}
		height="77"
		width="77"
		decoding="async"
	/>
	<div>
		{fighter.name}
		<div class="country-record">
			<img
				src={fighter.country}
				alt={fighter.name + ' country of origin'}
				decoding="async"
			/>{displayRecord(fighter.record)}
		</div>
	</div>
</a>
