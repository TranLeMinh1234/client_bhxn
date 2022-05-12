<template>
    <div id="Hp">
        <div class="bg-table">
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Thời gian đóng tiền</th>
                        <th>Tổng số tiền</th>
                        <th>Số tháng đóng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        <td>{{index + 1}}</td>
                        <td>
                            <span>{{item.paymentDate}}</span>
                        </td>
                        <td style="display: flex">
                            <span>{{item.paymentPayMethod * item.paymentAmountPerMonth}}</span>
                            <span style="text-align: right; flex: 1">VND</span>
                        </td>
                        <td>{{item.paymentPayMethod + " tháng"}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import combobox from '../components/combobox.vue';
import commonJS from '../js/common';
import mInput from '../components/minput.vue';
import axios from 'axios';

export default {
    name: "HP",
    components:{},
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

        me.checkPermisson()
        
        let headers = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                        'Content-Type': 'application/json',
                    };

        let infoUser = JSON.parse(localStorage.getItem('infoUser'));
        axios.get(`${commonJS.doMainApi}/BHXH/payment/history?bhxhCode=${infoUser.bhxn_code}`,{headers})
        .then(res => {
          me.items = res.data;
        });
    },
    data(){
        return {
            items: []
        }
    }
}
</script>

<style scoped>
@import url('../assets/css/Hp.css');
</style>