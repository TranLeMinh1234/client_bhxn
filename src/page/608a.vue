<template>
  <div id="a608">
      <div class="title-list">
          608a - Cấp lại sổ BHXH, thẻ BHYT do thay đổi thông tin nhân thân
      </div>
      <div class="element-form warning">
          <strong>Lưu ý</strong>: Chỉ cập nhật thông tin những chỉ tiêu có thay đổi.
      </div>
      <div class="element-form">
          <div class="line-input">
              <div class="line-item">
                  <div class="title-field">[13]. Mã số BHXH:</div>
                  <m-input :mode="mode" v-model="tempSaveData.bhxhCodeNew" placeholder="Mã bảo hiểm xã hội" />
              </div>
              <div class="line-item">
                  <div class="title-field">[14]. Điều chỉnh thông tin cá nhân:</div>
              </div>
          </div>
          <div class="line-input">
              <div class="line-item">
                  <div class="title-field">[14.1]. Họ và tên (viết chữ in hoa): </div>
                  <m-input v-model="tempSaveData.nameUser" placeholder="Họ và tên" :mode="mode"/>
              </div>
              <div class="line-item">
                  <div class="title-field">[14.2]. Giới tính: </div>
                  <div style="display: flex;align-items: flex-start;">
                      <input type="radio" value="1"  v-model="tempSaveData.gender"/>Nam
                  </div>
                  <div style="display: flex;align-items: flex-start;">
                      <input type="radio" value="0" v-model="tempSaveData.gender" style="margin-left: 20px" />Nữ
                  </div>
              </div>
          </div>
          <div class="line-input">
              <div class="line-item">
                  <div class="title-field">[14.4]. Nơi đăng ký khai sinh:</div>
                  <div style="width: 130px"><combobox :mode="mode" v-model="tempSaveData.tp" displayField="displayField" valueField="valueField" :dataStore="dataCity" /></div>
                  <div style="width: 130px;margin-left:20px"><combobox :mode="mode" v-model="tempSaveData.h" displayField="displayField" valueField="valueField" :dataStore="dataH"/></div>
                  <div style="width: 130px;margin-left:20px"><combobox :mode="mode" v-model="tempSaveData.x" displayField="displayField" valueField="valueField" :dataStore="dataX" /></div>
              </div>
          </div>
          <div class="line-input">
              <div class="line-item" style="width: 630px">
                  <div class="title-field">[14.5]. Số CMND/CCCD/Hộ chiếu: </div>
                  <m-input :mode="mode" v-model="tempSaveData.CMND" placeholder="Số căn cước công dân/chứng minh nhân dân/hộ chiếu"/>
              </div>
          </div>
          <div class="line-input">
              <div class="line-item">
                  <div class="title-field">[15]. Mức tiền đóng: </div>
                  <m-input type="number" :mode="mode" v-model="tempSaveData.amountOfMoney" placeholder="Mức tiền đóng"/>
              </div>
               <div class="line-item">
                  <div class="title-field">[16]. Phương thức đóng: </div>
                  <combobox :mode="mode" v-model="tempSaveData.methodSubmit" placeholder="Chọn phương thức" displayField="displayField" valueField="valueField" :dataStore="dataMethodSubmit" />
              </div>
          </div>
          <div class="line-input">
              <div class="line-item">
                  <div class="title-field">[17]. Nơi đăng ký khám, chữa bệnh ban đầu: </div>
                  <div style="width: 200px"><combobox :mode="mode" v-model="tempSaveData.province" placeholder="Chọn thành phố" displayField="displayField" valueField="valueField" :dataStore="dataCity" /></div>
                  <div style="width: 190px;margin-left:20px;padding-top:4px"><m-input v-model="tempSaveData.hospital" placeholder="Chọn bệnh viện" /></div>
              </div>
          </div>
           <div class="line-input">
              <div class="line-item" style="width: 800px">
                  <div class="title-field" >[18]. Nội dung thay đổi, yêu cầu khác: </div>
                  <m-input :mode="mode" v-model="tempSaveData.other" />
              </div>
          </div>
      </div>
      <div class="line-input">
            <button class="sumbit-btn" style="margin: auto" v-if="mode == 'add'" @click="saveData">Ghi nhận</button>
            <button class="sumbit-btn" style="margin: auto" v-if="mode == 'update'" @click="updateData">Cập nhật</button>
        </div>
        <div style="height: 100px"></div>
  </div>
</template>

<script>
import mInput from '../components/minput.vue'
import combobox from '../components/combobox.vue'
import axios from 'axios';
import commonJS from '../js/common.js';
import Toast from '../js/toastFunc.js'

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
                me.$route.push('/Home')
        }

        me.checkPermisson();
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
                profileCodeType: "608a",
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
                if(response.data.status == 'This bhxh code is already exist')
                {
                    me.$root.$children[0].showNoti('Mã bảo hiểm xã hội đã tồn tại!');
                }
                else if(response.data.status.indexOf("success") != -1)
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
                bhxhCodeNew: '',
                nameUser: '',
                gender: 1,
                tp: '',
                h: '',
                x: '',
                CMND: '',
                amountOfMoney: 0,
                methodSubmit: 1,
                province:'',
                hospital: '',
                other: 'Cấp lại sổ BHXH, thẻ BHYT do thay đổi thông tin nhân thân',
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
@import url('../assets/css/608a.css');
</style>