<template>
  <div style="background:#141414;margin-top: 30px">
    <a-row type="flex">
      <a-col :flex="2">
        <a-card :bordered="false" style="margin-top: 0;float: left;width: 75%">
          <div slot="title">
            <a-dropdown>
              <a-menu slot="overlay" @click="handle1">
                <a-menu-item key="1"> <a-icon type="user" />添加顶级菜单 </a-menu-item>
                <a-menu-item key="2"> <a-icon type="user" />添加子菜单 </a-menu-item>
              </a-menu>
              <a-button style="margin-left: 2px"> 添加菜单 <a-icon type="down" /> </a-button>
            </a-dropdown>
            <a-button style="margin-left: 2px" @click="handle2"> 收起菜单 </a-button>
            <a-button style="margin-left: 2px" @click="handle3"> 删除菜单 </a-button>
          </div>
          <div>
            <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" />
            <a-tree
                selectable
                :expanded-keys="expandedKeys"
                :auto-expand-parent="autoExpandParent"
                :tree-data="gData"
                @expand="onExpand"
                @select="onSelect"
            >
              <template slot="title" slot-scope="{ title }">
                <span v-if="title.indexOf(searchValue) > -1">
                  {{ title.substr(0, title.indexOf(searchValue)) }}
                  <span style="color: #f50">{{ searchValue }}</span>
                  {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                </span>
                <span v-else>{{ title }}</span>
              </template>
            </a-tree>
          </div>
        </a-card>
      </a-col>
      <a-col :flex="3">
        <a-card :bordered="false" style="margin-top: 0;float: top">
          <div slot="title">
            <a-radio-group :value="buttonCheck" @change="transform">
              <a-radio-button value="details">
                项目详情
              </a-radio-button>
              <a-radio-button value="cases">
                项目用例
              </a-radio-button>
            </a-radio-group>
          </div>
          <div v-if="buttonCheck === 'details'">
            <a-form-model
                    ref="form"
                    :model="form"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
            >
              <a-form-model-item label="项目名称" prop="name">
                <a-input v-model="form.name"/>
              </a-form-model-item>
              <a-form-model-item label="创建人姓名" prop="ownerName">
                <a-input v-model="form.ownerName"/>
              </a-form-model-item>
              <a-form-model-item label="Jira链接" prop="jira">
                <a-input v-model="form.jira"/>
              </a-form-model-item>
              <a-form-model-item label="创建时间" prop="date">
                <a-date-picker
                        v-model="form.date"
                        show-time
                        type="date"
                        placeholder="选择创建日期"
                        style="width: 100%;"
                />
              </a-form-model-item>
              <a-form-model-item label="其他备注" prop="desc">
                <a-input v-model="form.desc" type="textarea" />
              </a-form-model-item>
              <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">
                  Create
                </a-button>
                <a-button style="margin-left: 10px;" @click="resetForm">
                  Reset
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </div>
          <div v-else>
            <a-form layout="horizontal">
              <div :class="advanced ? null: 'fold'">
                <a-row >
                  <a-col :md="8" :sm="24" >
                    <a-form-item
                            label="规则编号"
                            :labelCol="{span: 5}"
                            :wrapperCol="{span: 18, offset: 1}"
                    >
                      <a-input placeholder="请输入" />
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24" >
                    <a-form-item
                            label="使用状态"
                            :labelCol="{span: 5}"
                            :wrapperCol="{span: 18, offset: 1}"
                    >
                      <a-select placeholder="请选择">
                        <a-select-option value="1">关闭</a-select-option>
                        <a-select-option value="2">运行中</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24" >
                    <a-form-item
                            label="调用次数"
                            :labelCol="{span: 5}"
                            :wrapperCol="{span: 18, offset: 1}"
                    >
                      <a-input-number style="width: 100%" placeholder="请输入" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row v-if="advanced">
                  <a-col :md="8" :sm="24" >
                    <a-form-item
                            label="更新日期"
                            :labelCol="{span: 5}"
                            :wrapperCol="{span: 18, offset: 1}"
                    >
                      <a-date-picker style="width: 100%" placeholder="请输入更新日期" />
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24" >
                    <a-form-item
                            label="使用状态"
                            :labelCol="{span: 5}"
                            :wrapperCol="{span: 18, offset: 1}"
                    >
                      <a-select placeholder="请选择">
                        <a-select-option value="1">关闭</a-select-option>
                        <a-select-option value="2">运行中</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24" >
                    <a-form-item
                            label="描述"
                            :labelCol="{span: 5}"
                            :wrapperCol="{span: 18, offset: 1}"
                    >
                      <a-input placeholder="请输入" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </div>
              <span style="float: right; margin-top: 3px;">
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{advanced ? '收起' : '展开'}}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </span>
            </a-form>
          </div>

        </a-card>
      </a-col>
    </a-row>
