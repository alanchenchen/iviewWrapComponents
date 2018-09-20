<template>
    <Table 
        :data="data"
        :columns="columnsRender"
        :height="height"
        :loading="loading"
        :stripe="stripe"
    />
</template>

<script>
/*
    component: 基于iview扩展的可编辑表格，目前可编辑input和select组件
    author: Alan Chen
    version: 0.0.3
    lastDate: 2018/9/19

    使用说明：
        1. 必须搭载iveiw库使用
        2. props必须传data和columns。data和columns均为数组。可选height(高度),stripe(是否开启斑马纹),loading(加载状态),disableCreateMode(是否关闭createConfig事件)
            columns数组项可选值有 
                title => 可选，String，表头的名称，默认为空字符串
                key => 必选，String，对应data内的数据key
                type => 可选，String，有input,select和icon三种,不填默认渲染为普通表格cell组件，不可编辑
                selectInfo => 可选，Object，当type为select时必选，select的数据，必须要有item和result两个值，item是个数组，数组项包含lable和value,result为select选中的值
                              下拉框的默认选中值先取result，如果没有result则自动从当前行数据中取对应的key。显示出来的总是label，而dataClone里绑定的是value
                width => 可选，Number，单元格的宽度，除icon外，普通cell，可编辑input，可编辑select都会生效，默认自动宽度
                placeholder => 可选，String，可编辑单元格的占位符。可编辑input默认为空字符串，可编辑select默认为'请选择'字符串
                clearable => 可选，Boolean，是否开启可以点击删除的icon功能，只对可编辑input生效，默认为false

            **注意** 
                组件默认会在最后一列渲染3个按钮，title为'操作'。如果不传入type为icon的数组项，默认值不会更改
                当type为icon时，可选值有title，type， custom
                custom格式如下：
                    custom: [
                        key: 'delete',  必选，有'edit','save'和'delete'三个值，对应三个按钮
                        iconType: '', 可选，为iview中icon组件的type值，默认为对应按钮的type
                        iconColor: '', 可选，为iview中icon组件的color值，默认为对应按钮的color
                        tooltip: '', 可选，按钮的提示框值,默认为'删除'
                        visible: 布尔值 可选，icon是否显示,默认为true,如果为false，没有index，则默认隐藏所有行的icon
                        index: 数字 可选，仅当visible为false生效，表现为index对应的行数下的单元格隐藏icon，其余行数icon则不隐藏
                    ]

        3. emit event有4个自定义事件
            editConfig => 点击编辑的icon，开启编辑模式触发。返回一个参数params，为table原始数据。
            updateConfig => 开启编辑模式后点击保存icon触发，返回3个参数rest,params和done。rest为修改后的当前行表单数据，params为table原始数据，done为一个函数，调用后关闭编辑模式
            createConfig => 只有源数据data新建了一条空数据，开启编辑模式后点击保存icon才触发，返回参数与updateConfig一致
            deleteConfig => 点击删除icon触发，返回2个参数rest和params，为修改后的当前行表单数据，params为table原始数据
        4. 组件本身开启编辑模式，然后保存，并不会改变源数据，所以需要用户自己在保存后改变data即可，表格数据会同步更新
        5. 为了让组件逻辑更精简，所有emit事件返回的dataClone值一旦被开启编辑模式，则会重置。这样做更符合组件应用场景。避免了源数据data未更新而缓存了dataClone的情况
*/
import { Icon, Select, Option, Input, Tooltip } from 'iview'
import IconCol from './IconCol.js'

