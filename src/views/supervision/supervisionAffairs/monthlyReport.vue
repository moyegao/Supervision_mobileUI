<template>
    <div id="monthlyReport">
        <div class="monthlyLists">

            <div class="monthlyList" @click="monthlyDetail(item)" v-for="item in monthlyReportData" :key="item.id">
                 <van-cell>
                <div class="monthlyContent">【{{item.taskName}}</div>
                <div class="monthlyDate">任务编号:{{item.taskNum}}</div>
                </van-cell>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    name:'monthlyReport',
    data(){
        return {
			monthlyReportData:[],
		}
    },
	created(){
		this.monthlyReportData = this.$store.state.myReportData
	},
    methods:{
        monthlyDetail(item){
            // this.$router.push('/supervision/monthlyReport/detail')
			this.$router.push({ path: '/supervision/monthlyReport/detail', query: item});
        }
    }
}
</script>
<style>
    #monthlyReport .van-cell{padding: 10px 15px;}
    #monthlyReport .monthlyLists{width:100%;box-sizing:border-box;}
    #monthlyReport .monthlyList{display: flex;justify-content: space-around;flex-flow:column;border-bottom:#F4F4F5 1px solid}
    .monthlyContent{overflow:hidden;display:-webkit-box; text-overflow:ellipsis;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:1.5}
    #monthlyReport .monthlyDate{font-size:0.8rem; color:#A7A7A7;}
    /* text-align: right;padding-right: 1rem; */
    .footer{width:100%;position:fixed;bottom:0;border-top:1px solid #F5F6F8;padding:15px 20px;box-sizing: border-box}
</style>
