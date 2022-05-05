<template>
  <div class="baseDSTT">

  </div>
</template>

<script>
export default {
    props: {
        dataFromList: {
            type: Object,
            default: null
        },
    },
    created(){
        let me = this;
        me.initFollowMode();

    },
    methods:{
        initFollowMode()
        {
            let me = this;
            if(me.dataFromList != null)
            {
                me.tempSaveData = me.dataFromList;
            }
        }
    }
}
</script>

<style>

</style>