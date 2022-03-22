<template>
    <div class="combobox">
        <div class="line-input-combobox">
            <input 
                type="text" 
                :class="['input-combobox', !isValid ? 'inValid-input' : '']" 
                v-model="valueSearch" 
                @input="inputEvent"
                @blur="blurEvent"
                @keyup.enter="enterEvent"
                @keyup.up="changeSelectedItemInDropDown"
                @keyup.down="changeSelectedItemInDropDown"
            >
            <div 
                :class="['arrow-combobox' , !isValid ? 'inValid-arrow' : '']" 
                @click="TurnOnOffDropDownFunc()"
            >
                <i class="fas fa-chevron-down"></i>
            </div>
        </div>
        <dropdown 
            :valueSearch="valueSearch" 
            :query="query"
            :columns="columns"
            :onOffShow="showDropDown"
            :displayField="displayField"
            :valueField="valueField"
            :data="dataStore"
            v-on="listenersDropdown"
        />
    </div>
</template>

<script>
import dropdown from './dropdown.vue';
import BaseInputComponent from './BaseInputComponent.vue';
export default {
    extends: BaseInputComponent,
    name: 'combobox',
     props: {
        value: {
            type:String,
            default: ''
        },
        query: {
            type: String,
            default: ''
        },
        columns: {
            type: {Object,Array},
            default: null
        },
        displayField: {
            type: String,
            default: null
        },
        valueField:{
            type: String,
            default: null
        },
        dataStore:{
            type: Array,
            default: null,
        },
        rules: {
            type: String,
            default: ""
        }
    },
    components:{
        dropdown
    },
    computed:
    {
        listenersDropdown: function(){
            let me = this;
            return {
                change: function(value,index)
                {
                    me.$emit('input', value[me.valueField],index);
                    me.$emit('change', value,index);
                    me.showDropDown = false;
                    me.valueSearch = value[me.displayField];
                    me.valueResult = value[me.valueField];
                    me.validateSelf();
                },
                input: function(value,index)
                {
                   me.$emit('input',value[me.valueField],index)
                }    
            };
        }
    },
    created(){
    },
    mounted(){
        let me = this;
        me.setUpEvent();
    },
    methods:{
        validateInfoSelf()
        {
            let me = this;
            return function(){
                return{
                    name: 'combobox',
                    elementPrimary: me.$el.childNodes[0].childNodes[0],
                    rules: me.rules ? me.rules : "",
                    valueValidate: me.valueResult,
                    dataStore: me.dataStore
                }
            }; 
        },
        setUpEvent()
        {
            let me = this; 
            document.addEventListener('click', function(e){
                if(!me.$el.contains(e.target))
                {
                    if(me.dataStore)
                    {
                        let ObjectSelect = me.dataStore.find(ele => {return ele.displayField.toLowerCase() === me.valueSearch.toLowerCase();});
                        // case tn để tránh validate khi chưa focus, giá trị không đổi => không validate
                        if((!ObjectSelect && !me.valueResult) || (ObjectSelect && me.valueResult === ObjectSelect[me.valueField]))
                        {
                            me.showDropDown = false;
                            return;
                        }
                        if(ObjectSelect)
                        {
                            me.valueResult = ObjectSelect[me.valueField];
                            me.$emit('input', ObjectSelect[me.valueField]);
                            me.$emit('change', ObjectSelect);
                        }
                        else
                        {
                            me.valueResult = null;
                            me.$emit('input', null);
                            me.$emit('change', null);
                        }
                        me.validateSelf();
                    }
                    me.showDropDown = false;
                }
            })
        },
        inputEvent()
        {
            let me = this;
            me.showDropDown = false;
            me.$nextTick(()=>{
                me.showDropDown = true;
            })
        },
        blurEvent()
        {
        },
        enterEvent()
        {
            let me = this;
            me.$children[0].selectItem();
        },
        changeSelectedItemInDropDown(e)
        {
            let me = this;
            me.showDropDown = true;
            if(e)
            {
                me.$children[0].changeIndexSelectedItem(e);
            }
        },
        TurnOnOffDropDownFunc()
        {
            let me = this;
            me.showDropDown = !me.showDropDown;
            me.$el.childNodes[0].childNodes[0].focus();
        }
    },
    data(){
        return {
            valueResult: null,
            valueSearch: '',
            showDropDown: false,
        };
    }

}
</script>

<style scope>
@import url('../assets/css/combobox.css');
@import url('../assets/css/main.css');
</style>