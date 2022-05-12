<template>
  <div id="a612">
      <div class="title-list">
          612a - Cấp lại thẻ BHYT do hỏng, mất
      </div>
      
      <div class="element-form">
          <div class="line-input">
              <div class="line-item item-card">
                  <div class="card">
                    <h4>THÔNG TIN THẺ</h4>
                    <div style="display: flex;align-items: center">
                        <div style="text-align: center;line-height: 80px;width: 60px;height: 60px;border-radius: 30px;background-color: #bdcacf">
                            <i class="fas fa-user" style="font-size: 45px"></i>
                        </div>
                        <div style="font-size: 14px; padding-left: 10px">
                            <div>Thời hạn có giá trị</div>
                            <div>Đến ngày</div>
                        </div>
                    </div>
                    <div style="border-bottom: 1px solid silver; width: 100%;padding-top: 20px"></div>
                    <div style="padding-top: 10px">Mã số BHXN</div>
                    <div style="border-bottom: 1px solid silver; width: 100%;padding-top: 20px"></div>
                    <div style="padding-top: 10px">Số thẻ BHYT</div>
                    <div style="border-bottom: 1px solid silver; width: 100%;padding-top: 20px"></div>
                    <div style="padding-top: 10px">Nơi ĐKKCB BĐ</div>
                    <div style="border-bottom: 1px solid silver; width: 100%;padding-top: 20px"></div>
                    <div style="padding-top: 10px">Thời điểm 5 năm liên tục</div>
                    <div style="border-bottom: 1px solid silver; width: 100%;padding-top: 20px"></div>
                    <div style="padding-top: 10px"><strong>Quyền lợi</strong></div>
                  </div>
              </div>
          </div>
          
          <div style="padding-top: 10px"><strong>Địa chỉ nhận kết quả</strong></div>
          <div class="line-input">
              <div class="line-item">
                  <input v-model="tempSaveData.addressReceive" value="1" style="width: 20px;height: 20px" type="radio"><span style="padding-left: 20px">BP tiếp nhận hồ sơ và trả KQ</span>
                  <input v-model="tempSaveData.addressReceive" value="0" style="margin-left: 10px;width: 20px;height: 20px" type="radio"><span style="padding-left: 20px">Qua dịch vụ bưu chính  </span>
              </div>
          </div>
          <div class="line-input">
              <div class="line-item">
                  <div class="title-field">[14.4]. Nơi đăng ký khai sinh:</div>
                  <div style="width: 130px"><combobox v-model="tempSaveData.tp" displayField="displayField" valueField="valueField" :dataStore="dataCity" placeholder="Thành phố"/></div>
                  <div style="width: 130px;margin-left:20px"><combobox v-model="tempSaveData.h" displayField="displayField" valueField="valueField" :dataStore="dataH" placeholder="huyện"/></div>
                  <div style="width: 130px;margin-left:20px"><combobox v-model="tempSaveData.x" displayField="displayField" valueField="valueField" :dataStore="dataX" placeholder="xã"/></div>
              </div>
          </div>
           <div class="line-input">
              <div class="line-item" style="width: 800px">
                  <div class="title-field" >Lý do:</div>
                  <m-input v-model="tempSaveData.other" />
              </div>
          </div>
      </div>
      <div class="line-input">
            <button class="sumbit-btn" style="margin: auto" v-if="mode == 'add'" @click="saveData">Ghi nhận</button>
            <button class="sumbit-btn" style="margin: auto" v-if="mode == 'update'" @click="updateData">Cập nhật</button>
        </div>
        <div style="height: 200px"></div>
  </div>
</template>

<script>
import mInput from '../components/minput.vue'
import combobox from '../components/combobox.vue'
import Toast from '../js/toastFunc.js'
import commonJS from '../js/common.js';
import axios from 'axios';

