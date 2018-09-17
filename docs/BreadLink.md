## BreadLink
> 为了使面包屑组件和具体组件更好的解耦，更加模块化来全局管理，专门抽离一个配置文件来管理面包屑导航功能的组件

* `BreadLink`使用与其余组件不相同，只有一个`style(与原生vue一致)`的props,没有emit events。只需要在具体组件内引入，注册，然后调用`<BreadLink />`即可。或者在`main.js`里全局注册。
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