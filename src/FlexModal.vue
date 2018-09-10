<template>
    <Modal 
        v-model="isShow" 
        transfer 
        :ok-text="okText" 
        :width="width+'px'" 
        :styles="styles"
        :closable="closable"
        :mask-closable="closable"
        @on-ok="submit"
        >
        <p slot="header" style="font-size:16px">
            <span>{{data.title}}</span>
        </p>
        <Form label-position="left"  :label-width="labelWidth">
            <!--main-->
            <div 
                v-if="data.main.length>0"
                >
                <FormItem 
                    v-for="(main, i) of data.main" 
                    :key="`main-${i}`"
                    :label="main.title || main.label">
                    <Select 
                        v-if="main.key == 'select'"
                        v-model="main.result"
                        :clearable="main.clearable || false"
                        :multiple="main.multiple || false"
                        :disabled="main.disabled || false"
                        :placeholder="main.placeholder || '请选择'"
                        :style="main.style">
                        <Option 
                            v-for="item of main.item"
                            :key="item.label"
                            :value="item.value"
                            >{{item.label}}</Option>
                    </Select>
                    <Input 
                        v-if="main.key == 'input'"
                        v-model="main.value"
                        :clearable="main.clearable || false"
                        :disabled="main.disabled || false"
                        :type="main.type || 'text'"
                        :placeholder="main.placeholder"
                        :style="main.style"
                    />
                </FormItem>
            </div>
            <!--children-->
            <div 
                class="inline-modal" 
                v-if="data.children.length>0"
                >
                <div 
                    class="modal-item"
                    v-for="(children, i) of data.children" 
                    :key="`children-${i}`">
                    <FormItem 
                        v-for="(child, j) of children.form" 
                        :key="`children-${i}-child-${j}`"
                        :label="child.title || child.label">
                        <Select 
                            v-if="child.key == 'select'"
                            v-model="child.result"
                            :clearable="child.clearable || false"
                            :multiple="child.multiple || false"
                            :disabled="child.disabled || false"
                            :placeholder="child.placeholder || '请选择'"
                            :style="child.style">
                            <Option 
                                v-for="item of child.item"
                                :key="item.label"
                                :value="item.value"
                                >{{item.label}}</Option>
                        </Select>
                        <Input 
                            v-if="child.key == 'input'"
                            v-model="child.value"
                            :clearable="child.clearable || false"
                            :disabled="child.disabled || false"
                            :type="child.type || 'text'"
                            :placeholder="child.placeholder"
                            :style="child.style"
                        />
                    </FormItem>
                </div>
            </div>
        </Form>
    </Modal>
</template>

<script>
/**
    1. 封装Modal和input，select的组件,分为main和children两部分，上方为main，下方children可以有多个，以children长度为个数依据
    2. 通过v-model来绑定modal是否出现，其余参数如下：
        closable  【Boolean】默认true，是否可关闭，通过右上角关闭按钮和Esc键
        okText   【String】默认‘确定’，modal框点击submit事件的按钮文本
        width   【Number】默认520，modal框宽度
        labelWidth   【Number】默认150，FormItem组件的label-width属性
        styles   【Object】默认为空，modal框的样式，与vue原生style属性一致   
    3. data必须为一个Object格式如下
        data: {
            title: '', Modal的名称，在左上角
            mian: [
                {
                    key: 'input/select'  判断input还是select的依据

                    *** input ***
                    label,  左侧input的标题
                    value,  input中绑定的value
                    type   input的类型，默认为text
                    placeholder input的placehoder
                    disabled  控制input是否可用，默认为false
                    clearable  是否可删除
                    hide  控制input是否隐藏，默认为false
                    style 样式对象，与vue原生的style一一致

                    *** select ***
                    title, 左侧select的标题
                    item: [
                        label, option中显示的内容
                        value  option中与label对应绑定的值
                    ],
                    result  select最终被选中的value,单选状态为字符串，多选状态必须为数组
                    clearable  是否可删除，只有单选模式生效
                    multiple   是否多选
                    placeholder  默认显示的文字内容
                    disabled 控制select是否可用，默认为false
                    hide  控制select是否隐藏，默认为false
                    style 样式对象，与vue原生的style一一致

                }
            ],
            children: [
                {
                    form: [ form表示FormItem部分
                        对象与main中对象一致
                    ]
                }
            ]
        }
    4. 点击ok-text按钮触发返回submit事件。
 */
export default {
    props: {
        value: { //用于自定义表单组件v-model双向绑定，名称必须为value
            type: Boolean,
            default: false
        },
        closable: {
            type: Boolean,
            default: true
        },
        okText: {
            type: String,
            default: '确定'
        },
        width: {
            type: Number,
            default: 520
        },
        labelWidth: {
            type: Number,
            default: 150
        },
        styles: {
            type: Object
        },
        data: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    watch: { //通过两个监听，使父子组件中的两个v-model保持同步
        value(val) {
            this.isShow = val
        },
        isShow(val) {
            this.$emit('input', val) 
        }
    },
    methods: {
        submit() {
            this.$emit('submit')
        }
    }
}  
</script>

<style lang="css" scoped>
 .inline-modal {
    display: flex;
    justify-content: space-between;
}
.modal-item {
    width: 48%;
    position: relative;
}
.modal-item:nth-of-type(2n-1) {
    margin-right: 4%;
    margin-left: 1%;
}
.modal-item:nth-of-type(2n-1)::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: -5%;
    width: 2px;
    height: 100%;
    background: #ddd;
}   
</style>