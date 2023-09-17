<script setup>
import { reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useRouter } from 'vue-router'

const router = useRouter();

const userData = reactive({ token: localStorage.getItem('washNowUserToken'), username: localStorage.getItem('washNowUserUsername'), });

const logout = () => {
	localStorage.removeItem('washNowUserToken');
	localStorage.removeItem('washNowUserUsername');
	router.push('/');
	userData.token = null;
	userData.username = null;
};
</script>

<template>
	<header>
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<RouterLink class="navbar-brand" to="/">🧽 WashNow</RouterLink>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavDropdown">
					<ul class="navbar-nav">
						<li class="nav-item">
							<RouterLink active-class="active" class="nav-link" aria-current="page" to="/">
								Usluge
							</RouterLink>
						</li>
						<li class="nav-item">
							<RouterLink active-class="active" class="nav-link" aria-current="page" to="/lokacije">
								Lokacije
							</RouterLink>
						</li>
						<li class="nav-item" v-if="userData.token?.length > 0">
							<RouterLink active-class="active" class="nav-link" aria-current="page" to="/moje-rezervacije">
								Moje rezervacije
							</RouterLink>
						</li>
						<li class="nav-item" v-if="userData.token?.length > 0">
							<RouterLink active-class="active" class="nav-link" aria-current="page" to="/rezerviraj">
								Rezerviraj termin
							</RouterLink>
						</li>
					</ul>

					<ul class="navbar-nav ms-auto">
						<li class="nav-item" v-if="userData.token?.length > 0">
							<span class="nav-link disabled">
								{{ userData.username }}
							</span>
						</li>
						<li class="nav-item" v-if="!userData.token">
							<RouterLink active-class="active" class="nav-link" aria-current="page" to="/prijava">
								Prijava
							</RouterLink>
						</li>
						<li class="nav-item" v-if="!userData.token">
							<RouterLink active-class="active" class="nav-link" aria-current="page" to="/registracija">
								Registracija
							</RouterLink>
						</li>
						<li class="nav-item" v-if="userData.token?.length > 0">
							<button @click.prevent="logout" class="nav-link">Odjava</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>

	<main class="container mt-4">
		<RouterView />
	</main>
</template>
