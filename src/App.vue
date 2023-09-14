<script setup>
import { RouterLink, RouterView } from 'vue-router'
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
								Home
							</RouterLink>
						</li>
						<li class="nav-item">
							<RouterLink active-class="active" class="nav-link" aria-current="page" to="/usluge">
								Usluge
							</RouterLink>
						</li>
						<li class="nav-item">
							<RouterLink active-class="active" class="nav-link" aria-current="page" to="/lokacije">
								Lokacije
							</RouterLink>
						</li>
					</ul>

					<ul class="navbar-nav ms-auto">
						<li class="nav-item">
							<RouterLink active-class="active" class="nav-link" aria-current="page" to="/korisnici">
								Korisnici
							</RouterLink>
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
