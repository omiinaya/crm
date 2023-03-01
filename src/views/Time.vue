<template>
    <div>{{ storeX.navigation.view }}</div>
</template>

<script>
import { defineComponent } from 'vue';
import { storeX } from "../store/index";

export default defineComponent({
    name: 'TimePage',
    data() {
        return { storeX };
    }
});
</script>
