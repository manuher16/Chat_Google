<template>
  <v-container>
    <v-card
      class="d-flex justify-center aling-center flex-column"
      variant="tile"
    >
      <v-card-text class="text-center text-h5">
        Bienvenido a la aplicacion de chat
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn v-if="user" href="/chat"> Chatear con Google </v-btn>
        <v-btn v-if="!user" href="/login"> Inicar session </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";
// Components
import { useMeta } from "vue-meta";
export default defineComponent({
  name: "HomeView",
  setup() {
    useMeta({
      title: "Chat Google",
    });
  },
  computed: {
    ...mapState({
      user: (state) => state.session.user,
    }),
  },
  components: {},
});
</script>
