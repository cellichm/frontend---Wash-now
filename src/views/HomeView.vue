<script setup>
const reservations = [
	{
		id: 1,
		location: "pula-city-mall",
		user: "mcellich",
		date: "2023-09-10",
		timeStart: "11:00",
		timeEnd: "11:50",
		washProgram: 1
	},
];
</script>

<template>
	<h1 class="mb-5">Dobro došli u WashNow</h1>

	<h2 class="mb-3">Rezervacije</h2>
	<div class="d-flex flex-wrap gap-2 mb-5">
		<div class="card" v-for="reservation in reservations" :key="reservation.id" style="width: 24rem">
			<div class="card-header">{{ reservation.date }} {{ reservation.timeStart }} - {{ reservation.timeEnd }}</div>
			<div class="card-body">
				<div class="card-text">{{ reservation.washProgram }}</div>
			</div>
		</div>
	</div>
</template>
