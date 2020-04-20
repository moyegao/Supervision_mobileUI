<template>
  <div id="taskAssignmentDetails">
    <van-nav-bar fixed :ellipsis="false" swipeable @click-left="clickLeft">
      <van-icon name="arrow-left" slot="left" />
      <div slot="title">
        <!-- {{taskAssignmentDetailsData.leaderUserNames}} -->
        详情
      </div>
    </van-nav-bar>
    <div class="infomation">
      <div class="audit-info">
        <div class="applyList">
          <div v-show="reportInfoShow" class="reportInfoContent top_content"><span class="span_content">汇报内容：</span>{{taskAssignmentDetailsData.reportInfoMark}}</div>
          <div v-show="!reportInfoShow" class="top_content"><span>审批意见：</span>{{taskAssignmentDetailsData.comments}}</div>
          <div>
            <span class="span_content">附件：</span>
            <div style="margin-left:5rem">
              <div class="attachments_content" v-for="item in taskAssignmentDetailsData.attachments" :key="item.id" @click="downLoadPdf(item)">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="course-info">
                <div class="applymsg">审核信息</div>
                <div class="applyList">
                    <div><span>事件主题：</span>{{taskAssignmentDetailsData.sourceDesc}}</div>
                    <div><span>来源名称：</span>{{taskAssignmentDetailsData.sourceName}}</div>
                    <div><span>来源说明：</span>{{taskAssignmentDetailsData.sourceDesc}}</div>
                    <div><span>责任单位：</span>{{taskAssignmentDetailsData.responsibleDeptNames}}</div>
                    <div><span>责任人：</span>{{taskAssignmentDetailsData.responsibleUserNames}}</div>
                    <div><span>协办部门：</span>{{taskAssignmentDetailsData.assistDeptNames}}</div>
                    <div><span>协办人：</span>{{taskAssignmentDetailsData.assistUserNames}}</div>
                    <div><span>开始时间：</span>{{taskAssignmentDetailsData.beginDate}}</div>
                    <div><span>结束时间：</span>{{taskAssignmentDetailsData.endDate}}</div>
                    <div class="arrow" @click="clickArrow"><van-icon :name="arrowName" /></div>
                </div>
            </div> -->
      <div class="audit-process" v-if="('parentsId' in taskAssignmentDetailsData) && assignmentList.length > 0">
        <div class="applymsg">汇报审批</div>
        <ul>
          <li><span class="icon iconfont icon-Time"></span></li>
          <li v-for="item in assignmentList" :key="item.taskId">
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
              <span style="display:inline-block;font-size:12px;color: #44a3fa;font-style: normal;" v-if="item.attachments.length > 0" @click="goDetails(item, $event)">查看附件({{item.attachments.length}})</span>
            </p>

          </li>
        </ul>
      </div>

      <!-- <div v-if="this.$route.query.prevPage=='0'">
                <van-button type="info" @click="approvalClick" size="large">审批</van-button>
            </div> -->
    </div>

  </div>
