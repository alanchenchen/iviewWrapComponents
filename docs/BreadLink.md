## BreadLink
> 为了使面包屑组件和具体组件更好的解耦，更加模块化来全局管理，专门抽离一个配置文件来管理面包屑导航功能的组件

* `BreadLink`使用与其余组件不相同，主要通过更改单独的配置文件来生效。
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
> 为了提高`BreadLink`组件的定制性，提供两个props。
    
* `styles(与原生vue一致)`，Object，可选，默认为空对象，用来改变`BreadLink`在具体组件中的样式。
* `routeSuffix`，Array，可选，默认为空数组，用来动态传参给具体面包屑的路由，具体格式如下：
```javascript
    // 虽然config.js可以单独抽离出来管理面包屑和对应跳转路由，但是为了实现具体组件给跳转路由动态传参，便添加了这个props
    routeSuffix: [
        {
            name: 'Home',  // 必须与config.js对应页面组件中的name一致
            param: '/a',   // 这将会改变路由地址，迫使目标路由失效，而push到添加/a后缀的路由地址
            query: {       // 不会改变路由地址，会在匹配路由后面添加参数，与vue-router用法一致，最终会push到后缀为?author=alan&date=2018/09/20的路由地址
                author: 'alan',
                date: '2018/09/20'
            }
        }
    ]
```