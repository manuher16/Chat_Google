<template>
  <v-app-bar>
    <v-btn href="/">Chat Google</v-btn>
    <v-spacer />
    {{ user ? user.displayName : "" }}
    <router-link to="/login" v-if="!user">
      <v-btn>Iniciar</v-btn>
    </router-link>
    <v-btn @click="logout" v-if="user">Salir</v-btn>
    <a href="/about" class="text-button link"> Sobre</a>
  </v-app-bar>
</template>

<script >
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { mapState, mapMutations } from "vuex";

export default {
  setup() {
    return {
      name: "Orson Hernandez",
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.session.user,
    }),
  },
  methods: {
    ...mapMutations({
      setUser: "session/setUser",
    }),
    async logout() {
      await signOut(auth);
      this.setUser(null);
      window.location.href = "/";
    },
  },
  created() {
    onAuthStateChanged(auth, (userCurrent) => {
      if (userCurrent) {
        this.setUser(userCurrent);
      }
    });
  },
};
</script>

<style>
.link {
  text-decoration: none;
  color: black;
}
</style>