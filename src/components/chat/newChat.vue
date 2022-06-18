<template>
  <div>
    <v-dialog v-model="show" width="500">
      <template v-slot:activator="{ props }">
        <v-icon end v-bind="props">mdi-message-text</v-icon>
      </template>
      <v-card>
        <v-card-title> Iniciar coversacion </v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              variant="outlined"
              label="Email"
              v-model="newChat.email2"
            ></v-text-field>
            <v-textarea v-model="newChat.text"></v-textarea>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn color="error" @click="cerrar">cerrar</v-btn>
          <v-spacer />
          <v-btn color="blue" @click="createChat">Crear chat</v-btn>
        </v-card-actions>
      </v-card></v-dialog
    >
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { mapState } from "vuex";
export default {
  data: () => ({
    show: false,
    email: "",
    newChat: {
      email1: "",
      email2: "",
      text: "",
      image: null,
      createdAt: null,
      updatedAt: null,
      user1: null,
      user2: null,
    },
  }),
  computed: {
    ...mapState({
      user: (state) => state.session.user,
    }),
  },
  methods: {
    async createChat() {
      try {
        this.newChat.email1 = this.user.email;
        this.newChat.user1 = this.user;
        this.newChat.createdAt = new Date();
        this.newChat.updatedAt = new Date();
        const docRef = await addDoc(collection(db, "chats"), this.newChat);
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  props: {
    chat: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>