<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="align-items-center" style="display: flex; justify-content: space-between;">
                    <div class="col-10">INSERT CANNED RESPONSE</div>
                    <button class="com-btn" block @click="closeHandler()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col-12">
                    <div class="search">
                        <input type="search" class="testing" placeholder="Search canned responses"
                            @input="searchHandler($event)" />
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <EasyDataTable v-model:items-selected="itemsSelected" :headers="headers" :items="filteredCustomers"
                        theme-color="#1d90ff" table-class-name="customize-table" header-text-direction="left"
                        body-text-direction="left">
                        <template #item-name="{ firstName, lastName, id }">
                            <button type="button" class="template-btn btn-lg" v-on:click="openCustomer(id)">
                                {{ firstName }} {{ lastName }}
                            </button>
                        </template>
                    </EasyDataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { storeX } from '../../store';


export default {
    name: 'MyComponent',
    data: () => ({
        items: [
            {
                title: 'REPAIR DECLINED',
                body: `This message is to inform you the system dropped off for service is ready for pickup. Our system notes indicate the diagnostic was complete and you have chosen to decline repair.  Should you have any questions or concerns please call us at 305-381-5898.`
            },
            {
                title: 'REPAIR COMPLETE (FUJITSU)',
                body: `{{customer_business_name_or_customer_full_name}} We have Great News! Ticket# {{ticket_number}} Serial# {{asset_serial}} has been repaired and is ready to ship back to your facility. Should you have any questions, please call us at 305-381-5898 Thank you again for choosing MobileMe IT for your repair needs.`
            },
            {
                title: 'PARTS ORDERED',
                body: `This message is to update and inform you that our technicians have completed the diagnostics of your system and determined parts are required in order to complete the repair. The required parts have been placed on order. As soon as those parts are received and installed, we will notify you that your repair has been completed.  Thank you again for entrusting MobileMe IT with your repair needs, should you require any 
immediate assistance or have any questions. Please call our center at 305-381-5898.`
            },
            {
                title: 'REPAIR COMPLETE',
                body: `{{customer_business_name_or_customer_full_name}} We have Great News! Ticket# {{ticket_number}} Serial# {{asset_serial}} has been repaired and is ready for pickup. You can come by anytime Mon-Fri from 10am-6pm. Should you have any questions, please call us at 305-381-5898 Thank you again for choosing MobileMe IT for your repair needs.`
            }
        ],
        headers: [
            { value: "title", text: "TITLE", sortable: true },
            { value: "body", text: "BODY", sortable: true },
            { value: "actions", text: "ACTIONS", sortable: true },
        ],
    }),
    methods: {
        async closeHandler() {
            storeX.dialogs.canned = false;
        },
        async searchHandler(e) {
            console.log(e)
        }
    },
    created() { },
    computed: {
        filteredCustomers() {
            return this.items;
        }
    },
};
</script>

<style scoped>
.bi {
    font-size: 25px;
}

input {
    width: 100%;
    background-color: white;
    padding: 5px;
    padding-left: 10px;
    border-radius: 5px;
    color: black;
}

input:focus {
    outline: none;
}

.customize-table {
    --easy-table-border: 1px solid #121212;
    --easy-table-row-border: 1px solid #121212;

    --easy-table-header-font-size: 14px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #c1cad4;
    --easy-table-header-background-color: #121212;

    --easy-table-header-item-padding: 10px 15px;

    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #121212;

    --easy-table-body-row-font-color: #c0c7d2;
    --easy-table-body-row-background-color: #121212;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;

    --easy-table-body-row-hover-font-color: #c0c7d2;
    --easy-table-body-row-hover-background-color: #121212;

    --easy-table-body-item-padding: 10px 15px;

    --easy-table-footer-background-color: #121212;
    --easy-table-footer-font-color: #c0c7d2;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;

    --easy-table-rows-per-page-selector-width: 70px;
    --easy-table-rows-per-page-selector-option-padding: 10px;

    --easy-table-scrollbar-track-color: #121212;
    --easy-table-scrollbar-color: #121212;
    --easy-table-scrollbar-thumb-color: #121212;
    --easy-table-scrollbar-corner-color: #121212;

    --easy-table-loading-mask-background-color: #121212;
}
</style>