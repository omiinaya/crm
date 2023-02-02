<template>
    <div class="row">
        <div class="col-12">
            <div style="display: flex; justify-content: space-between;">
                <div class="col-10">INSERT CANNED RESPONSE</div>
                <button class="com-btn" block @click="closeHandler()">
                    <i class="bi bi-x"></i>
                </button>
            </div>


        </div>
    </div>
</template>

<script>
import { storeX } from '../../store';


export default {
    name: 'MyComponent',
    data: () => ({}),
    methods: {
        async closeHandler() {
            storeX.dialogs.canned = false;
        }
    },
    created() { },
};
</script>

<style scoped>
.bi {
    font-size: 25px;
}
</style>