<script setup>
const items = [
	{
		username: "mcellich",
		email: "mcellich@email.com",
		car: {
			type: "BMW Series 3 2018",
			registration: "PU123NO"
		}
	}
];
</script>

<template>
	<h1 class="mb-5">Svi korisnici</h1>

	<div class="d-flex flex-wrap gap-3">
		<div class="card" style="width: 24rem;" v-for="item in items" :key="item.username">
			<div class="card-body">
				<h5 class="card-title mb-4">{{ item.username }}</h5>

				<h6 class="card-subtitle mb-2 text-body-secondary">Vozilo</h6>
				<p class="card-text">{{ item.car.type }} ({{ item.car.registration }})</p>
			</div>

			<div class="card-footer">
				<p class="card-text">Kontakt e-mail: <a :href="`mailto:${item.email}`">{{ item.email }}</a></p>
			</div>
		</div>
	</div>
</template>

