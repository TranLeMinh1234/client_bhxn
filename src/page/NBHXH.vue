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
        <div>Phương thức đóng hiện tại:</div><div class="value-input">{{currentPayMethod2 + " Tháng"}}</div>
      </div>
       <div class="line-input" v-show="!dataLoad.paymentState.startDate">
        <div>Phương thức đóng hiện tại:</div><div class="value-input"><combobox v-model="currentPayMethod2" :dataStore="dataMethod" displayField="displayField" valueField="valueField" /></div>
      </div>
      <div class="line-input" v-show="dataLoad.paymentState.startDate && !isSubmitServer && ((isRedeem == false && isPaid == true) || (isRedeem == false && isPaid == false))">
        <div>Mức đóng hiện tại:</div><div class="value-input">{{dataLoad.currentPayAmount + " đ"}}</div>
      </div>
      <div class="line-input" v-show="!dataLoad.paymentState.startDate">
        <div>Mức đóng hiện tại:</div><div class="value-input"><combobox v-model="dataLoad.currentPayAmount" :dataStore="dataRange" displayField="displayField" valueField="valueField" /></div>
      </div>
      <div class="line-input" v-show="(isRedeem == false && isPaid == false)"> 
        <div>Số tiền cần đóng:</div><div class="value-input">{{dataLoad.currentPayAmount * currentPayMethod2 + " đ"}}</div>
      </div>
      <div class="line-input" v-show="(isRedeem == false && !isPaid == true)"> 
        <div>Thời gian bắt đầu của kỳ hạn: </div><div class="value-input">{{dataLoad.timeStartPeriod}}</div>
      </div>
      <div class="line-input" v-show="(isRedeem == false && !isPaid == true)"> 
        <div>Thời gian kết thúc của kỳ hạn: </div><div class="value-input">{{dataLoad.timeEndPeriod}}</div>
      </div>
      <div class="line-input" v-show="(isRedeem == false && isPaid == false)"> 
        <div>Số tiền cần đóng:</div><div class="value-input">{{dataLoad.currentPayAmount * currentPayMethod2 + " đ"}}</div>
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
        <div  style="display: flex;margin-left: 20px" v-show="false">
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
        me.dataLoad = JSON.parse(res.data.status)

        if(!me.dataLoad.paymentState)
          me.dataLoad.paymentState = {}

        me.isRedeem = me.dataLoad.paymentState.isRedeem ? me.dataLoad.paymentState.isRedeem : me.isRedeem;
        me.isPaid = me.dataLoad.paymentState.isPaid? me.dataLoad.paymentState.isPaid : me.isPaid;
        me.currentPayMethod2 = me.dataLoad.currentPayMethod

        if(!me.isPaid) {
          me.dataLoad.timeStartPeriod = new Date()

        }
      })


    var url = window.location.hash;
    var c = url.substr(url.length - 1);
    if(c != null) {
      if(c == "1") {
        window.alert("Thanh toán thành công")
      } else if(c == "0") {
        window.alert("Thanh toán thất bại")
      } else if(c == "2") {
        window.alert("Tài khoản không đủ số dư")
      }
    }
  },
  watch: {
    currentPayMethod2: function() {
      let me = this;
      me.dataLoad.timeEndPeriod = new Date(me.dataLoad.timeStartPeriod);

      me.dataLoad.timeEndPeriod.setMonth(
        me.dataLoad.timeEndPeriod.getMonth() + me.currentPayMethod2
      );
    }
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

      let headers = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                        'Content-Type': 'application/json',
                    };
        
        let amount = me.dataLoad.currentPayAmount * me.currentPayMethod2;
        axios.post(`${common.doMainApi}/BHXH/payment?action=pay
          &amount=${amount}&bhxhCode=${me.dataLoad.bhxhCode}&paymentAmountPerMonth=${me.dataLoad.currentPayAmount}
          &paymentPayMethod=${me.currentPayMethod2}&bankcode=${me.bankName}`,{headers}
        )
        .then(res => {
          console.log(res);
          let response = JSON.parse(res.data.status);
          if(response.response_code == 200) {
            window.location.replace(response.paymentUrl);
            console.log(response.message)
          } else {
            alert(response.message);
          }
        });
    }
  },
  data(){
    return {
      accountNumber: '',
      isSubmitServer: false,
      currentPayMethod2: 0,
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
        },
        currentPayAmount: 0
      },
      bankName: 'Agriben',
      isPaid: true,
      isRedeem: false,
      dataBank: [
        {
          displayField: "Agriben",
          valueField: "Agriben"
        },
        {
          displayField: "Ngân hàng quốc dân",
          valueField: "NCB"
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