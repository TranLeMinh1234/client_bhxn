<template>
  <div id="DK">
      <div class="title-DK">Tờ khai đăng ký tài khoản</div>
      <validateObserve ref="observe">
        <div class="line-input">
            <div class="title-field">Họ và tên*:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.name_user" rules="required" placeholder="Họ và tên"/>
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Mã số bảo hiểm xã hội*:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.bhxh_code" rules="required" placeholder="Mã bảo hiểm xã hội"/>
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Số CCCD/CMND/Hộ chiếu*:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.CMND" rules="required" placeholder="Số căn cước công dân/chứng minh nhân dân/hộ chiếu"/>
            </div>
        </div>
        <div class="line-input" style="height:20px">
            <div class="title-field">Địa chỉ liên hệ*:</div>
            <div style="width: 150px" >
                <combobox v-model="tempSaveData.tp" placeholder="Thành phố" query="local" displayField="displayField" valueField="valueField" :dataStore="dataCity"/>
            </div>
            <div style="width: 105px;margin-left: 20px">
                <combobox v-model="tempSaveData.h" placeholder="Huyện" query="local" displayField="displayField" valueField="valueField" :dataStore="dataH"/>
            </div>
            <div style="width: 105px;margin-left: 20px">
                <combobox v-model="tempSaveData.x" placeholder="Xã" query="local" displayField="displayField" valueField="valueField" :dataStore="dataX"/>
            </div>
        </div>
        <div class="line-input" style="height:20px">
            <div style="width: 400px;margin-left: 180px;padding-top:20px">
                <minput placeholder="Địa chỉ chi tiết" v-model="tempSaveData.address_detail" rules="required"/>
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Số chứng thư số của cơ quan, tổ chức, cá nhân:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.cts" placeholder="Số chứng thư số"/>
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Địa chỉ thư điện tử:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.email" placeholder="Địa chỉ Email"/>
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Điện thoại di động*:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.phone" rules="required" placeholder="Số điện thoại"/>
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Đăng ký giao dịch tại*</div>
            <div style="width: 400px;font-size:16px">
                <input type="radio" value="1" v-model="tempSaveData.transacWhere"> Cổng thông tin điện tử của Bảo hiểm xã hội Việt Nam <br/>
                <input type="radio" value="0" disabled> Tổ chức I-VAN
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Chọn cơ quan BHXH tiếp nhận*:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.bhxh_cq" rules="required" placeholder="Cơ quan tiếp nhận hồ sơ"/>
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Chọn hình thức nộp hồ sơ:</div>
            <div style="width: 400px;font-size:16px">
                <input type="radio" value="1" v-model="tempSaveData.submit_method"> Cổng thông tin điện tử của Bảo hiểm xã hội Việt Nam <br/>
                <input type="radio" value="0" disabled> Tổ chức I-VAN
            </div>
        </div>
        <div class="line-input">
            <div class="title-field" >Chân dung 4*6*:</div>
            <div style="width: 400px;font-size:12px">
                <input type="file" @change="img46Picked">
            </div>
        </div>
        <div class="line-input">
            <div class="title-field" >Ảnh CMND mặt trước*:</div>
            <div style="width: 400px;font-size:12px">
                <input type="file" @change="imgCMNDFrontPicked">
            </div>
        </div>
        <div class="line-input">
            <div class="title-field" @change="imgCMNDBackPicked">Ảnh CMND mặt sau*:</div>
            <div style="width: 400px;font-size:12px">
                <input type="file" @change="imgCMNDBackPicked">
            </div>
        </div>
        <div class="line-input">
            <button class="sumbit-btn" @click="saveData">Ghi nhận</button>
        </div>
        <div style="height: 100px"></div>
      </validateObserve>
  </div>
</template>

<script>
import minput from '../components/minput.vue'
import combobox from '../components/combobox.vue'
import validateObserve from '../components/validateObserve.vue'
import Toast from '../js/toastFunc.js'
// import axios from 'axios';

export default {
    name:'DK',
    components:{minput,combobox,validateObserve},
    created()
    {
        // axios({
        //     method: 'get',
        //     url: 'http://dd3c-14-231-204-241.ngrok.io/BHXH/login?bhxh_code=4287fja4234&acc_password=123456',
        //     headers: {
        //         "Content-Length": 21,
        //         "Content-Type": "application/json;charset=ISO-8859-1",
        //         Date: "Wed, 23 Mar 2022 17:45:22 GMT",
        //         "Ngrok-Agent-Ips": "14.231.204.241",
        //     }
        // }).then(res=>{console.log(res)})

        // let me = this;
        // // check quyền 
        // let infoUser = localStorage.getItem('infoUser');
        // if(!infoUser)
        //     me.$router.push('/Home')
    },
    methods: {
        saveData()
        {
            let me = this;
            Toast.callToast("Nộp tờ khai thành công","success");
            let isValid = me.$refs.observe.validateComponent();
            if(me.tempSaveData.img46 == null || me.tempSaveData.imgFront == null || me.tempSaveData.imgBack == null )
                isValid = false;
                
            if(!isValid)
                return;
            return {
                id: 0,
                profile_type_code: '602a',
                created_date: new Date(),
                dataJson: JSON.stringify(me.tempSaveData),
                bhxn_code: me.tempSaveData.bhxn_code
            }
        },
        img46Picked(event)
        {
            let me =this;
            me.tempSaveData.img46 = event.target.files[0].name;
        },
        imgCMNDFrontPicked(event)
        {
            let me =this;
            me.tempSaveData.imgFront = event.target.files[0].name;
        },
        imgCMNDBackPicked(event)
        {
            let me =this;
            me.tempSaveData.imgBack = event.target.files[0].name;
        },
        
    },
    data()
    {
        return {
            tempSaveData:{
                name_user: '',
                bhxn_code: '',
                CMND: '',
                tp: '',
                h: '',
                x:'',
                cts: '',
                email: '',
                phone: '',
                address_detail: '',
                transacWhere: 1,
                bhxh_cq: '',
                submit_method: 1,
                img46: null,
                imgFront: null,
                imgBack: null
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
        }
    }
}
</script>

<style scope>
@import url('../assets/css/DK.css');

.arrow-combobox{
    border-width: 0px 0px 1px 0px;
    border-style: solid;
    border-color: black;
    text-align: center;
    width: 10%;
    font-size: 12px;
}

.input-combobox{
    width: 90%;
    border-width: 0px 0px 1px 0px;
    border-style: solid;
    border-color: black;
    outline: none;
    font-size: 16px;
    height: 100%;
    padding-bottom: 7px;
}

.dropdown
{
    position: absolute;
    max-height: 180px;
    width: 120%;
    box-shadow: 0px 0px 10px gray;
    z-index: 999999;
    overflow-y: scroll;
    display: block;
    margin-top: 8px;
    background-color: white;
}

.inValid-arrow{
    border-color: red !important;
    border-width: 0px 0px 1px 0px !important;
    border-style: solid !important;
}
</style>