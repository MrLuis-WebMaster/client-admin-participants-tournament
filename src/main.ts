import { createApp } from 'vue'
import './styles/general.scss'
import App from './App.vue'
import { router } from './router/index'
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from 'pinia'
import { appFirebase } from './services/auth';
import { getAnalytics } from "firebase/analytics";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';



getAnalytics(appFirebase);

const pinia = createPinia()
const app = createApp(App)
app.use(VueSweetalert2);
app.use(router);
app.use(VueQueryPlugin)
app.use(pinia)
app.mount('#app')
