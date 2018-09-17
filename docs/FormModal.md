## FormModal
> 封装了常用的Input、Select、Radio和Switch集成在Modal组件内。
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
            title, String // 可选, Modal的名称，在左上角
            form: [ Array // 必选, form的集合，通过key来区分input，select, radio和switch

                *** input ***
                {   
                    key: 'input',
                    label,  // 必选,左侧input的标题
                    value,  // 必选,input中绑定的value
                    type   // input的类型，默认为text,可选text、password、textarea、url、email、date
                    placeholder // input的placehoder
                    disabled  // 控制input是否可用,默认为false
                    clearable  // 是否可删除,默认为false,为true时会在input框内显示一个可以删除的icon
                    hide  // 控制input是否隐藏，默认为false
                    style // 样式对象，与vue原生的style一一致
                    inline (Array[Object])  
                        /**
                         * 和input组件显示在一行的input或者select，注意主input.style.width必须设置,否则input默认为宽度100%。
                         * inline数组项对象格式与input和select一致，label或title不需要。
                         * 
                         * 格式如下：
                         * 
                        */
                    [

                        {key: 'input', value: '', placeholder: '单位', style:{width: '100px'}},
                        {key: 'select', item: [{label: 'alan', value: 'alan'}], result: '', placeholder: '请选择名称', style:{width: '100px'}}
                    ]
                        
                },

                *** select ***
                {
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
                },

                *** switch ***
                {
                    key: 'switch',
                    title, // 必选,switch左侧的名称
                    label: [], // 可选,Array开关的名称，格式化['开', '关'],默认为空字符串
                    result, // 必选,Boolean，switch最终被选中的状态
                    size, // 开关大小，可选large，default和small。默认为default
                    hide // 控制switch是否隐藏，默认为false
                }

                *** radio ***
                {
                    key: 'radio',
                    title, // 必选,radio左侧的名称
                    item: [ // 必选,Array
                        {
                            label, // 必选,radio的名字
                            disabled  // 是否被禁用，默认为false
                        }
                    ],
                    type,  // 可选‘button’，默认为空，button表示以按钮样式布局
                    vertical, // radio是否开启垂直布局，默认false
                    result, // 必选,String,radio最终被选中的value 
                    size,  //  radio大小，可选large，default和small。默认为default
                    hide // 控制radio是否隐藏，默认为false
                }
            ]
        }
    ```
> data内可以任意组合各种key的对象，每个对象代表一个form子组件，子组件的顺序由数组内顺序决定

### emit events
* submit 通过点击ok-text按钮触发，返回一个参数，returnVal，包含所有表单组件最后选中的值

### slot
* default, 使用方法与iview的Modal一致, default会覆盖掉原有的表单组件
* footer, 使用方法与iview的Modal一致 