export default {
    name: 'EditTable',
    props: {
        data: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        disableCreateMode: {
            type: Boolean,
            default: false
        },
        height: {
            type: [String, Number],
            default: ''
        },
        stripe: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dataClone: [] //必须要在data里声明，否则table组件里的render函数无法动态通知，render函数只有data才能通知，computed无法通知
        }
    },
    computed: {
        //最终生成的带render和tile的columns数组
        columnsRender() {
            const defaultIconCol = {
                title: '操作',
                type: 'icon',
                custom: []
            }
            const isRedefinedIconCol = this.columns.some(a => a.type == 'icon')
            //需要处理用户传入的columns，因为如果用户没有自定义icon操作列，则需要给出默认的配置
            const fixedColumns = isRedefinedIconCol
                                ? this.columns 
                                : [...this.columns, defaultIconCol]
            
            return fixedColumns.map(a => {
                return this.formatColumns(a)
            })
        },
        //用户传入的columns中所有的key
        columnKeys() {
           return this.columns.map(a => {
               return { value: a.key, type: a.type }
           })
        }
    },
    created() {
        this.updateDataClone()
    },
    watch: {
        //动态监听源数据data来同步更改dataClone
        data(val) {
            this.updateDataClone()
        }
    },
    methods: {
        //处理用户传入的colmuns到table组件需要的格式转换
        formatColumns(col) {
            const title = col.title
            const key = col.key
            const type = col.type
            const custom = col.custom
            const selectInfo = col.selectInfo
            // 组件中详细的配置项
            const cellWidth = col.width
            const cellPlaceholder = col.placeholder
            const cellClearable = col.clearable // 仅对input有效

            let render
            // input的render类型
            if(type == 'input') {
                render = (h, params) => {
                    const index = params.row._index
                    const inputWidth = cellWidth
                                      ?`width: ${cellWidth}px`
                                      : '' 
                    const inputPlaceholder = cellPlaceholder || ''
                    const inputClearable = Boolean(cellClearable)
                                         ? cellClearable
                                         : false

                    return !this.dataClone[index].isCellEditable
                            ? ( <p style={{width: `${cellWidth}px`}}>{params.row[key]}</p> )
                            : ( 
                                <Input 
                                    value={params.row[key]} 
                                    size="small" 
                                    style={inputWidth}
                                    placeholder={inputPlaceholder}
                                    clearable={inputClearable}
                                    on-on-change={(e) => {this.dataClone[index][key]  = e.target.value.trim()}}
                                />
                            )
                }
            }
            // select的render类型
            else if(type == 'select') {
                render = (h, params) => {
                    const selectWidth = cellWidth
                                      ?`width: ${cellWidth}px`
                                      : '' 
                    const selectPlaceholder = cellPlaceholder || '请选择'
                    /**
                    * 在vuejs的render里写jsx，iview认定为非template和非render模式，所以Select和Option必须改成i-select和i-option 。
                    * 否则当组件被调用时，cloumns被动态改变(例如改变selectInfo)，这两个组件会报错
                    */
                    const index = params.row._index
                    const optionItems = selectInfo.item || []
                    const options = optionItems.map(a => 
                        <i-option key={`${a.label}-${a.value}`} value={a.value}>
                            {a.label}
                        </i-option>
                    )
                    
                    // 下拉框默认选中的值先取组件传入的result，如果没有，则从源数据data找相应的key.最终显示出来的都是label，但是绑定存储的是value
                    const selectResultValue = selectInfo.result || params.row[key]
                    const selectResult = optionItems.find(a => a.value == selectResultValue)
                    const selectResultLabel = (selectResult && selectResult.label) || selectResultValue

                    return !this.dataClone[index].isCellEditable
                            ? ( <p style={{width: `${cellWidth}px`}}>{selectResultLabel}</p> )
                            : (
                                <i-select 
                                    value={selectResultValue}
                                    on-on-change={val => {this.dataClone[index][key] = val}}
                                    style={selectWidth}
                                    placeholder={selectPlaceholder}
                                >
                                    {options}    
                                </i-select>
                            )
                }
            }
            // 表格最后一列的icon操作按钮的render类型
            else if(type == 'icon') {
                const edit = custom.find(item => item.key == 'edit') || { key: 'edit'}
                const save = custom.find(item => item.key == 'save') || { key: 'save'}
                const del = custom.find(item => item.key == 'delete')  || { key: 'delete'}

                render = (h, params) => {
                    const index = params.row._index
                    
                    const editHandler = () => {
                        if(this.dataClone[index].isCellEditable == false) {
                            this.initDataClone() //每次点击编辑，就让dataClone恢复到初始状态
                            this.$emit('editConfig', params)
                        }
                        this.dataClone[index].isCellEditable = true
                    }

                    const saveHandler = () => {
                        const {isCellEditable, isEmptyCell, ...rest} = this.dataClone[index]
                        //回调一个函数，来控制是否关闭编辑模式
                        const done = () => {
                            this.dataClone[index].isCellEditable = false
                        }
                        //判断是通过一个空数据添加新数据还是修改已有数据
                        if(isEmptyCell && isCellEditable) {
                            this.$emit('createConfig', rest, params, done)
                        }
                        else if(isCellEditable) {
                            this.$emit('updateConfig' , rest, params, done)
                        }
                    }

                    const delHandler = () => {
                        const {isCellEditable, isEmptyCell, ...rest} = this.dataClone[index]
                        this.$emit('deleteConfig', rest, params)
                    }

                    //icon的默认配置
                    const defaultIconConfig = {
                        'edit': {
                            style: {marginRight:'15px'},
                            clickHandler: editHandler,
                            tooltip: '修改',
                            iconType: 'edit',
                            iconColor: '#2d8cf0'
                        },
                        'save': {
                            style: {marginRight:'15px'},
                            clickHandler: saveHandler,
                            tooltip: '保存',
                            iconType: 'ios-checkmark-outline',
                            iconColor: '#19be6b'
                        },
                        'delete': {
                            style: {},
                            clickHandler: delHandler,
                            tooltip: '删除',
                            iconType: 'android-cancel',
                            iconColor: '#ed3f14'
                        }
                    }

                    return (
                        <p>
                            <IconCol type = {edit} defaultConfig = {defaultIconConfig} row={params.index} />
                            <IconCol type = {save} defaultConfig = {defaultIconConfig} row={params.index} />
                            <IconCol type = {del} defaultConfig = {defaultIconConfig} row={params.index} />
                        </p>
                    )
                }
            }
            // 默认为p标签的render类型
            else {
                render = (h, params) => {
                    return (
                        <p style={{width: `${cellWidth}px`}}>{params.row[key]}</p>
                    )
                }
            }
            
            return {title, render}
        },
        //深度拷贝data到dataClone，并添加几个必要的key，如：isCellEditable(是否可编辑) 和  isEmptyCell(是否为空数据，区分updateConfig和createConfig事件)
        updateDataClone() {
            const maxIndex = this.data.length-1
            const clone = JSON.parse(JSON.stringify(this.data)).map((a, b, c) => {
                //通过data最后一条数据中input或slect类型的值是否为空来判断当前操作是新增还是修改
                const last = c[maxIndex]
                //只过滤得到用户传入的key名数据
                const columnKeysFilter = this.columnKeys.filter(item => item.type == 'input' || item.type == 'select').map( colKey => colKey.value )
                const isKeyExist = param => columnKeysFilter.includes(param)
                const filter = Object.entries(last).filter( key => isKeyExist(key[0]) ).map(value => value[1])
                // 是否在最后一条插入空数据并自动开启编辑模式，只有这种情况才会返回createConfig事件
                const isInsertNewRow = (b == maxIndex && filter.every(item =>  item == '') && !this.disableCreateMode) 
                
                if(isInsertNewRow) {
                    return {...a, isCellEditable: true, isEmptyCell: true}
                }
                else {
                    return {...a, isCellEditable: false, isEmptyCell: false}
                }
            })
           this.dataClone = clone
        },
        // 初始化，重置dataClone到未编辑状态, 将input或select中的拷贝值变为空
        initDataClone() {
            const clone = JSON.parse(JSON.stringify(this.data)).map( a => {
                //只过滤得到用户传入的key名数据
                const columnKeysFilter = this.columnKeys.filter(item => item.type == 'input' || item.type == 'select').map( colKey => colKey.value )
                const isKeyExist = param => columnKeysFilter.includes(param)
                let cloneA = {}

                // 将源数据的input或者select的值拷贝为空，其余数据不变，存入一个clone
                Object.entries(a).forEach(item => {
                    if(isKeyExist(item[0])) {
                        cloneA[item[0]] = ''
                    }
                    else {
                        cloneA[item[0]] = item[1]
                    }
                })
                
                return {...cloneA, isCellEditable: false, isEmptyCell: false}
            })

            this.dataClone = clone
        }
    }
}
</script>

<style lang="css" scoped>
    
</style>