<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <NavBar />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!--
      <div class="container">
        <header class="jumbotron">
          <h3>{{ content }}</h3>
        </header>
      </div>
    -->
      <div class="row">
        <div class="col-12 welcome">Welcome!</div>
      </div>
      <div class="row">
        <div class="col-5-0 section">test1</div>
        <div class="col-5-0 section">test2</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import NavBar from '../components/NavBar.vue'
//import UserService from "../services/user.service";
import NavService from "../services/nav.service";

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    const highest = Math.max(...this.$store.state.auth.user.roles)
    NavService.getRoleNav(highest).then((response => {
      console.log(response)
    }))
    /*
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    */
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
.welcome {
  margin-left: 60px;
  margin-top: 30px;
}

.section {
  margin: 30px;
  background: #1F1F1F;
}

.col-5-0 {
  flex: 0 0 46.125%;
  max-width: 46.125%;
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
