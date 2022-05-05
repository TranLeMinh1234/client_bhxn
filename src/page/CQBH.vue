<template>
  <div id="CQBH">
    <div class="list-bg">
        <table> 
            <thead>
                <tr>    
                    <th>Mã hồ sơ</th>
                    <th>Tên hồ sơ</th>
                    <th>Thời gian nộp</th>
                    <th>Trạng thái hồ sơ</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in listData" :key="index">
                    <td>{{item.profileCode}}</td>
                    <td>{{convertNameProfile(item)}}</td>
                    <td>{{item.profileCreatedDate}}</td>
                    <td>{{covertStringStatus(item.profileStatus)}}</td>
                    <td>
                        <button v-show="item.profileStatus == 0" @click="receive(item.profileId)" >Tiếp nhận</button>
                        <button v-show="item.profileStatus == 1" @click="accepted(item.profileId,index)">Chấp nhận hồ sơ</button>
                        <button v-show="item.profileStatus == 1" @click="reject(item.profileId,index)">Từ chối hồ sơ</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import commonJS from '../js/common';
export default {
  created()
  {
      let me = this;
        let headers = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                        'Content-Type': 'application/json',
                    };
      axios.get(`${commonJS.doMainApi}/BHXH/registerqueue`,{headers}).then(res => {
          me.listData = res.data;
        })
  },
  // components: {minputVue},
  methods: {
    reject(id,index)
    {
        let me = this;
        let headers = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                        'Content-Type': 'application/json',
                    };
        axios.post(`${commonJS.doMainApi}/BHXH/registerqueue?profileId=${id}&action=reject`,{headers}).then(res => {
            console.log(res.data.status)
             if(res.data.status == "reject")
             {
                me.listData.forEach(data => {
                     if(data.profileId == id)
                        data.profileStatus = 3;
                 })
             }
        })
    },
    accepted(id,index)
    {
        let me = this;
        let headers = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                        'Content-Type': 'application/json',
                    };
        axios.post(`${commonJS.doMainApi}/BHXH/registerqueue?profileId=${id}&action=verified`,{headers}).then(res => {
             if(res.data.status == "verified")
             {
                me.listData.splice(index,1);
             }
        })
    },
    receive(id)
    {
        let me = this;
        let headers = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                        'Content-Type': 'application/json',
                    };
        axios.post(`${commonJS.doMainApi}/BHXH/registerqueue?profileId=${id}&action=receive`,{headers}).then(res => {
             if(res.data.status == "receive")
             {
                 me.listData.forEach(data => {
                     if(data.profileId == id)
                        data.profileStatus = 1;
                 })
             }
        })
    },

    convertNameProfile(item)
    {
        switch(item.profileCodeType)
        {
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
    covertStringStatus(status)
    {
        switch(status)
        {
            case 0:
                return "Chờ tiếp nhận";
            case 1:
                return "Đã tiếp nhận";
            case 2:
                return "Chấp nhận hồ sơ";
            case 3:
                return "Từ chối hồ sơ";
        }
    },
    convertDateToString(date)
    {
        return date.getFullYear() + '-' + (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):(date.getMonth()+1)) + '-' + date.getDate()
    }
  },
  data(){
    return {
        listData: 
        [
            {
                profileCode: '',
            },
            {

            }
        ]
    };
  }
}
</script>

<style>
@import url('../assets/css/CQBH.css');
</style>