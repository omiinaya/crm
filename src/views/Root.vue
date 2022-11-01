<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <NavBar />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <Home v-if="storeX.view === 'homeView' || !storeX.view"/>
      <Customer v-else-if="storeX.view === 'customerView'"/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { storeX } from "../store/index";
import NavBar from '../components/NavBar.vue'
import Home from '../components/Home.vue'
import Customer from '../components/Customer.vue'

export default defineComponent({
  name: 'RootPage',
  data() {
    return {
      toShow: null,
      storeX
    };
  },
  methods: {},
  created() {
    console.log(storeX.view)
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    NavBar,
    Home,
    Customer
  },
});
</script>

<style scoped>

</style>