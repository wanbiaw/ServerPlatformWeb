<template>
    <a-card>
        <div :class="advanced ? 'search' : null">
            <a-form layout="horizontal" :form="form" @submit="onsubmit">
                <div :class="advanced ? null: 'fold'">
                    <a-row >
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="MockID"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input v-decorator="['ids',{rules:[{required: false}]}]" placeholder="请输入" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="Mock名称"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input v-decorator="['name',{rules:[{required: false}]}]" placeholder="请输入" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="MockURL"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
<!--                                <a-input-number style="width: 100%" placeholder="请输入" />-->
                                <a-input v-decorator="['url',{rules:[{required: false}]}]" placeholder="请输入" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row v-if="advanced">
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="请求方式"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-select v-decorator="['requestMethod',{rules:[{required: false}]}]" placeholder="请选择">
                                <a-select-option value="get">GET</a-select-option>
                                <a-select-option value="post">POST</a-select-option>
                            </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="创建时间"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-date-picker v-decorator="['createdAt',{rules:[{required: false}]}]" style="width: 100%" placeholder="请输入创建日期" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24" >
                            <a-form-item
                                    label="更新日期"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-date-picker v-decorator="['updatedAt',{rules:[{required: false}]}]" style="width: 100%" placeholder="请输入更新日期" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </div>
                <span style="float: right; margin-top: 3px;">
                    <a-button type="primary" html-type="submit">查询</a-button>
                    <a-button style="margin-left: 8px">重置</a-button>
                    <a @click="toggleAdvanced" style="margin-left: 8px">
                        {{advanced ? '收起' : '展开'}}
                        <a-icon :type="advanced ? 'up' : 'down'" />
                    </a>
                </span>
            </a-form>
        </div>
        <div>
            <a-space class="operator">
                <a-button @click="addMock('add')" type="primary">新建</a-button>
                <a-button @click="delMocks">批量删除</a-button>
<!--                <a-dropdown>-->
<!--                    <a-menu @click="handleMenuClick" slot="overlay">-->
<!--                        <a-menu-item key="delete">删除</a-menu-item>-->
<!--                        <a-menu-item key="audit">审批</a-menu-item>-->
<!--                    </a-menu>-->
<!--                    <a-button>-->
<!--                        更多操作 <a-icon type="down" />-->
<!--                    </a-button>-->
<!--                </a-dropdown>-->
            </a-space>
<!--            .sync的作用是用于父组件监听子组件对应数据变化，并更新数据到父组件的-->
            <standard-table
                    :columns="columns"
                    :dataSource="dataSource"
                    :selectedRows.sync="selectedRows"
                    @clear="onClear"
                    @change="onChange"
            >
<!--                    @selectedRowChange="onSelectChange"-->
<!--            >-->
<!--                <div slot="description" slot-scope="{text}">-->
<!--                    {{text}}-->
<!--                </div>-->
                <div slot="action" slot-scope="{record}">
                    <a style="margin-right: 8px" @click="editMock(record.key,'edit')">
                        <a-icon type="edit"/>编辑
                    </a>
                    <a @click="deleteRecord(record.id)">
                        <a-icon type="delete" />删除
                    </a>
<!--                    <a @click="deleteRecord(record.key)" v-auth="`delete`">-->
<!--                        <a-icon type="delete" />删除2-->
<!--                    </a>-->
<!--                    <router-link :to="`/list/query/detail/${record.key}`" >详情</router-link>-->
                </div>
                <template slot="statusTitle">
                    <a-icon @click.native="onStatusTitleClick" type="info-circle" />
                </template>
            </standard-table>
            <add-or-update
                    ref="addOrUpdate"
            ></add-or-update>
        </div>
    </a-card>
</template>

