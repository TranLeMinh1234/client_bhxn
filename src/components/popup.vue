<template>
  <div class="pop-up" v-if="isShow">
      <div class="dialog" :style="{
          width: config.width,
          height: config.height
      }">
        <div class="title-dialog">
            {{config.titleDialog}}
        </div>
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    props: ['config','isShow'],
    data()
    {
        return{

        }
    }
}
</script>

<style>
@import url('../assets/css/popup.css');
</style>