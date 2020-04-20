<template>
  <div id="reportDetails">
    <div class="taskAssignmentLists">
      <!-- <div class="taskAssignmentList" @click="toTaskDetails(item)" v-for="(item,index) of reportDetailsList" :key="item.taskId"> -->
      <div class="taskAssignmentList" v-for="(item,index) of reportDetailsList" :key="item.taskId">

        <!-- @click.stop阻止事件冒泡 -->
        <van-cell>
          <van-row class="vanRowList">
            <van-col span="6" class="flex vanColList">
              <div class="people">{{item.monthId}}</div>
              <div class="content"><span class="taskcontent1">{{item.reportUser}}</span></div>
            </van-col>
            <van-col span="18" class="flex vanColList">
              <div class="message"><span class="taskcontent">进度：{{item.progress}}%</span>
                <!-- <van-button type="info" @click="goReport(item, $event)">流程图</van-button> -->
                <van-button type="primary" @click="goDetails(item, $event)">详情</van-button>
              </div>
              <div class="content"><span class="taskcontent">汇报内容：{{item.reportInfo}}</span>
              </div>
            </van-col>
          </van-row>
        </van-cell>
      </div>

    </div>
  </div>
</template>
<script>

export default {
  name: 'reportDetails',
  props: ['childNeedData'],
  data() {
    return {
      reportDetailsList: [],
    }
  },
  created() {
    console.log(this.childNeedData);
  },
  mounted() {
    this.init();
  },
  computed: {

  },
  methods: {
    init() {
      this.http({
        apiUrl: "/mobile/listTaskReport.api",
        method: "get",
        params: { taskId: this.childNeedData.id},
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        this.reportDetailsList = res.data;
        console.log(this.reportDetailsList);
      }, err => {
        console.log(err)
      })
    },
    // toTaskDetails(item) {
    //   console.log(item);
    //   this.$router.push({ path: '/supervision/allTasks/detail', query: item })
    // },
    goDetails(item, e) {
      // 阻止冒泡事件
      console.log(item, e);
      e.stopPropagation();
      item.parentsId = this.childNeedData.id
      sessionStorage.taskAssignmentDetails = JSON.stringify(item)
      this.$router.push({path: '/taskAssignmentDetails'})
      
    },
    goReport(item, e) {
      // 阻止冒泡事件
      console.log(item, e);
      e.stopPropagation();
    }
  }
}
</script>
<style>
#reportDetails .van-tabs--line {
  margin-top: 10px;
}
#reportDetails {
  width: 100%;
}
#reportDetails .van-button {
  width: 3.3rem;
  height: 1.7rem;
  line-height: 1.5rem;
  float: right;
  margin: 3px 0;
}
#reportDetails .van-button--primary {
  color: #fff;
  background-color: #2ce0a6;
  border: 1px solid #2ce0a6;
}
#reportDetails .van-button--normal {
  font-size: 12px;
  padding: 0 5px;
}
.disabled_btn {
  color: white;
  background: #c9c9c9;
}
#reportDetails .taskcontent {
  width: 185px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
#reportDetails .taskcontent1 {
  margin-top: 7px;
  width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
#reportDetails .taskAssignmentLists {
  width: 100%;
  box-sizing: border-box;
}
#reportDetails .taskAssignmentList {
  border-bottom: #f4f4f5 1px solid;
}
#reportDetails .vanRowList {
  height: 100%;
}
#reportDetails .vanColList {
  height: 100%;
}
#reportDetails .people {
  font-size: 1.25rem;
}
#reportDetails .message {
  font-size: 1rem;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5;
}
/* #reportDetails .content{font-size:0.625rem; color:#A7A7A7} */
/* .flex{display:flex;flex-flow: column;justify-content: space-between;} */
</style>
