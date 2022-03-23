<template>
  <div id="app">
    <div class="toast-msg-box"></div>
    <router-view></router-view>
     <popup :config="configNotiDialog" :isShow="isShowNoti" style="z-index:999999">
        <div style="padding-left: 15px">{{stringNoti}}</div>
        <button class="btn-noti" @click="closeNotiDialog">Đóng</button>
     </popup>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import CommonJS from './js/common.js';
import popup from './components/popup.vue'
import BasePage from './page/BasePage.vue'

export default {
  el: '#app',
  name: 'App',
  extends: BasePage,
  components: {
    popup
  },
  mounted()
  {
    
  },
  methods:{
    minhasdasd()
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
  position: relative;
}

.btn-noti
{
  outline: none;
  border: none;
  background-color: rgba(0, 68, 255, 0.726);
  color: white;
  padding: 8px;
  margin: 60px 330px;
}

.btn-noti:hover{
  background-color: rgba(0, 68, 255, 0.322);
}

.btn-noti:active{
  background-color: rgba(0, 68, 255, 0.726);
}

@import url('./assets/css/main.css');
</style>
