## FormExtModal
> 集成表单组件的modal框，支持input，select,radio以及switch。
### props

* value (通过v-model来绑定)，`Boolean`，必选，用于显示隐藏modal框
* closable，`Boolean`，可选，默认true，是否可关闭modal，通过右上角关闭按钮和Esc键
* okText，`String`，可选，默认‘确定’，modal框点击submit事件的按钮文本
* width，`Number`，可选，默认520，modal框宽度
* labelWidth，`Number`，可选，默认80，FormItem组件的label-width属性
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
                    default, // input默认绑定的值，可选，默认为空
                    type   // input的类型，默认为text,可选text、password、textarea、url、email、date
                    placeholder // input的placehoder
                    disabled  // 控制input是否可用,默认为false
                    clearable  // 是否可删除,默认为false,为true时会在input框内显示一个可以删除的icon
                    hide  // 控制input是否隐藏，默认为false
                    style // 样式对象，与vue原生的style一一致
                },

                *** select ***
                {
                    key: 'select',
                    label, // 必选,左侧select的标题
                    default, // select默认绑定的值，可选，当单选状态默认为空字符串，多选状态默认为空数组
                    item: [ // 必选,Array
                        {
                            label, // option中显示的内容
                            value  // option中与label对应绑定的值
                        }
                    ],
                    clearable // 是否可删除，只有单选模式生效，默认为false
                    filterable // 可选，Boolean，是否开启select可以输入过滤功能，只对select生效，默认为false
                    multiple //  是否多选，默认为false
                    placeholder // 默认显示的文字内容
                    disabled // 控制select是否可用，默认为false
                    hide // 控制select是否隐藏，默认为false
                    style // 样式对象，与vue原生的style一一致
                },

                *** switch ***
                {
                    key: 'switch',
                    label, // 必选,switch左侧的名称
                    default, // switch默认绑定的值，可选，默认为false
                    item: [], // 可选,Array开关的名称，格式为['开', '关'],默认为空字符串
                    size, // 开关大小，可选large，default和small。默认为default
                    hide // 控制switch是否隐藏，默认为false
                }

                *** radio ***
                {
                    key: 'radio',
                    label, // 必选,radio左侧的名称
                    default, // radio默认绑定的值，可选，默认为空
                    item: [ // 必选,Array
                        {
                            label, // 必选,radio的名字
                            disabled  // 是否被禁用，默认为false
                        }
                    ],
                    type,  // 可选‘button’，默认为空，button表示以按钮样式布局
                    vertical, // radio是否开启垂直布局，默认false
                    size,  //  radio大小，可选large，default和small。默认为default
                    hide // 控制radio是否隐藏，默认为false
                }
            ]
        }
        // data中每个数组项对象都支持validate，可选，默认为空数组，多个规则会按照顺序依次表单验证，格式如下：
        validate： [
            { 
                required,  // [boolean],验证是否必输入，默认为false
                type,  // [string],验证数据类型，默认为string，可选string，number，method(函数)，boolean，integer(整形)，float(浮点型)，array，object，date(Date对象)，url(网址字符串)和email(邮箱字符串)
                message,  // [string],验证失败的文本，默认为空字符串
                trigger, // [string],触发验证的条件，默认为change加blur，可选blur和change事件
                len,  // [number],验证长度必须为len，可选，默认不开启，无论type是什么类型，都默认调用length属性
                min,  // [number],验证长度最小为min，可选，默认不开启
                max,  // [number],验证长度最大为max，可选，默认不开启
                validator  // [function],自定义验证规则，可选，默认不开启，一旦开启，除了message和trigger，其余都失效。message和trigger会覆盖自定义函数配置
                           //函数支持异步调用。返回3个参数：
                            validator: (rule, value, cb) => {
                                // rule是当前规则对象，value是当前被验证的值，cb是个回调函数
                                // 当验证通过，必须手动调用cb(),不传参，如果不通过，调用cb(Error),参数必须为一个Error对象
                                if(value == 'alan') {
                                    cb()
                                }
                                else {
                                    cb(new Error('请输入正确的用户名'))
                                }
                            }
            }
        ]
    ```
> data内可以任意组合各种key的对象，每个对象代表一个form子组件，子组件的顺序由数组内顺序决定

### emit events
* submit 点击ok-text按钮触发。返回2个参数，params包含所有表单组件最后选中的值和表单验证的结果。done是一个回调函数，调用后关闭modal

### methods
* resetValidate，无参数，清空表单的验证状态，恢复初始值

### slot
* default, 使用方法与iview的Modal一致, default会覆盖掉原有的表单组件
* footer, 使用方法与iview的Modal一致，会覆盖默认的submit事件

### Tips
1. 因为vue2.x的数据监听机制基于`Object.defineProperty`，所以如果需要响应式改变FormExtModal的任何表单项配置，必须要先声明所有需要更改的key，例如，如果需要动态显示隐藏，则必须先声明hide为false。
2. FormExtModal的表单验证支持连续验证，通过数组索引来依次顺序验证。一般是先验证required为true，再通过函数validator自定义验证。
3. FormExtModal内form的每个对象都支持新增自定义的key，这些key不会被事件返回。
4. 每个类型的key支持的对象都可以可选一个default值，这个值是用来动态更改对应表单组件的绑定值。不填组件会自动生成对应的零值来绑定
