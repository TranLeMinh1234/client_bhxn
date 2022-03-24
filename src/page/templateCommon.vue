<template>
  <div id="templateCommon">
    <popup :config="configDialogLogin" :isShow="isShowDialogLogin">
        <div class="body-dialog-login">
        <validateObserve ref="observe">
          <div class="inp-bar">
            <m-input rules="required" placeholder="Mã số BHXN" v-model="dataLogin.bhxn_code"/>
            <m-input rules="required" placeholder="Mật khẩu" v-model="dataLogin.password" type="password" style="margin-top: 20px"/>
          </div>
          <div class="btn-bar-dialog">
            <button @click="closeDialog()">Hủy</button>
            <button style="background-color: #1941ff;color:white" @click="login">Đăng nhập</button>
          </div>
        </validateObserve>
        </div>
      </popup>
      <div class="header-home">
        <img class="logo" src="https://dichvucong.baohiemxahoi.gov.vn/assets/images/logo_text.svg" alt="">
        <div class="btn-bar-home">
          <button  @click="openDialog()" v-if="!isLogin">Đăng nhập</button>
          <button v-if="!isLogin">Đăng ký</button>
          <div class="info-user" v-if="isLogin" style="color: white">
            {{infoUser.bhxn_code}}
            <span @click="showMenuUser"><i class="fas fa-chevron-down"></i></span>
            <ul class="user-menu" v-show="showMenu">
              <li @click="logout">đăng xuất</li>
            </ul>
          </div>
        </div>
      </div>
      <dir class="nav-bar">
          <router-link to="/DSTT" class="item-nav" v-if="isLogin">Kê khai hồ sơ</router-link>
          <router-link to="/NBHXNDT" class="item-nav" v-if="isLogin">Nộp BHXN điện tử</router-link>
      </dir>
      <div class="body-content">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import popup from '../components/popup.vue'
import mInput from '../components/minput.vue'
import BasePage from '../page/BasePage.vue'
import validateObserve from '../components/validateObserve.vue'
import common from '../js/common'
import axios from 'axios'

export default {
  components:{popup,mInput,validateObserve},
  extends: BasePage,
  methods:
  {
    logout()
    {
      let me = this;
      localStorage.removeItem('infoUser');
      me.infoUser = null;
      me.isLogin = false;
      me.$router.push('/Home');
    },
    showMenuUser(){
      let me = this;
      me.showMenu = ! me.showMenu;
    },
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
      axios
      .get(`${common.doMainApi}/BHXH/login?bhxh_code=${me.dataLogin.bhxn_code}&acc_password=${me.dataLogin.password}`)
      .then(res=>{
        if(res.data.status == 'accepted')
        {
          localStorage.setItem('infoUser', JSON.stringify(me.dataLogin));
          me.closeDialog();
          me.checkPermisson();
          common.markOff();
          me.$router.push('/DSTT');
        }
        else
        {
          me.$root.$children[0].showNoti('Mã bảo hiểm xã hội hoặc mật khẩu chưa chính xác');
        }
      })
    }
  },
  created()
  {
    let me = this;
    me.isLogin = true;
    me.checkPermisson = function()
    {
      // check quyền 
      let infoUser = localStorage.getItem('infoUser');
      if(!infoUser)
        me.isLogin = false;
      else
      {
        me.isLogin = null;
        me.isLogin = true;
        me.infoUser= JSON.parse(infoUser);
      }
    }

    me.checkPermisson();
  },
  mounted(){
  },
  data()
  {
    return{
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
      showMenu: false
    }
  }
}
</script>

<style>
@import url('../assets/css/templateCommon.css');
</style>