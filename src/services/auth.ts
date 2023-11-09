import { getAuth } from 'firebase/auth';
import { ref } from 'vue';
import { NavigationGuard } from 'vue-router';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.config';

export const appFirebase = initializeApp(firebaseConfig);

export const isAuthenticated = ref(false);
export const useUser = ref();
export const auth = getAuth(appFirebase);


const authStatePromise = new Promise<void>((resolve) => {
  auth.onAuthStateChanged((user) => {
    isAuthenticated.value = !!user;
    useUser.value = user
    resolve();
  });
});

export const requireAuth: NavigationGuard = async (_to, _from, next) => {
  await authStatePromise;
  if (isAuthenticated.value) {
    next(); 
  } else {
    next('/login');
  }
};
