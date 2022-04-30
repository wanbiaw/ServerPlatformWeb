<template>
    <div class="analysis">
        <a-row style="margin-top: 0" :gutter="[24, 24]">
            <a-col class="ant-col-5">
                <chart-card :loading="loading" :title="$t('totalReq')" :define_total="ReqInfo.totalReq" :define_trend="ReqInfo.trendReq">
                    <a-select
                            slot="footer"
                            ref="select"
                            :value="env"
                            style="width: 100%"
                            @change="handleChange1"
                    >
                        <a-select-option value="all">all</a-select-option>
                        <a-select-option value="prod">prev</a-select-option>
                        <a-select-option value="prev">prod</a-select-option>
                    </a-select>
                    <a-tooltip :title="$t('introduceReq')" slot="action">
                        <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
<!--                        <trend style="margin-right: 16px" :term="$t('nlp')" :percent="12" :is-increase="true" :scale="0" />-->
<!--                        <trend :term="$t('nlp')" :target="100" :value="89" :is-increase="false" />-->
                        <trend :term="$t('nlp')" :define="ReqInfo.defineNlp" :is-increase="false" />
                        <br/>
                        <trend :term="$t('arch')" :define="ReqInfo.defineArch" :is-increase="true"/>
                        <br/>
                        <trend :term="$t('rely')" :define="ReqInfo.defineRely" :is-increase="false"/>
                    </div>
<!--                    <div slot="footer">{{$ta('daily|sales', 'p')}}<span> ￥234.56</span></div>-->
                </chart-card>
            </a-col>
            <a-col class="ant-col-5">
                <chart-card :loading="loading" :title="$t('totalTrans')" :define_total="TransInfo.totalTrans" :define_trend="TransInfo.trendTrans">
                    <a-select
                            slot="footer"
                            ref="select"
                            :value="transRate"
                            style="width: 100%"
                            @change="handleChange2"
                    >
                        <a-select-option value="down">请求降低比</a-select-option>
                        <a-select-option value="trans">请求转化比</a-select-option>
                    </a-select>
                    <a-tooltip :title="$t('introduceTrans')" slot="action">
                        <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                        <trend :term="$t('nlp')" :define="TransInfo.defineNlp" :is-increase="false" />
                        <br/>
                        <trend :term="$t('arch')" :define="TransInfo.defineArch" :is-increase="true"/>
                        <br/>
                        <trend :term="$t('rely')" :define="TransInfo.defineRely" :is-increase="false"/>
                    </div>
                </chart-card>
            </a-col>
            <a-col class="ant-col-5">
                <chart-card :loading="loading" :title="$t('totalCaseNum')" :define_total="CasesInfo.totalCases" :define_trend="CasesInfo.trendCases">
                    <a-select
                            slot="footer"
                            ref="select"
                            style="width: 100%"
                            :disabled="disabled"
                    >
<!--                        <a-select-option value="reserved">reserved</a-select-option>-->
                    </a-select>
                    <a-tooltip :title="$t('introduceCaseNum')" slot="action">
                        <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                        <trend :term="$t('nlp')" :define="CasesInfo.defineNlp" :is-increase="false" />
                        <br/>
                        <trend :term="$t('arch')" :define="CasesInfo.defineArch" :is-increase="true"/>
                        <br/>
                        <trend :term="$t('rely')" :define="CasesInfo.defineRely" :is-increase="false"/>
                        <br/>
                        <trend :term="$t('api')" :define="CasesInfo.defineApi" :is-increase="false"/>
                    </div>
                </chart-card>
            </a-col>
            <a-col class="ant-col-5">
                <chart-card :loading="loading" :title="$t('totalBugsNum')" :define_total="BugsInfo.totalBugs" :define_trend="BugsInfo.trendBugs">
                    <a-select
                            slot="footer"
                            ref="select"
                            style="width: 100%"
                            :disabled="disabled"
                    >
                    </a-select>
                    <a-tooltip :title="$t('introduceBugsNum')" slot="action">
                        <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                        <trend :term="$t('nlp')" :define="BugsInfo.defineNlp" :is-increase="false" />
                        <br/>
                        <trend :term="$t('arch')" :define="BugsInfo.defineArch" :is-increase="true"/>
                        <br/>
                        <trend :term="$t('rely')" :define="BugsInfo.defineRely" :is-increase="false"/>
                    </div>
