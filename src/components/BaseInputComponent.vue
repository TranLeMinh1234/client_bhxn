<template>
    <div class="base-intput-component"></div>
</template>

<script>
import validateRules from '../js/validateRules.js';

export default {
    name: 'BaseInputComponent',
    mounted(){
        let me = this;
        me.infoValidate = me.validateInfoSelf();

    },
    methods:
    {
        // hàm trả ra thông tin vần validate của component, override lại ở compo con
        // sử dụng với trường hợp cần thông tin để validate nhiều compo một lục
        validateInfoSelf()
        {
            return {}; 
        },
        
        //hàm tự validate lại ngay khi thay đổi trên component
        validateSelf()
        {
            let me = this;
            let errors = validateRules(me.infoValidate());
            if(errors && errors.length > 0)
            {
                //bật cờ invalid cho component
                me.isValid = false;
            }
            else
                me.isValid = true;
            
            return errors;
        }
    },
    data()
    {
        return {
            isValid: true,
            errorsMsg: ''
        };
    }

}
</script>

<style>
    
</style>