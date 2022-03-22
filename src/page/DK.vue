<template>
  <div id="DK">
      <div class="title-DK">Tờ khai đăng ký tài khoản</div>
      <validateObserve ref="observe">
        <div class="line-input">
            <div class="title-field">Họ và tên*:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.name_user" rules="required" />
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Mã số bảo hiểm xã hội*:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.bhxh_code" rules="required"/>
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Số CCCD/CMND/Hộ chiếu*:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.CMND" rules="required"/>
            </div>
        </div>
        <div class="line-input" style="height:20px">
            <div class="title-field">Địa chỉ liên hệ*:</div>
            <div style="width: 150px" >
                <combobox v-model="tempSaveData.tp"  query="local" displayField="displayField" valueField="valueField" :dataStore="dataCity"/>
            </div>
            <div style="width: 105px;margin-left: 20px">
                <combobox v-model="tempSaveData.h" query="local" displayField="displayField" valueField="valueField" :dataStore="dataH"/>
            </div>
            <div style="width: 105px;margin-left: 20px">
                <combobox v-model="tempSaveData.x" query="local" displayField="displayField" valueField="valueField" :dataStore="dataX"/>
            </div>
        </div>
        <div class="line-input" style="height:20px">
            <div style="width: 400px;margin-left: 180px;padding-top:20px">
                <minput v-model="tempSaveData.address_detail" rules="required"/>
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Số chứng thư số của cơ quan, tổ chức, cá nhân:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.cts"/>
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Địa chỉ thư điện tử:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.email"/>
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Điện thoại di động*:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.phone" rules="required" />
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Đăng ký giao dịch tại*</div>
            <div style="width: 400px;font-size:12px">
                <input type="radio" value="1" v-model="tempSaveData.transacWhere"> Cổng thông tin điện tử của Bảo hiểm xã hội Việt Nam <br/>
                <input type="radio" value="0" disabled> Tổ chức I-VAN
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Chọn cơ quan BHXH tiếp nhận*:</div>
            <div style="width: 400px">
                <minput v-model="tempSaveData.bhxh_cq" rules="required"/>
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Chọn hình thức nộp hồ sơ:</div>
            <div style="width: 400px;font-size:12px">
                <input type="radio" value="1" v-model="tempSaveData.submit_method"> Cổng thông tin điện tử của Bảo hiểm xã hội Việt Nam <br/>
                <input type="radio" value="0" disabled> Tổ chức I-VAN
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Chân dung 4*6*:</div>
            <div style="width: 400px;font-size:12px">
                <input type="file">
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Ảnh CMND mặt trước*:</div>
            <div style="width: 400px;font-size:12px">
                <input type="file" >
            </div>
        </div>
        <div class="line-input">
            <div class="title-field">Ảnh CMND mặt sau*:</div>
            <div style="width: 400px;font-size:12px">
                <input type="file" >
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

export default {
    name:'DK',
    components:{minput,combobox,validateObserve},
    methods: {
        saveData()
        {
            let me = this;
            let isValid = me.$refs.observe.validateComponent();
            if(!isValid)
                return;
            return {
                id: 0,
                profile_type_code: '602a',
                created_date: new Date(),
                dataJson: JSON.stringify(me.tempSaveData),
                bhxn_code: me.tempSaveData.bhxn_code
            }
        }
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
    font-size: 10px;
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
</style>