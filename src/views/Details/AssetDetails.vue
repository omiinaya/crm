<template>
  <div class="row">
    <div class="col-11 offset-1">
      <div clas="row">
        <div class="col-11 top">
          <div class="top-spacing">
            <div v-if="storeX.asset.length">{{ storeX.asset[0].assetName }}</div>
            <div>
              <button type="button" class="btn btn-primary" v-on:click="newTicket()">
                New Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="section">
            <div class="header">
              <i class="bi bi-person-circle"></i>
              Owner Information
            </div>
            <div class="content">
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-file-earmark-person"></i> Name:
                </label>
                <div class="col-sm-6">{{ storeX.customer.name }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-envelope"></i> Email:
                </label>
                <div class="col-sm-6">
                  <a :href="`mailto:${storeX.customer.email}`" target="_blank">
                    {{ storeX.customer.email }}
                  </a>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-telephone"></i> Phone:
                </label>
                <div class="col-sm-6">{{ storeX.customer.primaryPhone }}</div>
              </div>
              <div class="row align-items-top mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-geo-alt"></i> Address:
                </label>
                <div class="col-sm-6">
                  <a :href="`https://maps.google.com/?q=${storeX.customer.primaryAddress}`" target="_blank">
                    {{ storeX.customer.primaryAddress }}
                  </a>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-calendar-event"></i> Created:
                </label>
                <div class="col-sm-6">{{ storeX.customer.createdAt }}</div>
              </div>
            </div>
          </div>
          <div class="section" v-if="storeX.asset.length">
            <div class="header">
              <i class="bi bi-laptop"></i>
              Asset Information
            </div>
            <div class="content">
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-bookmark"></i> Name:
                </label>
                <div class="col-sm-6">{{ storeX.asset[0].assetName }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-upc-scan"></i> Serial:
                </label>
                <!--<div class="col-sm-6">{{ storeX.asset[0].assetSerial }}</div>-->
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-option"></i> Type:
                </label>
                <div class="col-sm-6">{{ storeX.asset[0].assetType }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-patch-check"></i> Manufacturer:
                </label>
                <div class="col-sm-6">{{ storeX.asset[0].assetBrand }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-tag"></i> Tag:
                </label>
                <div class="col-sm-6">{{ storeX.asset[0].assetTag }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="section">
            <div class="header">
              <i class="bi bi-tag"></i>
              Ticket Log
            </div>
            <div v-if="storeX.tickets.length" class="content">
              <EasyDataTable :headers="ticketHeaders" :items="storeX.tickets" theme-color="#1d90ff"
                table-class-name="customize-table" header-text-direction="left" body-text-direction="left">
                <template #item-ticketTitle="{ ticketTitle, id, ticketCustomerId }">
                  <button type="button" class="template-btn btn-lg" v-on:click="openTicket(id, ticketCustomerId)">
                    {{ ticketTitle }}
                  </button>
                </template>
              </EasyDataTable>
            </div>
            <div class="text-center" v-if="!storeX.tickets.length">
              There are no tickets to display
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { storeX } from "../../store/index";

export default {
  name: 'CustomerDetailsPage',
  components: {},
  data: () => ({
    storeX,
    ticketHeaders: [
      { value: "id", text: "ID", sortable: true },
      { value: "ticketTitle", text: "TITLE", sortable: true },
      { value: "ticketDesc", text: "DESCRIPTION", sortable: true },
      { value: "createdAt", text: "CREATED", sortable: true },
      { value: "ticketStatus", text: "STATUS", sortable: true },
    ],
    assetHeaders: [
      { value: "id", text: "ID", sortable: true },
      { value: "assetName", text: "NAME", sortable: true },
      { value: "assetSerial", text: "SERIAL", sortable: true },
      { value: "assetType", text: "TYPE", sortable: true },
      { value: "assetBrand", text: "MANUFACTURER", sortable: true }
    ],
    tickets: {
      open: null,
      closed: null
    },
    //TODO: calc this instead of hard coding
    paidInvoices: 0,
    unpaidInvoices: 0
  }),
  methods: {
    async openTicket(id, ticketCustomerId) {
      this.storeX.updateNavigation({
        view: 'Ticket',
        ticketId: id,
        customerId: ticketCustomerId
      })
    },
    async newTicket() {
      console.log('test')
      this.storeX.updateNavigation({
        view: 'NewTicket',
        customerId: storeX.customer.id,
        assetId: storeX.asset[0].id
      })

      console.log(storeX.asset)
    }
  },
  created() {
    storeX.loadAssetById(storeX.navigation.assetId)
    storeX.loadCustomerByAssetId(storeX.navigation.assetId)
    storeX.loadTicketsByAssetId(storeX.navigation.assetId)
  }
}
</script>
  
<style scoped>
.bi {
  padding-right: 5px !important;
}

.btn {
  font-size: 14px;
  color: #c1cad4;
  margin-bottom: 10px;
}

.template-btn {
  font-size: 14px;
  color: #c1cad4;
  background: transparent;
  padding: 0;
}

.btn:focus {
  box-shadow: none !important;
  border-color: transparent !important;
}

.btn:hover {
  text-decoration: underline;
}

li {
  color: #c0c7d2;
}

.header {
  font-size: 18px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.top {
  padding: 20px;
  padding-top: 0 !important;
  padding-bottom: 0;
  padding-left: 10px;
  font-size: 24px;
}

.top-spacing {
  display: flex;
  justify-content: space-between;
}

.top-spacing>*>* :not(:last-child) {
  margin-right: 15px !important;
}

.section {
  margin-bottom: 25px;
  background: #1f1f1f;
  padding: 25px;
}

.content {
  padding-top: 15px;
  font-size: 14px;
  color: #c0c7d2;
}

.customize-table {
  --easy-table-border: 1px solid #1f1f1f;
  --easy-table-row-border: 1px solid #1f1f1f;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #1f1f1f;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #1f1f1f;

  --easy-table-body-row-font-color: #c0c7d2;
  --easy-table-body-row-background-color: #1f1f1f;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #c0c7d2;
  --easy-table-body-row-hover-background-color: #1f1f1f;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #1f1f1f;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;

  --easy-table-scrollbar-track-color: #1f1f1f;
  --easy-table-scrollbar-color: #1f1f1f;
  --easy-table-scrollbar-thumb-color: #1f1f1f;
  --easy-table-scrollbar-corner-color: #1f1f1f;

  --easy-table-loading-mask-background-color: #1f1f1f;
}
</style>