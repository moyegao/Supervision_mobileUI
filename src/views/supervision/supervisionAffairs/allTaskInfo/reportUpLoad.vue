<template>
  <div id="reportUpLoad">
    <van-nav-bar fixed :ellipsis="false" swipeable @click-left="clickLeft">
      <van-icon name="arrow-left" slot="left" />
      <div slot="title">
        汇报审批附件
      </div>
    </van-nav-bar>
    <div class="infomation">
      <div class="audit-info">
        <div class="applyList"><div>
            <span class="span_content">附件：</span>
            <div style="margin-left:5rem">
              <div class="attachments_content" v-for="item in taskAssignmentDetailsData.attachments" :key="item.id" @click="downLoadPdf(item)">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  name: 'reportUpLoad',
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
      this.taskAssignmentDetailsData = this.$route.query;
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
#reportUpLoad .van-nav-bar--fixed {
  background: #329afa;
  color: #fff;
}
#reportUpLoad .attachments_content {
  color: #329afa;
  /* border-bottom: 1px solid #329AFA; */
}
#reportUpLoad .van-nav-bar__title {
  color: #fff;
}
#reportUpLoad .infomation {
  margin-top: 46px;
}
#reportUpLoad .apply-info {
  border-bottom: #fafafa 2px solid;
  box-sizing: border-box;
  padding: 0.625rem 0.625rem;
}
#reportUpLoad .apply-info::after {
  display: block;
  content: "";
  clear: both;
}
#reportUpLoad .audit-info {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  /* border-bottom: #eff3f5 0.5rem solid; */
}
#reportUpLoad .course-info {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  border-bottom: #eff3f5 0.5rem solid;
}
#reportUpLoad .audit-process {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  padding-bottom: 1rem;
}
#reportUpLoad .van-nav-bar .van-icon {
  color: #fff;
}
#reportUpLoad .status {
  line-height: 2;
}
#reportUpLoad .applymsg {
  border-left: #3193f6 0.25rem solid;
  padding-left: 5px;
}
#reportUpLoad .applyList > div {
  padding: 0.625rem 0;
  box-sizing: border-box;
  /* height: 3.125rem; */
  line-height: 1.875rem;
}
#reportUpLoad .applyList > div::after {
  display: block;
  content: "";
  clear: both;
}
#reportUpLoad .applyList > div > .span_content {
  color: #444444;
  float: left;
  width: 20%;
  /* font-size: 0.8rem; */
  height: 25px;
  line-height: 25px;
  text-align: justify;
}
#reportUpLoad .applyList > div > .span_content::after {
  display: inline-block;
  content: "";
  width: 100%;
  overflow: hidden;
  height: 0;
}
#reportUpLoad .applyList > div:not(:last-child) {
  border-bottom: #f1f1f3 1px solid;
}
#reportUpLoad .arrow {
  text-align: center;
}
#reportUpLoad .course {
  padding: 0.625rem 0.625rem 0 0.625rem;
  box-sizing: border-box;
}
/* #reportUpLoad .van-tabs--line{margin-top:46px;} */
#reportUpLoad .flex {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
#reportUpLoad .left {
  float: left;
}
#reportUpLoad .right {
  float: right;
}
#reportUpLoad .audit-process ul {
  padding: 1.5rem 0.5rem;
}
#reportUpLoad .audit-process ul li {
  border-left: 1px solid #f0f2f6;
  position: relative;
  /* border-left: 1px solid red; */
  padding: 0.5rem 1.6rem;
  box-sizing: border-box;
  /* 2BC4D9 */
}
#reportUpLoad .audit-process ul li h3 {
  color: #2bc4d9;
  position: relative;
  font-weight: 400;
  margin: 0.6rem 0;
}
#reportUpLoad .audit-process ul li p {
  padding: 0.6rem 0;
}
#reportUpLoad .audit-process ul li p b {
  font-weight: 400;
}
#reportUpLoad .audit-process ul li .bottom-p {
  border-bottom: 1px solid #f0f2f6;
}
#reportUpLoad .audit-process ul li h3 span {
  position: absolute;
  background: #fff;
  top: 0.2rem;
  left: -2.2rem;
  font-size: 1.2rem;
  width: 1rem;
  height: 1.2rem;
}

#reportUpLoad .audit-process ul li:first-child {
  height: 2rem;
}

#reportUpLoad .audit-process ul li:first-child span {
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
