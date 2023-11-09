<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group mb-3">
      <label for="name">Tournament Name:</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="formValues.name"
      />
      <div class="text-danger">{{ formErrors.name }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="game">Game:</label>
      <input
        type="text"
        class="form-control"
        id="game"
        v-model="formValues.game"
      />
      <div class="text-danger">{{ formErrors.game }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="format">Format:</label>
      <input
        type="text"
        class="form-control"
        id="format"
        v-model="formValues.format"
      />
      <div class="text-danger">{{ formErrors.format }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="dateTime">Date and Time:</label>
      <input
        type="datetime-local"
        class="form-control"
        id="dateTime"
        :min="getCurrentDateTime()"
        v-model="formValues.dateTime"
      />
      <div class="text-danger">{{ formErrors.dateTime }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="description">Description:</label>
      <textarea
        class="form-control"
        id="description"
        v-model="formValues.description"
      ></textarea>
      <div class="text-danger">{{ formErrors.description }}</div>
      <Editor/>
    </div>

    <div class="form-group mb-3">
      <label for="entryFee">Entry Fee:</label>
      <input
        type="number"
        class="form-control"
        id="entryFee"
        v-model="formValues.entryFee"
      />
      <div class="text-danger">{{ formErrors.entryFee }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="prizes">Prizes:</label>
      <input
        type="text"
        class="form-control"
        id="prizes"
        v-model="formValues.prizes"
      />
      <div class="text-danger">{{ formErrors.prizes }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="rules">Rules:</label>
      <textarea
        class="form-control"
        id="rules"
        v-model="formValues.rules"
      ></textarea>
      <div class="text-danger">{{ formErrors.rules }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="bannerLink">Banner Link:</label>
      <input
        type="text"
        class="form-control"
        id="bannerLink"
        v-model="formValues.bannerLink"
      />
      <div class="text-danger">{{ formErrors.bannerLink }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="status">Status:</label>
      <select class="form-control" id="status" v-model="formValues.status">
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
        <option value="Finished">Finished</option>
      </select>
      <div class="text-danger">{{ formErrors.status }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="maxParticipants">Maximum Participants:</label>
      <input
        type="number"
        class="form-control"
        id="maxParticipants"
        v-model="formValues.maxParticipants"
      />
      <div class="text-danger">{{ formErrors.maxParticipants }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="livestreamLink">Livestream Link:</label>
      <input
        type="text"
        class="form-control"
        id="livestreamLink"
        v-model="formValues.livestreamLink"
      />
      <div class="text-danger">{{ formErrors.livestreamLink }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="emailOrganizer">Organizer's Email:</label>
      <input
        type="email"
        class="form-control"
        id="emailOrganizer"
        v-model="formValues.emailOrganizer"
      />
      <div class="text-danger">{{ formErrors.emailOrganizer }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="phoneOrganizer">Organizer's Phone:</label>
      <input
        type="tel"
        class="form-control"
        id="phoneOrganizer"
        v-model="formValues.phoneOrganizer"
      />
      <div class="text-danger">{{ formErrors.phoneOrganizer }}</div>
    </div>

    <div class="form-group mb-3">
      <label for="nameOrganizer">Organizer's Name:</label>
      <input
        type="text"
        class="form-control"
        id="nameOrganizer"
        v-model="formValues.nameOrganizer"
      />
      <div class="text-danger">{{ formErrors.nameOrganizer }}</div>
    </div>

    <button type="submit" class="btn btn-primary">Send</button>
  </form>
</template>


<script setup lang="ts">
import { ref } from "vue";
import serverApi from "../../../services/server";
import Swal from "sweetalert2";

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};


const formValues = ref({
  name: "",
  game: "",
  format: "Online",
  dateTime: "",
  description: "",
  entryFee: 2,
  prizes: "",
  rules: "",
  bannerLink: "",
  status: "Open",
  maxParticipants: null,
  livestreamLink: "",
  emailOrganizer: "",
  phoneOrganizer: "",
  nameOrganizer: "",
});

const formErrors = ref({
  name: "",
  game: "",
  format: "",
  dateTime: "",
  description: "",
  entryFee: "",
  prizes: "",
  rules: "",
  bannerLink: "",
  status: "",
  maxParticipants: "",
  livestreamLink: "",
  emailOrganizer: "",
  phoneOrganizer: "",
  nameOrganizer: "",
});

const validateForm = () => {
  let isValid = true;

  if (!formValues.value.name) {
    formErrors.value.name = "Tournament name is required";
    isValid = false;
  } else {
    formErrors.value.name = "";
  }

  if (!formValues.value.game) {
    formErrors.value.game = "Game is required";
    isValid = false;
  } else {
    formErrors.value.game = "";
  }

  if (!formValues.value.format) {
    formErrors.value.format = "Format is required";
    isValid = false;
  } else {
    formErrors.value.format = "";
  }

  if (!formValues.value.dateTime) {
    formErrors.value.dateTime = "Date and time are required";
    isValid = false;
  } else {
    const selectedDateTime = new Date(formValues.value.dateTime);
    const currentDateTime = new Date();

    if (selectedDateTime <= currentDateTime) {
      formErrors.value.dateTime = "Date and time must be later than the current date";
      isValid = false;
    } else {
      formErrors.value.dateTime = "";
    }
  }

  if (formValues.value.entryFee === null) {
    formErrors.value.entryFee = "Entry fee is required";
    isValid = false;
  } else if (formValues.value.entryFee < 0) {
    formErrors.value.entryFee = "Entry fee must be a positive number";
    isValid = false;
  } else {
    formErrors.value.entryFee = "";
  }

  if (!formValues.value.prizes) {
    formErrors.value.prizes = "Prizes are required";
    isValid = false;
  } else {
    formErrors.value.prizes = "";
  }

  if (!formValues.value.rules) {
    formErrors.value.rules = "Rules are required";
    isValid = false;
  } else {
    formErrors.value.rules = "";
  }

  if (!formValues.value.bannerLink) {
    formErrors.value.bannerLink = "Banner link is required";
    isValid = false;
  } else {
    formErrors.value.bannerLink = "";
  }

  if (!formValues.value.status) {
    formErrors.value.status = "Status is required";
    isValid = false;
  } else {
    formErrors.value.status = "";
  }

  if (formValues.value.maxParticipants === null) {
    formErrors.value.maxParticipants = "Maximum participants is required";
    isValid = false;
  } else if (formValues.value.maxParticipants < 0) {
    formErrors.value.maxParticipants = "Maximum participants must be a positive number";
    isValid = false;
  } else {
    formErrors.value.maxParticipants = "";
  }

  if (!formValues.value.livestreamLink) {
    formErrors.value.livestreamLink = "Livestream link is required";
    isValid = false;
  } else {
    formErrors.value.livestreamLink = "";
  }

  if (!formValues.value.emailOrganizer) {
    formErrors.value.emailOrganizer = "Organizer's email is required";
    isValid = false;
  } else {
    formErrors.value.emailOrganizer = "";
  }

  return isValid;
};


const handleSubmit = async () => {
  if (validateForm()) {
    await serverApi.post('/tournaments', {...formValues.value})
    console.log("Formulario enviado:", formValues);
    Swal.fire({
            icon: 'success',
            title: 'Good',
            text: 'Excellent',
    })
  } else {
  }
};
</script>

<style scoped>
  form {
    max-width: 70%;
    margin: auto;
  }
</style>