export default {
    name: '608a',
    components: {
        mInput,
        combobox
    },
     created(){
        let me = this;

        me.checkPermisson = function()
        {
            // check quyền 
            let infoUser = localStorage.getItem('infoUser');
            if(!infoUser)
            {
                me.$router.push('/Home');
                return false;
            }
        }

        if(!me.checkPermisson())
            return;
            
        let idRecord = me.$route.params.id;
        if(idRecord)
        {
            // axios.get().then(res =>{console.log(res)});
            me.mode = "update";
        }
    },
    mounted(){
        let me = this;
        let idRecord = me.$route.params.id;
        switch(me.$route.params.mode)
        {
            case "0":
                me.mode = 'add';
                break;
            case "1":
                me.mode = 'update';
                break;
            case "2":
                me.mode = 'watch';
                break;
            default:
                break;
        }

        if(idRecord)
        {
            // axios.get().then(res =>{console.log(res)});
            let headers = {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json',
                };
            let infoUser = JSON.parse(localStorage.getItem('infoUser'));
            axios
            .get(`${commonJS.doMainApi}/BHXH/profile?profileId=${idRecord}`,{headers})
            .then(res => {
                me.tempSaveData = JSON.parse(res.data.profileData);
            })
        }
    },
    methods:{
        saveData()
        {
            let me = this;
            //Toast.callToast("Nộp tờ khai thành công","success");
            // let isValid = me.$refs.observe.validateComponent();
                
            // if(!isValid)
            //     return;

            let infoUser = JSON.parse(localStorage.getItem('infoUser'));
                
            let dataSave = {
                profileCodeType: "612a",
                profileData: me.tempSaveData,
                bhxhCode: infoUser.bhxn_code,
            }

            let headers = {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json',
                };
            axios.post(`${commonJS.doMainApi}/BHXH/profile`, dataSave, { headers })
            .then(response => {
                console.log(response);
                (response.data.status.indexOf("success") != -1)
                {
                    Toast.callToast('Nộp hồ sơ thành công',"success");
                }
            });
            // axios.post(`${common.doMainApi}/`)
        },
        updateData()
        {
            let me = this;
            me.$root.$children[0].showNoti('Tính năng đang được phát triển.');
        }
    },
    data()
    {
        return {
            mode: "add",
            tempSaveData: {
                tp: '',
                h: '',
                x: '',
                addressReceive: 1,
                other: 'Cấp lại thẻ BHYT do hỏng, mất',
            },
            dataCity: [
                {
                    displayField: 'Hà Nội',
                    valueField: 'Hà Nội',
                },
                {
                    displayField: 'Đà Nẵng',
                    valueField: 'Đà Nẵng',
                },
                {
                    displayField: 'TP.HCM',
                    valueField: 'TP.HCM',
                },
                {
                    displayField: 'Cần Thơ',
                    valueField: 'Cần Thơ',
                },
                {
                    displayField: 'Quảng Ninh',
                    valueField: 'Quảng Ninh',
                }
            ],
            dataH: [
                {
                    displayField: 'Thọ Xương',
                    valueField: 'Thọ Xương',
                },
                {
                    displayField: 'Mỹ Tho',
                    valueField: 'Mỹ Tho',
                },
                {
                    displayField: 'Phương Mai',
                    valueField: 'Phương Mai',
                },
                {
                    displayField: 'Thọ Châu',
                    valueField: 'Thọ Châu',
                },
                {
                    displayField: 'Thúy Kim',
                    valueField: 'Thúy Kim',
                }
            ],
            dataX: [
                {
                    displayField: 'Hữu Nghị',
                    valueField: 'Hữu Nghị',
                },
                {
                    displayField: 'Mỹ Hưng 2',
                    valueField: 'Mỹ Tho',
                },
                {
                    displayField: 'Thạch Nghị 1',
                    valueField: 'Thạch Nghị 1',
                },
            ],
            dataMethodSubmit: [
                {
                    displayField: '1 - Hàng tháng',
                    valueField: 1,
                },
                {
                    displayField: '3 - 03 Tháng',
                    valueField: 3,
                },
                {
                    displayField: '6 - 06 tháng',
                    valueField: 6,
                },
                {
                    displayField: '12 - 12 tháng',
                    valueField: 12,
                },
                {
                    displayField: 'TH - Còn thiếu',
                    valueField: 12,
                },
            ],
        }
    }
}
</script>

<style>
@import url('../assets/css/612a.css');
</style>