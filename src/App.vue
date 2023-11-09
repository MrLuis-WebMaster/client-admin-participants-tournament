<script setup lang="ts">
  import { onMounted } from "vue";
  import { Tooltip } from "bootstrap";

  onMounted(() => {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
    });
  });

  // onBeforeRouteUpdate(() => {
  //     tooltip.dispose();
  // });

</script>

<template>
  <router-view></router-view>
</template>
