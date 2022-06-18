<template>
  <v-list-item v-if="user">
    <v-avatar class="mr-2">
      <img :src="props.user.photoURL" width="40" />
    </v-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ props.user.displayName }} </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script setup >
import { defineProps } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style>
</style>