</template>
<script>
import { Toast } from 'vant';
import reportUpLoad from './reportUpLoad'
export default {
  name: 'taskAssignmentDetails',
  component:{
    reportUpLoad
  },
  data() {
    return {
      proccessData: [],
      taskAssignmentDetailsData: {},
      down: true,
      arrowName: 'arrow-down',
      reportInfoShow: false,
      assignmentList: '',
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // this.taskAssignmentDetailsData = this.$route.query;
      this.taskAssignmentDetailsData = JSON.parse(sessionStorage.taskAssignmentDetails)
      console.log(this.taskAssignmentDetailsData);
      if ('reportInfoMark' in this.taskAssignmentDetailsData) {
        this.reportInfoShow = true;
        var div = '<span class="span_content">汇报内容：</span>' + this.taskAssignmentDetailsData.reportInfoMark;
        setTimeout(() => {
          $('.reportInfoContent').html(div)
        }, 0);
      }
      this.clickArrow()
    },
    downLoadPdf(item) {
      console.log(item);
      if (item.pdfUrl == '') {
        Toast({
          message: '该附件不支持预览',
          position: 'middle',
          duration: 2000
        })
      } else {
        window.open(item.pdfUrl)
      }
    },
    clickLeft() {
      if (this.$route.query.prevPage == '0') {
        this.$router.push({ path: '/supervision/commission' })
      } else {
        window.history.go(-1);
      }
    },
    // 获取用户下达记录
    clickArrow() {
      // let id = this.$route.query.processId;
      console.log(this.taskAssignmentDetailsData.id);
      this.http({
        apiUrl: "/mobile/comment.api",
        method: "get",
        // params: { processInstanceId: id },
        params: { id: this.taskAssignmentDetailsData.id, key: 'report' },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res);
        this.assignmentList = res.data;
      }, err => {
        console.log(err)
        // reject(err)
      })
    },
    goDetails(item, e) {
      // 阻止冒泡事件
      console.log(item, e);
      e.stopPropagation();
      this.$router.push({ path: '/reportUpLoad', query: item })
    },
  }
}
</script>
<style>
p {
  margin: 0;
  padding: 0;
}
#taskAssignmentDetails .van-nav-bar--fixed {
  background: #329afa;
  color: #fff;
}
#taskAssignmentDetails .attachments_content {
  color: #329afa;
  /* border-bottom: 1px solid #329AFA; */
}
#taskAssignmentDetails .van-nav-bar__title {
  color: #fff;
}
#taskAssignmentDetails .infomation {
  margin-top: 46px;
}
#taskAssignmentDetails .apply-info {
  border-bottom: #fafafa 2px solid;
  box-sizing: border-box;
  padding: 0.625rem 0.625rem;
}
#taskAssignmentDetails .apply-info::after {
  display: block;
  content: "";
  clear: both;
}
#taskAssignmentDetails .audit-info {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  /* border-bottom: #eff3f5 0.5rem solid; */
}
#taskAssignmentDetails .course-info {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  border-bottom: #eff3f5 0.5rem solid;
}
#taskAssignmentDetails .audit-process {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  padding-bottom: 1rem;
}
#taskAssignmentDetails .van-nav-bar .van-icon {
  color: #fff;
}
#taskAssignmentDetails .status {
  line-height: 2;
}
#taskAssignmentDetails .applymsg {
  border-left: #3193f6 0.25rem solid;
  padding-left: 5px;
}
#taskAssignmentDetails .applyList > div {
  padding: 0.625rem 0;
  box-sizing: border-box;
  /* height: 3.125rem; */
  line-height: 1.875rem;
}
#taskAssignmentDetails .applyList > div::after {
  display: block;
  content: "";
  clear: both;
}
#taskAssignmentDetails .applyList > div > .span_content {
  color: #444444;
  float: left;
  width: 20%;
  font-size: 0.8rem;
  height: 25px;
  line-height: 25px;
  text-align: justify;
}
#taskAssignmentDetails .applyList > div > .span_content::after {
  display: inline-block;
  content: "";
  width: 100%;
  overflow: hidden;
  height: 0;
}
#taskAssignmentDetails .applyList > div:not(:last-child) {
  border-bottom: #f1f1f3 1px solid;
}
#taskAssignmentDetails .arrow {
  text-align: center;
}
#taskAssignmentDetails .course {
  padding: 0.625rem 0.625rem 0 0.625rem;
  box-sizing: border-box;
}
/* #taskAssignmentDetails .van-tabs--line{margin-top:46px;} */
#taskAssignmentDetails .flex {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
#taskAssignmentDetails .left {
  float: left;
}
#taskAssignmentDetails .right {
  float: right;
}
#taskAssignmentDetails .audit-process ul {
  padding: 1.5rem 0.5rem;
}
#taskAssignmentDetails .audit-process ul li {
  border-left: 1px solid #f0f2f6;
  position: relative;
  /* border-left: 1px solid red; */
  padding: 0.5rem 1.6rem;
  box-sizing: border-box;
  /* 2BC4D9 */
}
#taskAssignmentDetails .audit-process ul li h3 {
  color: #2bc4d9;
  position: relative;
  font-weight: 400;
  margin: 0.6rem 0;
}
#taskAssignmentDetails .audit-process ul li p {
  padding: 0.6rem 0;
}
#taskAssignmentDetails .audit-process ul li p b {
  font-weight: 400;
}
#taskAssignmentDetails .audit-process ul li .bottom-p {
  border-bottom: 1px solid #f0f2f6;
}
#taskAssignmentDetails .audit-process ul li h3 span {
  position: absolute;
  background: #fff;
  top: 0.2rem;
  left: -2.2rem;
  font-size: 1.2rem;
  width: 1rem;
  height: 1.2rem;
}

#taskAssignmentDetails .audit-process ul li:first-child {
  height: 2rem;
}

#taskAssignmentDetails .audit-process ul li:first-child span {
  position: absolute;
  background: #fff;
  top: -0.6rem;
  left: -0.6rem;
  font-size: 1.2rem;
  width: 1rem;
  height: 1.2rem;
  color: #f0f2f6;
}
/* .van-popup{background: transparent !important;} */
</style>
