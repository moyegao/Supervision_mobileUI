<template>
  <div id="myToDoDetails">
    <!-- 待审详情 -->
    <!-- <van-nav-bar fixed @click-left="clickLeft">
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
      <!-- <div class="segmentation"></div> -->
      <van-tabs class="top_tabs" swipeable title-active-color="#329AFA">
        <van-tab>
          <div slot="title">审批内容</div>
          <div class="segmentation"></div>
          <div class="audit-info">
            <!-- <div class="applymsg">任务信息</div> -->
            <div class="applyList">
              <div><span>任务名称：</span>{{myToDoDetailsData.taskName}}</div>
              <div><span>任务编号：</span>{{myToDoDetailsData.taskNum}}</div>
              <div><span>任务状态：</span>{{myToDoDetailsData.taskState}}</div>
              <div><span>流程时间：</span>{{myToDoDetailsData.processState}}</div>
              <div><span>开始时间：</span>{{myToDoDetailsData.beginDate}}</div>
              <div><span>结束时间：</span>{{myToDoDetailsData.endDate}}</div>
              <div><span>责任单位：</span>{{myToDoDetailsData.responsibleDeptNames}}</div>
              <div><span>责 任 人：</span>{{myToDoDetailsData.responsibleUserNames}}</div>
              <div><span>来源名称：</span>{{myToDoDetailsData.sourceName}}</div>
              <div><span>来源说明：</span>{{myToDoDetailsData.sourceDesc}}</div>
              <div><span>重要程度：</span> {{myToDoDetailsData.important}}</div>
              <div><span>协办部门：</span>{{myToDoDetailsData.assistDeptNames}}</div>
              <div><span>协 办 人：</span>{{myToDoDetailsData.assistUserNames}}</div>
              <div><span>任务详情：</span>{{myToDoDetailsData.taskDesc}}</div>
              <div>
                <span>附件：</span>
                <div style="margin-left:5rem">
                  <div class="attachments_content" v-for="item in attachmentsList" @click="downLoadPdf(item)" :key="item.id">{{item.name}}</div>
                </div>
              </div>
              <!-- 显示和隐藏审核信息
          <div class="arrow" @click="clickArrow" v-if="approvalProcessShow">
            <van-icon :name="arrowName" />
          </div> -->
            </div>
          </div>
          <!-- 变更信息 -->
          <div class="course-info" v-if="changeMsgShow">
            <!-- <div class="applymsg">变更信息</div> -->
            <div class="applyList">
              <div><span>变更类型：</span>{{changeMsgData.changeType}}</div>
              <van-field v-if="timeShow" v-model="endDate" readonly label="结束时间：" placeholder="选择年月" right-icon="clock-o" size="large" @click="clickTime" @click-right-icon="clickTime" />
              <!-- <div v-if="timeShow"><span>结束时间：</span>{{changeMsgData.endDate}}</div> -->
              <div v-else><span>督办事宜：</span>{{changeMsgData.taskInfo}}</div>
              <div><span>变更原因：</span>{{changeMsgData.comment}}</div>
            </div>
          </div>
          <!-- 汇报信息 -->
          <div class="course-info" v-if="reportMsgShow">
            <!-- <div class="applymsg">汇报信息</div> -->
            <div class="applyList">
              <div><span>汇报进度：</span>{{reportMsgData.progressRadio}}</div>
              <div><span>汇报年月：</span>{{reportMsgData.reportMonth}}</div>
              <div>
                <span>汇报内容：</span>
                <p style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;" id="reportDetail">{{reportMsgData.reportInfo}}</p>
                <p style="color: blue;display:none" class="contentDetail" @click="showReportDetail()">详情</p>
              </div>
              <div>
                <span>汇报附件：</span>
                <div style="margin-left:5rem">
                  <div class="attachments_content" v-for="item in reportAttachmentsList" @click="downLoadPdf(item)" :key="item.id">{{item.name}}</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>

        <van-tab>
          <div slot="title">流程记录</div>
          <div class="segmentation"></div>
          <div class="audit-process">
            <!-- <div class="applymsg">审核进程</div> -->
            <!-- <ul>
              <li><span class="icon iconfont icon-Time"></span></li>
              <li v-for="item in proccessData" :key="item.taskId">
                <h3> <span class="icon iconfont icon-chenggong"></span> {{item.taskName}}</h3>
                <p style="font-size: 0.8rem;">{{item.approver}} <i style="float: right;font-style: normal;">{{item.endTime}}</i></p>
                <p class="bottom-p"><b>{{item.action}}</b></p>
                <span style="color: #44a3fa;" v-if="item.attachments.length > 0" @click="goDetails(item, $event)">附件({{item.attachments.length}})</span>
              </li>
            </ul> -->
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
                  <span style="display:inline-block;font-size:12px;color: #44a3fa;font-style: normal;" v-if="item.attachments.length > 0" @click="goDetails(item, $event)">查看附件({{item.attachments.length}})</span>
                </p>

              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
      <div v-if="this.$route.query.prevPage=='0'" style=" position: fixed;bottom: 0; width: 100%;">
        <!-- <van-button type="info" @click="approvalClick" size="large">{{text}}</van-button> -->
        <van-button type="info" @click="approvalClick" size="large">审批</van-button>
      </div>

      <van-popup position="bottom" :style="{ height: '40%' }" v-model="changeTimeShow">
        <van-datetime-picker class="timepicker" v-model="currentDate" :formatter="formatter" type="date" @confirm="confirmTime" @cancel="cancelTime" @change="changeTime" />
      </van-popup>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myToDoDetails',
  data() {
    return {
      proccessData: [],
      myToDoDetailsData: {},
      down: true,
      arrowName: 'arrow-down',
      text: '',
      approvalShow: false,//审批
      taskConfirmShow: false,//任务确认
      reportApprovalShow: true,//汇报审批
      taskReportShow: false,//任务汇报
      taskChangeShow: false,//任务变更
      taskJieXiangShow: false,//任务结项

      changeMsgData: {
        endDate: '',
      },// 变更信息
      currentDate: new Date(),
      reportMsgData: [],// 汇报信息
      changeMsgShow: false,
      reportMsgShow: false,
      timeShow: false,
      attachmentsList: [],
      reportAttachmentsList: [],
      approvalProcessShow: false,
      changeTimeShow: false,
      endDate: '',
    }
  },
  created() {
    this.getTaskInfo()
    this.getShowPage()
    // 任务信息里的附件
    this.getAttachmentsList(this.$route.query.id, 'taskMsg');

  },
  mounted() {
    setTimeout(function () {
      let tar_clientWidth = document.getElementById("reportDetail").clientWidth;
      let tar_scrollWidth = document.getElementById("reportDetail").scrollWidth;
      if (tar_clientWidth < tar_scrollWidth) {
        $(".contentDetail").css("display", "block")
      }
    }, 1000)
  },
  computed: {

  },
  methods: {
    showReportDetail() {
      this.$dialog.alert({
        message: $("#reportDetail").html(),
      })
    },
    clickTime() {
      this.changeTimeShow = !this.changeTimeShow;
    },
    // 时间格式化事件
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value;
    },
    confirmTime(val) {
      console.log(val)
      this.changeTimeShow = false;
      var date = val;
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.endDate = date.getFullYear() + '-' + month + '-' + strDate
      this.$set(this.changeMsgData, 'endDate', this.currentDate)
    },
    cancelTime() {
      this.changeTimeShow = false;
    },
    changeTime(e) {
      console.log(e)
    },
    goDetails(item, e) {
      // 阻止冒泡事件
      console.log(item, e);
      e.stopPropagation();
      sessionStorage.attachmentDetails = JSON.stringify(item)
      // 附件界面
      this.$router.push({ path: '/attachmentDetails'})
    },
    getAttachmentsList(businessId, msg) {
      let params = {
        businessId
      }
      // 回报信息需要多传type
      if (msg == 'reportMsg') {
        params.type = 4
      }
      this.http({
        apiUrl: "/supervise/attachment/list.api",
        method: "get",
        params: params,
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res);
        if (msg == 'reportMsg') {
          this.reportAttachmentsList = res.data
        } else {
          this.attachmentsList = res.data
        }

      }, err => {
        console.log(err)
      })
    },
    approvalClick() {
      console.log(this.$route.query);
      this.$route.query.text = this.text;
      this.$route.query.endDate = this.endDate;
      this.$route.query.changeEndDate = this.myToDoDetailsData.endDate;
      this.$route.query.taskDesc = this.myToDoDetailsData.taskDesc;
      this.$route.query.deptId = this.myToDoDetailsData.responsibleDeptIds;
      this.$route.query.planDesc = this.myToDoDetailsData.planDesc;
      this.$route.query.regId = this.myToDoDetailsData.regId;
      this.$route.query.taskType = this.myToDoDetailsData.taskType;
      this.$route.query.taskNum = this.myToDoDetailsData.taskNum;
      if (this.text == '任务汇报') {
        // this.this.$route.query.
        this.$router.push({ path: '/supervision/monthlyReport/detail', query: this.$route.query })
        
      } else {
        console.log(this.$route.query);
        this.$router.push({ path: '/supervision/commission/accraditation', query: this.$route.query })
      }


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
          this.endDate = this.changeMsgData.endDate
        }
      })
    },
    getReportMsg() {
      this.http({
        apiUrl: "/mobile/getNewestByTaskId.api",
        method: 'get',
        params: { taskId: this.$route.query.id },
        needErrorCallback: true,
      }).then(res => {
        this.reportMsgData = res.data;
        // 汇报信息里的附件
        this.getAttachmentsList(this.reportMsgData.id, 'reportMsg');
      })
    },
    getShowPage() {//需要展示的页面(审批,任务确认...)
      let taskId = this.$route.query.taskId;
      let processKey = this.$route.query.processKey;
      this.http({
        apiUrl: "/supervise/workflow/form.api",
        method: 'get',
        params: { taskId, processKey },
        needErrorCallback: true,
      }).then(res => {
        console.log(res)
        this[res.data + 'Show'] = true;
        if (res.data == 'approval') {
          this.text = '审批'
          this.approvalProcessShow = true;
          this.clickArrow();
        } else if (res.data == 'changeApproval') {
          this.text = '审批'
          this.changeMsgShow = true;
          this.getchangeMsg();
          this.approvalProcessShow = true;
          this.clickArrow();
        } else if (res.data == 'taskConfirm') {
          this.text = '任务确认'
          this.clickArrow();
        } else if (res.data == 'reportApproval') {
          this.text = '汇报审批'
          this.reportMsgShow = true
          this.getReportMsg();
          this.approvalProcessShow = true;
          this.clickArrow();
          // let tar_clientWidth = document.getElementById("reportDetail").clientWidth;
          // let tar_scrollWidth = document.getElementById("reportDetail").scrollWidth;
          // if(tar_clientWidth<tar_scrollWidth){
          //   $(".contentDetail").css("display","block");
          // }else{
          //   $(".contentDetail").css("display","none");
          // }
        } else if (res.data == 'taskReport') {
          this.text = '任务汇报'
          this.clickArrow();
        } else if (res.data == 'taskChange') {
          this.text = '任务变更'
          this.clickArrow();
        } else {
          this.text = '任务结项'
          this.clickArrow();
        }
      })
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

        this.myToDoDetailsData = res.data;
        console.log(this.myToDoDetailsData);
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
      let index = this.$route.query.prevPage;
      console.log(index)
      if (index == 2) {
        // this.$router.push('/supervision/myapply')
        this.$router.push({ path: '/supervision/myapply' })
      } else if (index == 0) {
        this.$router.push('/supervision/commission')
      }
      // window.history.go(-1);
    },
    // 获取审核进程数据
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
  }
}
</script>
<style>
p {
  margin: 0;
  padding: 0;
}
#myToDoDetails .attachments_content {
  color: #329afa;
  /* border-bottom: 1px solid #329AFA; */
}
#myToDoDetails .van-nav-bar--fixed {
  background: #329afa;
  color: #fff;
}
#myToDoDetails .van-nav-bar__title {
  color: #fff;
}
#myToDoDetails .infomation {
  /* margin-top: 46px; */
  padding-bottom: 50px;
}
#myToDoDetails .apply-info {
  border-bottom: #fafafa 2px solid;
  box-sizing: border-box;
  padding: 0.625rem 0.625rem;
}
#myToDoDetails .apply-info::after {
  display: block;
  content: "";
  clear: both;
}
#myToDoDetails .audit-info {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  border-bottom: #eff3f5 0.5rem solid;
}
#myToDoDetails .course-info {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  border-bottom: #eff3f5 0.5rem solid;
}
#myToDoDetails .audit-process {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  padding-bottom: 1rem;
}
#myToDoDetails .van-nav-bar .van-icon {
  color: #fff;
}
.status {
  line-height: 2;
}
#myToDoDetails .applymsg {
  border-left: #3193f6 0.25rem solid;
  padding-left: 5px;
}
#myToDoDetails .applyList > div {
  padding: 0.625rem 0;
  box-sizing: border-box;
  /* height: 3.125rem; */
  line-height: 1.475rem;
}
#myToDoDetails .applyList > div::after {
  display: block;
  content: "";
  clear: both;
}
#myToDoDetails .applyList > div > span {
  color: #444444;
  float: left;
  width: 20%;
  font-size: 0.8rem;
  height: 25px;
  line-height: 25px;
  text-align: justify;
}
#myToDoDetails .applyList > div > span::after {
  display: inline-block;
  content: "";
  width: 100%;
  overflow: hidden;
  height: 0;
}
#myToDoDetails .applyList > div:not(:last-child) {
  border-bottom: #f1f1f3 1px solid;
}
#myToDoDetails .applyList .van-cell__title {
  color: #d7d7d7;
  float: left;
  width: 20%;
  font-size: 0.8rem;
  letter-spacing: 4px;
  height: 25px;
  line-height: 25px;
  text-align: justify;
}
#myToDoDetails .applyList .van-field__control {
  font-size: 1rem;
}
#myToDoDetails .applyList .van-field__clear,
.van-field__right-icon {
  margin-right: 5px;
}
#myToDoDetails .applyList .van-field__clear,
#myToDoDetails .van-field__right-icon .van-icon {
  font-size: 21px;
}
#myToDoDetails .van-field__body {
  border: none;
  padding: 0px;
}

