<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Environment variable to check if the URL should be from local or from real API.
const baseUrl = import.meta.env.DEV ? 'http://127.0.0.1:3000' : (import.meta.env.API_URL ?? 'https://mcellich-wash-now-backend.onrender.com');

const router = useRouter();

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

const existingUsers = ref([]);

const getNeededData = async () => {
	existingUsers.value = await fetchDataPoint('users');
};

getNeededData();

const userData = ref({
	username: null,
	password: null,
	email: null,
	car: {
		registration: null,
		type: null,
	},
});

const handleSubmit = async () => {
	if (existingUsers.value.find((user) => user.username === userData.value.username)) {
		alert('Korisničko ime je zauzeto.');
		return;
	}

	try {
		const response = await axios.post(`${baseUrl}/users`, JSON.stringify(userData.value), {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.data.status === 'ok') {
			alert('Uspješno ste se registrirali!');
			router.push('/prijava');
		} else {
			alert('Došlo je do greške prilikom registracije.');
		}
	} catch (error) {
		console.error(error);
		alert('Došlo je do greške prilikom registracije.');
	}
};
</script>

<template>
	<h1 class="mb-5">Registracija</h1>

	<form @submit.prevent="handleSubmit">
		<fieldset>
			<legend>Korisnik</legend>
			<div class="mb-3">
				<label class="form-label" for="username">Korisničko ime</label>
				<input type="text" class="form-control" id="username" v-model="userData.username">
			</div>

			<div class="mb-3">
				<label class="form-label" for="password">Lozinka</label>
				<input type="password" class="form-control" id="password" v-model="userData.password">
			</div>

			<div class="mb-3">
				<label class="form-label" for="email">E-mail</label>
				<input type="email" class="form-control" id="email" v-model="userData.email">
			</div>
		</fieldset>

		<fieldset>
			<legend>Vozilo</legend>

			<div class="mb-3">
				<label class="form-label" for="plate">Registarska oznaka</label>
				<input type="text" class="form-control" id="plate" v-model="userData.car.registration" placeholder="XX-XXXX-XX">
			</div>

			<div class="mb-3">
				<label class="form-label" for="car-type">Vrsta vozila</label>
				<input type="text" class="form-control" id="car-type" v-model="userData.car.type">
			</div>
		</fieldset>

		<button type="submit" class="btn btn-primary">Registriraj se</button>
	</form>
</template>
