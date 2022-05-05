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
      :disabled="mode == 'watch'"
    />
    <div
      :style="{
        fontSize: isValid ? '' : '12px',
        display: isValid ? 'none' : 'block',
        color: 'red',
        position: 'absolute',
        left: '10px'
      }"
    >
      {{errorsMsg}}
    </div>
  </div>
</template>

<script>
import BaseInputComponentVue from "./BaseInputComponent.vue";

export default {
  name: "mInput",
  extends: BaseInputComponentVue,
  props: {
    mode: {
      type: String,
      default: "text",
    },
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
      type: [String, Date,Number],
      default: "",
    },
  },
  watch:{
    value(newValue, oldValue)
    {
      let me = this;
      me.valueResult = newValue;
    }
  },
  computed: {
    listenEvent: function () {
      let me = this;
      return {
        input: function (event) {
          me.valueResult = event.target.value;
          me.$emit("input", me.valueResult);
          me.$emit("inputEvent", me.valueResult);
          let errors = me.validateSelf();
          if(errors && errors.length > 0)
          {
            switch(errors[0])
            {
              case 'required':
                me.errorsMsg = 'Thông tin không được bỏ trống!';
                break;
              default:
                break;
            }
          }
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