
<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios';

// Environment variable to check if the URL should be from local or from real API.
const baseUrl = import.meta.env.DEV ? 'http://127.0.0.1:3000' : (import.meta.env.API_URL ?? 'https://mcellich-wash-now-backend.onrender.com');

const selected = ref({
	location: null,
	date: null,
	timeStart: null,
	washProgram: null,
	washSteps: [],
});

const router = useRouter();

const handleSubmit = async () => {
	const userToken = localStorage.getItem('washNowUserToken');

	if (!userToken) {
		return;
	}

	const item = {
		location: selected.value.location,
		date: selected.value.date?.toISOString().split('T')[0],
		timeStart: selected.value.timeStart,
		washProgram: selected.value.washProgram,
		washSteps: selected.value.washSteps,
		username: localStorage.getItem('washNowUserUsername'),
	};

	if (Object.values(item).some((value) => !value)) {
		alert('Forma sadrži greške, molimo provjerite.');
		return;
	}

	let timeEnd = new Date(`${item.date} ${item.timeStart}`);
	timeEnd.setMinutes(timeEnd.getMinutes() + (item.washProgram === '-1' ? item.washSteps.length * 15 : washPrograms.value.find((program) => program.id === item.washProgram)?.totalDurationMinutes));

	item.timeEnd = timeEnd.getHours().toString().padStart(2, '0') + ':' + timeEnd.getMinutes().toString().padStart(2, '0');

	try {

		const response = await axios.post(`${baseUrl}/reservations`, JSON.stringify(item), {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userToken}`,
			}
		});

		if (response.data.status === 'ok') {
			alert('Uspješno ste rezervirali termin!');
			router.push('/moje-rezervacije');
		} else {
			alert('Došlo je do greške prilikom rezervacije termina.');
		}
	} catch (error) {
		console.error(error);
		alert('Došlo je do greške prilikom rezervacije termina.');
	}

}

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

const locations = ref([]);
const reservations = ref([]);
const washPrograms = ref([]);
const washSteps = ref([]);

// Initialization.
const getNeededData = async () => {
	locations.value = await fetchDataPoint('locations');
	reservations.value = await fetchDataPoint('reservations');
	washPrograms.value = await fetchDataPoint('wash-programs');
	washSteps.value = await fetchDataPoint('wash-steps');
};

getNeededData();

const availableTimes = reactive([]);

const regenDayOptions = async () => {
	if (!selected?.value?.date || !selected?.value?.washProgram) {
		return [];
	}

	const selectedDate = selected.value?.date?.toISOString()?.split('T')[0];

	const reservationsOnTheDay = await fetchDataPoint(`reservations?date=${selectedDate}`);

	const takenTimes = reservationsOnTheDay.map((reservation) => ({ start: new Date(`${selectedDate} ${reservation.timeStart}`), end: new Date(`${selectedDate} ${reservation.timeEnd}`) }));

	const workingHours = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'];

	const freeSlots = workingHours.filter((hour) => {
		const currentSessionLengthMin =
			selected.value.washProgram === '-1'
				? selected.value.washSteps.length * 15
				: washPrograms.value.find((program) => program.id === selected.value.washProgram)?.totalDurationMinutes;

		const start = new Date(`${selectedDate} ${hour}`);

		const end = new Date(start);
		end.setMinutes(end.getMinutes() + currentSessionLengthMin);

		const isTaken = takenTimes.some((takenTime) => {
			return (start >= takenTime.start && start <= takenTime.end) || (end >= takenTime.start && end <= takenTime.end);
		});

		return !isTaken;
	});

	const result = freeSlots.map((slot) => ({ label: slot, value: slot }));

	availableTimes.value = result;
};

const formValid = ref(false);

watch(selected, () => {
	formValid.value = Object.values(selected.value).every((value) => value) && (selected.value.washProgram === '-1' ? selected.value.washSteps.length > 0 : true);
}, { deep: true })
</script>

<template>
	<h1 class="mb-5">Rezerviraj termin</h1>

	<div class="d-flex flex-wrap gap-3">
		<form @submit.prevent="handleSubmit">
			<div class="mb-3">
				<label class="form-label" for="loc">Lokacija</label>
				<select class="form-select" id="loc" v-model.trim="selected.location">
					<option disabled selected>Željena praonica</option>
					<option v-for="loc in locations" :value="loc.id">{{ loc.name }}</option>
				</select>
			</div>

			<div class="mb-3">
				<label class="form-label" for="washProgram">Program pranja</label>
				<select class="form-select" id="washProgram" v-model="selected.washProgram">
					<option disabled selected>Program pranja</option>
					<option v-for="prog in washPrograms" :value="prog.id">{{ prog.name }}</option>
					<option value="-1">Prilagođeno pranje</option>
				</select>
			</div>

			<div class="mb-3" v-if="selected.washProgram === '-1'">
				<label class="form-label" for="washSteps">Koraci pranja</label>
				<select class="form-select" id="washSteps" v-model="selected.washSteps" multiple>
					<option v-for="step in washSteps" :value="step.id">{{ step.description }}</option>
				</select>
				<span class="form-text">Držite Ctrl i kliknite za odabir više koraka</span>
			</div>

			<div class="mb-3">
				<label class="form-label">Dan</label>
				<VueDatePicker v-model="selected.date" inline auto-apply :min-date="new Date()" time-picker-inline
					s-24="true" :enable-time-picker="false" now-button-label="Danas" @update:model-value="regenDayOptions"
					:day-names="['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned']" />
			</div>

			<div class="mb-3">
				<label class="form-label" for="timePick">Vrijeme</label>
				<select class="form-select" v-model="selected.timeStart">
					<option disabled selected>Odabrite termin</option>
					<option v-for="slot in availableTimes.value" :value="slot.value">{{ slot.label }}</option>
				</select>
			</div>

			<button :disabled="!formValid" class="btn btn-primary">Rezerviraj</button>
		</form>
	</div>
</template>
