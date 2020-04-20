<template>
  <div id="supervision">
    <!-- <van-nav-bar
        fixed
        title="任务详情"
        /> -->
    <van-nav-bar fixed :ellipsis="false" left-text="" left-arrow swipeable @click-left="clickLeft">
      <div slot="title">
        任务详情
      </div>
    </van-nav-bar>

    <van-tabs v-model="active" @change="changeTab" :ellipsis="false" swipeable title-active-color="#329AFA">
      <van-tab>
        <div slot="title">
          任务详情
        </div>
        <div class="segmentation"></div>
        <allTaskInfoContent ref="allTaskInfoContent" :childNeedData="childNeedData"></allTaskInfoContent>
        <!-- <router-view /> -->
      </van-tab>
      <!-- <van-tab>
        <div slot="title">
          任务下达
        </div>
        <div class="segmentation"></div>
        <taskAssignment :childNeedData="childNeedData"></taskAssignment>
      </van-tab> -->
      <van-tab>
        <div slot="title">
          任务变更
        </div>
        <div class="segmentation"></div>
        <taskAssignment :childNeedData="childNeedData"></taskAssignment>
        <!-- <router-view /> -->
      </van-tab>
      <van-tab>
        <div slot="title">
          任务办结
        </div>
        <div class="segmentation"></div>
        <taskAssignment :childNeedData="childNeedData"></taskAssignment>
        <!-- <router-view /> -->
      </van-tab>
      <!-- <van-tab>
        <div slot="title">
          汇报审批
        </div>
        <div class="segmentation"></div>
        <taskAssignment :childNeedData="childNeedData"></taskAssignment>
      </van-tab> -->
      <van-tab>
        <div slot="title">
          任务汇报
        </div>
        <div class="segmentation"></div>
        <reportDetails :childNeedData="childNeedData"></reportDetails>
        <!-- <router-view /> -->
      </van-tab>
    </van-tabs>
    <div v-if="this.$route.query.prevPage=='0'" style=" position: fixed;bottom: 0; width: 100%;">
      <!-- <van-button type="info" @click="approvalClick" size="large">{{text}}</van-button> -->
      <van-button type="info" @click="approvalClick" size="large">审批</van-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapStates } from "vuex"

import allTaskInfoContent from '../allTaskInfo/allTaskInfoContent'
import taskAssignment from '../allTaskInfo/taskAssignment';
import reportDetails from '../allTaskInfo/reportDetails'
export default {
  name: 'supervision',
  components: { allTaskInfoContent, taskAssignment, reportDetails },
  data() {
    return {
      allData: [],
      active: 0,
      childNeedData: { id: this.$route.query.id, key: 'assignment' },
      text: '',
    }
  },
  mounted() {
    console.log(window.location.href);
    if (this.$route.query.prevPage == '0') {
      this.getShowPage();
    }
  },
  methods: {

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
        } else if (res.data == 'changeApproval') {
          this.$refs.allTaskInfoContent.getchangeMsg()
          this.text = '审批'
        } else if (res.data == 'taskConfirm') {
          this.text = '任务确认'
        } else if (res.data == 'reportApproval') {
          this.text = '汇报审批'
        } else if (res.data == 'taskReport') {
          this.text = '任务汇报'
        } else if (res.data == 'taskChange') {
          this.text = '任务变更'
        } else {
          this.text = '任务结项'
        }
      })
    },
    approvalClick() {
      console.log(this.$route.query);
      this.$route.query.text = this.text;
      if (this.text == '任务汇报') {
        // this.this.$route.query.
        this.$router.push({ path: '/supervision/monthlyReport/detail', query: this.$route.query })
      } else {
        this.$router.push({ path: '/supervision/commission/accraditation', query: this.$route.query })
      }


    },
    changeTab(index) {//切换路由
      console.log(index)
      if (index == 0) {
        this.childNeedData.key = 'assignment';
      } else if (index == 1) {
        this.childNeedData.key = 'change';
      } else if (index == 2) {
        this.childNeedData.key = 'banjie';
      } else if (index == 3) {
        this.childNeedData.key = 'report';
      }


      // if (index == 1) {
      //   this.childNeedData.key = 'assignment';
      // } else if (index == 2) {
      //   this.childNeedData.key = 'change';
      // } else if (index == 3) {
      //   this.childNeedData.key = 'banjie';
      // } else if (index == 4) {
      //   this.childNeedData.key = 'report';
      // }
    },
    clickLeft() {
      // console.log(this.$route.query.firstURL);
      // this.$router.push('/supervision/commission')
	  window.history.go(-1);
      // this.$router.push('/supervision/' + this.$route.query.firstURL)
      // window.history.go(-1);
      // window.location.go(-1)
    },
    backIndex(a) {
      console.log(a)
    },
    goto() {
      alert(999)
    }
  }
}
</script>
<style>
#supervision .infomation {
  padding-bottom: 50px;
}
#supervision .van-nav-bar--fixed {
  background: #329afa;
  color: #fff;
}
#supervision .van-nav-bar .van-icon {
  color: #fff;
}
#supervision .van-tabs--line {
  margin-top: 46px;
  z-index: 0;
  height: calc(100% - 50px);
}
#supervision .van-tabs__line {
  background: #329afa;
}
#supervision .van-nav-bar__title {
  color: #fff;
}
#supervision .segmentation {
  width: 100%;
  height: 10px;
  background: #f5f6f8;
}
.flex {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.flex .content {
  font-size: 0.8rem;
  color: #a7a7a7;
}
.van-field__body {
  border: 1px solid #d7d7d7;
  padding: 5px;
}
.van-popup {
  background: transparent !important;
}
</style>
