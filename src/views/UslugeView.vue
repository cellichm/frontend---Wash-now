<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Environment variable to check if the URL should be from local or from real API.
const baseUrl = import.meta.env.DEV ? 'http://127.0.0.1:3000' : (import.meta.env.API_URL ?? 'https://mcellich-wash-now-backend.onrender.com');

const fetchDataPoint = async (slug) => {
	let items = [];

	try {
		const { data } = await axios.get(`${baseUrl}/${slug}`);

		if (data.status === 'ok') {
			items = data.data;
		} else {
			console.error('Error while fetching locations');

			return null;
		}

	} catch (error) {
		console.error(error);
		return null;
	}

	return items;
};


const washPrograms = ref([]);
const washSteps = ref([]);

const getNeededData = async () => {
	washPrograms.value = await fetchDataPoint('wash-programs');
	washSteps.value = await fetchDataPoint('wash-steps');
};

getNeededData();

const getStepName = (id) => washSteps.value.find((step) => step.id === id)?.description;

const getStepTotalTime = () => {
	let total = 0;

	washSteps.value.forEach((step) => {
		total += step.durationMinutes;
	});

	return total;
};

const getTotalPrice = () => {
	let total = 0;

	washSteps.value.forEach((step) => {
		total += step.price;
	});

	return total + 10;
};
</script>

<template>
	<h1 class="mb-5">Što nudimo</h1>

	<h2 class="mb-2">Premium pranje vozila</h2>
	<p>Naši programi pranja koriste najbolju auto-kozmetiku, moderne uređaje i najčišću vodu.</p>
	<p>Vaš limeni ljubimac će
		zablistati i izgledati kao novi!</p>

	<div class="d-flex flex-wrap gap-2 mb-5">
		<div class="card" v-for="program in washPrograms" :key="program.id" style="width: 24rem">
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
		<div class="card" v-for="step in washSteps" :key="step.id" style="width: 24rem">
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
