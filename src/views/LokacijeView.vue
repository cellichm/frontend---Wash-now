<script setup>
const items = [
	{
		id: 'pula-city-mall',
		name: 'Pula City Mall',
		address: 'Ul. Rimske centurijacije 101, 52100, Pula',
		workHours: '0-24',
		contact: '+38552123456'
	},
	{
		id: 'pula-city-mall',
		name: 'Pula City Mall',
		address: 'Ul. Rimske centurijacije 101, 52100, Pula',
		workHours: '0-24',
		contact: '+38552123456'
	},
];
</script>

<template>
	<h1 class="mb-5">Naše lokacije</h1>

	<div class="d-flex flex-wrap gap-3">
		<div class="card" style="width: 24rem;" v-for="item in items" :key="item.id">
			<div class="card-body">
				<h5 class="card-title">{{ item.name }}</h5>
				<h6 class="card-subtitle mb-2 text-body-secondary">{{ item.address }}</h6>
				<p class="card-text">Kontakt: {{ item.contact }}</p>
				<a href="#" class="card-link">Card link</a>
				<a href="#" class="card-link">Another link</a>
			</div>

			<div class="card-footer">
				<p class="card-text">Otvoreno {{ item.workHours }}</p>
			</div>
		</div>
	</div>
</template>