<!--                    <div slot="footer">{{$ta('daily|sales', 'p')}}<span> ￥234.56</span></div>-->
                </chart-card>
            </a-col>
            <a-col class="ant-col-5">
                <chart-card :loading="loading" :title="$t('problemAverageTime')" :define_total="ProblemTime.totalTime" :define_trend="ProblemTime.trendTime">
                    <a-select
                            slot="footer"
                            ref="select"
                            style="width: 100%"
                            :disabled="disabled"
                    >
                    </a-select>
                    <a-tooltip :title="$t('introduceProblemAverageTime')" slot="action">
                        <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                        <trend :term="$t('nlp')" :define="ProblemTime.defineNlp" :is-increase="false" />
                        <br/>
                        <trend :term="$t('arch')" :define="ProblemTime.defineArch" :is-increase="true"/>
                        <br/>
                        <trend :term="$t('rely')" :define="ProblemTime.defineRely" :is-increase="false"/>
                    </div>
<!--                    <div slot="footer">{{$ta('daily|sales', 'p')}}<span> ￥234.56</span></div>-->
                </chart-card>
            </a-col>
        </a-row>
        <a-row style="margin-top: 20px">
            <a-col class="ant-col">
                <div class="classify-ring">
                    <ve-ring
                            class="ring"
                            :data="chartData"
                            width="360px"
                            height="160px"
                            :settings="this.chartSettings"
                            :extend="chartExtend"
                    ></ve-ring>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import ChartCard from '@/components/card/ChartCard'
    import Trend from '@/components/chart/Trend'
    import VeRing from 'v-charts/lib/ring.common'
    export default {
        name: "Dashboard",
        i18n: require('./i18n'),
        components:{
            ChartCard,
            Trend,
            VeRing
        },
        mounted(){
            this.drawCharts()
        },
        data () {
            this.chartSettings = {
                dimension: 'name',
                metrics: 'value',
                radius: [
                    '35', '50'
                ],
                offsetY: 80,
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                label: {
                    normal: {
                        formatter: '{b}: {d}%',
                        padding: [0, -10]
                    }
                }
            }
            return {
                chartExtend: {
                    legend: {
                        show: false
                    }
                },
                disabled:true,
                loading: false,
                env: "all",
                transRate: "down",
                ReqInfo:{
                    totalReq:"345.1w",
                    trendReq:"-15.7w",
                    defineNlp:"264.5w",
                    defineArch:"3.1w",
                    defineRely:"70.1w"
                },
                TransInfo:{
                    totalTrans:"12.6",
                    trendTrans: "1.7",
                    defineNlp: "21.9%",
                    defineArch:"-0.1%",
                    defineRely: "-9.2%"
                },
                CasesInfo:{
                    totalCases:"60304",
                    trendCases:"50",
                    defineNlp: "58872",
                    defineArch:"114",
                    defineRely: "1318",
                    defineApi:"503"
                },
                BugsInfo:{
                    totalBugs:"541",
                    trendBugs:"2",
                    defineNlp: "58872",
                    defineArch:"114",
                    defineRely: "1318",
                },
                ProblemTime:{
                    totalTime:"13.8min",
                    trendTime:"0.2min",
                    defineNlp: "17.1min",
                    defineArch:"9.3min",
                    defineRely: "15.0min",
                },
            }
        },
        methods:{
            drawCharts(){
                // let chart = echarts.init(document.getElementById('charts'))
                //
                // chart.setOption(option)
            },

            handleChange1(){

            },
            handleChange2(){

            }
        }
    }
</script>

<style lang="less" scoped>
    .extra-wrap{
        .extra-item{
            display: inline-block;
            margin-right: 24px;
            a:not(:first-child){
                margin-left: 24px;
            }
        }
    }
    @media screen and (max-width: 992px){
        .extra-wrap .extra-item{
            display: none;
        }
    }
    @media screen and (max-width: 576px){
        .extra-wrap{
            display: none;
        }
    }
    .ant-col-5{
        width:20%
    }
</style>
