<template>
  <div class="input">
    <input
      :type="type"
      v-model="valueResult"
      v-on="listenEvent"
      :class="[isValid ? '' : 'inValid-input']"
      :placeholder="placeholder"
      :style="{
        paddingRight: paddingRight ? paddingRight : '0px',
      }"
    />
    <div
      :style="{
        fontSize: isValid ? '' : '10px',
        display: isValid ? 'none' : 'block',
        position: 'absolute'
      }"
    >
      ajsdhjkashdkj
    </div>
  </div>
</template>

<script>
import BaseInputComponentVue from "./BaseInputComponent.vue";

export default {
  name: "mInput",
  extends: BaseInputComponentVue,
  props: {
    type: {
      type: String,
      default: "text",
    },
    rules: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    paddingRight: {
      type: String,
      default: "0px",
    },
    value: {
      type: [String, Date],
      default: "",
    },
  },
  computed: {
    listenEvent: function () {
      let me = this;
      return {
        input: function (event) {
          me.valueResult = event.target.value;
          me.$emit("input", me.valueResult);
          me.$emit("inputEvent", me.valueResult);
          console.log(me.valueResult);
          me.validateSelf();
        },
      };
    },
  },
  methods: {
    validateInfoSelf() {
      let me = this;
      return function () {
        return {
          name: "input",
          elementPrimary: me.$el.childNodes[0],
          rules: me.rules ? me.rules : "",
          valueValidate: me.valueResult,
          dataStore: me.dataStore,
        };
      };
    },
  },
  data() {
    let me = this;
    return {
      valueResult: me.value,
    };
  },
};
</script>

<style>
@import url("../assets/css/minput.css");
</style>