## FullScreen
> 全屏功能组件，兼容IE,Firefox和Chorme内核，组件表现为一个按钮，点击切换全屏

### props
* tooltip，`Object`，可选，格式为`{in: '' out:''}`，按钮在全屏或退出全屏模式的tooltip文本，默认为：'点击进入全屏'和'点击退出全屏'
* iconType，`Object`，可选，格式为`{in: '' out:''}`，按钮在全屏或退出全屏模式的icon类型，默认为：'md-expand'和'md-contract' 
* iconSize，`Number`，可选，默认为26，按钮icon的大小
* dom，`String`，可选，默认为'html'，触发全屏模式的dom结构，格式为jq选择器字符串  
* style，`String | Object`，可选，默认所有组件都支持原生的style选项，无论是原生标签还是自定义组件

### emit events
* inFullScreen, 进入全屏时触发，无返回值
* outFullScreen, 退出全屏时触发，无返回值

## Attention
1. FullScreen组件目前只支持按钮实现切换全屏。后期可能会添加vue实例方法，用于随意切换全屏功能
2. 如果需要在组件切换全屏时，动态改变某些dom宽高。可以直接通过监听emit events即可。但必须注意，测试时候一定要关闭浏览器的devTool！否则dom获取的宽高会不准
3. 组件默认提供按钮点击来切换全屏操作，但是不同浏览器内核还会提供默认的退出全屏操作，例如：ESC、F11，emit events都会监听到退出全屏