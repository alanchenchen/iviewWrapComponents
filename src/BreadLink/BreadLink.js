/**
 * @module 二次封装的Breadcrumb面包屑导航组件
 * @description 自动根据路由path来匹配配置文件，动态渲染面包屑内容和导航。将面包屑组件与具体业务组件解耦
 */

import { Breadcrumb, BreadcrumbItem }  from 'iview'
import config from './config'

export default {
    name: 'BreadLink',
    render(h) {
        const url = this.$route.path
        const breadLink = config.find(a => a.path == url).breadLink
                      
        const breadItems = breadLink.map(item => {
            return (
                <BreadcrumbItem to={item.link}>{item.name}</BreadcrumbItem>
            )
        })

        return (
            <Breadcrumb style={this.style || {}}>
                {breadItems}
            </Breadcrumb>
        )
    }
}