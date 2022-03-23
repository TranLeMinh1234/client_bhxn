<template>
  <div class="BasePage"></div>
</template>

<script>
export default {
    methods:
    {
        showNoti(stringNoti)
        {
            let me = this;
            me.stringNoti = stringNoti;
            me.isShowNoti = true;
        },
        closeNotiDialog()
        {
            let me = this;
            me.isShowNoti = false;
        }
    },
    data()
    {
        return {
            isShowNoti: false,
            configNotiDialog: {
                width: '400px',
                height: '200px',
                titleDialog: 'Thông báo'
            },
            stringNoti: ''
        }
    }
}
</script>

<style>

</style>