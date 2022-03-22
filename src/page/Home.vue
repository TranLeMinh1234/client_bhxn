<template>
  <div id="Home">
      <div class="header-home">
        <img class="logo" src="https://dichvucong.baohiemxahoi.gov.vn/assets/images/logo_text.svg" alt="">
        <div class="btn-bar-home">
          <button  @click="openDialog()">Đăng nhập</button>
          <router-link to="/DK" class="Register">Đăng ký</router-link>
        </div>
      </div>
      <div class="slide">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://dichvucong.baohiemxahoi.gov.vn/assets/images/banner1.jpg" class="d-block w-100 img-slide" alt="">
              <div class="carousel-caption d-none d-md-block">
                
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://dichvucong.baohiemxahoi.gov.vn/assets/images/banner4.jpg" class="d-block w-100 img-slide" alt="">
              <div class="carousel-caption d-none d-md-block">
                
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://dichvucong.baohiemxahoi.gov.vn/assets/images/banner2.jpg" class="d-block w-100 img-slide" alt="">
              <div class="carousel-caption d-none d-md-block">
              
              </div>
            </div>
          </div>
        </div>
      </div>
      <popup :config="configDialogLogin" :isShow="isShowDialogLogin">
        <div class="body-dialog-login">
        <validateObserve ref="observe">
          <div class="inp-bar">
            <m-input rules="required" placeholder="Mã số BHXN"/>
            <m-input rules="required" placeholder="Mật khẩu" type="password" style="margin-top: 20px"/>
          </div>
          <div class="btn-bar-dialog">
            <button @click="closeDialog()">Hủy</button>
            <button style="background-color: #1941ff;color:white">Đăng nhập</button>
          </div>
        </validateObserve>
        </div>
      </popup>
  </div>
</template>

<script>
import popup from '../components/popup.vue';
import mInput from '../components/minput.vue';
import validateObserve from '../components/validateObserve.vue';

export default {
  components: { popup,mInput,validateObserve },
  name: 'Home',
  created() {
    
  },
  data() {
    return {
      isShowDialogLogin: false,
      configDialogLogin: {
        width: '300px',
        height: '200px',
        titleDialog: 'Đăng nhập'
      },
    }
  },
  methods: {
    closeDialog(){
      let me = this;
      console.log(123213);
      me.isShowDialogLogin = false;
    },
    openDialog(){
      let me = this;
      me.isShowDialogLogin = true;
    }
  }
}
</script>

<style>
@import url('../assets/css/Home.css');
</style>