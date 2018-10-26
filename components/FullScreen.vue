<template>
    <Tooltip 
        :content="showTip"
        placement="left"
    >
        <a @click="toggleFullScreen">
            <Icon 
                :type="showIcon" 
                :size="iconSize"
            />
        </a>
    </Tooltip>
</template>

<script>
    /**
    *  component: FullScreen 全屏组件，兼容IE,Firefox和Chorme内核
    *  author: Alan Chen
    *  lastDate: 2018/10/26
    *  使用：
    *    props：
    *      1. tooltip [Object],可选，格式为{in: '' out:''}，按钮在全屏或退出全屏模式的tooltip文本，默认为：'点击进入全屏'和'点击退出全屏'
    *      2. iconType [Object],可选，格式为{in: '' out:''}，按钮在全屏或退出全屏模式的icon类型，默认为：'arrow-expand'和'arrow-shrink' 
    *      3. iconSize [Number],可选，默认为26
    *      4. dom [String],可选，触发全屏模式的dom结构，格式为jq选择器字符串，默认为'html'  
    *      5. style [String | Object]，可选，默认所有组件都支持原生的style选项，无论是原生标签还是自定义组件
    *    emitEvents
    *      1. inFullScreen, 进入全屏时触发，无返回值
    *      2. outFullScreen, 退出全屏时触发，无返回值
    *   注意：
    *      组件默认提供按钮点击来切换全屏操作，但是不同浏览器内核还会提供默认的退出全屏操作，例如：ESC、F11 
    *
    */
export default {
    name: 'FullScreen',
    props: {
        tooltip: {
            type: Object,
            default() {
                return {
                    in: '点击进入全屏',
                    out: '点击退出全屏'
                }
            }
        },
        iconType: {
            type: Object,
            default() {
                return {
                    in: 'arrow-expand',
                    out: 'arrow-shrink'
                }
            }
        },
        iconSize: {
            type: Number,
            default: 26
        },
        dom: {
            type: String,
            default: 'html'
        }
    },
    data() {
        return {
            isFullScreen: false
        }
    },
    computed: {
        showTip() {
            return this.isFullScreen? this.tooltip.out: this.tooltip.in
        },
        showIcon() {
            return this.isFullScreen? this.iconType.out: this.iconType.in
        }
    },
    mounted() {
        const prefix = ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange']

        // 监听全屏事件，动态更改isFullScreen
        prefix.forEach(item => {
            document.addEventListener(item, e => {
                const fullscreenFlag = document.fullscreenEnabled ||
                                        document.fullscreenElement ||
                                        document.mozFullScreenElement ||
                                        document.webkitFullscreenElement
                if (fullscreenFlag) {
                    this.isFullScreen = true
                    this.$emit('inFullScreen')
                } 
                else {
                    this.isFullScreen = false
                    this.$emit('outFullScreen')
                    // 为了让ESC、F7等按键退出全屏也能恢复dom原本的宽高
                    const dom = document.querySelector(this.dom)
                    if(Boolean(dom)) {
                        dom.style.width = ''
                        dom.style.height = ''
                    }
                }
            })
        })
    },
    methods: {
        toggleFullScreen() {
            if(this.isFullScreen) {
                this.outtoFullScreen()
            }
            else {
                this.intoFullScreen()
            }
        },  
        intoFullScreen() {
            const dom = document.querySelector(this.dom)
            if(dom.requestFullscreen) {
                dom.requestFullscreen()
            } else if(dom.mozRequestFullScreen) {
                dom.mozRequestFullScreen()
            } else if(dom.webkitRequestFullscreen) {
                dom.webkitRequestFullscreen()
            } else if(dom.msRequestFullscreen) {
                dom.msRequestFullscreen()
            }
            this.isFullScreen = true
            dom.style.width = '100%'
            dom.style.height = '100%'
        },
        outtoFullScreen() {
            const dom = document.querySelector(this.dom)
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            }
            this.isFullScreen = false
            dom.style.width = ''
            dom.style.height = ''
        }
    }
}
</script>

<style lang="css" scoped>
    
</style>