<template>
  <v-container>
    <v-row v-if="user">
      <v-col md="3">
        <v-card width="100%">
          <v-list-item>
            <v-list-item-avatar class="mx-3">
              <v-img
                :src="user.photoURL"
                width="100"
                height="100"
                contain
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.displayName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-subtitle class="mt-3"> Usuarios </v-card-subtitle>

          <v-list v-if="chats.length > 0">
            <div v-for="(user, index) in users" :key="index">
              <ItemChat :user="user" />
            </div>
          </v-list>
          <v-card-text v-if="chats.length == 0">
            <v-alert type="info">
              No hay chats, comience una conversacion
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card height="500" class="messages" id="container-messages">
          <v-list-item width="100%" v-for="(msg, index) in chats" :key="index">
            <v-card
              color="transparent"
              variant="outlined"
              class="d-flex justify-end aling-end pa-2"
              width="100%"
              v-if="user.email == msg.user.email"
            >
              <v-sheet color="green" width="300" class="rounded-shaped">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Yo</v-list-item-subtitle>
                    <v-card-text class="ma-0 pa-0">
                      <p>
                        {{ msg.text }}
                      </p>
                      <p class="text-caption">
                        {{ lastedTime(msg.createdAt) }}
                      </p>
                    </v-card-text>
                  </v-list-item-content>
                </v-list-item>
              </v-sheet>
            </v-card>
            <v-card
              color="transparent"
              variant="outlined"
              class="d-flex justify-start aling-start pa-2"
              width="100%"
              v-else
            >
              <v-sheet color="blue" width="300" class="rounded-shaped">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{
                      msg.user.displayName
                    }}</v-list-item-subtitle>
                    <v-card-text class="ma-0 pa-0">
                      <p>
                        {{ msg.text }}
                      </p>
                      <p class="text-caption">
                        {{ lastedTime(msg.createdAt) }}
                      </p>
                    </v-card-text>
                  </v-list-item-content>
                </v-list-item>
              </v-sheet>
            </v-card>
          </v-list-item>
        </v-card>
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="text"
              placeholder="Escribir aqui"
              variant="outlined"
              append-icon="mdi-send"
              @click:append="send"
              @keyup.enter="send"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ItemChat from "@/components/chat/itemChat";
import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { collection, addDoc, onSnapshot, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase";
const store = useStore();
const chats = computed(() => store.state.session.chats);
const user = computed(() => store.state.session.user);
const text = ref("");
const state = reactive({
  users: [],
  chats: [],
});

const users = ref([]);
const pushChat = (chat) => {
  store.commit("session/pushChat", chat);
};
const setChats = (chats) => {
  store.commit("session/setChats", chats);
};

const send = async () => {
  if (text.value.length > 0) {
    const auth = getAuth();
    const user = auth.currentUser;
    const chat = {
      text: text.value,
      user: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      },
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    console.log(chat);
    await addDoc(collection(db, "chats"), chat);
    text.value = "";
    setTimeout(() => {
      var objDiv = document.getElementById("container-messages");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 100);
  }
};
onSnapshot(collection(db, "chats"), orderBy("createdAt"), (snapshot) => {
  const chats = snapshot.docs
    .map((doc) => doc.data())
    .sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
  setChats(chats);
});
onSnapshot(collection(db, "users"), (snapshot) => {
  users.value = snapshot.docs
    .map((doc) => {
      if (doc.data().email != user.value.email) {
        return doc.data();
      }
    })
    .sort((a, b) => {
      return a.displayName - b.displayName;
    });
});
const lastedTime = (createdAt) => {
  const date = new Date(createdAt);
  console.log(date);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diff / 60000);
  const diffHours = Math.floor(diff / 3600000);
  const diffDays = Math.floor(diff / 86400000);
  if (diffSeconds < 60) {
    return "hace " + diffSeconds + " segundos";
  } else if (diffMinutes < 60) {
    return "hace " + diffMinutes + " minutos";
  } else if (diffHours < 24) {
    return "hace " + diffHours + " horas";
  } else if (diffDays < 30) {
    return "hace " + diffDays + " dias";
  } else {
    return "hace más de un mes";
  }
};
</script>

<style>
.messages {
  height: 500px;
  overflow-y: scroll;
}
</style>