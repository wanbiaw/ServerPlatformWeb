<template>
    <div class="addOrUpdate-modal">
<!--        <div class="alert">-->
<!--            <a-alert :message="msg" type="success" />-->
<!--        </div>-->
        <a-modal
                :title="titleType === 'add'? '新增Mock':'编辑Mock'"
                :visible="visible"
                :confirm-loading="confirmLoading"
                ok-text="提交"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-form-model
                    ref="ruleForm"
                    :model="dataForm"
                    :rules="rules"
                    labelAlign="left"
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
            >
                <a-form-model-item ref="name" label="Mock名称" prop="name">
                    <a-input
                            v-model="dataForm.name"
                            @blur="() => {
                                $refs.name.onFieldBlur();
                            }"
                            placeholder="请输入Mock名称"
                    />
                </a-form-model-item>
                <a-form-model-item label="headers" prop="headers">
                    <a-input v-model="dataForm.header" type="textarea" placeholder="请输入请求头"/>
                </a-form-model-item>
                <a-form-model-item ref="url" label="URL" prop="url">
                    <a-input v-model="dataForm.url" placeholder="请输入url">
                        <a-select slot="addonBefore" style="width: 90px" v-model="dataForm.requestMethod">
                            <a-select-option value="get">
                                get
                            </a-select-option>
                            <a-select-option value="post">
                                post
                            </a-select-option>
                        </a-select>
                    </a-input>
                </a-form-model-item>
                <a-form-model-item label="请求参数" prop="param">
                    <a-input v-model="dataForm.param" type="textarea" placeholder="请输入请求参数"/>
                </a-form-model-item>
                <a-form-model-item label="请求体" prop="body" v-if="dataForm.requestMethod !== 'get'">
                    <a-input v-model="dataForm.requestData" type="textarea" placeholder="请输入请求体"/>
                </a-form-model-item>
                <a-form-model-item label="响应" prop="response">
                    <a-input v-model="dataForm.response" type="textarea" placeholder="请输入响应体"/>
                </a-form-model-item>
                <a-form-model-item ref="status" label="状态码" prop="status">
                    <a-input
                            v-model="dataForm.status"
                            @blur="() => {
                                $refs.status.onFieldBlur();
                            }"
                            placeholder="请输入状态码"
                    />
                </a-form-model-item>
                <a-form-model-item label="延迟" prop="delay">
                    <a-input-number
                            id="delay"
                            v-model="dataForm.delay"
                            :min="0"
                            :max="50000"
                            @change="onChange"
                            style="width: 150px"
                            step="5"
                            placeholder="请输入延迟响应(ms)"
                    />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
    import {saveHttpMock} from "@/services/mock";
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 7 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 17 },
        },
    };
    export default {
        name: "addOrUpdate",
        data(){
            return {
                msg:"",
                visible:false,
                titleType:"",
                confirmLoading:false,
                dataForm:{
                    id: 0,
                    uuid:"",
                    name:"",
                    url:"",
                    header:"{}",
                    param:"{}",
                    requestMethod:"get",
                    requestData:"{}",
                    response:"{}",
                    status:0,
                    delay:0,
                    createdAt:"",
                    updatedAt:"",
                    reserve:"{}"
                },
                rules:{
                    name: [
                        { required: true, message: '请输入Mock名称', trigger: 'blur' },
                        { min: 3, message: 'Mock名称长度必须大于3', trigger: 'blur' },
                    ],
                    url:[
                        { required: true, message: '请输入MockUrl值', trigger: 'blur' }
                    ],
                    status:[
                        { required: true, message: '请输入Mock状态码', trigger: 'blur' }
                    ],
                },
                formItemLayout:formItemLayout,
            }
        },
        methods: {
            showModel(data,type) {
                this.visible = true;
                this.titleType = type;
                if (data!=null){
                    this.dataForm = data;
                }else{
                    this.dataForm = {
                        id: 0,
                        uuid:"",
                        name:"",
                        url:"",
                        header:"{}",
                        param:"{}",
                        requestMethod:"get",
                        requestData:"{}",
                        response:"{}",
                        status:0,
                        delay:0,
                        createdAt:"",
                        updatedAt:"",
                        reserve:"{}"
                    };
                }
            },
            // handleChange(value) {
            //     console.log(`selected ${value}`);
            // },
            handleOk() {
                this.confirmLoading = true;
                setTimeout(() => {
                    this.$refs.ruleForm.validate((valid)=>{
                        if (valid){
                            saveHttpMock(this.dataForm).then(res => {
                                this.msg = res.data;
                            });
                            this.visible = false;
                            this.confirmLoading = false;
                        }else{
                            alert("请补充完整必填项！");
                            this.confirmLoading = false;
                        }
                    })
                }, 1000);
            },
            handleCancel() {
                console.log('Clicked cancel button');
                this.visible = false;
            },
            onChange(value) {
                console.log('changed', value);
            }
        },
    }
</script>

<style scoped lang="less">
.addOrUpdate-modal{
    .alert{
        margin-bottom: 16px;
        .message{
            a{
                font-weight: 600;
            }
        }
        .clear{
            float: right;
        }
    }
}
</style>
