<template>
    <div class="validateObserve">
        <slot></slot>
    </div>
</template>

<script>
import {mesErrorFollowType,validateRules} from '../js/validateRules.js';

export default {
    name: 'validateObserve',
    methods:{

        //validate tất cả compoent con
        validateComponent()
        {
            let me = this;
            let errorList = [];
            // lấy các component con để validate
            let validateComponentArr = me.$children;
            // duyệt từng component với thông tin validate bắn ra bởi hàm InfoValidate()
            for(let i = 0;i < validateComponentArr.length;i++)
            {
                // lấy thông tin validate từng component
                let componentValidate = validateComponentArr[i];
                let inforValidate = componentValidate.infoValidate();
                // kiểm tra tính hợp lệ
                let errorsComponet = validateRules(inforValidate);

                if(errorsComponet && errorsComponet.length > 0)
                {
                    //bật cờ invalid cho component
                    componentValidate.$data.isValid = false;
                    componentValidate.$data.errorsMsg = mesErrorFollowType(errorsComponet);
                    errorList.push(inforValidate);
                }
                //tắt cờ invalid cho component
                else
                    componentValidate.$data.isValid = true;
            }

            //focus vào input đầu tiên bị lỗi
            if(errorList.length > 0)
                 me.focusFirstError(errorList);

            return errorList.length === 0;
        },

        focusFirstError(errorList)
        {
            let firstEleError = errorList[0];
            if(firstEleError)
            {
                firstEleError.elementPrimary.focus();
            }
        }
    },
    data(){
        return {

        }
    }
}
</script>

<style scoped>
    
</style>