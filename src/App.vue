<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script >
import AppBar from "@/components/Navigation/AppBar.vue";
import { useMeta } from "vue-meta";
export default {
  setup() {
    useMeta({
      title: "Chat Google",
    });
  },
  components: {
    AppBar,
  },
};
</script>
