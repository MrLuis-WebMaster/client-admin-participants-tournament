<template>
  <div class="container my-5">
    <h2 class="mb-5">Participants ({{ participants.totalCount }})</h2>
    <div class="row align-items-center">
      <div class="col-12 col-md-6">
        <h6>Send Bulk emails</h6>
        <div class="d-flex flex-wrap gap-3">
          <button
            data-bs-toggle="modal"
            data-bs-target="#modalInvitationToGame"
            type="button"
            class="btn btn-outline-primary"
          >
            Invitation Game
          </button>
          <button
            @click="handleBulkEmails('reminder')"
            class="btn btn-outline-primary"
          >
            Reminder
          </button>
          <button
            @click="handleBulkEmails('feedback')"
            class="btn btn-outline-primary"
          >
            Feedback
          </button>
          <button
            @click="handleBulkEmails('thanks')"
            class="btn btn-outline-primary"
          >
            Thanks
          </button>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <label for="searchTerm" class="form-label">Search</label>
        <input
          id="searchTerm"
          class="ms-auto form-control"
          v-model="searchTerm"
          @input="handleSearch"
          placeholder="Search by name, email o phone"
        />
      </div>
    </div>
    <div class="table-responsive">
      <table class="table mt-3">
        <thead>
          <tr>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Payment</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="participant in participants.participants"
            :key="participant.id"
          >
            <td>{{ participant.fullName }}</td>
            <td>{{ participant.email }}</td>
            <td>{{ participant.phone }}</td>
            <td>
              <span v-if="participant.isPaid" class="badge text-bg-success"
                >Paid</span
              >
              <div v-else class="d-flex flex-wrap align-items-center">
                <div class="col-12 col-md-5 px-0">
                  <span class="badge text-bg-danger w-auto">has not paid</span>
                </div>
                <div class="col-12 col-md-5 px-0">
                  <button
                    @click="handleUpatePay(participant.id)"
                    class="btn btn-outline-success"
                  >
                    <i class="bi bi-send-check"></i>
                  </button>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex gap-1">
                <button
                  @click="handleRemove(participant.id)"
                  class="btn btn-danger"
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
      v-if="participants.totalCount > pageSize"
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
          v-for="pageNumber in Math.ceil(participants.totalCount / pageSize)"
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
            disabled: page === Math.ceil(participants.totalCount / pageSize),
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
    <div
      class="modal fade"
      id="modalInvitationToGame"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalInvitationToGameTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Send Invitation to Game
            </h5>
          </div>
          <div class="modal-body">
            <div>
              <div class="mb-3">
                <label for="urlInvitation" class="form-label">URL Game</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="invitationGame.urlInvitation"
                  id="urlInvitation"
                />
              </div>
              <div class="mb-3">
                <label for="idGame" class="form-label">ID Game</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="invitationGame.idGame"
                  id="idGame"
                />
              </div>
              <div class="mb-3">
                <label class="form-label" for="passwordGame"
                  >Password Game</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="invitationGame.passwordGame"
                  id="passwordGame"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button @click="handleBulkEmailsInvitation" type="button" class="btn btn-primary">Send Emails</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import serverApi from "../../services/server";
import { showAlert } from "./alerts/sweetAlert";

interface ParticipantDto {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  userName: string;
  userId: string;
  age: number;
  platform: string;
  isPaid: boolean;
}

interface ParticipantsData {
  participants: ParticipantDto[];
  totalCount: number;
}

const participants = ref<ParticipantsData>({
  participants: [],
  totalCount: 0,
});

const loading = ref(true);
let page = 1;
const pageSize = 10;
let searchTerm = "";
let invitationGame = {
  idGame: '',
  passwordGame: '',
  urlInvitation: ''
}

const fetchData = async () => {
  try {
    loading.value = true;
    const response = await serverApi.get(
      `/participants?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`
    );
    participants.value = response.data;
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
      message: "This action delete a participant",
    },
    {
      method: "delete",
      url: `/participants/${id}`,
    }
  );
  await fetchData();
};
const handleUpatePay = async (id: number) => {
  await showAlert(
    {
      title: "Are you sure about this action?",
      message: "This action confirm payment of participant",
    },
    {
      method: "put",
      url: `/participants/is-paid/${id}`,
    }
  );
  await fetchData();
};

const handleBulkEmails = async (type: string) => {
  await showAlert(
    {
      title: "Are you sure about this action?",
      message: "This action send bulk messages",
    },
    {
      method: "post",
      url: `/emails/${type}`,
    }
  );
};
const handleBulkEmailsInvitation = async () => {
  if (!invitationGame.idGame.length || !invitationGame.passwordGame.length || invitationGame.urlInvitation.length) {
    alert('All fields are required')
    return;
  }
  await showAlert(
    {
      title: "Are you sure about this action?",
      message: "This action send bulk messages",
    },
    {
      method: "post",
      url: '/emails/invitation',
      body: {
        ...invitationGame,
      }
    }
  );
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
    newPage <= Math.ceil(participants.value.totalCount / pageSize)
  ) {
    page = newPage;
    fetchData();
  }
};
</script>

<style scoped></style>
