<template>
  <div id="app">
    <div class="container">
      <ion-app>
        <router-view />
      </ion-app>
    </div>
  </div>
</template>
  
<script>
import { IonApp /*, IonRouterOutlet*/ } from '@ionic/vue';
import { defineComponent } from 'vue';

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