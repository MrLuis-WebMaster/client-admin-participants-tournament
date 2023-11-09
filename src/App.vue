<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { Tooltip } from "bootstrap";
  // import { onBeforeRouteUpdate } from 'vue-router';


  let tooltip = ref<any>(null)
  onMounted(() => {
    tooltip = new Tooltip(document.body, {
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
