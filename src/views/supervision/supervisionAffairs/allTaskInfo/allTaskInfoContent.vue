<template>
  <div id="allTaskInfoContent">
    <van-nav-bar fixed :ellipsis="false" swipeable @click-left="clickLeft">
      <van-icon name="arrow-left" slot="left" />
      <div slot="title">
        <!-- {{allTaskInfoContentData.leaderUserNames}} -->
        任务详情
      </div>
    </van-nav-bar>
    <div class="infomation">
      <!-- <div class="apply-info">
                <div class="flex left">
                    <p style="font-size:1rem;margin-bottom:5px">{{allTaskInfoContentData.taskName}}</p>
                    <p style="font-size:0.625rem;color:#A4A4A4">粤海水务</p>
                </div>
                <div class="status right " >
                    {{allTaskInfoContentData.processState}}
                </div>
            </div> -->
      <div class="audit-info">
        <!-- <div class="applymsg">申请信息</div> -->
        <div class="applyList">
          <div><span>任务名称：</span>{{allTaskInfoContentData.taskName}}</div>
          <div><span>任务状态：</span>{{allTaskInfoContentData.taskState}}</div>
          <div><span>流程状态：</span>{{allTaskInfoContentData.processState}}</div>
          <div><span>任务编号：</span>{{allTaskInfoContentData.taskNum}}</div>
          <div><span>重要程度：</span> {{allTaskInfoContentData.important}}</div>
          <div><span>督办来源：</span> {{allTaskInfoContentData.sourceName}}</div>
          <div><span>主办人：</span> {{allTaskInfoContentData.sponsorUserName}}</div>
          <div><span>工单类型：</span> {{allTaskInfoContentData.taskType}}</div>
          <div><span>责任部门：</span> {{allTaskInfoContentData.responsibleDeptNames}}</div>
          <div><span>责任人：</span> {{allTaskInfoContentData.responsibleUserNames}}</div>
          <div><span>分管领导：</span> {{allTaskInfoContentData.leaderUserNames}}</div>
          <div><span>协办部门：</span> {{allTaskInfoContentData.assistDeptNames}}</div>
          <div><span>协办人：</span> {{allTaskInfoContentData.assistUserNames}}</div>
          <div><span>原编号：</span> {{allTaskInfoContentData.oldTaskNum}}</div>
          <div><span>开始时间：</span> {{allTaskInfoContentData.beginDate}}</div>
          <div><span>结束时间：</span> {{allTaskInfoContentData.endDate}}</div>
          <div><span>来源说明：</span> {{allTaskInfoContentData.sourceDesc}}</div>
          <div><span>工作计划：</span> {{allTaskInfoContentData.planDesc}}</div>
          <div><span>督办事宜：</span> {{allTaskInfoContentData.taskDesc}}</div>
          <div>
            <span>附件：</span>
            <div style="margin-left:5rem">
              <div class="attachments_content" v-for="item in attachmentsList" @click="downLoadPdf(item)" :key="item.id">{{item.name}}</div>
            </div>
          </div>

        </div>
        <div class="course-info" v-if="changeMessageShow">
          <div class="applymsg">变更信息</div>
          <div class="applyList">
            <div><span>变更类型：</span>{{changeMsgData.changeType}}</div>
            <div v-if="timeShow"><span>结束时间：</span>{{changeMsgData.endDate}}</div>
            <div v-else><span>督办事宜：</span>{{changeMsgData.taskInfo}}</div>
            <div><span>变更原因：</span>{{changeMsgData.comment}}</div>
            <div class="arrow" @click="clickArrow" v-if="approvalShow || reportApprovalShow">
              <van-icon :name="arrowName" />
            </div>

          </div>
        </div>
      </div>
      <!-- <div class="course-info">
        <div class="applymsg">审核信息</div>
        <div class="applyList">
          <div><span>事件主题：</span>{{allTaskInfoContentData.sourceDesc}}</div>
                    <div><span>来源名称：</span>{{allTaskInfoContentData.sourceName}}</div>
                    <div><span>来源说明：</span>{{allTaskInfoContentData.sourceDesc}}</div>
                    <div><span>责任单位：</span>{{allTaskInfoContentData.responsibleDeptNames}}</div>
                    <div><span>责任人：</span>{{allTaskInfoContentData.responsibleUserNames}}</div>
                    <div><span>协办部门：</span>{{allTaskInfoContentData.assistDeptNames}}</div>
                    <div><span>协办人：</span>{{allTaskInfoContentData.assistUserNames}}</div>
                    <div><span>开始时间：</span>{{allTaskInfoContentData.beginDate}}</div>
                    <div><span>结束时间：</span>{{allTaskInfoContentData.endDate}}</div>
          <div class="arrow" @click="clickArrow">
            <van-icon :name="arrowName" />
          </div>
        </div>
      </div> -->
      <div class="segmentation"></div>
      <!-- <div class="audit-process" v-if="arrowName == 'arrow-up'"> -->
      <div class="audit-process">
        <div class="applymsg">任务下达记录</div>
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

      <div v-if="this.$route.query.prevPage=='0'">
        <van-button type="info" @click="approvalClick" size="large">审批</van-button>
      </div>
    </div>

  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  name: 'allTaskInfoContent',
  props: ['changeMessageShow', 'childNeedData'],
  data() {
    return {
      assignmentList: [],
      allTaskInfoContentData: {},
      down: true,
      arrowName: 'arrow-down',
      attachmentsList: [],

      changeMsgData: [],// 变更信息
      timeShow: false,
    }
  },
  created() {
    this.getTaskInfo();
    this.clickArrow();
    this.getAttachmentsList();
    if (this.changeMessageShow) {
      this.getchangeMsg()
    }
  },
  methods: {
    goDetails(item, e) {
      // 阻止冒泡事件
      console.log(item, e);
      e.stopPropagation();
      this.$router.push({ path: '/reportUpLoad', query: item })
    },
    getchangeMsg() {
      this.http({
        apiUrl: "/mobile/getTaskChange.api",
        method: 'get',
        params: { id: this.$route.query.formId },
        needErrorCallback: true,
      }).then(res => {
        this.changeMsgData = res.data;
        if (res.data.changeType == '工作时限变更') {
          this.timeShow = true;
        }
      })
    },
    approvalClick() {
      this.$router.push({ path: '/supervision/commission/accraditation', query: this.$route.query })
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

        this.allTaskInfoContentData = res.data;
        console.log(this.allTaskInfoContentData);
      }, err => {
        console.log(err)
        // reject(err)
      })
    },
    getAttachmentsList() {
      let id = this.$route.query.id;
      this.http({
        apiUrl: "/supervise/attachment/list.api",
        method: "get",
        params: { businessId: id },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res);
        this.attachmentsList = res.data
      }, err => {
        console.log(err)
      })
    },
    clickLeft() {
      this.$router.push({ path: '/supervision/commission' });
    },
    // 获取用户下达记录
    clickArrow() {
      // let id = this.$route.query.processId;
      this.http({
        apiUrl: "/mobile/comment.api",
        method: "get",
        // params: { processInstanceId: id },
        params: { id: this.childNeedData.id, key: this.childNeedData.key },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res);
        this.assignmentList = res.data;
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
#allTaskInfoContent .van-nav-bar--fixed {
  background: #329afa;
  color: #fff;
}
#allTaskInfoContent .van-nav-bar__title {
  color: #fff;
}
/* #allTaskInfoContent .infomation{margin-top:46px} */
#allTaskInfoContent .apply-info {
  border-bottom: #fafafa 2px solid;
  box-sizing: border-box;
  padding: 0.625rem 0.625rem;
}
#allTaskInfoContent .apply-info::after {
  display: block;
  content: "";
  clear: both;
}
#allTaskInfoContent .audit-info {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
}
#allTaskInfoContent .course-info {
  /* padding: 0.625rem 0 0 0.625rem; */
  box-sizing: border-box;
  border-bottom: #eff3f5 0.5rem solid;
}
#allTaskInfoContent .audit-process {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  padding-bottom: 1rem;
}
#allTaskInfoContent .attachments_content {
  color: #329afa;
  /* border-bottom: 1px solid #329AFA; */
}
#allTaskInfoContent .van-nav-bar .van-icon {
  color: #fff;
}
#allTaskInfoContent .status {
  line-height: 2;
}
#allTaskInfoContent .applymsg {
  border-left: #3193f6 0.25rem solid;
  padding-left: 5px;
}
#allTaskInfoContent .applyList > div {
  padding: 0.625rem 0;
  box-sizing: border-box;
  /* height: 3.125rem; */
  line-height: 1.475rem;
}
#allTaskInfoContent .applyList > div::after {
  display: block;
  content: "";
  clear: both;
}
#allTaskInfoContent .applyList > div > span {
  color: #444444;
  float: left;
  width: 20%;
  font-size: 0.8rem;
  height: 25px;
  line-height: 25px;
  text-align: justify;
}
#allTaskInfoContent .applyList > div > span::after {
  display: inline-block;
  content: "";
  width: 100%;
  overflow: hidden;
  height: 0;
}
#allTaskInfoContent .applyList > div:not(:last-child) {
  border-bottom: #f1f1f3 1px solid;
}
#allTaskInfoContent .arrow {
  text-align: center;
}
#allTaskInfoContent .course {
  padding: 0.625rem 0.625rem 0 0.625rem;
  box-sizing: border-box;
}
/* #allTaskInfoContent .van-tabs--line{margin-top:46px;} */
#allTaskInfoContent .flex {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
#allTaskInfoContent .left {
  float: left;
}
#allTaskInfoContent .right {
  float: right;
}
#allTaskInfoContent .audit-process ul {
  padding: 1.5rem 0.5rem;
}
#allTaskInfoContent .audit-process ul li {
  border-left: 1px solid #f0f2f6;
  position: relative;
  /* border-left: 1px solid red; */
  padding: 0.5rem 1.6rem;
  box-sizing: border-box;
  /* 2BC4D9 */
}
#allTaskInfoContent .audit-process ul li h3 {
  color: #2bc4d9;
  position: relative;
  font-weight: 400;
  margin: 0.6rem 0;
}
#allTaskInfoContent .audit-process ul li p {
  padding: 0.6rem 0;
}
#allTaskInfoContent .audit-process ul li p b {
  font-weight: 400;
}
#allTaskInfoContent .audit-process ul li .bottom-p {
  border-bottom: 1px solid #f0f2f6;
}
#allTaskInfoContent .audit-process ul li h3 span {
  position: absolute;
  background: #fff;
  top: 0.2rem;
  left: -2.2rem;
  font-size: 1.2rem;
  width: 1rem;
  height: 1.2rem;
}

#allTaskInfoContent .audit-process ul li:first-child {
  height: 2rem;
}

#allTaskInfoContent .audit-process ul li:first-child span {
  position: absolute;
  background: #fff;
  top: -0.6rem;
  left: -0.6rem;
  font-size: 1.2rem;
  width: 1rem;
  height: 1.2rem;
  color: #f0f2f6;
}
#allTaskInfoContent .segmentation {
  width: 100%;
  height: 10px;
  background: #f5f6f8;
}
/* .van-popup{background: transparent !important;} */
</style>
