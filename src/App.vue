<template>
  <ion-app>
    <router-view />
  </ion-app>
</template>
  
<script>
import { IonApp /*, IonRouterOutlet*/ } from '@ionic/vue';
import { defineComponent } from 'vue';
import { storeX } from "./store/index";



storeX.io.on('connect', () => {
  console.log('hello');

  storeX.io.emit("message", "Hello, world!");
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
    }
  },
  components: {
    IonApp,
    //IonRouterOutlet
  }
});
</script>