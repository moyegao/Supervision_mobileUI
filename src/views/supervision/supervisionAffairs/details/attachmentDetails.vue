<template>
  <div id="attachmentDetails">
    <van-nav-bar fixed :ellipsis="false" swipeable @click-left="clickLeft">
      <van-icon name="arrow-left" slot="left" />
      <div slot="title">
        <!-- {{attachmentDetailsData.leaderUserNames}} -->
        审批附件
      </div>
    </van-nav-bar>
    <div class="infomation">
      <div class="audit-info">
        <!-- <div class="applymsg">申请信息</div> -->
        <div class="applyList">
          <div>
            <span class="span_content">附件：</span>
            <div style="margin-left:5rem">
              <div class="attachments_content" v-for="item in attachmentDetailsData.attachments" :key="item.id" @click="downLoadPdf(item)">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="course-info">
                <div class="applymsg">审核信息</div>
                <div class="applyList">
                    <div><span>事件主题：</span>{{attachmentDetailsData.sourceDesc}}</div>
                    <div><span>来源名称：</span>{{attachmentDetailsData.sourceName}}</div>
                    <div><span>来源说明：</span>{{attachmentDetailsData.sourceDesc}}</div>
                    <div><span>责任单位：</span>{{attachmentDetailsData.responsibleDeptNames}}</div>
                    <div><span>责任人：</span>{{attachmentDetailsData.responsibleUserNames}}</div>
                    <div><span>协办部门：</span>{{attachmentDetailsData.assistDeptNames}}</div>
                    <div><span>协办人：</span>{{attachmentDetailsData.assistUserNames}}</div>
                    <div><span>开始时间：</span>{{attachmentDetailsData.beginDate}}</div>
                    <div><span>结束时间：</span>{{attachmentDetailsData.endDate}}</div>
                    <div class="arrow" @click="clickArrow"><van-icon :name="arrowName" /></div>
                </div>
            </div> -->
      <!-- <div class="audit-process" v-if="arrowName == 'arrow-up'">
               <div class="applymsg">审核进程</div>
                     <ul>
                       <li><span class="icon iconfont icon-Time"></span></li>
                       <li  v-for="item in proccessData" :key="item.taskId">
                           <h3>  <span class="icon iconfont icon-chenggong"></span> {{item.taskName}}</h3>
                           <p style="font-size: 0.8rem;">{{item.approver}} <i style="float: right;font-style: normal;">{{item.endTime}}</i></p>
                           <p class="bottom-p"><b>{{item.action}}</b></p>
                       </li>
                     </ul>
            </div> -->

      <!-- <div v-if="this.$route.query.prevPage=='0'">
                <van-button type="info" @click="approvalClick" size="large">审批</van-button>
            </div> -->
    </div>

  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  name: 'attachmentDetails',
  data() {
    return {
      proccessData: [],
      attachmentDetailsData: {},
      down: true,
      arrowName: 'arrow-down',
      reportInfoShow: false,
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      // this.attachmentDetailsData = this.$route.query;
      this.attachmentDetailsData = JSON.parse(sessionStorage.attachmentDetails)
      console.log(this.attachmentDetailsData);
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
  }
}
</script>
<style>
p {
  margin: 0;
  padding: 0;
}
#attachmentDetails .van-nav-bar--fixed {
  background: #329afa;
  color: #fff;
}
#attachmentDetails .attachments_content {
  color: #329afa;
  /* border-bottom: 1px solid #329AFA; */
}
#attachmentDetails .van-nav-bar__title {
  color: #fff;
}
#attachmentDetails .infomation {
  margin-top: 46px;
}
#attachmentDetails .apply-info {
  border-bottom: #fafafa 2px solid;
  box-sizing: border-box;
  padding: 0.625rem 0.625rem;
}
#attachmentDetails .apply-info::after {
  display: block;
  content: "";
  clear: both;
}
#attachmentDetails .audit-info {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  /* border-bottom: #eff3f5 0.5rem solid; */
}
#attachmentDetails .course-info {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  border-bottom: #eff3f5 0.5rem solid;
}
#attachmentDetails .audit-process {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  padding-bottom: 1rem;
}
#attachmentDetails .van-nav-bar .van-icon {
  color: #fff;
}
#attachmentDetails .status {
  line-height: 2;
}
#attachmentDetails .applymsg {
  border-left: #3193f6 0.25rem solid;
  padding-left: 5px;
}
#attachmentDetails .applyList > div {
  padding: 0.625rem 0;
  box-sizing: border-box;
  /* height: 3.125rem; */
  line-height: 1.875rem;
}
#attachmentDetails .applyList > div::after {
  display: block;
  content: "";
  clear: both;
}
#attachmentDetails .applyList > div > .span_content {
  color: #d7d7d7;
  float: left;
  width: 20%;
  font-size: 0.8rem;
  height: 25px;
  line-height: 25px;
  text-align: justify;
}
#attachmentDetails .applyList > div > .span_content::after {
  display: inline-block;
  content: "";
  width: 100%;
  overflow: hidden;
  height: 0;
}
#attachmentDetails .applyList > div:not(:last-child) {
  border-bottom: #f1f1f3 1px solid;
}
#attachmentDetails .arrow {
  text-align: center;
}
#attachmentDetails .course {
  padding: 0.625rem 0.625rem 0 0.625rem;
  box-sizing: border-box;
}
/* #attachmentDetails .van-tabs--line{margin-top:46px;} */
#attachmentDetails .flex {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
#attachmentDetails .left {
  float: left;
}
#attachmentDetails .right {
  float: right;
}
#attachmentDetails .audit-process ul {
  padding: 1.5rem 0.5rem;
}
#attachmentDetails .audit-process ul li {
  border-left: 1px solid #f0f2f6;
  position: relative;
  /* border-left: 1px solid red; */
  padding: 0.5rem 1.6rem;
  box-sizing: border-box;
  /* 2BC4D9 */
}
#attachmentDetails .audit-process ul li h3 {
  color: #2bc4d9;
  position: relative;
  font-weight: 400;
  margin: 0.6rem 0;
}
#attachmentDetails .audit-process ul li p {
  padding: 0.6rem 0;
}
#attachmentDetails .audit-process ul li p b {
  font-weight: 400;
}
#attachmentDetails .audit-process ul li .bottom-p {
  border-bottom: 1px solid #f0f2f6;
}
#attachmentDetails .audit-process ul li h3 span {
  position: absolute;
  background: #fff;
  top: 0.2rem;
  left: -2.2rem;
  font-size: 1.2rem;
  width: 1rem;
  height: 1.2rem;
}

#attachmentDetails .audit-process ul li:first-child {
  height: 2rem;
}

#attachmentDetails .audit-process ul li:first-child span {
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
