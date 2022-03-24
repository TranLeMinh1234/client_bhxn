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
            <m-input rules="required" placeholder="Mã số BHXN" v-model="dataLogin.bhxn_code"/>
            <m-input rules="required" placeholder="Mật khẩu"  v-model="dataLogin.password" type="password" style="margin-top: 20px"/>
          </div>
          <div class="btn-bar-dialog">
            <button @click="closeDialog()">Hủy</button>
            <button style="background-color: #1941ff;color:white" @click="login">Đăng nhập</button>
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
import axios from 'axios'
import common from '../js/common'

export default {
  components: { popup,mInput,validateObserve },
  name: 'Home',
  created() {
    let me = this;
    // axios.get(`${commonJs.doMainApi}/BHXH/login?bhxh_code=4287fja4234&acc_password=123456`).then(res => console.log(res))
  },
  data() {
    return {
      isShowDialogLogin: false,
      configDialogLogin: {
        width: '400px',
        height: '200px',
        titleDialog: 'Đăng nhập'
      },
      dataLogin:{
        bhxn_code: '',
        password: '',
      },
    }
  },
  methods: {
    closeDialog(){
      let me = this;
      me.isShowDialogLogin = false;
    },
    openDialog(){
      let me = this;
      me.isShowDialogLogin = true;
    },
    login()
    {
      let me = this;
      common.markOn();
      localStorage.setItem('infoUser',JSON.stringify(me.dataLogin))
      me.$router.push('/DSTT')
      // axios
      // .get(`${common.doMainApi}/BHXH/login?bhxh_code=${me.dataLogin.bhxn_code}&acc_password=${me.dataLogin.password}`)
      // .then(res=>{
      //   if(res.data.status == 'accepted')
      //   {
      //     localStorage.setItem('infoUser', JSON.stringify(me.dataLogin));
      //     me.closeDialog();
      //     common.markOff();
      //     me.$router.push('/DSTT');
      //   }
      //   else
      //   {
      //     me.$root.$children[0].showNoti('Mã bảo hiểm xã hội hoặc mật khẩu chưa chính xác');
      //     common.markOff();
      //   }
      // })
      // .catch(res=>{
      //   me.$root.$children[0].showNoti('Đã có lỗi xảy ra!');
      //   common.markOff();
      // })
    }
  }
}
</script>

<style>
@import url('../assets/css/Home.css');
</style>