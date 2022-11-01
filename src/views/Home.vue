<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <NavBar />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="row">
        <div class="welcome">Welcome!</div>
      </div>
      <div class="row">
        <div class="get-started section">
          <div class="row">
            <div class="menu">
              <center>Get Started</center>
              <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
                <div v-for="(action, index) in actions" :key="action + index">
                  <button type="button" class="btn btn-secondary btn-lg actions custom-left">
                    <i :class=action.icon></i>
                  </button>
                  <button type="button" class="btn btn-success btn-lg actions custom-right">
                    + {{ action.title }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 menu section">
          <center>Reminders</center>
        </div>
        <div class="col-2-5 menu section">
          <center>Summary</center>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import NavBar from '../components/NavBar.vue'
import HomeService from "../services/home.service";

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      actions: null
    };
  },
  methods: {
    async getActionItems() {
      const highest = Math.max(...this.$store.state.auth.user.roles);
      const req = await HomeService.getRoleNav(highest);
      console.log(req.data)
      this.actions = await req.data;
      console.log(this.actions)
    }
  },
  created() {
    this.getActionItems()
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    NavBar
  },
});
</script>

<style scoped>
.menu {
  padding: 10px;
}

.actions {
  margin: 5px;
}

.bi {
  font-size: 20px;
}

.custom-right {
  width: 200px !important;
  text-align: left;
}

.welcome {
  margin-left: 60px;
  margin-top: 30px;
}

.section {
  margin-left: 30px;
  margin-top: 30px;
  background: #1F1F1F;
}

.col-5-0 {
  flex: 0 0 46.125%;
  max-width: 46.125%;
  position: relative;
  width: 100%;
}

.col-2-5 {
  flex: 0 0 23.0625%;
  max-width: 23.0625%;
  position: relative;
  width: 100%;
}

.get-started {
  flex: 0 0 19%;
  max-width: 19%;
  position: relative;
  width: 100%;
}

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
