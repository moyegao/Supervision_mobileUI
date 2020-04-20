<template>
    <div id="myAudDetails">
        <van-nav-bar fixed :ellipsis="false" :border="false" swipeable title-active-color="#329AFA" @click-left="clickLeft">   
            <van-icon name="arrow-left" slot="left" />
            <div slot="title">
                已审详情
            </div>
        </van-nav-bar>
        <van-tabs v-model="active">
            <van-tab title="任务详情">内容 1</van-tab>
            <van-tab title="任务下达">内容 2</van-tab>
            <van-tab title="任务变更">
                <table v-if="reload" class="table">
                    <thead class="has-gutter">
                        <tr>
                            <th colspan="1" rowspan="1"><div class="cell">审批<br>时间</div></th>
                            <th colspan="1" rowspan="1"><div class="cell">审批<br>节点</div></th>
                            <th colspan="1" rowspan="1"><div class="cell">审批人</div></th>
                            <th colspan="1" rowspan="1"><div class="cell">审批<br>操作</div></th>
                            <th colspan="1" rowspan="1"><div class="cell">审批<br>意见</div></th>
                            <th colspan="1" rowspan="1"><div class="cell">附件</div></th>
                        </tr>
                    </thead>
                    <tbody class="tbody">
                        <tr>
                            <td><div class="cell">2018-09-13<br>18:00:00</div></td>
                            <td><div class="cell">变更申请</div></td>
                            <td><div class="cell">陈晨咏</div></td>
                            <td><div class="cell">提交</div></td>
                            <td><div class="cell">同意</div></td>
                            <td><div class="cell">。。。。</div></td>
                        </tr>
                        <tr>
                            <td><div class="cell">2018-09-13<br>18:00:00</div></td>
                            <td><div class="cell">变更申请</div></td>
                            <td><div class="cell">陈晨咏</div></td>
                            <td><div class="cell">提交</div></td>
                            <td><div class="cell">同意</div></td>
                            <td><div class="cell">。。。。</div></td>
                        </tr>
                        <tr>
                            <td><div class="cell">2018-09-13<br>18:00:00</div></td>
                            <td><div class="cell">变更申请</div></td>
                            <td><div class="cell">陈晨咏</div></td>
                            <td><div class="cell">提交</div></td>
                            <td><div class="cell">同意</div></td>
                            <td><div class="cell">。。。。</div></td>
                        </tr>
                        <tr>
                            <td><div class="cell">2018-09-13<br>18:00:00</div></td>
                            <td><div class="cell">变更申请</div></td>
                            <td><div class="cell">陈晨咏</div></td>
                            <td><div class="cell">提交</div></td>
                            <td><div class="cell">同意</div></td>
                            <td><div class="cell">。。。。</div></td>
                        </tr>
                        <tr>
                            <td><div class="cell">2018-09-13<br>18:00:00</div></td>
                            <td><div class="cell">变更申请</div></td>
                            <td><div class="cell">陈晨咏</div></td>
                            <td><div class="cell">提交</div></td>
                            <td><div class="cell">同意</div></td>
                            <td><div class="cell">。。。。</div></td>
                        </tr>
                    </tbody>
                </table>
            </van-tab>
            <van-tab title="任务办结">内容 4</van-tab>
            <van-tab title="汇报审批">内容 4</van-tab>
            <van-tab title="任务详情">内容 4</van-tab>
        </van-tabs>
    </div>    
</template>
<script>
export default {
    name:'myAudDetails',
    data(){
        return {
            active:2,
            reload:true
        }
    },
    methods:{
        clickLeft(){
            this.$router.push({path:'/supervision/myAudited'})
        }
    }
}
</script>
<style>
    #myAudDetails .van-tabs--line{margin-top:46px}
    .table{width:100%}
    .table .has-gutter{
		color: #909399;
		font-weight: 500;
	}
	table tr:first-child th{
		border-bottom: 1px solid #ebeef5;
		border-right: 1px solid #ebeef5;
		padding: 12px 0;
		min-width: 0;
		box-sizing: border-box;
		text-overflow: ellipsis;
		vertical-align: middle;
		position: relative;
	    white-space: nowrap;
		overflow: hidden;
		user-select: none;
		text-align: center;
		background-color: #fff;
	}
	table tr{
		text-align: center;	
		font-size:13px;
		padding:10px auto;
		background-color:#fff;
	}
	.table .tbody tr:hover {
		/* background-color: #0180FE!important; */
		color: #fff;
		cursor:hand;
	}
	table tr:nth-child(odd){background:#F4F4F4;}
	table tr>td{
		text-align: center;
		height: 30px;
		line-height: 30px;
		padding: 10px 0;
		min-width: 0;
		box-sizing: border-box;
		text-overflow: ellipsis;
		vertical-align: middle;
		position: relative;
		border-right: 1px solid #ebeef5;
		border-bottom: 1px solid #ebeef5;
	}
	.table .tbody{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.table .tbody .cell{
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: normal;
		word-break: break-all;
		line-height: 23px;
		padding-left: 10px;
		padding-right: 10px;
    }
</style>
