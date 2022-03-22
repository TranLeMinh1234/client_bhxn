<template>
    <div class="dropdown" v-show="onOffShow">
        <div v-for="(item,index) in valueSearch? dataFilter:dataStore" :key="index">
            <div 
                :class="['dropdown-item', indexSelectedItem === index? 'selected-item': '']" 
                @click="selectItem(item,index)" 
            >
                {{item[displayField]}}
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
export default {
    name: 'dropdown',
    props: {
        data: {
            type: Array,
            default: function(){return [];}
        },
        valueSearch: {
            type: String,
            default: '',
        },
        query: {
            type: String,
            default: ''
        },
        onOffShow: {
            type: Boolean,
            default: false
        },
        displayField: {
            type: String,
            default:''
        },
    },
    watch: {
        valueSearch: function()
        {
            let me = this; 
            me.filter();
            me.indexSelectedItem = 0;
        },
        
    },
    created(){
    },
    mounted(){
        let me = this;
        me.setUpEvent();
    },
    methods:{
        filter()
        {
            let me = this;
            me.dataFilter = me.dataStore.filter((ele)=>{return ele[me.displayField].toLowerCase().includes(me.valueSearch.toLowerCase(),0)})
        },
        setUpEvent()
        {
            let me = this;
            
            //scroll event
            let dropdown = me.$el;
            if(me.query == "remote")
            {
                dropdown.onscroll = function(){
                    if(dropdown.scrollTop + dropdown.clientHeight === dropdown.scrollHeight)
                        me.loadMoreData();
                };
            }
        },
        selectItem(item,index)
        {
            let me = this;
            if(!item)
            {
                let dataStoreCurrent = me.valueSearch? me.dataFilter:me.dataStore;
                item = dataStoreCurrent[me.indexSelectedItem];
                index = me.indexSelectedItem;
            }
            me.$emit('change',item,index);
        },
        changeIndexSelectedItem(e)
        {
            let me = this;
            let isDataFilter = me.valueSearch ? true : false;
            let maxIndex = isDataFilter? this.dataFilter.length-1:this.dataStore.length-1;
            if(e)
            {
                switch(e.key)
                {
                    case 'ArrowDown':
                        me.indexSelectedItem++;
                        if(me.indexSelectedItem > maxIndex)
                            me.indexSelectedItem--;
                        break;
                    case 'ArrowUp':
                        me.indexSelectedItem--;
                        if(me.indexSelectedItem < 0)
                            me.indexSelectedItem++;
                        break;
                    default:
                        break;
                }
                
                //scoll theo dòng chọn
                // let indexSelectedItem = me.$el.querySelector(`.dropdown :nth-child(${me.indexSelectedItem}})`);
                let indexSelectedItem = me.$el.querySelector(`.dropdown :nth-child(${me.indexSelectedItem})`);
                let dropdown = me.$el;
                if(indexSelectedItem)
                {
                    dropdown.scrollTop = indexSelectedItem.offsetTop;
                    if(me.indexSelectedItem === maxIndex)
                    {
                        me.loadMoreData();
                    }
                }
            }

        },
        
        loadMoreData()
        {
            let me = this;
            me.dataStore = me.dataStore.concat([{
                        displayField: 'Hà Nội',
                        valueField: '001'
                    },{
                        displayField: 'Cà Mau',
                        valueField: '002'
                    },{
                        displayField: 'Cần Thơ',
                        valueField: '003'
                    },{
                        displayField: 'Kiên Giang',
                        valueField: '004'
                    },{
                        displayField: 'Bắc Ninh',
                        valueField: '005'
                    }]);
            me.filter();
        }
    },
    data(){
        return {
            dataStore: this.data,
            dataFilter: [],
            indexSelectedItem: 0
        }
    },
}
</script>

<style scope>
@import url('../assets/css/dropdown.css');
@import url('../assets/css/main.css');
</style>