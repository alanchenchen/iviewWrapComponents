import { Icon, Tooltip } from 'iview'

/**
 * @author AlanChen
 * @module IconCol EditTable中控制icon按钮的一列渲染组件，可以自定义icon，也有默认值
 * @description vue的函数式组件，由于vue中只支持单纯的jsx展示，不支持react的函数式组件，所以只能单独写vue组件
 * @param {Object} lenConfig (props) table组件中对应的关于行数的对象
 * @param {Object} type (props) 用户通过clomuns传入的自定义icon的对象
 * @param {Object} defaultConfig (props) 组件默认的3个icon的配置对象
 * 
*/

export default {
    functional: true,
    render (h , ctx) {
        const { dataCloneLen, currentRow, isEditable } = ctx.props.lenConfig
        const customeConfig = ctx.props.type
        const defaultConfig =  ctx.props.defaultConfig[customeConfig.key]
        
        // 当前icon是否被自定义
        const isRedefinedIcon = Object.keys(customeConfig).length >= 2
        
        let showIcon, isShowByFilterFn
        if(customeConfig.visible === true || customeConfig.visible === undefined) {
            showIcon = 'allShow'
        }
        else if(customeConfig.visible === false) {
            showIcon = 'allHide'
        }
        else if(typeof customeConfig.visible == 'function') {
            showIcon = 'filterFn'
            isShowByFilterFn = customeConfig.visible(currentRow, dataCloneLen, isEditable)
        }
        
        // 用户传入了自定义icon配置
        if(isRedefinedIcon) {
            if(showIcon == 'allShow') { // 全显示icon
                return (
                    <Tooltip content={ customeConfig.tooltip? customeConfig.tooltip :defaultConfig.tooltip }>
                        <a
                            style={defaultConfig.style}
                            onClick={defaultConfig.clickHandler}
                        >
                            <Icon
                                type={ customeConfig.iconType? customeConfig.iconType :defaultConfig.iconType }
                                size='20'
                                color={ customeConfig.iconColor? customeConfig.iconColor :defaultConfig.iconColor }
                            />
                        </a>
                    </Tooltip>
                )
            }
            else if(showIcon == 'filterFn') {
                if(isShowByFilterFn) { // 显示符函数visible的icon
                    return (
                        <Tooltip content={ customeConfig.tooltip? customeConfig.tooltip :defaultConfig.tooltip }>
                            <a
                                style={defaultConfig.style}
                                onClick={defaultConfig.clickHandler}
                            >
                                <Icon
                                    type={ customeConfig.iconType? customeConfig.iconType :defaultConfig.iconType }
                                    size='20'
                                    color={ customeConfig.iconColor? customeConfig.iconColor :defaultConfig.iconColor }
                                />
                            </a>
                        </Tooltip>
                    )
                }
            }
            else if(showIcon == 'allHide' || (showIcon == 'filterFn' && !isShowByFilterFn)) { /// 全不显示icon和不符合函数visible的icon
                return (
                    <a></a>
                )
            }
        }
        // 用户没有自定义icon，执行默认配置
        else {
            return (
                <Tooltip content={ defaultConfig.tooltip }>
                    <a
                        style={defaultConfig.style}
                        onClick={defaultConfig.clickHandler}
                    >
                        <Icon
                            type={ defaultConfig.iconType }
                            size='20'
                            color={ defaultConfig.iconColor }
                        />
                    </a>
                </Tooltip>
            )
        }
    }
}
