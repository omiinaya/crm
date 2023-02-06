<template>
    <div>test</div>
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
