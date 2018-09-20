/**
 * @module 二次封装的Breadcrumb面包屑导航组件
 * @description 自动根据路由path来匹配配置文件，动态渲染面包屑内容和导航。将面包屑组件与具体业务组件解耦
 * @param {Object} styles (props) 可选，组件的样式。语法和vue原生style一致
 * @param {Array | Object} routeSuffix (props) 可选，组件跳转路由拼接的param和query参数。
 *      数组内对象格式：
 *                  {
 *                      name: 'home',   与config.js里breadLink的name一致
 *                      param: '/sub',  必须是字符串，会直接拼接在导向路由后面，必须添加/
 *                      query: {        必须是对象，用法与vue-router一致，会拼接在导向路由后面
 *                          author: 'alan',
 *                          age: 24
 *                      }
 *                  }
 */

import { Breadcrumb, BreadcrumbItem }  from 'iview'
import config from './config'

/**
 * @function format 处理路由地址拼接
 * @param {String} path 原路由url地址
 * @param {String} param 拼接的参数, 默认为空字符串
 * @param {Object} query 拼接的参数，默认为空对象
 */
const format = (path, param = '', query = {}) => {
    const queryArr = Object.entries(query).map(a => {
        return {key: a[0], value: a[1]}
    })
    const queryStr = queryArr.reduce((total, item) => {
        return total + `&${item.key}=${item.value}`
    }, '')

    return path + param + '?' + queryStr
}

export default {
    name: 'BreadLink',
    props: {
        styles: {
            type: Object,
            default() {
                return {}
            }
        },
        routeSuffix: {
            type: Array,
            default() {
                return []
            }
        }
    },
    render(h) {
        const url = this.$route.path
        const breadLink = config.find(a => a.path == url).breadLink // 匹配当前路由的所有面包屑链接
        const styles = this.styles // 组件传入的props styles
        const routeSuffix = this.routeSuffix // 组件传入的props routeSuffix
                      
        const breadItems = breadLink.map(item => {
            const needPathSuffix = routeSuffix && routeSuffix.find(a => a.name == item.name)
            // 根据是否传入匹配的routeSuffix来决定是否拼接当前面包屑的链接
            const toPath = Boolean(needPathSuffix) 
                          ? format(item.link, needPathSuffix.param, needPathSuffix.query)
                          : item.link

            return (
                <BreadcrumbItem to={toPath}>{item.name}</BreadcrumbItem>
            )
        })

        return (
            <Breadcrumb style={styles}>
                {breadItems}
            </Breadcrumb>
        )
    }
}