# 基于iview二次开发的一些通用业务组件

> Author : Alan Chen

> version: 只兼容了iview2.x版本，不保证完全兼容3.x, 最好全局使用iview，`Vue.use(iview)`，因为封装的组件使用了大量iview基础组件

> Date: 2018/09/12 

# Components
* [FormModal](./docs/FormModal.md)
* [FlexModal](./docs/FlexModal.md)
* [EditTable](./docs/EditTable.md)
* [BreadLink](./docs/BreadLink.md)
# Update Logs
* *2018/09/12* 
    1. 解决了vuejs中jsx语法导致组件名称报错的问题，因为iview的`Select`和`Option`组件名称在非render或template模式下必须写成`i-select`和`i-option`。初步推测为，vuejs中jsx语法不能被完美解析为render函数，或者是说iview的bug。
    2. EditTable组件的columns选项新增3个配置，`width`(宽度)，`placeholder`(input和select占位符)和`clearable`(input是否可一键删除)
    3. 优化了EditTable组件渲染为select单元格默认选中值的逻辑，会优先取传入组件的result值，如果result不存在或者为空，则会从源数据data中匹配对应的key值

# license
* MIT