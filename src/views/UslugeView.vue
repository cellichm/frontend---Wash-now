<script setup>
const getStepName = (id) => steps.find((step) => step.id === id).description || null;

const getStepTotalTime = (stepIds) => {
	let total = 0;

	steps.forEach((step) => {
		total += step.durationMinutes;
	});

	return total;
};

const getTotalPrice = (stepIds) => {
	let total = 0;

	steps.forEach((step) => {
		total += step.price;
	});

	return total + 10;
};

const steps = [
	{
		id: 1,
		description: "Ispiranje običnom vodom",
		durationMinutes: 5,
		price: 1
	},
	{
		id: 3,
		description: "Ispiranje demineraliziranom vodom",
		durationMinutes: 5,
		price: 2
	},
	{
		id: 2,
		description: "Pranje pjenom",
		durationMinutes: 15,
		price: 1
	},
	{
		id: 4,
		description: "Vosak",
		durationMinutes: 30,
		price: 2
	},
	{
		id: 5,
		description: "Pranje interijera",
		durationMinutes: 45,
		price: 4
	}
];

const programs = [
	{
		id: 1,
		name: "Standardno pranje",
		steps: [1, 2, 4],
	},
	{
		id: 4,
		name: "Dubinsko pranje",
		steps: [1, 2, 2, 4],
	},
	{
		id: 2,
		name: "Ispiranje + vosak",
		steps: [1, 4],
	},
];
</script>

<template>
	<h1 class="mb-5">Što nudimo</h1>

	<h2 class="mb-2">Premium pranje vozila</h2>
	<p>Naši programi pranja koriste najbolju auto-kozmetiku, moderne uređaje i najčišću vodu.</p>
	<p>Vaš limeni ljubimac će
		zablistati i izgledati kao novi!</p>

	<div class="d-flex flex-wrap gap-2 mb-5">
		<div class="card" v-for="program in programs" :key="program.id" style="width: 24rem">
			<div class="card-header">{{ program.name }}</div>
			<ul class="list-group list-group-flush">
				<li v-for="step in program.steps" class="list-group-item">{{ getStepName(step) }}</li>
			</ul>
			<div class="card-footer">
				<p class="card-text">
					Trajanje: {{ getStepTotalTime(program.steps) }}min
				</p>
				<p class="card-text">
					Cijena: {{ getTotalPrice(program.steps) }}€
				</p>
			</div>
		</div>
	</div>

	<h2 class="mb-2">Pojedinačni programi pranja</h2>
	<p>Ako ne trebate potpuni program pranja, možete odabrati pojedinačni program.</p>
	<p>Ispod su izlistani svi naši programi, koliko tokena (1 token = 1€) je potrebno za taj program, te koliko traje.</p>

	<div class="d-flex flex-wrap gap-2">
		<div class="card" v-for="step in steps" :key="step.id" style="width: 24rem">
			<div class="card-header">
				{{ step.description }}
			</div>
			<ul class="list-group list-group-flush">
				<li class="list-group-item">{{ step.durationMinutes }} minuta</li>
				<li class="list-group-item">Tokena potrebno: {{ step.price }}</li>
			</ul>
		</div>
	</div>
</template>

