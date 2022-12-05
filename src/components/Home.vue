<template>
  <div class="row">
    <div class="welcome">Welcome!</div>
  </div>
  <div class="row">
    <div class="get-started section">
      <div class="menu text-center">
        Get Started
        <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
          <div v-for="(action, index) in actions" :key="action + index">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-secondary btn-lg actions custom-left">
                <i :class="action.icon"></i>
              </button>
              <button type="button" class="btn btn-success btn-lg actions custom-right"
                v-on:click="storeX.view = action.url">
                + {{ action.title }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 menu section text-center">Reminders</div>
    <div class="col-2-5 menu section text-center">
      <div class="title">
        Summary
      </div>
      <br />
      <div class="details">
        <ul>
          <li>
            Total Tickets: {{ totalTicketCount }}
          </li>
          <li>
            Open Tickets: {{ openTicketCount }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import { storeX } from "../store/index";
import HomeService from "../services/home.service";
import TicketService from "../services/ticket.service";

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      actions: null,
      totalTicketCount: null,
      openTicketCount: null,
      storeX
    };
  },
  methods: {
    async getActionItems() {
      const highest = Math.max(...this.$store.state.auth.user.roles);
      const req = await HomeService.getRoleNav(highest);
      this.actions = await req.data;
    },
    async loadTicketData() {
      const req = await TicketService.getTickets();
      const tickets = await req.data;

      this.totalTicketCount = tickets.length;
      this.openTicketCount = tickets.length; //filter by status later
    },
  },
  created() {
    this.getActionItems()
    this.loadTicketData()
  }
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

.custom-left {
  pointer-events: none;
}

.welcome {
  margin-left: 60px;
  margin-top: 30px;
}

.section {
  margin-left: 30px;
  margin-top: 30px;
  background: #1f1f1f;
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
  flex: 0 0 18.5%;
  max-width: 18.5%;
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

ul {
  list-style-type: none;
  padding: 0;
}
</style>
  