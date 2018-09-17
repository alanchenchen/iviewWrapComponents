## FlexModal
> 封装了常用的Input、Select集成在Modal组件内。分为main和children两部分，上方为main，下方children可以有多个，以children长度为个数依据
### props

* value (通过v-model来绑定)，`Boolean`，必选，用于显示隐藏modal框
* closable，`Boolean`，可选，默认true，是否可关闭modal，通过右上角关闭按钮和Esc键
* okText，`String`，可选，默认‘确定’，modal框点击submit事件的按钮文本
* width，`Number`，可选，默认520，modal框宽度
* labelWidth，`Number`，可选，默认150，FormItem组件的label-width属性
* styles，`Object`，可选，默认为null，modal框的样式，与vue原生style属性一致，一般选择设置`margin,padding或者position`  
* data，`Object`，必选，用于动态渲染modal框内form子组件。格式如下
    ```javascript
        {
            title , // 可选，Modal的名称，在左上角
            mian: [ // 可选，Array
                {
                    *** input ***
                    key: 'input',
                    label,  // 必选,左侧input的标题
                    value,  // 必选,input中绑定的value
                    type   // input的类型，默认为text,可选text、password、textarea、url、email、date
                    placeholder // input的placehoder
                    disabled  // 控制input是否可用,默认为false
                    clearable  // 是否可删除,默认为false,为true时会在input框内显示一个可以删除的icon
                    hide  // 控制input是否隐藏，默认为false
                    style // 样式对象，与vue原生的style一一致

                    *** select ***
                    key: 'select',
                    title, // 必选,左侧select的标题
                    item: [ // 必选,Array
                        {
                            label, // option中显示的内容
                            value  // option中与label对应绑定的值
                        }
                    ],
                    result  // 必选,select最终被选中的value,单选状态为字符串，多选状态必须为数组
                    clearable // 是否可删除，只有单选模式生效，默认为false
                    multiple //  是否多选，默认为false
                    placeholder // 默认显示的文字内容
                    disabled // 控制select是否可用，默认为false
                    hide // 控制select是否隐藏，默认为false
                    style // 样式对象，与vue原生的style一一致

                }
            ],
            children: [
                {
                    form: [ 
                        // form表示FormItem部分。格式与main中对象一致
                    ]
                }
            ]
        }
    ```
### emit events
* submit 通过点击ok-text按钮触发，无返回参数