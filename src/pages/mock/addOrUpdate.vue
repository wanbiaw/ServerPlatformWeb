<template>
    <div class="addOrUpdate-modal">
        <a-modal
                :title="title"
                :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-form-model
                    ref="ruleForm"
                    :model="form"
                    :rules="rules"
            >
                <a-form-model-item ref="name" label="Mock名称" prop="name">
                    <a-input
                            v-model="form.name"
                            @blur="() => {
                                $refs.name.onFieldBlur();
                            }"
                    />
                </a-form-model-item>
                <a-form-model-item label="Activity form" prop="desc">
                    <a-input v-model="form.desc" type="textarea" />
                </a-form-model-item>

            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
    export default {
        name: "addOrUpdate",
        props:{
            dataForm:Array,
        },
        data(){
            return {
                ModalText: 'Content of the modal',
                visible:false,
                title:"Mock编辑",
                confirmLoading:false
            }
        },
        methods: {
            showModal(key) {
                this.visible = true;
                console.log(key)
            },
            handleOk() {
                this.ModalText = 'The modal will be closed after two seconds';
                this.confirmLoading = true;
                setTimeout(() => {
                    this.visible = false;
                    this.confirmLoading = false;
                }, 2000);
            },
            handleCancel() {
                console.log('Clicked cancel button');
                this.visible = false;
            },
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
