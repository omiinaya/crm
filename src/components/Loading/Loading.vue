<template>
  <div class="jumping-dots-loader">
    <span></span> <span></span> <span></span>
  </div>
</template>
  
  <script>
  export default {
    name: 'LoadingComponent',
    components: {},
    data: () => ({}),
    created() {},
    methods: {}
  }
  </script>
  
  <style scoped>
.flex {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}

.jumping-dots-loader span {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: white;
}

.jumping-dots-loader span:nth-child(1) {
  animation: bounce 1s ease-in-out infinite;
}

.jumping-dots-loader span:nth-child(2) {
  animation: bounce 1s ease-in-out 0.33s infinite;
}

.jumping-dots-loader span:nth-child(3) {
  animation: bounce 1s ease-in-out 0.66s infinite;
}

@keyframes bounce {
  0%,
  75%,
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }

  25% {
    -webkit-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    -o-transform: translateY(-10px);
    transform: translateY(-10px);
  }
}
</style>