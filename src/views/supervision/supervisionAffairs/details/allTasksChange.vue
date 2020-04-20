<template>
  <div id="taskChange">
    <van-nav-bar fixed :ellipsis="false" left-text="返回" left-arrow swipeable @click-left="clickLeft">
      <div slot="title">
        任务变更
      </div>
    </van-nav-bar>
    <van-cell-group style="margin-top:46px">
      <!-- <div class="apply-info">
        <div class="flex left">
          <p style="font-size:1rem;margin-bottom:5px">{{taskChangeData.taskName}}</p>
          <p style="font-size:0.625rem;color:#A4A4A4">粤海水务</p>
        </div>
        <div class="status right ">
          {{taskChangeData.processState}}
        </div>
      </div> -->
      <div class="audit-info">
        <div class="applymsg">任务信息</div>
        <div class="applyList">
          <div><span>督办名称：</span>{{taskChangeData.taskName}}</div>
          <div><span>责任部门：</span>{{taskChangeData.responsibleDeptNames}}</div>
          <div><span>责任人：</span> {{taskChangeData.responsibleUserNames}}</div>
          <div><span>分管领导：</span> {{taskChangeData.leaderUserNames}}</div>
          <div><span>结束时间：</span>{{taskChangeData.endDate}}</div>
        </div>
      </div>
      <!-- <van-field v-model="monthlyObj.taskNum" clearable label="任务编号" placeholder="输入编号" size="large" />
			<van-field v-model="monthlyObj.taskName" label="任务名称" placeholder="输入名称" size="large" /> -->
      <van-field v-model="monthlyObj.changeType" readonly label="变更类型" placeholder="选择变更类型" right-icon="arrow" size="large" @click="clickProgress" @click-right-icon="clickProgress" />
      <van-field v-model="monthlyObj.endDate" readonly label="结束时间" placeholder="选择时间" right-icon="clock-o" size="large" @click="clickTime" @click-right-icon="clickTime" />

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
      <van-field v-model="monthlyObj.taskInfo" maxlength="1000" :disabled="timeChangeShow" label="督办事宜" placeholder="输入督办事宜" type="textarea" size="large" :autosize="{ maxHeight: 80, minHeight: 80 }" />
      <van-field v-model="monthlyObj.comment" maxlength="1000" label="变更理由" placeholder="输入变更理由" type="textarea" size="large" :autosize="{ maxHeight: 80, minHeight: 80 }" />
    </van-cell-group>

    <van-popup position="bottom" :style="{ height: '40%' }" v-model="timeShow">
      <van-datetime-picker class="timepicker" v-model="currentDate" :formatter="formatter" type="date" @confirm="confirmTime" @cancel="cancelTime" @change="changeTime" />
    </van-popup>

    <van-popup position="bottom" :style="{ height: '40%' }" v-model="seletShow">
      <van-picker class="timepicker" show-toolbar title="任务进度" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>

    <footer class="footer">
      <van-button square size="large" @click="cencelData">取消</van-button>
      <van-button type="info" @click="changeConfirm" size="large">确认</van-button>
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
        // taskNum: this.$route.query.taskNum,
        // taskName: this.$route.query.taskName,
        endDate: '',
        // progressState: '',
        // progressRadio: 0,
        changeType: '',
        taskInfo: '',
        comment: '',
      },
      optionData: [],
      timeShow: false,
      seletShow: false,
      currentDate: new Date(),
      taskChangeData: [],
      timeChangeShow: false,
    }
  },
  created() {
    console.log(this.$route.query)
    this.getOptions();
    this.getTaskInfo();
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

        this.taskChangeData = res.data;
        this.monthlyObj.endDate = this.taskChangeData.endDate;
        this.monthlyObj.taskInfo = this.taskChangeData.taskDesc;
        console.log(this.taskChangeData);
      }, err => {
        console.log(err)
        // reject(err)
      })
    },
    getOptions() {
      this.optionData = [{ label: '工作内容变更', value: 1 }, { label: '工作时限变更', value: 2 }];
      this.columns = this.optionData.map(item => item.label)
      // this.http({
      //   apiUrl: "/mobile/options.api",
      //   method: "get",
      //   params: {
      //     type: "report_progress_state"
      //   },
      //   isJson: false,
      //   needErrorCallback: true,
      // }).then(res => {
      //   console.log(res)
      //   this.optionData = res.data;
      //   this.columns = this.optionData.map(item => item.label)
      // }, err => {
      //   console.log(err)
      //   // reject(err)
      // })
    },
    clickProgress() {
      this.seletShow = !this.seletShow
    },
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.seletShow = false;
      if (index == 1) {
        this.timeChangeShow = true;
      } else if (index == 0) {
        this.timeChangeShow = false;
      }
      let selectedItem = this.optionData.filter(item => item.label == value)
      // this.$set(this.monthlyObj, 'progressState', selectedItem[0].value)
      this.$set(this.monthlyObj, 'changeType', selectedItem[0].label)
      console.log(selectedItem)
    },
    onCancel() {
      console.log('取消');
      this.seletShow = false;
    },
    cencelData() {
      this.$router.push('/supervision/ongoing')
    },
    changeConfirm() {

      var params = {
        taskId: this.monthlyObj.taskId,
      }
      if (this.monthlyObj.changeType == '工作内容变更') {
        if (this.monthlyObj.taskInfo != '' && this.monthlyObj.comment != '') {

        } else {
          Toast({
            message: '督办事宜或变更理由未填写',
            position: 'middle',
            duration: 1500
          })
          return
        }
        params.changeType = '1'
        params.taskInfo = this.monthlyObj.taskInfo
        params.comment = this.monthlyObj.comment
      } else if (this.monthlyObj.changeType == '工作时限变更') {
        if (this.monthlyObj.comment != '') {

        } else {
          Toast({
            message: '变更理由未填写',
            position: 'middle',
            duration: 1500
          })
          return
        }
        params.changeType = '2'
        params.endDate = this.monthlyObj.endDate
        params.comment = this.monthlyObj.comment
      }
      this.show = true;
      // console.log(this.monthlyObj)
      this.http({
        apiUrl: "/mobile/change.api",
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
        alert(err)
        this.show = false;
        console.log(err)
        // reject(err)
      })
    },


    clickLeft() {
      // this.$router.push('/supervision/monthlyReport')
      window.history.go(-1)
    },
    clickTime() {
      if (this.monthlyObj.changeType == '' || this.monthlyObj.changeType == '工作内容变更') {
        return
      }
      this.timeShow = !this.timeShow;
    },
    // confirmTime(val) {
    //   console.log(val)
    //   this.timeShow = false;
    //   var date = val;
    //   var month = date.getMonth() + 1;
    //   var strDate = date.getDate();
    //   if (month >= 1 && month <= 9) {
    //     month = "0" + month;
    //   }
    //   // if (strDate >= 0 && strDate <= 9) {
    //   // 	strDate = "0" + strDate;
    //   // }
    //   this.currentDate = date.getFullYear() + '' + month
    //   this.$set(this.monthlyObj, 'reportMonth', this.currentDate)
    // },
    confirmTime(val) {
      console.log(val)
      this.timeShow = false;
      var date = val;
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.currentDate = date.getFullYear() + '-' + month + '-' + strDate
      this.$set(this.monthlyObj, 'endDate', this.currentDate)
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
#taskChange .van-cell {
  padding: 10px 15px;
}

