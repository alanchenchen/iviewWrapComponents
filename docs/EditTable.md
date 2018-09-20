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
                type, // 可选，有input,select和icon三种,不填默认渲染为普通表格cell组件，不可编辑
                width // 可选，Number，单元格的宽度
            }

            *** Input类型编辑列 ***            
            {
                title, // 可选，表头的名称，默认为空字符串
                key, // 必选，对应data内的数据key，用法与iview中Table组件一致
                type: 'input',
                width, // 可选，Number，单元格的宽度
                placeholder, // 可选，String，默认为空字符串
                clearable // 可选，Boolean，是否可以一键删除输入的内容，默认为false
            }

            *** Select类型编辑列 ***            
            {
                title, // 可选，表头的名称，默认为空字符串
                key, // 必选，对应data内的数据key，用法与iview中Table组件一致
                type: 'select',
                /***
                 *  可选，当type为select时必选，select的数据，必须要有item和result两个值，item是个数组，数组项包含lable和value,result为select选中的值
                 *  select选中值会先取result，如果没有result或者为空，则会从源数据data中匹配对应的key值。显示的总会是label，而缓存数据dataClone绑定的总会是value
                 */
                selectInfo: {
                    item: [{ label, value }],
                    result: ''
                }, 
                width, // 可选，Number，单元格的宽度
                placeholder, // 可选，String，默认为'请选择'字符串
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
* editConfig 点击修改icon触发触发，会开启编辑模式，返回1个参数params，params为table的当前行原始数据
* updateConfig 开启编辑模式后点击保存icon触发，返回3个参数rest,params和done。rest为修改后的当前行表单数据，params为table的当前行原始数据，done为一个函数，调用后关闭编辑模式
* createConfig 只有源数据data新建了一条空数据，开启编辑模式后点击保存icon才触发，返回参数与updateConfig一致
* deleteConfig 点击删除icon触发，返回2个参数rest和params，rest为修改后的当前行表单数据，params为table的当前行原始数据

### Attention
1. EditTable组件其实不会更改源数据data，而是深度拷贝了一个dataClone来进行所有的操作，dataClone会监听data改变来同步更新，这才是组件本身的意义
2. 如果用户需要将对dataClone的操作映射到源数据data，只需要在保存后改变data即可，表格数据会同步更新
3. 为了让组件逻辑更精简，所有emit事件返回的dataClone值一旦被开启编辑模式，则会重置。这样做更符合组件应用场景。避免了源数据data未更新而缓存了dataClone的情况
4. 事件返回的dataClone，如果用户并未修改任何值，则对应编辑的值为空，源数据data不会改变，dataClone只会反映用户修改的值。