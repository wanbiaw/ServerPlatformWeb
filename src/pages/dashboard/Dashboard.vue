<template>
    <div class="analysis">
        <a-row style="margin-top: 0" :gutter="[24, 24]">
            <a-col class="ant-col-5">
                <chart-card :loading="loading" :title="$t('totalReq')" :total="ReqInfo.totalReq" :trendReq="ReqInfo.trendReq">
                    <a-select
                            slot="footer"
                            ref="select"
                            :value="env"
                            style="width: 100%"
                            @change="handleChange"
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
                        <trend :term="$t('nlp')" :target="100" :value="89" :is-increase="false" />
                        <br/>
                        <trend :term="$t('arch')" :target="100" :value="89" :is-increase="true" />
                        <br/>
                        <trend :term="$t('rely')" :target="100" :value="89" :is-increase="false" />
                    </div>
<!--                    <div slot="footer">{{$ta('daily|sales', 'p')}}<span> ￥234.56</span></div>-->
                </chart-card>
            </a-col>
            <a-col class="ant-col-5">
                <chart-card :loading="loading" :title="$t('totalTrans')" total="￥ 189,345">
                    <a-tooltip :title="$t('introduceTrans')" slot="action">
                        <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                        <trend style="margin-right: 16px" :term="$t('wow')" :percent="12" :is-increase="true" :scale="0" />
                        <trend :term="$t('dod')" :target="100" :value="89" :scale="0" />
                    </div>
                    <div slot="footer">{{$ta('daily|sales', 'p')}}<span> ￥234.56</span></div>
                </chart-card>
            </a-col>
            <a-col class="ant-col-5">
                <chart-card :loading="loading" :title="$t('totalCaseNum')" total="￥ 189,345">
                    <a-tooltip :title="$t('introduceCaseNum')" slot="action">
                        <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                        <trend style="margin-right: 16px" :term="$t('wow')" :percent="12" :is-increase="true" :scale="0" />
                        <trend :term="$t('dod')" :target="100" :value="89" :scale="0" />
                    </div>
                    <div slot="footer">{{$ta('daily|sales', 'p')}}<span> ￥234.56</span></div>
                </chart-card>
            </a-col>
            <a-col class="ant-col-5">
                <chart-card :loading="loading" :title="$t('totalBugsNum')" total="￥ 189,345">
                    <a-tooltip :title="$t('introduceBugsNum')" slot="action">
                        <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                        <trend style="margin-right: 16px" :term="$t('wow')" :percent="12" :is-increase="true" :scale="0" />
                        <trend :term="$t('dod')" :target="100" :value="89" :scale="0" />
                    </div>
                    <div slot="footer">{{$ta('daily|sales', 'p')}}<span> ￥234.56</span></div>
                </chart-card>
            </a-col>
            <a-col class="ant-col-5">
                <chart-card :loading="loading" :title="$t('problemAverageTime')" total="￥ 189,345">
                    <a-tooltip :title="$t('introduceProblemAverageTime')" slot="action">
                        <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                        <trend style="margin-right: 16px" :term="$t('wow')" :percent="12" :is-increase="true" :scale="0" />
                        <trend :term="$t('dod')" :target="100" :value="89" :scale="0" />
                    </div>
                    <div slot="footer">{{$ta('daily|sales', 'p')}}<span> ￥234.56</span></div>
                </chart-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import ChartCard from '@/components/card/ChartCard'
    import Trend from '@/components/chart/Trend'
    export default {
        name: "Dashboard",
        i18n: require('./i18n'),
        components:{
            ChartCard,
            Trend
        },
        data () {
            return {
                env: "all",
                ReqInfo:{
                    totalReq:3451000,
                    trendReq:-157000,
                }
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
