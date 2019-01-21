# 基于iview二次开发的一些通用业务组件

> Author : Alan Chen

> version: 兼容3.x, 最好全局使用iview，`Vue.use(iview)`，因为封装的组件使用了大量iview基础组件

> Date: 2018/09/10 

# Components
* [FormExtModal](./docs/FormExtModal.md)
* [FlexModal](./docs/FlexModal.md)
* [EditTable](./docs/EditTable.md)
* [BreadLink](./docs/BreadLink.md)
* [FullScreen](./docs/FullScreen.md)
# Update Logs
* *2019/1/21*
    1. 优化FormExtModal中default赋值bug，一旦default存在，先取default，否则取formData中已经被用于输入的绑定值

* *2019/1/17*
    * 解决FormExtModal以下bug：
        1. selcet组件中key重复导致vue警告提示
        2. props发生改变，子组件内部监听失效，通常发生在赋值default来动态改变form子组件默认选中值
        3. change事件当form所有绑定值为空不会触发
        4. 当更改default值，之前用户通过交互选定的值被置空。现在会保存以前选中的值

* *2018/12/24*
    1. 优化FormExtModal中default监听，去掉对象的深度监听(Vue不建议)，排除了default赋值导致循环触发watcher的问题
    2. FormExtModal新增一个emit event `change`，当表单组件值发生改变时触发

* *2018/11/27*
    1. 优化EditTable中colunms选项bindValue的逻辑，一渲染就先赋值为select的默认值(data对应key的值或default)，方便bindValue被监听直接触发watcher
    2. FormExtModal中form数组项新增default选项，可选，用于自定义表单绑定值

* *2018/11/22*
    1. 优化EditTable中colunms选项width的实现方式，现在width表现为input和select的宽度，但是外层单元格宽度会自动在其宽度上加上18像素，为了更好的视觉体验
    2. EditTable中colunms选项新增一个align文本对齐。

* *2018/10/31*
    1. 升级到iview3.1.4，解决版本不兼容问题
    2. FormModal更新为FormExtModal，去掉input的inline功能，去掉所有表单选项中的value或result，新增表单验证功能

* *2018/10/26*
    1. 新增FullScreen全屏功能组件

* *2018/10/19*
    1. EditTable组件的columns选项当type为icon时，对visible选项进一步优化，去掉index选项，visible支持传入funcion，精准控制icon的显示隐藏
    2. EditTable组件的columns选项当type为icon时，支持width选项，表现为icon外层单元格的宽度

* *2018/10/18* 
    1. FormModal组件在submit事件中新增一个参数返回，done，用于手动关闭modal

* *2018/09/28* 
    1. EditTable组件新增一个component method，`cleanDataCloneByKey`清空dataClone内缓存数据对应索引对应key的值
    2. 优化了EditTable组件渲染为select单元格的参数。result改为default，可选。新增一个bindValue，专门用来监听下拉框绑定值
    3. FormModal组件渲染为select新增1个参数，`filterable`用于是否开启select搜索功能，即可以输入过滤下拉框

* *2018/09/20* 
    1. EditTable组件新增一个emit event，`editConfig`通过点击修改icon触发，此时表格行数据进入编辑模式
    2. 优化了EditTable组件渲染为select单元格的一个bug。此前当在编辑模式中切换下拉框，然后关闭编辑模式，但源数据并未修改，select表示为切换后的数据。目前已修改为源数据
    3. BreadLink组件新增两个props，`routeSuffix`的props专门用来给面包屑导航路由动态传参

* *2018/09/12* 
    1. 解决了vuejs中jsx语法导致组件名称报错的问题，因为iview的`Select`和`Option`组件名称在非render或template模式下必须写成`i-select`和`i-option`。初步推测为，vuejs中jsx语法不能被完美解析为render函数，或者是说iview的bug。
    2. EditTable组件的columns选项新增3个配置，`width`(宽度)，`placeholder`(input和select占位符)和`clearable`(input是否可一键删除)
    3. 优化了EditTable组件渲染为select单元格默认选中值的逻辑，会优先取传入组件的result值，如果result不存在或者为空，则会从源数据data中匹配对应的key值

# license
* MIT