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
                width, // 可选，Number，单元格的宽度
                align // 可选，String，列单元格的文本对齐方式，默认为'left'左对齐，可选'right'和'center'
            }

            *** Input类型编辑列 ***            
            {
                title, // 可选，表头的名称，默认为空字符串
                key, // 必选，对应data内的数据key，用法与iview中Table组件一致
                type: 'input',
                width, // 可选，Number，input组件的宽度
                align, // 可选，String，列单元格的文本对齐方式，默认为'left'左对齐，可选'right'和'center'
                placeholder, // 可选，String，默认为空字符串
                clearable // 可选，Boolean，是否可以一键删除输入的内容，默认为false
            }

            *** Select类型编辑列 ***            
            {
                title, // 可选，表头的名称，默认为空字符串
                key, // 必选，对应data内的数据key，用法与iview中Table组件一致
                type: 'select',
                /***
                 *  可选，当type为select时必选，select的数据，
                 *  必须要有item，item是个数组，数组项包含lable和value
                 *  可选default，为select初次渲染默认选中的值
                 *  可选bindValue，只能用来给父组件监听select绑定的值，只有当select触发change事件才改变一次
                 *  select选中值会先取default(关闭编辑模式渲染的p标签也会先取default)
                 *  如果没有default这个key，则会从源数据data中匹配对应的key值。
                 *  如果能匹配到label，则显示label，否则显示default的值value
                 *  缓存数据dataClone绑定的总是value
                 */
                selectInfo: {
                    item: [{ label, value }],
                    default,
                    bindValue
                }, 
                width, // 可选，Number，select组件的宽度
                align, // 可选，String，列单元格的文本对齐方式，默认为'left'左对齐，可选'right'和'center'
                placeholder, // 可选，String，默认为'请选择'字符串
                clearable, // 可选，Boolean，是否可以一键删除输入的内容，默认为false
                filterable // 可选，Boolean，是否开启select可以输入过滤功能，只对select生效，默认为false
            }

            *** Icon类型编辑列 ***       
            // 组件默认会在最后一列渲染3个按钮，title为'操作'。如果不传入type为icon的数组项，默认值不会更改     
            {
                title, // 可选，表头的名称，默认为空字符串
                type: 'icon',
                width, // 单元格的宽度
                align, // 可选，String，列单元格的文本对齐方式，默认为'center'居中对齐，可选'left'和'right'
                custom: [ // Array, 可选，不填表示执行默认配置
                    {
                        key: 'delete',  // 必选，有'edit','save'和'delete'三个值，对应三个按钮
                        iconType, // String 可选，为iview中icon组件的type值，默认为对应按钮的type
                        iconColor, // String 可选，为iview中icon组件的color值，默认为对应按钮的color
                        tooltip, // String 可选，按钮的提示框值,对应三个按钮, 分别默认为'修改','保存','删除'
                        visible // Boolean或Function 可选，对应行的对应icon是否显示, 默认全显示
                                // 如果为true或不填,显示所有行的对应icon
                                // 如果为false，隐藏所有行的对应icon
                                // 如果为function，返回3个函数参数，row表示表格当前行数，len表示所有行数，status表示当前行是否处于编辑状态，函数需要return一个布尔值，只显示满足函数条件的对应行icon
                    }
                ]
            }
        ]
    ```
> columns数组可以任意搭配各种type的配置项，如果不添加type为icon配置，数组顺序只会决定表格列的顺序，3个icon按钮永远在表格末端。如果添加了type为icon的配置，数组顺序决定表格所有列(包括icon)的顺序！

> columns数组中当type为icon时，custom可以搭配3个icon按钮。不填表示执行对应icon默认配置

> 3个icon按钮默认配置如下：
    
```javascript
    const defaultIconConfig = {
        'edit': {
            tooltip: '修改',
            iconType: 'md-create',
            iconColor: '#2d8cf0'
        },
        'save': {
            tooltip: '保存',
            iconType: 'ios-checkmark-circle-outline',
            iconColor: '#19be6b'
        },
        'delete': {
            tooltip: '删除',
            iconType: 'md-close-circle',
            iconColor: '#ed3f14'
        }
    }
```
### emit events
* editConfig 点击修改icon触发触发，会开启编辑模式，返回1个参数params，params为table的当前行原始数据
* updateConfig 开启编辑模式后点击保存icon触发，返回3个参数params,raw和done。params为修改后的当前行表单数据，raw为table的当前行原始数据，done为一个函数，调用后关闭编辑模式
* createConfig 只有源数据data新建了一条空数据，开启编辑模式后点击保存icon才触发，返回参数与updateConfig一致
* deleteConfig 点击删除icon触发，返回2个参数params和raw，params为修改后的当前行表单数据，raw为table的当前行原始数据

### methods
* `cleanDataCloneByKey(key, index='all')` 清空dataClone内缓存数据对应索引对应key的值,索引index默认为‘all’，即清空所有项对应key值，支持传入Number

### Attention
1. EditTable组件其实不会更改源数据data，而是深度拷贝了一个dataClone来进行所有的操作，dataClone会监听data改变来同步更新，这才是组件本身的意义
2. 如果用户需要将对dataClone的操作映射到源数据data，只需要在保存后改变data即可，表格数据会同步更新
3. 为了让组件逻辑更精简，所有emit事件返回的dataClone值一旦被开启编辑模式，则会重置。这样做更符合组件应用场景。避免了源数据data未更新而缓存了dataClone的情况
4. 事件返回的dataClone，如果用户并未修改任何值，则对应编辑的值为空，源数据data不会改变，dataClone只会反映用户修改的值。此时可以比较dataClone和data的值，如果dataClone对应key为空，则取data的key，如果不为空，则取dataClone的key