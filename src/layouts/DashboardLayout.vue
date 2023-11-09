<template>
  <div class="wrapper">
    <div
      id="sidebar"
      class="bg-dark border-end"
      :class="{ 'd-block': !isSidebarVisible }"
    >
      <div class="position-sticky h-100">
        <div class="d-flex flex-column justify-content-between h-100">
          <div>
            <div class="px-3 py-2 border-bottom d-flex" style="height: 72.8px">
              <h3 class="m-auto">Freshwar</h3>
            </div>
            <div class="list-group list-group-flush">
              <router-link
                v-for="childRoute in dashboardRoutes"
                :key="childRoute.path"
                :to="'/dashboard' + '/' + childRoute.path"
                class="list-group-item list-group-item-action"
              >
                {{ childRoute.name }}
              </router-link>
            </div>
          </div>
          <div class="list-group list-group-flush border-top">
            <div class="list-group-item list-group-item-action">
              <div class="d-flex justify-content-between align-items-center">
                <small> Sign in as: {{ useUser.email }} </small>
                <button class="btn btn-secondary" @click="signOut">
                  <i class="bi bi-box-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="content">
      <div class="d-flex justify-content-between border-bottom px-3 py-2">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <button
            type="button"
            id="sidebarCollapse"
            class="btn btn-dark d-md-none"
            @click="toggleSidebar"
          >
            <i class="bi bi-list"></i>
          </button>
        </nav>

        <nav
          class="navbar navbar-expand-lg navbar-dark bg-dark"
          id="horizontal-menu"
        >
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="main-content" class="container-fluid">
        <div class="p-3">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signOut as firebaseSignOut } from "firebase/auth";
import { ref } from "vue";
import { useUser, auth } from "../services/auth";
import { router } from "../router/index";

const dashboardRoutes = ref();

dashboardRoutes.value = [
  {
    name: 'Tournaments',
    path: "tournaments",
  },
  {
    name: 'Create a tournament',
    path: "create-tournament",
  },
];

const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    router.push("/login");
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

const isSidebarVisible = ref(true);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "sidebar content";
  height: 100vh;
}

#sidebar {
  grid-area: sidebar;
  width: 280px;
}

#content {
  grid-area: content;
  display: flex;
  flex-direction: column;
}

#horizontal-menu {
  margin-top: 0;
}

#sidebar,
#content {
  max-height: 100vh;
  height: 100vh;
  overflow-x: hidden;
}

#main-content {
  overflow: auto;
}

@media (max-width: 768px) {
  #sidebar {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 100;
  }

  #sidebarCollapse {
    display: block;
  }
}
</style>
