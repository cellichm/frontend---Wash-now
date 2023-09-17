<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

// Environment variable to check if the URL should be from local or from real API.
const baseUrl = import.meta.env.DEV ? 'http://127.0.0.1:3000' : '';

const router = useRouter();

const userData = ref({
	username: null,
	password: null,
});

const handleSubmit = async () => {
	try {
		const response = await axios.post(`${baseUrl}/auth`, JSON.stringify(userData.value), {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.data.status === 'ok' && response.data.data !== 'Authentication failed.') {
			const token = response.data.data.token;

			localStorage.setItem('washNowUserToken', token);
			localStorage.setItem('washNowUserUsername', userData.value.username);

			router.push('/moje-rezervacije');
			setTimeout(() => {
				router.go();
			}, 250);
		} else {
			alert('Došlo je do greške prilikom prijave.');
		}
	} catch (error) {
		console.error(error);
		alert('Došlo je do greške prilikom prijave.');
	}
};
</script>

<template>
	<h1 class="mb-5">Prijava</h1>

	<form @submit.prevent="handleSubmit">
		<div class="mb-3">
			<label class="form-label" for="username">Korisničko ime</label>
			<input type="text" class="form-control" id="username" v-model="userData.username">
		</div>

		<div class="mb-3">
			<label class="form-label" for="password">Lozinka</label>
			<input type="password" class="form-control" id="password" v-model="userData.password">
		</div>

		<button type="submit" class="btn btn-primary">Prijavi se</button>
	</form>
</template>