<!--    <a-space direction="horizontal" :size="50">-->



<!--    </a-space>-->
  </div>
</template>

<script>
  const gData = [
    {
      title: '0-0',
      key: '0-0',
      scopedSlots: { title: 'title' },
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          scopedSlots: { title: 'title' },
          children: [
            { title: '0-0-0-0', key: '0-0-0-0',scopedSlots: { title: 'title' } },
            { title: '0-0-0-1', key: '0-0-0-1',scopedSlots: { title: 'title' } },
            { title: '0-0-0-2', key: '0-0-0-2',scopedSlots: { title: 'title' } },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          scopedSlots: { title: 'title' },
          children: [
            { title: '0-0-1-0', key: '0-0-1-0',scopedSlots: { title: 'title' } },
            { title: '0-0-1-1', key: '0-0-1-1',scopedSlots: { title: 'title' } },
            { title: '0-0-1-2', key: '0-0-1-2',scopedSlots: { title: 'title' } },
          ],
        },
      ],
    },
  ];

  const dataList = [];
  const generateList = data => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const key = node.key;
      dataList.push({ key, title: key });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(gData);
  console.log(gData)

  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };




  export default {
    name: "project",
    data(){
      return {
        buttonCheck:"details",
        selectedKeys:[],    //保存点击选中的节点title
        expandedKeys: [],   // 展开的节点title
        searchValue: '',
        autoExpandParent: true,
        gData,
        form: {
          name: '',
          ownerName: '',
          jira: '',
          date: '',
          desc: ''
        },
        rules: {
          name: [{ required: true, message: '请输入待测项目名称', trigger: 'blur' }],
          ownerName: [{required: true, message: '请输入创建人姓名', trigger: 'blur' }],
          jira: [{required: true, message: '请输入项目jira链接', trigger: 'blur' }],
          date:[{required:true,message:'请输入创建时间',trigger:'blur'}]
        },
        labelCol: { span: 5 },
        wrapperCol: { span: 12 },
      };
    },
    methods:{
      handle1(){
        console.log(111)
      },
      handle2(){
        console.log(222)
      },
      handle3(){
        console.log(333)
      },
      onExpand(expandedKeys) {
        this.expandedKeys = expandedKeys;
        this.autoExpandParent = false;
      },
      onChange(e) {
        const value = e.target.value;   //搜索框中的输入值
        const expandedKeys = dataList
            .map(item => {
              if (item.title.indexOf(value) > -1) {
                return getParentKey(item.key, gData);
              }
              return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        Object.assign(this, {
          expandedKeys,
          searchValue: value,
          autoExpandParent: true,
        });
      },
      transform(){
        if (this.buttonCheck === "details"){
          this.buttonCheck = "cases"
          console.log(111)
        }else{
          this.buttonCheck = "details"
          console.log(222)
        }
      },
      onSelect(selectedKeys){
        console.log(selectedKeys)
      }
    }
  }
</script>

<style scoped>

</style>
