<template>
  <div id="NBHXH">
    <div class="primary-form">
      <div class="line-input">
        <div>Họ và tên:</div><div class="value-input">{{dataLoad.name}}</div>
      </div>
      <div class="line-input">
        <div>Mã bảo hiểm xã hội:</div><div class="value-input">{{dataLoad.bhxhCode}}</div>
      </div>
      <div class="line-input" v-show="isRedeem == true && isPaid == false">
        <div>Đền bù từ ngày: </div><div class="value-input">2022-04-12 đến 2022-04-12</div>
      </div>
      <div class="line-input" v-show="isRedeem == true && isPaid == false">
        <div>Số tiền cần đóng bù: </div><div class="value-input">1.000.000 đ</div>
      </div>
      <div class="line-input" v-show="dataLoad.latestPaymentDate && ((isRedeem == false && isPaid == true) || (isRedeem == false && isPaid == false))">
        <div>Thời gian cuối cùng đóng bảo hiểm:</div><div class="value-input">{{dataLoad.latestPaymentDate}}</div>
      </div>
      <div class="line-input" v-show="dataLoad.paymentState.startDate && ((isRedeem == false && isPaid == true) || (isRedeem == false && isPaid == false))">
        <div>Phương thức đóng hiện tại:</div><div class="value-input">{{dataLoad.currentPayMethod + " Tháng"}}</div>
      </div>
       <div class="line-input" v-show="!dataLoad.paymentState.startDate">
        <div>Phương thức đóng hiện tại:</div><div class="value-input"><combobox v-model="dataLoad.currentPayMethod" :dataStore="dataMethod" displayField="displayField" valueField="valueField" /></div>
      </div>
      <div class="line-input" v-show="dataLoad.paymentState.startDate && !isSubmitServer && ((isRedeem == false && isPaid == true) || (isRedeem == false && isPaid == false))">
        <div>Mức đóng hiện tại:</div><div class="value-input">{{dataLoad.currentPayAmount + " đ"}}</div>
      </div>
      <div class="line-input" v-show="!dataLoad.paymentState.startDate">
        <div>Mức đóng hiện tại:</div><div class="value-input"><combobox v-model="dataLoad.currentPayAmount" :dataStore="dataRange" displayField="displayField" valueField="valueField" /></div>
      </div>
      <div class="line-input" v-show="(isRedeem == false && isPaid == true)"> 
        <div>Số tiền cần đóng:</div><div class="value-input">{{dataLoad.currentPayAmount * dataLoad.currentPayMethod + " đ"}}</div>
      </div>
      <div class="line-input" v-show="(isRedeem == false && !isPaid == true)"> 
        <div>Thời gian bắt đầu của kỳ hạn: </div><div class="value-input">{{dataLoad.paymentState.startDate}}</div>
      </div>
      <div class="line-input" v-show="(isRedeem == false && !isPaid == true)"> 
        <div>Thời gian kết thúc của kỳ hạn: </div><div class="value-input">{{dataLoad.paymentState.endDate}}</div>
      </div>
      <div class="line-input" v-show="(isRedeem == false && isPaid == true)"> 
        <div>Số tiền cần đóng:</div><div class="value-input">{{dataLoad.currentPayAmount * dataLoad.currentPayMethod + " đ"}}</div>
      </div>
      <div class="line-input" style="color: green" v-show="isPaid && !isRedeem">
        <div>Bạn đã đóng bảo hiểm xã hội kì hạn từ ngày: </div><div class="value-input">{{dataLoad.paymentState.startDate}}</div>
        <div>đến ngày </div><div class="value-input">{{dataLoad.paymentState.endDate}}</div>
      </div>
      <div class="line-input" v-show="!isPaid" style="display: flex">
        <div style="display: flex">
          <div>Ngân hàng: </div><div class="value-input">
            <combobox v-model="bankName" displayField="displayField" valueField="valueField" :dataStore="dataBank" />
          </div>
        </div>
        <div  style="display: flex;margin-left: 20px">
          <div>Tài khoản: </div><div class="value-input">
            <m-input v-model="accountNumber"/>
          </div>
        </div>

      </div>
      <!-- <div class="line-input" v-show="isRedeem == false && isPaid == false">
        <div><strong><i style="color:red">Bạn đã tạm dừng đóng bảo hiểm xã hội từ dd/MM/yyyy</i></strong></div>
      </div> -->
      <div class="line-input btn-bar">
        <button class="btn-primary-form" v-show="isRedeem" @click="db">Đóng bù</button>
        <button class="btn-primary-form" v-show="!isPaid" @click="dm">Đóng mới</button>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import minputVue from '../components/minput.vue';
