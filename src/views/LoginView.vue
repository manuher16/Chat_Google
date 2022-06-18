<template lang="">
   <v-container class="text-center">
    <v-card
      width="100%"
      class="d-flex justify-center align-center mb-6"
      height="100%"
      flat
      tile
    >
      <v-card width="600" class="">
        <v-card-text class="text-center text-h5">Iniciar session</v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue" @click="googleAccess" >Inicar con Google <v-icon>
            mdi-google-plus
          </v-icon></v-btn>
       
            <v-spacer />
        </v-card-actions>
      </v-card>
    </v-card>
  </v-container>
</template>
<script setup>
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useStore } from "vuex";
import { auth } from "@/firebase";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

console.log(route);
const googleAccess = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    store.commit("session/setUser", user);
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    window.location.href = "/chat";
  } catch (error) {
    console.log(error);
  }
};
onAuthStateChanged(auth, (userCurrent) => {
  if (userCurrent) {
    store.commit("session/setUser", userCurrent);
  }
});
</script>
<style lang="">
</style>