#taskChange .van-nav-bar--fixed {
  background: #329afa;
  color: #fff;
}

#taskChange .van-nav-bar__title {
  color: #fff;
}

#taskChange .van-nav-bar .van-icon {
  color: #fff;
}

#taskChange .van-nav-bar__text {
  color: #fff;
}

#taskChange .audit-info {
  padding: 0.625rem 0 0 0.625rem;
  box-sizing: border-box;
  border-bottom: #eff3f5 1px solid;
}
#taskChange .applymsg {
  border-left: #3193f6 0.25rem solid;
  padding-left: 5px;
}
#taskChange .footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  padding: 0 0;
}
#taskChange .applyList > div {
  padding: 0.625rem 0;
  box-sizing: border-box;
  /* height: 3.125rem; */
  line-height: 1.475rem;
}
#taskChange .applyList > div::after {
  display: block;
  content: "";
  clear: both;
}
#taskChange .applyList > div > span {
  color: #444444;
  float: left;
  width: 20%;
  font-size: 0.8rem;
  height: 25px;
  line-height: 25px;
  text-align: justify;
}
#taskChange .applyList > div > span::after {
  display: inline-block;
  content: "";
  width: 100%;
  overflow: hidden;
  height: 0;
}
#taskChange .applyList > div:not(:last-child) {
  border-bottom: #f1f1f3 1px solid;
}
#taskChange .apply-info {
  border-bottom: #fafafa 2px solid;
  box-sizing: border-box;
  padding: 0.625rem 0.625rem;
}
#taskChange .apply-info::after {
  display: block;
  content: "";
  clear: both;
}

/* .footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #f5f6f8;
  padding: 0;
  box-sizing: border-box;
} */

.timepicker {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1000;
}
</style>
