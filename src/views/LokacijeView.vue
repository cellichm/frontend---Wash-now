<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Environment variable to check if the URL should be from local or from real API.
const baseUrl = import.meta.env.DEV ? 'http://127.0.0.1:3000' : '';

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


const items = ref([]);

const getNeededData = async () => {
	items.value = await fetchDataPoint('locations');
};

getNeededData();
</script>

<template>
	<h1 class="mb-5">Naše lokacije</h1>

	<div class="d-flex flex-wrap gap-3">
		<div class="card" style="width: 24rem;" v-for="item in items" :key="item.id">
			<div class="card-body">
				<h5 class="card-title">{{ item.name }}</h5>
				<h6 class="card-subtitle mb-2 text-body-secondary">{{ item.address }}</h6>
				<p class="card-text">Kontakt: {{ item.contact }}</p>
			</div>

			<div class="card-footer">
				<p class="card-text">Otvoreno {{ item.workHours }}</p>
			</div>
		</div>
	</div>
</template>
