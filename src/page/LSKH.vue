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
                      <td>{{index}}</td>
                      <td>{{item.profileCodeType}}</td>
                      <td>{{formatProfileTypeCode(item.profileCodeType)}}</td>
                      <td>{{item.profileCode}}</td>
                      <td>{{formatProfileStatus(item.profileStatus)}}</td>
                      <td>{{convertDateToString(item.profileCreatedDate)}}</td>
                      <td><img src="../assets/img/edit.png" alt="" style="cursor: pointer; width: 20px; height: 20px"></td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import mInput from '../components/minput.vue'

export default {
    name: 'DSTT',
    components: {
        mInput
    },
    computed:{
        
    },
    methods:{
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
            // param lọc danh sách
            param: {
                codeOrNameProfile: '',
                dateSubmit: this.convertDateToString(new Date())
            },
            listProfile: [
                {
                    id: 1,
                    profileCodeType: '602b',
                    profileCode: 'PF1',
                    profileStatus: 0,
                    profileCreatedDate: new Date(),
                },
                {
                    id: 2,
                    profileCodeType: '602b',
                    profileCode: 'PF2',
                    profileStatus: 0,
                    profileCreatedDate: new Date(),
                },
                {
                    id: 3,
                    profileCodeType: '602b',
                    profileCode: 'PF3',
                    profileStatus: 0,
                    profileCreatedDate: new Date(),
                },
                {
                    id: 4,
                    profileCodeType: '602b',
                    profileCode: 'PF4',
                    profileStatus: 0,
                    profileCreatedDate: new Date(),
                },
                {
                    id: 5,
                    profileCodeType: '602b',
                    profileCode: 'PF5',
                    profileStatus: 0,
                    profileCreatedDate: new Date(),
                }
            ],
            listDisplay: [
                {
                    id: 1,
                    profileCodeType: '602b',
                    profileCode: 'PF1',
                    profileStatus: 0,
                    profileCreatedDate: new Date(),
                },
                {
                    id: 2,
                    profileCodeType: '602b',
                    profileCode: 'PF2',
                    profileStatus: 0,
                    profileCreatedDate: new Date(),
                },
                {
                    id: 3,
                    profileCodeType: '602b',
                    profileCode: 'PF3',
                    profileStatus: 0,
                    profileCreatedDate: new Date(),
                },
                {
                    id: 4,
                    profileCodeType: '602b',
                    profileCode: 'PF4',
                    profileStatus: 0,
                    profileCreatedDate: new Date(),
                },
                {
                    id: 5,
                    profileCodeType: '602b',
                    profileCode: 'PF5',
                    profileStatus: 0,
                    profileCreatedDate: new Date(),
                }
            ],
        }
    }
}
</script>

<style>
@import url('../assets/css/LSKH.css');
</style>