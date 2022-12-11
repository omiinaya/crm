<template>
  <ion-app>
    <router-view />
  </ion-app>
</template>
  
<script>
import { IonApp /*, IonRouterOutlet*/ } from '@ionic/vue';
import { defineComponent } from 'vue';

import { storeX } from "./store/index";
const socket = storeX.io

socket.on('connect', () => {
  console.log('hello');

  socket.emit("message", "Hello, world!");
});

export default defineComponent({
  name: 'App',
  computed: {
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  components: {
    IonApp,
    //IonRouterOutlet
  }
});
</script>