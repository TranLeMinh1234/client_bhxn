<template>
  <div id="DSTT">
      <div class="title-list">
          Danh sách thủ tục
      </div>
      <div class="filter-bar">
          <div class="filter-item">
              <m-input @inputEvent="searchProfile" placeholder="Nhập mã hoặc tên thủ tục" v-model="param.codeOrNameProfile"/>
              <img src="../assets/img/find.png" alt="" class="find-icon">
          </div>
      </div>
      <div class="list">
          <table>
              <thead>
                  <tr>
                      <th style="width: 40px">STT</th>
                      <th style="width: 40px">Kê khai</th>
                      <th style="width: 500px">Tên dịch vụ công</th>
                      <th style="width: 300px">Mã thủ tục</th>
                      <th style="width: 400px">Lĩnh vực</th>
                      <th style="width: 60px">Lịch sử</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in listDisplay" :key="index">
                      <td>{{item.STT}}</td>
                      <td style="cursor: pointer">
                          <router-link :to="item.serviceCode">
                              <img style="width: 20px;height: 20px;margin-left: 6px" src="../assets/img/kh.jpg" alt="">
                          </router-link>
                      </td>
                      <td>{{item.nameService}}</td>
                      <td>{{item.serviceCode}}</td>
                      <td>{{item.businessArea}}</td>
                      <td style="cursor: pointer">
                          <img style="width: 20px;height: 20px;margin-left: 6px" src="../assets/img/history.jpg" alt="">
                      </td>
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
    methods:{
        searchProfile(value)
        {
            let me = this;
            me.listDisplay = me.listProfile.filter(item => {
                return item.id.includes(value) || item.nameService.includes(value);
            })
        }
    },
    data()
    {
        return {
            // param lọc danh sách
            param: {
                codeOrNameProfile: ''
            },
            listProfile: [
                {
                    STT: 1,
                    id: '602b',
                    nameService: 'Đăng ký, đăng ký lại (bao gồm cả đóng bù cho thời gian chưa đóng), điều chỉnh phương thức đóng, căn cứ đóng BHXH tự nguyện',
                    serviceCode: '602b',
                    businessArea: 'Lĩnh vực thu Bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp',
                },
                {
                    STT: 2,
                    id: '608a',
                    nameService: 'Cấp lại sổ BHXH do thay đổi thông tin',
                    serviceCode: '608a',
                    businessArea: 'Lĩnh vực cấp sổ bảo hiểm xã hội, thẻ bảo hiểm y tế',
                },
                {
                    STT: 3,
                    id: '612b',
                    nameService: 'Cấp lại, đổi thẻ BHYT do mất, hỏng không thay đổi thông tin',
                    serviceCode: '612b',
                    businessArea: 'Lĩnh vực cấp sổ bảo hiểm xã hội, thẻ bảo hiểm y tế',
                },
                {
                    STT: 4,
                    id: '612c',
                    nameService: 'Cấp lại, đổi thẻ BHYT do thay đổi thời điểm đủ 05 năm liên tục, nơi KCB ban đầu',
                    serviceCode: '612c',
                    businessArea: 'Cấp lại, đổi thẻ BHYT do thay đổi thời điểm đủ 05 năm liên tục, nơi KCB ban đầu',
                },
                {
                    STT: 5,
                    id: '612d',
                    nameService: 'Cấp lại, đổi thẻ BHYT do thay đổi thông tin về nhân thân, mã đối tượng, mã quyền lợi, mã nơi đối tượng sinh sống',
                    serviceCode: '612d',
                    businessArea: 'Lĩnh vực cấp sổ bảo hiểm xã hội, thẻ bảo hiểm y tế',
                }
            ],
            listDisplay: [
                {
                    STT: 1,
                    id: '602b',
                    nameService: 'Đăng ký, đăng ký lại (bao gồm cả đóng bù cho thời gian chưa đóng), điều chỉnh phương thức đóng, căn cứ đóng BHXH tự nguyện',
                    serviceCode: '602b',
                    businessArea: 'Lĩnh vực thu Bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp',
                },
                {
                    STT: 2,
                    id: '608a',
                    nameService: 'Cấp lại sổ BHXH do thay đổi thông tin',
                    serviceCode: '608a',
                    businessArea: 'Lĩnh vực cấp sổ bảo hiểm xã hội, thẻ bảo hiểm y tế',
                },
                {
                    STT: 3,
                    id: '612b',
                    nameService: 'Cấp lại, đổi thẻ BHYT do mất, hỏng không thay đổi thông tin',
                    serviceCode: '612a',
                    businessArea: 'Lĩnh vực cấp sổ bảo hiểm xã hội, thẻ bảo hiểm y tế',
                },
                {
                    STT: 4,
                    id: '612b',
                    nameService: 'Cấp lại, đổi thẻ BHYT do thay đổi thời điểm đủ 05 năm liên tục, nơi KCB ban đầu',
                    serviceCode: '612a',
                    businessArea: 'Cấp lại, đổi thẻ BHYT do thay đổi thời điểm đủ 05 năm liên tục, nơi KCB ban đầu',
                },
                {
                    STT: 5,
                    id: '612c',
                    nameService: 'Cấp lại, đổi thẻ BHYT do thay đổi thông tin về nhân thân, mã đối tượng, mã quyền lợi, mã nơi đối tượng sinh sống',
                    serviceCode: '612c',
                    businessArea: 'Lĩnh vực cấp sổ bảo hiểm xã hội, thẻ bảo hiểm y tế',
                }
            ],
        }
    }
}
</script>

<style>
@import url('../assets/css/DSTT.css');
</style>