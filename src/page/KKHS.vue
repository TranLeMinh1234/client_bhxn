<template>
  <div id="KKHS">
      <div class="tabs">
          <div class="feature-tabs">
              <img @click="showCloseMenu" src="https://dichvucong.baohiemxahoi.gov.vn/assets/images/btn_menu.svg" alt="" style="width: 15px;height: 20px;">
          </div>
          <router-link @click.native="changeTab(1)" to="/DSTT" :class="['item-tab', tabActive == 1? 'active-tab':'']">
            <img src="https://dichvucong.baohiemxahoi.gov.vn/assets/images/dsthutuc_white.svg" alt="">
            Danh sách thủ tục
          </router-link>
          <router-link @click.native="changeTab(2)" to="/LSKH" :class="['item-tab', tabActive == 2? 'active-tab':'']">
            <img src="https://dichvucong.baohiemxahoi.gov.vn/assets/images/lichsukekhai_white.svg" alt="">
            Lịch sử kê khai
          </router-link>
      </div>
      <div class="content-tab">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
import BasePage from '../page/BasePage.vue'

export default {
    name:'KKHS',
    extends: BasePage,
    data() {
        return {
            isShowMenu: true,
            tabActive: 1
        }
    },
    created()
    {
        let me = this;
        // check quyền 
        let infoUser = localStorage.getItem('infoUser');
        if(!infoUser)
        {
            me.$router.push('/Home');
        }
    },
    methods: {
        changeTab(tabIndex){
            this.tabActive = tabIndex;
        },
        showCloseMenu()
        {
            let featureTabs = document.querySelector('.tabs');
            if(this.isShowMenu)
            {
                featureTabs.animate(
                    [
                        {
                            width: '20%'
                        },
                        {
                            width: '1.8%'
                        }
                    ],
                    {
                        duration: 300,
                        fill: 'forwards'
                    }
                )
            }
            else
            {
                featureTabs.animate(
                    [
                        {
                            width: '1.8%'
                        },
                        {
                            width: '20%'
                        }
                    ],
                    {
                        duration: 300,
                        fill: 'forwards'
                    }
                )
            }


            this.isShowMenu = !this.isShowMenu;
        }
    },
}
</script>

<style>
@import url('../assets/css/KKHS.css');
</style>