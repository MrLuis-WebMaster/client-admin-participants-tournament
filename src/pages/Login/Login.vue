<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-header">Log In</div>
          <div class="card-body">
            <form @submit.prevent="signIn">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
                <div class="text-danger">{{ errors.email }}</div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
                <div class="text-danger">{{ errors.password }}</div>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="loading">Log In</button>
              <div v-if="loading" class="text-info mt-3">Loading...</div>
              <div v-if="signInError" class="text-danger mt-3">{{ signInError }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/auth';
import { router } from '../../router';

const email = ref('');
const password = ref('');
const errors = { email: '', password: '' };
const signInError = ref('');
const loading = ref(false);

const validateFields = () => {
  let valid = true;
  if (!email.value) errors.email = 'Email is required';
  if (!password.value) errors.password = 'Password is required';
  return valid;
};

const signIn = async () => {
  if (validateFields()) {
    loading.value = true; 
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      router.push('/dashboard');
    } catch (error:any) {
      signInError.value = error.message;
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style scoped>
</style>
