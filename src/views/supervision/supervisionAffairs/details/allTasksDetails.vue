<template>
  <div id="allTasksDetails">
    <!-- <van-nav-bar fixed :ellipsis="false" swipeable @click-left="clickLeft">
      <van-icon name="arrow-left" slot="left" />
      <div slot="title">
        任务详情
      </div>
    </van-nav-bar> -->
    <div class="infomation">
      <!-- <div class="task-message">
        <div class="people">{{$route.query.startUser}}</div>
        <div class="content">
          <div>流程标题：{{$route.query.title}}</div>
          <div>创建时间：{{$route.query.startTime}}</div>
        </div>
      </div> -->
      <van-tabs class="top_tabs" swipeable title-active-color="#329AFA">
        <van-tab>
          <div slot="title">审批内容</div>
          <div class="segmentation"></div>
          <!-- <div class="apply-info">
            <div class="flex left">
              <p style="font-size:1rem;margin-bottom:5px">{{allTasksDetailsData.taskName}}</p>
              <p style="font-size:0.625rem;color:#A4A4A4">粤海水务</p>
            </div>
            <div class="status right ">
              {{allTasksDetailsData.processState}}
            </div>
          </div> -->
          <div class="audit-info">
            <!-- <div class="applymsg">申请信息</div> -->
            <div class="applyList">
              <div><span>任务编号：</span>{{allTasksDetailsData.taskNum}}</div>
              <div><span>重要程度：</span> {{allTasksDetailsData.important}}</div>
              <div><span>申请日期：</span> {{allTasksDetailsData.beginDate}}</div>
              <div><span>当前任务：</span>{{allTasksDetailsData.processState}}</div>
            </div>
          </div>
          <div class="course-info">
            <!-- <div class="applymsg">审核信息</div> -->
            <div class="applyList">
              <div><span>事件主题：</span>{{allTasksDetailsData.sourceDesc}}</div>
              <div><span>来源名称：</span>{{allTasksDetailsData.sourceName}}</div>
              <div><span>来源说明：</span>{{allTasksDetailsData.sourceDesc}}</div>
              <div><span>责任单位：</span>{{allTasksDetailsData.responsibleDeptNames}}</div>
              <div><span>责任人：</span>{{allTasksDetailsData.responsibleUserNames}}</div>
              <div><span>协办部门：</span>{{allTasksDetailsData.assistDeptNames}}</div>
              <div><span>协办人：</span>{{allTasksDetailsData.assistUserNames}}</div>
              <div><span>开始时间：</span>{{allTasksDetailsData.beginDate}}</div>
              <div><span>结束时间：</span>{{allTasksDetailsData.endDate}}</div>
              <!-- <div class="arrow" @click="clickArrow">
            <van-icon :name="arrowName" />
          </div> -->
            </div>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">流程记录</div>
          <div class="segmentation"></div>
          <!-- <div class="audit-process" v-if="arrowName == 'arrow-up'"> -->
          <div class="audit-process">
            <!-- <div class="applymsg">审核进程</div> -->
            <ul>
              <li><span class="icon iconfont icon-Time"></span></li>
              <li v-for="item in proccessData" :key="item.taskId">
                <h3>
                  <span class="icon iconfont icon-chenggong"></span>
                  {{item.taskName}}
                  <i style="display:inline-block;font-size:12px;color: black;float: right;font-style: normal;">{{item.action}}</i>
                </h3>
                <p style="font-size: 0.8rem;">{{item.approver}}
                  <i style="display:inline-block;font-size:12px;color: black;float: right;font-style: normal;">{{item.endTime}}</i>
                </p>
                <p><b>{{item.comments}}</b></p>
                <p class="bottom-p" style="text-align: right;">
                  <!-- <span style="display:inline-block;font-size:12px;color: #44a3fa;font-style: normal;" v-if="item.attachments.length > 0" @click="goDetails(item, $event)">查看附件({{item.attachments.length}})</span> -->
                </p>

              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>

      <div v-if="this.$route.query.prevPage=='0'">
        <van-button type="info" @click="approvalClick" size="large">审批</van-button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'allTasksDetails',
  data() {
    return {
      proccessData: [],
      allTasksDetailsData: {},
      down: true,
      arrowName: 'arrow-down',

    }
  },
  created() {
    this.getTaskInfo()
  },
  methods: {
    approvalClick() {
      this.$router.push({ path: '/supervision/commission/accraditation', query: this.$route.query })
    },
    getTaskInfo() {
      let id = this.$route.query.id;
      console.log(id)
      this.http({
        apiUrl: "/mobile/getTaskInfo.api",
        method: "get",
        params: { id: id },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {

        this.allTasksDetailsData = res.data;
        console.log(this.allTasksDetailsData);
      }, err => {
        console.log(err)
        // reject(err)
      })
    },
    clickLeft() {
      /* if (this.$route.query.prevPage == '0') {
        this.$router.push({ path: '/supervision/commission' })
      } else {
        window.history.go(-1);
      } */
      window.history.go(-1);
    },
    clickArrow() {
      let id = this.$route.query.processId;
      this.http({
        apiUrl: "/mobile/comment.api",
        method: "get",
        params: { processInstanceId: id },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res);
        this.proccessData = res.data;
      }, err => {
        console.log(err)
        // reject(err)
      })
      this.arrowName = this.arrowName == 'arrow-down' ? 'arrow-up' : 'arrow-down'
    }
  }
}
</script>
<style>
p {
  margin: 0;
  padding: 0;
}
#allTasksDetails .van-nav-bar--fixed {
  background: #329afa;
  color: #fff;
}
#allTasksDetails .van-nav-bar__title {
  color: #fff;
}
#allTasksDetails .infomation {
  /* margin-top: 46px; */
}
#allTasksDetails .apply-info {
  border-bottom: #fafafa 2px solid;
  box-sizing: border-box;
  padding: 0.625rem 0.625rem;
}
#allTasksDetails .apply-info::after {
  display: block;
  content: "";
  clear: both;
}
#allTasksDetails .audit-info {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  border-bottom: #eff3f5 0.5rem solid;
}
#allTasksDetails .course-info {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  border-bottom: #eff3f5 0.5rem solid;
}
#allTasksDetails .audit-process {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  padding-bottom: 1rem;
}
#allTasksDetails .van-nav-bar .van-icon {
  color: #fff;
}
.status {
  line-height: 2;
}
.applymsg {
  border-left: #3193f6 0.25rem solid;
  padding-left: 5px;
}
.applyList > div {
  padding: 0.625rem 0;
  box-sizing: border-box;
  /* height: 3.125rem; */
  line-height: 1.475rem;
}
.applyList > div::after {
  display: block;
  content: "";
  clear: both;
}
.applyList > div > span {
  color: #444444;
  float: left;
  width: 20%;
  font-size: 0.8rem;
  height: 25px;
  line-height: 25px;
  text-align: justify;
}
.applyList > div > span::after {
  display: inline-block;
  content: "";
  width: 100%;
  overflow: hidden;
  height: 0;
}
.applyList > div:not(:last-child) {
  border-bottom: #f1f1f3 1px solid;
}
.arrow {
  text-align: center;
}
.course {
  padding: 0.625rem 0.625rem 0 0.625rem;
  box-sizing: border-box;
}
/* #allTasksDetails .van-tabs--line{margin-top:46px;} */
.flex {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.left {
  float: left;
}
.right {
  float: right;
}
.audit-process ul {
  padding: 1.5rem 0.5rem;
}
.audit-process ul li {
  border-left: 1px solid #f0f2f6;
  position: relative;
  /* border-left: 1px solid red; */
  padding: 0.5rem 1.6rem;
  box-sizing: border-box;
  /* 2BC4D9 */
}
.audit-process ul li h3 {
  color: #2bc4d9;
  position: relative;
  font-weight: 400;
  margin: 0.6rem 0;
}
.audit-process ul li p {
  padding: 0.6rem 0;
}
.audit-process ul li p b {
  font-weight: 400;
}
.audit-process ul li .bottom-p {
  border-bottom: 1px solid #f0f2f6;
}
.audit-process ul li h3 span {
  position: absolute;
  background: #fff;
  top: 0.2rem;
  left: -2.2rem;
  font-size: 1.2rem;
  width: 1rem;
  height: 1.2rem;
}

.audit-process ul li:first-child {
  height: 2rem;
}

.audit-process ul li:first-child span {
  position: absolute;
  background: #fff;
  top: -0.6rem;
  left: -0.6rem;
  font-size: 1.2rem;
  width: 1rem;
  height: 1.2rem;
  color: #f0f2f6;
}

/* 11/18 */
#allTasksDetails .van-tabs__line {
  background-color: #329afa;
}
#allTasksDetails .van-nav-bar {
  z-index: 9999 !important;
}
#allTasksDetails .segmentation {
  width: 100%;
  height: 10px;
  background: #f5f6f8;
}
#allTasksDetails .task-message {
  width: 100%;
}
#allTasksDetails .task-message .people {
  width: 20%;
  height: 60px;
  display: inline-block;
  text-align: center;
  line-height: 60px;
  float: left;
  /* color: #A5A5A5; */
  /* vertical-align: middle; */
}
#allTasksDetails .task-message .content {
  width: 80%;
  display: inline-block;
  height: 60px;
  padding: 5px 0px 5px 0px;
}
#allTasksDetails .task-message .content div {
  margin: 5px 0px 5px 0px;
  color: #a5a5a5;
  /* font-size: 14px; */
}
/* .van-popup{background: transparent !important;} */
</style>
