<template>
  <div class="">
    <h2 class="mb-5">Tournaments ({{ tournaments.totalCount }})</h2>
    <div class="row align-items-center">
      <div class="col-12 col-md-6">
        <label for="searchTerm" class="form-label">Search</label>
        <input
          id="searchTerm"
          class="ms-auto form-control"
          v-model="searchTerm"
          @input="handleSearch"
          placeholder="Search by name o game"
        />
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-sm align-middle mt-3">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Game</th>
            <th scope="col">Organizer</th>
            <th scope="col">Entry Fee</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tournament in tournaments.tournaments"
            :key="tournament.id"
          >
            <td>
              <p class="mb-1">{{ tournament.name }}</p>
              <small class="d-block text-capitalize">
                {{ tournament.format }} | {{ tournament.status }}</small
              >
              <small class="d-block">
                {{ formattedDate(tournament.dateTime) }}</small
              >
            </td>
            <td>{{ tournament.game }}</td>
            <td>{{ tournament.nameOrganizer }}</td>
            <td>{{ tournament.entryFee }}</td>
            <td>
              <div class="d-flex gap-1">
                <router-link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Participants"
                  :to="`/dashboard/tournament/${tournament.id}/configuration`"
                  class="btn btn-sm btn-primary"
                >
                  <i class="bi bi-people-fill"></i>
                </router-link>
                <a
                  class="btn btn-secondary btn-sm"
                  :href="`${clientUrl}/inscripcion/${tournament.name}/${tournament.id}/${tournament.game}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Open Information"
                >
                  <i class="bi bi-box-arrow-up-right"></i>
                </a>
                <button
                  @click="handleRemove(tournament.id)"
                  class="btn btn-sm btn-danger"
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav
      v-if="tournaments.totalCount > pageSize"
      class="mt-3"
      aria-label="Page navigation"
    >
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <button
            class="page-link"
            aria-label="Previous"
            @click="changePage(page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        <li
          v-for="pageNumber in Math.ceil(tournaments.totalCount / pageSize)"
          :key="pageNumber"
          class="page-item"
          :class="{ active: page === pageNumber }"
        >
          <button class="page-link" @click="changePage(pageNumber)">
            {{ pageNumber }}
          </button>
        </li>

        <li
          class="page-item"
          :class="{
            disabled: page === Math.ceil(tournaments.totalCount / pageSize),
          }"
        >
          <button
            class="page-link"
            aria-label="Next"
            @click="changePage(page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
    <div v-if="loading" class="mt-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import serverApi from "../../../services/server";
import { showAlert } from "../../../components/alerts/sweetAlert";
import { DateTime } from "luxon";
import { TournamentDto } from "../../../interface/tournament.dto";

const clientUrl = ref<string>(import.meta.env.VITE_CLIENT_URL);

const formattedDate = (dateTime: string) => {
  return DateTime.fromISO(dateTime).toLocaleString({
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

interface tournamentsData {
  tournaments: TournamentDto[];
  totalCount: number;
}

const tournaments = ref<tournamentsData>({
  tournaments: [],
  totalCount: 0,
});

const loading = ref(true);
let page = 1;
const pageSize = 10;
let searchTerm = "";

const fetchData = async () => {
  try {
    loading.value = true;
    const response = await serverApi.get(
      `/tournaments?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`
    );
    tournaments.value = response.data;
    loading.value = false;
  } catch (error) {
    console.error("Error al obtener participantes:", error);
    loading.value = false;
  }
};

const handleSearch = () => {
  page = 1;
  fetchData();
};
const handleRemove = async (id: number) => {
  await showAlert(
    {
      title: "Are you sure about this action?",
      message: "This action delete a tournament",
    },
    {
      method: "delete",
      url: `/tournaments/${id}`,
    }
  );
  await fetchData();
};

onMounted(() => {
  fetchData();
});

watch(
  () => page,
  () => {
    fetchData();
  }
);

const changePage = (newPage: number) => {
  if (
    newPage >= 1 &&
    newPage <= Math.ceil(tournaments.value.totalCount / pageSize)
  ) {
    page = newPage;
    fetchData();
  }
};
</script>

<style scoped></style>
