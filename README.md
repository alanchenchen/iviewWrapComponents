# 基于iview二次开发的一些通用业务组件

> Author : Alan Chen

> version: 只兼容了iview2.x版本，不保证完全兼容3.x, 最好全局使用iview，`Vue.use(iview)`，因为封装的组件使用了大量iview基础组件

> Date: 2018/09/10 

# Components
* [FormModal](./docs/FormModal.md)
* [FlexModal](./docs/FlexModal.md)
* [EditTable](./docs/EditTable.md)
* [BreadLink](./docs/BreadLink.md)
# Update Logs
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