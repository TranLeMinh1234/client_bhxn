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
                  <m-input />
              </div>
              <div class="line-item">
                  <div class="title-field">[14]. Điều chỉnh thông tin cá nhân:</div>
              </div>
          </div>
          <div class="line-input">
              <div class="line-item">
                  <div class="title-field">[14.1]. Họ và tên (viết chữ in hoa): </div>
                  <m-input />
              </div>
              <div class="line-item">
                  <div class="title-field">[14.2]. Giới tính: </div>
                  <div style="display: flex;align-items: flex-start;">
                      <input type="radio" value="1" />Nam
                  </div>
                  <div style="display: flex;align-items: flex-start;">
                      <input type="radio" value="0" style="margin-left: 20px" />Nữ
                  </div>
              </div>
          </div>
          <div class="line-input">
              <div class="line-item">
                  <div class="title-field">[14.4]. Nơi đăng ký khai sinh:</div>
                  <div style="width: 130px"><combobox /></div>
                  <div style="width: 130px;margin-left:20px"><combobox /></div>
                  <div style="width: 130px;margin-left:20px"><combobox /></div>
              </div>
          </div>
          <div class="line-input">
              <div class="line-item">
                  <div class="title-field">[14.5]. Số CMND/CCCD/Hộ chiếu: </div>
                  <m-input />
              </div>
          </div>
          <div class="line-input">
              <div class="line-item">
                  <div class="title-field">[15]. Mức tiền đóng: </div>
                  <m-input />
              </div>
               <div class="line-item">
                  <div class="title-field">[16]. Phương thức đóng: </div>
                  <m-input />
              </div>
          </div>
          <div class="line-input">
              <div class="line-item">
                  <div class="title-field">[17]. Nơi đăng ký khám, chữa bệnh ban đầu: </div>
                  <div style="width: 200px"><combobox /></div>
                  <div style="width: 190px;margin-left:20px"><combobox /></div>
              </div>
          </div>
           <div class="line-input">
              <div class="line-item" style="width: 800px">
                  <div class="title-field" >[18]. Nội dung thay đổi, yêu cầu khác: </div>
                  <m-input />
              </div>
          </div>
      </div>
      <div class="line-input">
            <button class="sumbit-btn" style="margin: auto" @click="saveData">Ghi nhận</button>
        </div>
        <div style="height: 100px"></div>
  </div>
</template>

<script>
import mInput from '../components/minput.vue'
import combobox from '../components/combobox.vue'

export default {
    name: '608a',
    components: {
        mInput,
        combobox
    },
    methods:{
        
    },
    data()
    {
        return {
        }
    }
}
</script>

<style>
@import url('../assets/css/608a.css');
</style>