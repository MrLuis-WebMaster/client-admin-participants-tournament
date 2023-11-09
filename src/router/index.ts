import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home/Home.vue";
import Login from "../pages/Login/Login.vue";
import List from "../pages/List/List.vue";
import CreateTournament from "../pages/Dashboard/CreateTournament/CreateTournament.vue";
import DashboardLayoutVue from "../layouts/DashboardLayout.vue";
import Tournaments from "../pages/Dashboard/tournaments/Tournaments.vue";
import { requireAuth } from "../services/auth";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  {
    path: "/dashboard",
    name: 'Dashboard',
    component: DashboardLayoutVue,
    beforeEnter: requireAuth,
    children: [
      {
        name: 'Tournaments',
        path: "tournaments",
        component: Tournaments,
      },
      {
        path: 'tournament/:tournamentId/configuration',
        name: 'Configuration',
        component: List
      },
      { 
        name: 'Create Tournament', 
        path: "create-tournament", 
        component: CreateTournament 
      },
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
