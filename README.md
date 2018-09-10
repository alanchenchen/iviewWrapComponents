# 基于iview二次开发的一些通用业务组件

> Author : Alan Chen

> version: 只兼容了iview2.x版本，不保证完全兼容3.x, 最好全局使用iview，`Vue.use(iview)`，因为封装的组件使用了大量iview基础组件

> Date: 2018/09/10 

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

## EditTable
> 基于iview扩展的可编辑表格，目前可编辑input和select组件。可以定制icon操作按钮。
### props

* height，`Number | String`，可选，默认为空字符串，表格的高度，可以为数字或者数字的字符串
* stripe，`Boolean`，可选，默认false，是否开启斑马纹
* loading，`Boolean`，可选，默认false，是否开启加载状态
* disableCreateMode，`Boolean`，可选，默认false，是否关闭createConfig事件
* data，`Array`，必选，表格的源数据，格式与iview的Table组件一致
* columns，`Array`，必选，用于动态渲染表格内单元格和表头的格式。格式如下:
    ```javascript
        [
            *** 普通不可编辑列 ***
            {
                title, // 可选，表头的名称，默认为空字符串
                key, // 必选，对应data内的数据key，用法与iview中Table组件一致
                type // 可选，有input,select和icon三种,不填默认渲染为普通表格cell组件，不可编辑
            }

            *** Input类型编辑列 ***            
            {
                title, // 可选，表头的名称，默认为空字符串
                key, // 必选，对应data内的数据key，用法与iview中Table组件一致
                type: 'input'
            }

            *** Select类型编辑列 ***            
            {
                title, // 可选，表头的名称，默认为空字符串
                key, // 必选，对应data内的数据key，用法与iview中Table组件一致
                type: 'select',
                selectInfo // 可选，当type为select时必选，select的数据，必须要有item和result两个值，item是个数组，数组项包含lable和value,result为select选中的值
            }

            *** Icon类型编辑列 ***       
            // 组件默认会在最后一列渲染3个按钮，title为'操作'。如果不传入type为icon的数组项，默认值不会更改     
            {
                title, // 可选，表头的名称，默认为空字符串
                type: 'icon',
                custom: [ // Array, 可选，不填表示执行默认配置
                    {
                        key: 'delete',  // 必选，有'edit','save'和'delete'三个值，对应三个按钮
                        iconType, // String 可选，为iview中icon组件的type值，默认为对应按钮的type
                        iconColor, // String 可选，为iview中icon组件的color值，默认为对应按钮的color
                        tooltip, // String 可选，按钮的提示框值,对应三个按钮, 分别默认为'修改','保存','删除'
                        visible,  // Boolean 可选，icon是否显示,默认为true,如果为false，没有index，则默认隐藏所有行的icon
                        index  // Number 可选，仅当visible为false生效，表现为index对应的行数下的单元格隐藏icon，其余行数icon则不隐藏
                    }
                ]
            }
        ]
    ```
> columns数组可以任意搭配各种type的配置项，如果不添加type为icon配置，数组顺序只会决定表格列的顺序，3个icon按钮永远在表格末端。如果添加了type为icon的配置，数组顺序决定表格所有列的顺序！

> columns数组中当type为icon时，custom可以搭配3个icon按钮。不填表示执行默认配置

> 3个icon按钮默认配置如下：
    
```javascript
    const defaultIconConfig = {
        'edit': {
            tooltip: '修改',
            iconType: 'edit',
            iconColor: '#2d8cf0'
        },
        'save': {
            tooltip: '保存',
            iconType: 'ios-checkmark-outline',
            iconColor: '#19be6b'
        },
        'delete': {
            tooltip: '删除',
            iconType: 'android-cancel',
            iconColor: '#ed3f14'
        }
    }
```
### emit events
* updateConfig 开启编辑模式后点击保存icon触发，返回3个参数rest,params和done。rest为修改后的当前行表单数据，params为table原始数据，done为一个函数，调用后关闭编辑模式
* createConfig 只有源数据data新建了一条空数据，开启编辑模式后点击保存icon才触发，返回参数与updateConfig一致
* deleteConfig 点击删除icon触发，返回2个参数rest和params，为修改后的当前行表单数据，params为table原始数据

### Attention
1. EditTable组件其实不会更改源数据data，而是深度拷贝了一个dataClone来进行所有的操作，dataClone会监听data改变来同步更新，这才是组件本身的意义
2. 如果用户需要将对dataClone的操作映射到源数据data，只需要在保存后改变data即可，表格数据会同步更新
3. 为了让组件逻辑更精简，所有emit事件返回的dataClone值一旦被开启编辑模式，则会重置。这样做更符合组件应用场景。避免了源数据data未更新而缓存了dataClone的情况

## BreadLink
> 为了使面包屑组件和具体组件更好的解耦，更加模块化来全局管理，专门抽离一个配置文件来管理面包屑导航功能的组件

* `BreadLink`使用与上述组件不相同，只有一个`style(与原生vue一致)`的props,没有emit events。只需要在具体组件内引入，注册，然后调用`<BreadLink />`即可。或者在`main.js`里全局注册。
* 与`BreadLink`同一目录的`config.js`是专门用来配置组件导航。组件本身的逻辑是面包屑导航只与路由有关，配置如下：
    ```javascript
    /**
    * @description 将面包屑组件抽离出来，与路由path结合，通过配置文件来动态渲染内容和对应的link跳转
    * @argument 
    *      path: 页面的当前路由path
    *      breadLink
    *          name： 面包屑的名称
    *          link： 面包屑对应的导航路由
    */
    [
        {
            path: '/home/index',
            breadLink: [
                {name: 'Home', link: ''},
                {name: 'index', link: ''}
            ]
        },
        {
            path: '/home/sub',
            breadLink: [
                {name: 'Home', link: '/home/index'},
                {name: 'Sub', link: ''}
            ]
        }
    ]
    ```
# license
* MIT