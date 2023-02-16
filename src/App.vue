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
    
    isLoggedIn() {
      const user = this.$store.state.auth.user;
      if (!user) return false;
      return true;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      //this.$router.push('/login');
    }
  },
  components: {
    IonApp,
    //IonRouterOutlet
  }
});
</script>