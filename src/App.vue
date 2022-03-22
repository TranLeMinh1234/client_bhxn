<template>
  <div id="app">
    <div class="toast-msg-box"></div>
    <router-view></router-view>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import CommonJS from './js/common.js';

export default {
  el: '#app',
  name: 'App',
  components: {
  },
  methods:{
    minh()
    {
      let me = this;
      CommonJS.markOn();
      me.$refs.observe.validateComponent();
    },
  },
  data(){
    return {
      
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
@import url('./assets/css/main.css');
</style>
