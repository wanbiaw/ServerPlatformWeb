<template>
  <a-card :loading="loading" :body-style="{padding: '20px 24px 8px'}" :bordered="false">
    <div class="chart-card-header">
      <div class="meta">
        <span class="chart-card-title">{{title}}</span>
        <span class="chart-card-action">
        <slot name="action"></slot>
      </span>
      </div>
      <div>
        <span class="total">{{Total}}</span>
        <span :class="['chart-trend-icon', trend]">{{TrendReq}}<a-icon :type="'arrow-' + trend" /></span>
      </div>
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
      type: Boolean,
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
    },
    define_total:{
      type: String,
      required: false,
      default: null
    },
    define_trend:{
      type: String,
      required: false,
      default: null
    },
    scale: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data () {
    return {
      Total:this.total,
      TrendReq:this.trendReq,
      trend: this.trendReq >= 0 ? 'up' : 'down'
    }
  },
  created(){
    this.Total = this.transform(this.Total,this.define_total)
    this.TrendReq = this.transform(this.TrendReq,this.define_trend);
  },
  methods:{
    transform (temp, define) {
      return define === null ? (temp/10000).toFixed(this.scale).toString() : define
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
  .chart-card-content .content-fix {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .chart-trend-icon {
    margin-left: 10px;
    font-size: 15px;
    &.up {
      color: @red-6;
    }

    &.down {
      color: @green-6;
    }
  }
</style>
