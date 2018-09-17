import { Icon, Tooltip } from 'iview'

/**
 * @module IconCol EditTable中控制icon按钮的一列渲染组件，可以自定义icon，也有默认值
 * @description vue的函数式组件，由于vue中只支持单纯的jsx展示，不支持react的函数式组件，所以只能单独写vue组件
 * @param {Number} row (props) table组件中对应的当前行数，通过columns中render函数里的params参数可以获取
 * @param {Object} type (props) 用户通过clomuns传入的自定义icon的对象
 * @param {Object} defaultConfig (props) 组件默认的3个icon的配置对象
 * 
*/

export default {
    functional: true,
    render (h , ctx) {
        const row = ctx.props.row
        const iconKey = ctx.props.type
        const defaultConfig =  ctx.props.defaultConfig[iconKey.key]

        const showIcon = (iconKey.visible === true || iconKey.visible === undefined)
        const hideIcon = (iconKey.visible === false)
        const isRedefinedIcon = Object.keys(iconKey).length >= 2
        const isShowColWhileHide = (iconKey.index && row != iconKey.index)
        
        //用户传入了自定义icon配置
        if(isRedefinedIcon) {
            if(showIcon) { //显示icon
                return (
                    <Tooltip content={ iconKey.tooltip? iconKey.tooltip :defaultConfig.tooltip }>
                        <a
                            style={defaultConfig.style}
                            onClick={defaultConfig.clickHandler}
                        >
                            <Icon
                                type={ iconKey.iconType? iconKey.iconType :defaultConfig.iconType }
                                size='20'
                                color={ iconKey.iconColor? iconKey.iconColor :defaultConfig.iconColor }
                            />
                        </a>
                    </Tooltip>
                )
            }
            else if(hideIcon) {
                if(isShowColWhileHide) { //显示row不是index的icon
                    return (
                        <Tooltip content={ iconKey.tooltip? iconKey.tooltip :defaultConfig.tooltip }>
                            <a
                                style={defaultConfig.style}
                                onClick={defaultConfig.clickHandler}
                            >
                                <Icon
                                    type={ iconKey.iconType? iconKey.iconType :defaultConfig.iconType }
                                    size='20'
                                    color={ iconKey.iconColor? iconKey.iconColor :defaultConfig.iconColor }
                                />
                            </a>
                        </Tooltip>
                    )
                }
                else { //不显示row是index的icon
                    return (
                        <a></a>
                    )
                }
            }
        }
        //用户没有自定义icon，执行默认配置
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