/* 11/18 */
#myToDoDetails .van-tabs__line {
  background-color: #329afa;
}
#myToDoDetails .van-nav-bar {
  z-index: 9999 !important;
}
#myToDoDetails .segmentation {
  width: 100%;
  height: 10px;
  background: #f5f6f8;
}
#myToDoDetails .task-message {
  width: 100%;
}
#myToDoDetails .task-message .people {
  width: 20%;
  height: 60px;
  display: inline-block;
  text-align: center;
  line-height: 60px;
  float: left;
  /* color: #A5A5A5; */
  /* vertical-align: middle; */
}
#myToDoDetails .task-message .content {
  width: 80%;
  display: inline-block;
  height: 60px;
  padding: 5px 0px 5px 0px;
}
#myToDoDetails .task-message .content div {
  margin: 5px 0px 5px 0px;
  color: #a5a5a5;
  /* font-size: 14px; */
}

.arrow {
  text-align: center;
}
.course {
  padding: 0.625rem 0.625rem 0 0.625rem;
  box-sizing: border-box;
}
/* #myToDoDetails .van-tabs--line{margin-top:46px;} */
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
s .audit-process ul li .bottom-p {
  border-bottom: 1px solid #f0f2f6;
  display: inline-block;
  width: 80%;
}
.audit-process ul li .bottom-f {
  border-bottom: 1px solid #f0f2f6;
  /* display: inline-block; */
  /* width: 80%; */
  color: #44a3fa;
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
</style>