<script>
    import StandardTable from '@/components/table/StandardTable'
    import {getHttpMock,delHttpMock} from "@/services/mock";
    import AddOrUpdate from "@/pages/mock/addOrUpdate";
    const columns = [
        {
            title: 'MockID',
            dataIndex: 'id',
            sorter: true
        },
        {
            title: 'Mock名称',
            dataIndex: 'name',
            // scopedSlots: { customRender: 'description' }
        },
        {
            title: 'MockURL',
            dataIndex: 'url',
            //needTotal用于选中时该属性的计数
            // needTotal: true,
            // customRender: (text) => text + ' 次'
        },
        {
            title: '请求类型',
            dataIndex: 'requestMethod',
            // needTotal: true,
            // slots: {title: 'statusTitle'}
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            sorter: true
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            sorter: true
        },
        {
            title: 'Mock操作',
            scopedSlots: { customRender: 'action' }
        }
    ];

    const dataSource = [];

    export default {
        name: "mock",
        // i18n: require('./i18n'),
        components: {AddOrUpdate, StandardTable},
        data () {
            return {
                advanced: true,
                form:this.$form.createForm(this),
                columns: columns,
                dataSource: dataSource,
                selectedRows: [],
                addOrUpdateVisible:false
            }
        },
        created: function(){
            let data = {};
            getHttpMock(data).then(res => {
                let source = res.data;
                console.log(source);
                if (dataSource.length<1){
                    for (let i = 0; i < source.length;i++){
                        dataSource.push({
                            key: i,
                            id: source[i].id,
                            uuid:source[i].uuid,
                            name: source[i].name,
                            url: source[i].url,
                            header:source[i].header,
                            param:source[i].param,
                            requestMethod: source[i].requestMethod,
                            requestData:source[i].requestData,
                            response:source[i].response,
                            status:source[i].status,
                            delay:source[i].delay,
                            createdAt: new Date(+new Date(source[i].createdAt)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,''),
                            updatedAt: new Date(+new Date(source[i].updatedAt)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                        })
                    }
                }
            });
        },
        // authorize: {
        //     deleteRecord: 'delete'
        // },
        methods: {
            onsubmit(){
                // console.log(this.form);
                // console.log(this.form.getFieldValue("name"));
                // console.log(this.form.getFieldValue("createdAt"));
                this.form.validateFields((error, values) => {
                  console.log('error', error);
                  console.log('Received values of form: ', values);
                  getHttpMock(values).then(res => {
                      let source = res.data;
                      this.dataSource = [];
                      for (let i = 0; i < source.length;i++){
                        this.dataSource.push({
                          key: i,
                          id: source[i].id,
                          uuid:source[i].uuid,
                          name: source[i].name,
                          url: source[i].url,
                          header:source[i].header,
                          param:source[i].param,
                          requestMethod: source[i].requestMethod,
                          requestData:source[i].requestData,
                          response:source[i].response,
                          status:source[i].status,
                          delay:source[i].delay,
                          createdAt: new Date(+new Date(source[i].createdAt)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,''),
                          updatedAt: new Date(+new Date(source[i].updatedAt)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                        })
                      }
                      console.log(this.dataSource);
                  })
                });

            },
            editMock(key,type){
                this.$nextTick(() =>{
                    this.$refs.addOrUpdate.showModel(dataSource[key],type);
                })
            },
            deleteRecord(key) {
                // this.dataSource = this.dataSource.filter(item => item.key !== key)
                // this.selectedRows = this.selectedRows.filter(item => item.key !== key)
                let data = [];
                data.push(key);
                delHttpMock(data).then(this.$message.info("已删除该项!"));
            },
            toggleAdvanced () {
                this.advanced = !this.advanced
            },
            remove () {
                this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
                this.selectedRows = []
            },
            onClear() {
                this.$message.info('已清空勾选项')
            },
            onStatusTitleClick() {
                this.$message.info('你点击了状态栏表头')
            },
            onChange() {
                this.$message.info('表格状态改变了')
            },
            // onSelectChange() {
            //     this.$message.info('选中行改变了')
            // },
            addMock (type) {
                this.$nextTick(() =>{
                    this.$refs.addOrUpdate.showModel(null,type);
                })
                // this.dataSource.unshift({
                //     key: this.dataSource.length,
                //     no: 'NO ' + this.dataSource.length,
                //     description: '这是一段描述',
                //     callNo: Math.floor(Math.random() * 1000),
                //     status: Math.floor(Math.random() * 10) % 4,
                //     updatedAt: '2018-07-26'
                // })
            },
            delMocks(){
                console.log(this.selectedRows);
                let data = [];
                this.selectedRows.forEach(res =>data.push(res.id));
                delHttpMock(data).then(this.$message.info("已删除所选项"));
            },
            handleMenuClick (e) {
                if (e.key === 'delete') {
                    this.remove()
                }
            }
        }
    }
</script>

<style scoped>

</style>