// import mInput from '../components/minput.vue';
import combobox from '../components/combobox.vue';
import common from '../js/common';
import mInput from '../components/minput.vue';

export default {
  created()
  {
    let me = this;
    me.isPaid = false;
    me.isRedeem = false;

    let headers = {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json',
                };
      me.infoUser = JSON.parse(localStorage.getItem('infoUser'));
      axios
      .get(`${common.doMainApi}/BHXH/payment/info?bhxhCode=${me.infoUser.bhxn_code}`,{headers})
      .then(res=>{
        console.log(res);
        me.dataLoad = JSON.parse(res.data.status)
        if(!me.dataLoad.paymentState)
          me.dataLoad.paymentState = {}
        me.isRedeem = me.dataLoad.paymentState.isRedeem ? me.dataLoad.paymentState.isRedeem : me.isRedeem;
        me.isPaid = me.dataLoad.paymentState.isPaid? me.dataLoad.paymentState.isPaid : me.isPaid;
      })
  },
  components: {combobox,mInput},
  methods: {
    convertDateToString(date)
    {
        return date.getFullYear() + '-' + (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):(date.getMonth()+1)) + '-' + date.getDate()
    },
    db()
    {
      let me = this;
      me.isPaid =  false;
      me.isRedeem =  true;
      me.isSubmitServer = true;
    },
    dm()
    {
      let me = this;
      me.isPaid =  true;
      me.isRedeem =  false;
      me.isSubmitServer = true;

      let headers = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                        'Content-Type': 'application/json',
                    };
        axios.post(`${common.doMainApi}/BHXH/payment`,{ 
            "action": "pay", 
            "accountNumber": me.accountNumber, 
            "money": me.dataLoad.currentPayAmount * me.dataLoad. currentPayMethod,
            "bhxhCode": me.dataLoad.bhxhCode, 
            "paymentAmountPerMonth": me.dataLoad.currentPayAmount, 
            "paymentPayMethod": me.dataLoad.currentPayMethod,
            "bankName": me.bankName,
        },{headers})
        .then(res => {
          console.log(res);
        });
    }
  },
  data(){
    return {
      accountNumber: '',
      isSubmitServer: false,
      dataLoad: {
        name: 'Trần Lê Minh',
        bhxhCode: 'BHXN001',
        timeLastSubmit: new Date(),
        methodSubmit: '1 tháng',
        RangeSubmit: 2000000,
        neededMoney: 3000000,
        timeStartPeriod: new Date(),
        timeEndPeriod: new Date(),
        paymentState: {
          startDate: new Date()
        }
      },
      bankName: 'Agriben',
      isPaid: true,
      isRedeem: false,
      dataBank: [
        {
          displayField: "Agriben",
          valueField: "Agriben"
        }
      ],
      dataMethod: [
        {
          displayField: '1 tháng',
          valueField: 1
        },
        {
          displayField: '3 tháng',
          valueField: 3
        },
        {
          displayField: '6 tháng',
          valueField: 6
        }
      ],
      dataRange: [
        {
          displayField: '1.000.000 đ',
          valueField: 1000000
        },
        {
          displayField: '3.000.000 đ',
          valueField: 3000000
        },
        {
          displayField: '6.000.000 đ',
          valueField: 6000000
        }
      ]
    };
  }
}
</script>

<style>
@import url('../assets/css/NBHXH.css');
</style>