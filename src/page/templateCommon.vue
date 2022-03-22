<template>
  <div id="templateCommon">
      <div class="header-home">
        <img class="logo" src="https://dichvucong.baohiemxahoi.gov.vn/assets/images/logo_text.svg" alt="">
        <div class="btn-bar-home">
          <button  @click="openDialog()">Đăng nhập</button>
          <button>Đăng ký</button>
        </div>
      </div>
      <dir class="nav-bar">
          <router-link to="/DSTT" class="item-nav">Kê khai hồ sơ</router-link>
          <router-link to="/NBHXNDT" class="item-nav">Nộp BHXN điện tử</router-link>
      </dir>
      <div class="body-content">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
@import url('../assets/css/templateCommon.css');
</style>