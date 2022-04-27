<template>
  <a-card :loading="loading" :body-style="{padding: '20px 24px 8px'}" :bordered="false">
    <div class="chart-card-header">
      <div class="meta">
        <span class="chart-card-title">{{title}}</span>
        <span class="chart-card-action">
        <slot name="action"></slot>
      </span>
      </div>
      <div><span class="total">{{total}}</span><span>{{trendReq}}</span></div>
    </div>
    <div class="chart-card-content">
      <div class="content-fix">
        <slot></slot>
      </div>
    </div>
    <div class="chart-card-footer">
      <slot name="footer"></slot>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'ChartCard',
  props: {
    title: {
      type: String,
      required: true
    },
    loading: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: false,
      default: 0
    },
    trendReq: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      Total:this.total,
      TransReq:this.trendReq
    }
  },
  beforeUpdate(){
    this.Total = this.transformTotal;
    this.TransReq = this.transformTransReq()
  },
  methods:{
    transformTotal () {

    },
    transformTransReq (){

    }
  }
}
</script>

<style scoped lang="less">
  .chart-card-header{
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .chart-card-header .meta{
    position: relative;
    overflow: hidden;
    width: 100%;
    color: @text-color-second;
    font-size: 14px;
    line-height: 22px;
  }
  .chart-card-action{
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }
  .total {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 30px;
    line-height: 38px;
    height: 38px;
  }
  .chart-card-footer{
    border-top: 1px solid @border-color-base;
    padding-top: 9px;
    margin-top: 8px;
  }
  .chart-card-content{
    margin-bottom: 12px;
    position: relative;
    height: 120px;
    width: 100%;
  }
  .chart-card-content .content-fix{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
