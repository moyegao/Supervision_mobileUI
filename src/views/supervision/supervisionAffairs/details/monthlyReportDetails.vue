<template>
  <div id="mrDetails">
    <van-nav-bar fixed :ellipsis="false" left-text="返回" left-arrow swipeable @click-left="clickLeft">
      <div slot="title">
        任务汇报
      </div>
    </van-nav-bar>
    <van-cell-group style="margin-top:46px">
      <van-field v-model="monthlyObj.taskNum" disabled label="任务编号" placeholder="输入编号" size="large" />
      <van-field v-model="monthlyObj.taskName" disabled label="任务名称" placeholder="输入名称" size="large" />
      <van-field v-model="monthlyObj.reportMonth" label="汇报年月" placeholder="选择年月" right-icon="clock-o" size="large" @click="clickTime" @click-right-icon="clickTime" readonly/>
      <van-field v-model="monthlyObj.reskProgressName" label="进度状态" placeholder="输入进度" right-icon="arrow" size="large" @click="clickProgress" @click-right-icon="clickProgress" readonly/>

      <van-field v-model="monthlyObj.progressRadio" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" label="进度比例" placeholder="输入比例" size="large" type="number"/>
      <!-- <div class="van-cell van-cell--large van-field">
        <div class="van-cell__title van-field__label">
          <span>进度比例</span>
        </div>
        <div class="van-cell__value" style="padding: 10px;">
          <van-slider v-model="monthlyObj.progressRadio" active-color="#1989fa">
            <div slot="button" class="custom-button" style="background: #1989fa;padding: 0 3px;border-radius: 50%;color: #fff;">
              {{ monthlyObj.progressRadio }}
            </div>
          </van-slider>
        </div>
      </div> -->
      <van-field v-model="monthlyObj.reportInfo" maxlength="1000" label="汇报内容" placeholder="输入内容" type="textarea" size="large" :autosize="{ maxHeight: 150, minHeight: 100 }" />
    </van-cell-group>

    <van-popup position="bottom" :style="{ height: '40%' }" v-model="timeShow">
      <van-datetime-picker class="timepicker" v-model="currentDate" :formatter="formatter" type="year-month" @confirm="confirmTime" @cancel="cancelTime" @change="changeTime" readonly="readonly"/>
    </van-popup>

    <van-popup position="bottom" :style="{ height: '40%' }" v-model="seletShow">
      <van-picker class="timepicker" show-toolbar title="任务进度" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>

    <footer class="footer">
      <van-button square size="large" @click="cencelData">取消</van-button>
      <van-button type="info" @click="report" size="large">确认</van-button>
    </footer>
    <van-popup v-model="show">
      <van-loading type="spinner" color="#1989fa" />
    </van-popup>
  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  name: 'monthlyReportDetails',
  data() {
    return {
      show: false,
      columns: [],
      monthlyObj: {
        taskId: this.$route.query.id,
        taskNum: this.$route.query.taskNum,
        taskName: this.$route.query.taskName,
        reportMonth: '',
        progressState: '',
        progressRadio: 0,
        reskProgressName: '',
        reportInfo: '',
      },
      optionData: [],
      timeShow: false,
      seletShow: false,
      currentDate: new Date(),
      nowTime: '',
    }
  },
  created() {
    console.log(this.$route.query)
    if ('text' in this.$route.query) {
      this.monthlyObj.taskName = this.$route.query.title
    }
    this.getOptions()

    // 获取当前日期，用于与汇报日期做比较
    let nowTime = new Date();
    let year = nowTime.getFullYear();
    let month = (nowTime.getMonth() + 1);
    if (month<10) {
      month = '0' + month;
    }
    console.log(year + month);
    this.nowTime = year + month
  },
  computed: {

  },
  methods: {
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
    },
    getOptions() {
      this.http({
        apiUrl: "/mobile/options.api",
        method: "get",
        params: {
          type: "report_progress_state"
        },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res)
        this.optionData = res.data;
        this.columns = this.optionData.map(item => item.label)
      }, err => {
        console.log(err)
        // reject(err)
      })
    },
    clickProgress() {
      this.seletShow = !this.seletShow
    },
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.seletShow = false;
      let selectedItem = this.optionData.filter(item => item.label == value)
      this.$set(this.monthlyObj, 'progressState', selectedItem[0].value)
      this.$set(this.monthlyObj, 'reskProgressName', selectedItem[0].label)
      console.log(selectedItem)
    },
    onCancel() {
      console.log('取消');
      this.seletShow = false;
    },
    cencelData() {
      this.$router.push('/supervision/ongoing')
    },
    report() {
      if (this.monthlyObj.reportMonth == '') {
        Toast({
          message: '请选择汇报年月',
          position: 'middle',
          duration: 1500
        })
        return
      } else if (this.monthlyObj.progressState == '') {
        Toast({
          message: '请选择进度状态',
          position: 'middle',
          duration: 1500
        })
        return
      } else if (this.monthlyObj.progressRadio == '') {
        Toast({
          message: '请选择进度比例',
          position: 'middle',
          duration: 1500
        })
        return
      } else if (this.monthlyObj.reportInfo == '') {
        Toast({
          message: '请输入汇报内容',
          position: 'middle',
          duration: 1500
        })
        return
      }
      if (this.monthlyObj.reportMonth - this.nowTime < 0) {
        Toast({
          message: '汇报年月应小于等于当前年月',
          position: 'middle',
          duration: 1500
        })
        return
      }
      this.show = true;
      var params = {
        taskId: this.monthlyObj.taskId,
        taskNum: this.monthlyObj.taskNum,
        progressRadio: this.monthlyObj.progressRadio,
        progressState: this.monthlyObj.progressState,
        reportInfo: this.monthlyObj.reportInfo,
        reportMonth: this.monthlyObj.reportMonth,
      }
      if ('text' in this.$route.query) {
        params.id = this.$route.query.formId;
        params.approvalTaskId = this.$route.query.taskId;
      }
      console.log(params);
      this.http({
        apiUrl: "/mobile/report.api",
        method: "post",
        params: params,
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res)
        this.show = false;
        if (res.code === 0) {

          Toast({
            message: '操作成功',
            position: 'middle',
            duration: 1000
          })
          this.clickLeft()
        } else {
          Toast.fail(res.description);
        }


      }, err => {
        this.show = false;
        console.log(err)
        // reject(err)
      })
    },


    clickLeft() {
      window.history.go(-1)
      // this.$router.push({path:'/supervision/monthlyReport', query: })
      // this.$store.commit('changeIndex',0)
      //
      // this,$route.query.
    },
    clickTime() {
      this.timeShow = !this.timeShow;
    },
    confirmTime(val) {
      console.log(val)
      this.timeShow = false;
      var date = val;
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      // if (strDate >= 0 && strDate <= 9) {
      // 	strDate = "0" + strDate;
      // }
      this.currentDate = date.getFullYear() + '' + month
      this.$set(this.monthlyObj, 'reportMonth', this.currentDate)
    },
    cancelTime() {
      this.timeShow = false;
    },
    changeTime(e) {
      console.log(e)
    },
  }
}
</script>
<style>
#mrDetails .van-cell {
  padding: 10px 15px;
}

#mrDetails .van-nav-bar--fixed {
  background: #329afa;
  color: #fff;
}

#mrDetails .van-nav-bar__title {
  color: #fff;
}

#mrDetails .van-nav-bar .van-icon {
  color: #fff;
}

#mrDetails .van-nav-bar__text {
  color: #fff;
}

#mrDetails .footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  padding: 0 0;
}

.timepicker {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1000;
}
.van-field__control:disabled{
  color:#323233;
}
</style>
