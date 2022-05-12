<template>
  <div id="LSKH">
      <div class="title-list">
          Lịch sử kê khai
      </div>
      <div class="filter-bar">
          <div class="filter-item">
              <m-input @inputEvent="searchProfile" placeholder="Nhập mã hồ sơ" v-model="param.codeOrNameProfile" paddingRight='20px'/>
              <img src="../assets/img/find.png" alt="" class="find-icon">
          </div>
          <div class="filter-item">
              <m-input type="date" placeholder="dd/mm/yyyy" v-model="param.dateSubmit" />
          </div>
      </div>
      <div class="list">
          <table>
              <thead>
                  <tr>
                      <th style="width: 40px">STT</th>
                      <th style="width: 100px">Mã loại hồ sơ</th>
                      <th style="width: 300px">Loại hồ sơ</th>
                      <th style="width: 100px">Mã hồ sơ</th>
                      <th style="width: 100px">Trạng thái</th>
                      <th style="width: 100px">Ngày nộp hồ sơ</th>
                      <th style="width: 40px"></th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in listDisplay" :key="index">
                      <td>{{index + 1}}</td>
                      <td>{{item.profileCodeType}}</td>
                      <td>{{convertNameProfile(item)}}</td>
                      <td>{{item.profileCode}}</td>
                      <td>{{formatProfileStatus(item.profileStatus)}}</td>
                      <td>{{item.profileCreatedDate}}</td>
                      <td>
                          <i class="fas fa-eye" style="cursor: pointer" @click="goWatchForm(item)"></i>
                          <img src="../assets/img/edit.png" v-if="listHaveDevelop.indexOf(item.profileCodeType) == -1 && item.profileStatus == 0"  @click="featureDeveloping('history')" alt="" style="cursor: pointer; width: 20px; height: 20px;margin-left: 5px">
                          <img src="../assets/img/edit.png" v-if="listHaveDevelop.indexOf(item.profileCodeType) != -1 && item.profileStatus == 0"  @click="goUpdateForm(item)" alt="" style="cursor: pointer; width: 20px; height: 20px;;margin-left: 5px">
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import mInput from '../components/minput.vue'
import commonJs from '../js/common'

export default {
    name: 'DSTT',
    created(){
      let me = this;

      me.checkPermisson = function()
        {
            // check quyền 
            debugger;
            let infoUser = localStorage.getItem('infoUser');
            if(!infoUser)
            {
                me.$router.push('/Home');
                return false;
            }
        }

        // if(!me.checkPermisson())
        //     return;

      let headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
        };
      let infoUser = JSON.parse(localStorage.getItem('infoUser'));
      axios
      .get(`${commonJs.doMainApi}/BHXH/profile?bhxhCode=${infoUser.bhxn_code}`,{headers})
      .then(res => {
            me.listProfile = res.data;
            me.listDisplay = res.data;
        })
    },
    components: {
        mInput
    },
    computed:{
        
    },
    methods:{
        goWatchForm(item)
        {
            let routerGo = '/' + item.profileCodeType + '/2' + '/' + item.profileId;
            this.$router.push(routerGo);
        },
        goUpdateForm(item)
        {
            let routerGo = '/' + item.profileCodeType + '/1' + '/' + item.profileId;
            this.$router.push(routerGo);
        },
        featureDeveloping(nameField)
        {
            let me = this;
            if(nameField == 'history')
                me.$root.$children[0].showNoti('Tính năng đang được phát triển.');
            else
                me.$root.$children[0].showNoti('Biểu mẫu thủ tục đang được phát triển.');
        },
        formatProfileStatus(status)
        {
            let stringStatus = '';
            switch(status)
            {
                case 0:
                    stringStatus = 'Chờ tiếp nhận';
                    break;
                case 1:
                    stringStatus = 'Đã tiếp nhận';
                    break;
                case 2:
                    stringStatus = 'Chấp nhận hồ sơ';
                    break;
                case 3:
                    stringStatus = 'Từ chối hồ sưo';
                    break;
                default:
                    break;
            }
            return stringStatus;
        },
        formatProfileTypeCode(TypeCode)
        {
            let stringFormated = '';
            switch(TypeCode)
            {
                case '602b':
                    stringFormated = 'Đăng ký, đăng ký lại (bao gồm cả đóng bù cho thời gian chưa đóng), điều chỉnh phương thức đóng, căn cứ đóng BHXH tự nguyện';
                    break;
                default:
                    break;
            }
            return stringFormated;
        },
        convertNameProfile(item)
        {
            switch(item.profileCodeType)
            {
                case '602a':
                    return "Tờ khai đăng ký tải khoản giao diện điện tử bảo hiểm xã hội";
                case '602b':
                    return "Đăng ký, đăng ký lại (bao gồm cả đóng bù cho thời gian chưa đóng), điều chỉnh phương thức đóng, căn cứ đóng BHXH tự nguyện";
                case '608a':
                    return "Cấp lại sổ BHXH do thay đổi thông tin";
                case '612a':
                    return "Cấp lại, đổi thẻ BHYT do mất, hỏng không thay đổi thông tin";
                case '612b':
                    return "Cấp lại, đổi thẻ BHYT do thay đổi thời điểm đủ 05 năm liên tục, nơi KCB ban đầu";
                case '612c':
                    return "Cấp lại, đổi thẻ BHYT do thay đổi thông tin về nhân thân, mã đối tượng, mã quyền lợi, mã nơi đối tượng sinh sống";
            }
            
        },
        searchProfile(value)
        {
            let me = this;
            me.listDisplay = me.listProfile.filter(item => {
                return item.id.includes(value) || item.nameService.includes(value);
            })
        },
        convertDateToString(date)
        {
            return date.getFullYear() + '-' + (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):(date.getMonth()+1)) + '-' + date.getDate()
        }
    },
    data()
    {
        return {
            listHaveDevelop: ['608a','612a'],
            // param lọc danh sách
            param: {
                codeOrNameProfile: '',
                dateSubmit: this.convertDateToString(new Date())
            },
            listProfile: [
                
            ],
            listDisplay: [
               
            ],
        }
    }
}
</script>

<style>
@import url('../assets/css/LSKH.css');
</style>