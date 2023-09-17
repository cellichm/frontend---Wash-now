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

const reservations = ref([]);
const washPrograms = ref([]);
const washSteps = ref([]);
const locations = ref([]);

const getNeededData = async () => {
	reservations.value = await fetchDataPoint('reservations');
	washPrograms.value = await fetchDataPoint('wash-programs');
	washSteps.value = await fetchDataPoint('wash-steps');
	locations.value = await fetchDataPoint('locations');
};

getNeededData();

const deleteReservation = async (id) => {
	try {
		const response = await axios.delete(`${baseUrl}/reservation/${id}`);

		if (response.data.status === 'ok') {
			alert('Uspješno ste otkazali termin!');

			reservations.value = reservations.value.filter((reservation) => reservation._id !== id);
		} else {
			alert('Došlo je do greške prilikom otkazivanja termina.');
		}
	} catch (error) {
		console.error(error);
		alert('Došlo je do greške prilikom otkazivanja termina.');
	}
}
</script>

<template>
	<h1 class="mb-5">Dobro došli u WashNow</h1>

	<h2 class="mb-3">Rezervacije</h2>
	<div class="d-flex flex-wrap gap-2 mb-5">
		<div class="card" v-for="reservation in reservations" :key="reservation.id" style="width: 24rem">
			<div class="card-header">{{ new Date(reservation.date).toLocaleDateString() }} <br /> {{ reservation.timeStart
			}} - {{ reservation.timeEnd }} <br /> {{ locations.find((loc) => loc.id === reservation.location)?.name }}
			</div>
			<div class="card-body">
				<div class="card-text">{{ reservation.washProgram === '-1' ? 'Prilagođeno pranje' : washPrograms.find((prog) => prog.id === reservation.washProgram)?.name }}</div>
			</div>
			<div class="card-footer">
				<button class="btn btn-sm btn-danger" @click="deleteReservation(reservation._id)">Otkaži</button>
			</div>
		</div>
	</div>
</template>
