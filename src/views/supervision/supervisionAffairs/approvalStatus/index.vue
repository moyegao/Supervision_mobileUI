<template>
  <div id="approvalStatus">
    <van-nav-bar fixed :border="false" @click-left="clickLeft">
      <van-icon name="arrow-left" slot="left" />
      <div slot="title" v-if="text == '审批' || text =='汇报审批'">
        {{topIconArr[status].text.label}}
      </div>
      <div slot="title" v-else>
        {{text}}
      </div>
    </van-nav-bar>
    <div v-if="text == '审批' || text =='汇报审批'">
      <!-- 回复沟通 -->
      <div class="flex appStatus" v-if="replyShow">
        <div v-for="(item, key) in replyArr" :key="key">
          <div :style="[iconBg,{backgroundPosition:key == status?item.iconBgposition.active:item.iconBgposition.default}]"></div>
          <div class="textStyle" :style="{color:key == status?item.text.active:item.text.default}">{{item.text.label}}</div>
        </div>
      </div>
      <!-- 通过/驳回/转办/沟通 -->
      <div class="flex appStatus" v-else>
        <div v-for="(item, key) in topIconArr" @click="change(key)" :key="key">
          <div :style="[iconBg,{backgroundPosition:key == status?item.iconBgposition.active:item.iconBgposition.default}]"></div>
          <div class="textStyle" :style="{color:key == status?item.text.active:item.text.default}">{{item.text.label}}</div>
        </div>
      </div>
      <!-- 通过 -->
      <div class="taskChange" style="margin-top: 0;">
        <!-- 	<div class="van-cell van-cell--large van-field">
					<div class="van-cell__title van-field__label">
						<span>当前处理人</span>
					</div>
					<div class="van-cell__value" style="padding: 14px;">

					</div>
				</div>
				<div class="van-cell van-cell--large van-field">
					<div class="van-cell__title van-field__label">
						<span>已处理人</span>
					</div>
					<div class="van-cell__value" style="padding: 14px;">

					</div>
				</div> -->

        <!-- 驳回点 -->
        <van-field v-model="approvalObj.subinfoName" label="驳回到" placeholder="选择驳回点" right-icon="arrow" size="large" @click="selectProcess" @click-right-icon="selectProcess" v-if="status == 1" />

        <van-field v-model="approvalObj.zhuanbanName" label="转办人员" placeholder="选择转办人员" right-icon="arrow" size="large" @click="selectSingle" @click-right-icon="selectSingle" v-if="status == 2" />
        <van-field v-model="approvalObj.goutongName" label="沟通人员" placeholder="选择沟通人员" right-icon="arrow" size="large" @click="selectPlus" @click-right-icon="selectPlus" v-if="status == 3" />

        <van-field v-model="approvalObj.comment" class="Handling-opinions" maxlength="500" placeholder="请填写处理意见！" type="textarea" size="large" :autosize="{ maxHeight: 360, minHeight: 360 }" />
      </div>
      <van-popup position="bottom" :style="{ height: '40%' }" v-model="processShow">
        <!-- {{processColumns}} -->
        <van-picker class="timepicker" show-toolbar title="驳回节点" :columns="processColumns" @cancel="onCancel3" @confirm="onConfirm3" />
      </van-popup>

      <!-- 驳回 -->
      <!--  <div class="sBody" v-if="status == 1">
                <div class="handler">
                    <div class="nowHandler">驳回节点</div>
                    <div >NO.3信息中心</div>
					   <div >苏明清/李亮</div>
                    <van-radio-group v-model="radio">
                    <van-cell-group>
                        <van-cell title="单选框 1" clickable @click="radio = '1'">
                            <van-radio name="1" />
                        </van-cell>
                        <van-cell title="单选框 2" clickable @click="radio = '2'">
                            <van-radio name="2" />
                        </van-cell>
                    </van-cell-group>
                    </van-radio-group>
                </div>
                <div class="appContent">
                    <div class="nowHandler">文本回复</div>
                    <van-cell-group>
                        <van-field v-model="value" type="textarea" :border="false" :autosize="{ maxHeight: 100, minHeight: 50 }" placeholder="请填写处理意见" />
                    </van-cell-group>
                </div>
               <div style="width: 100%;height:auto;position: relative;padding-right: 15px;box-sizing:border-box">
                    <form id="upBox">
                        <div id="inputBox">
                            <input type="file" title="请选择图片" name="files" multiple accept="image/png,image/jpg,image/gif,image/JPEG" ref="rImg" @change="changeImg($event)"/>
                        </div>
                        <div id="imgBox">
                            <div class="imgContainer" v-for="(item, index) in rejectPicture.imgSrc" :key="index" >
                                <img :src="item" alt="" v-image-preview>
                                <van-icon name="close" @click="removeImg(index,'rejectPicture')"/>
                            </div>
                        </div>
                    </form >
                </div>
            </div> -->
      <!-- 废弃 -->
      <!--       <div class="sBody" v-if="status == 2">
                <div class="handler">
                    <div class="nowHandler">当前处理人</div>
                    <div >NO.3信息中心</div>
                    <div >苏明清/李亮</div>
                </div>
                <div class="appContent">
                    <div class="nowHandler">文本回复</div>
                    <van-cell-group>
                        <van-field v-model="value" type="textarea" :border="false" :autosize="{ maxHeight: 100, minHeight: 50 }" placeholder="请填写处理意见" />
                    </van-cell-group>
                </div>
                <div style="width: 100%;height:auto;position: relative;padding-right: 15px;box-sizing:border-box">
                    <form id="upBox">
                        <div id="inputBox">
                            <input type="file" title="请选择图片" name="files" multiple accept="image/png,image/jpg,image/gif,image/JPEG" ref="aImg" @change="changeImg"/>
                        </div>
                        <div id="imgBox">
                            <div class="imgContainer" v-for="(item, index) in abandonPicture.imgSrc" :key="index" >
                                <img :src="item" alt="" v-image-preview>
                                <van-icon name="close" @click="removeImg(index,'abandonPicture')"/>
                            </div>
                        </div>
                    </form >
                </div>
            </div> -->
    </div>

    <!-- <div v-if="text == '汇报审批'">

		</div> -->

    <div v-if="text == '任务确认'" class="taskChange">
      <van-field v-if="$route.query.taskType == '水板块'" clearable v-model="taskConfirmObj.responsibleDeptNames" label="责任部门" readonly placeholder="请选择责任部门" right-icon="arrow" size="large" @click="selectResponsibleDept" @click-right-icon="selectResponsibleDept" />
      <van-field v-if="$route.query.taskType == '水板块'" v-model="taskConfirmObj.responsibleUserNames" label="责任人" readonly placeholder="请选择责任人" right-icon="arrow" size="large" @click="selectResponsibleUser" @click-right-icon="selectResponsibleUser" />
      <van-field v-model="taskConfirmObj.sponsorUserName" label="主办人" readonly placeholder="请选择主办人" right-icon="arrow" size="large" @click="selectSponsor" @click-right-icon="selectSponsor" />
      <van-field v-if="$route.query.taskType == '水板块'" v-model="taskConfirmObj.leaderUserNames" label="分管领导" readonly placeholder="请选择分管领导" right-icon="arrow" size="large" @click="selectLeaderUser" @click-right-icon="selectLeaderUser" />
      <van-field v-if="$route.query.taskType == '水板块'" clearable v-model="taskConfirmObj.assistDeptNames" label="协办部门" readonly placeholder="请选择协办部门" right-icon="arrow" size="large" @click="selectAssistDept" @click-right-icon="selectAssistDept" />
      <van-field v-if="$route.query.taskType == '水板块'" clearable v-model="taskConfirmObj.assistUserNames" label="协办人" readonly placeholder="请选择协办人" right-icon="arrow" size="large" @click="selectAssistUser" @click-right-icon="selectAssistUser" />
      <van-field v-model="taskConfirmObj.planDesc" label="任务计划" placeholder="输入内容" type="textarea" size="large" :autosize="{ maxHeight: 100, minHeight: 50 }" />
      <van-field v-model="taskConfirmObj.comment" maxlength="500" label="处理意见" placeholder="输入内容" type="textarea" size="large" :autosize="{ maxHeight: 100, minHeight: 50 }" />
    </div>
    <!-- 主办人选择弹出框 -->
    <van-popup position="bottom" :style="{ height: '40%' }" v-model="sponsorShow">
      <van-picker class="timepicker" show-toolbar title="主办人" :columns="sponsorColumns" @cancel="onCancel2" @confirm="onConfirm2" />
    </van-popup>
    <van-popup position="bottom" :style="{ height: '40%' }" v-model="selectResponsibleShow">
      <van-picker class="timepicker" show-toolbar title="责任部门" :columns="responsibleDeptColumns" @cancel="onCancelDeptId" @confirm="onConfirmDeptId" />
    </van-popup>
    <van-popup position="bottom" :style="{ height: '40%' }" v-model="selectResponsibleUserShow">
      <van-picker class="timepicker" show-toolbar title="责任人" :columns="responsibleUserColumns" @cancel="onCancelUserId" @confirm="onConfirmUserId" />
    </van-popup>
    <van-popup position="bottom" :style="{ height: '40%' }" v-model="selectLeaderUserShow">
      <van-picker class="timepicker" show-toolbar title="分管领导" :columns="leaderUserColumns" @cancel="onCancelLeaderUser" @confirm="onConfirmLeaderUser" />
    </van-popup>
    <!-- 协办部门 -->
    <van-popup position="bottom" class="assistDept_popup" :style="{ height: '40%' }" v-model="assistDeptShow">
      <div style="width:100%;">
        <van-button class="btn_popup" type="primary" @click="onCancelAssistDept">取消</van-button>
        <van-button class="btn_popup" type="info" @click="onConfirmAssistDept" style="float: right">确定</van-button>
      </div>
      <van-checkbox-group v-model="assistDeptData">
        <van-checkbox :name="item.id" v-for="item in responsibleDeptOption" :key="item.id">{{item.name}}</van-checkbox>
      </van-checkbox-group>
    </van-popup>
    <!-- 协办人 -->
    <van-popup position="bottom" class="assistDept_popup" :style="{ height: '40%' }" v-model="assistUserShow">
      <div style="width:100%;">
        <van-button class="btn_popup" type="primary" @click="onCancelAssistUser">取消</van-button>
        <van-button class="btn_popup" type="info" @click="onConfirmAssistUser" style="float: right">确定</van-button>
      </div>
      <van-checkbox-group v-model="assistUserData">
        <van-checkbox :name="item.id" v-for="item in assistUserOption" :key="item.id">{{item.name}}</van-checkbox>
      </van-checkbox-group>
    </van-popup>

    <div v-if="text == '任务汇报'" class="taskChange">
      <van-field v-model="taskReportObj.taskNum" disabled label="任务编号" placeholder="输入编号" size="large" />
      <van-field v-model="taskReportObj.taskName" disabled label="任务名称" placeholder="输入名称" size="large" />
      <van-field v-model="taskReportObj.reportMonth" label="汇报年月" placeholder="选择年月" right-icon="clock-o" size="large" @click="clickTime1" @click-right-icon="clickTime1" readonly />
      <van-field v-model="taskReportObj.progressStateName" label="进度状态" placeholder="选择进度" right-icon="arrow" size="large" @click="clickProgress" @click-right-icon="clickProgress" readonly />

      <div class="van-cell van-cell--large van-field">
        <div class="van-cell__title van-field__label">
          <span>进度比例</span>
        </div>
        <div class="van-cell__value" style="padding: 14px;">
          <!-- <van-slider v-model="taskReportObj.progressRadio" active-color="#1989fa">
            <div slot="button" class="custom-button" style="background: #1989fa;padding: 0 3px;border-radius: 50%;color: #fff;">
              {{ taskReportObj.progressRadio }}
            </div>
          </van-slider> -->
          <input v-model="taskReportObj.progressRadio" />
        </div>
      </div>
      <van-field v-model="taskReportObj.reportInfo" label="汇报内容" placeholder="输入内容" type="textarea" size="large" :autosize="{ maxHeight: 100, minHeight: 50 }" />
    </div>
    <!-- 进度状态弹出框 -->
    <van-popup position="bottom" :style="{ height: '40%' }" v-model="seletShow">
      <van-picker class="timepicker" show-toolbar title="任务进度" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>

    <div v-if="text == '任务变更'" class="taskChange">
      <van-cell-group>
        <!-- <div class="audit-info">
          <div class="applymsg">任务信息</div>
          <div class="applyList">
            <div><span>督办名称：</span>{{taskChangeData.taskName}}</div>
            <div><span>责任部门：</span>{{taskChangeData.responsibleDeptNames}}</div>
            <div><span>责任人：</span> {{taskChangeData.responsibleUserNames}}</div>
            <div><span>分管领导：</span> {{taskChangeData.leaderUserNames}}</div>
            <div><span>结束时间：</span>{{taskChangeData.endDate}}</div>
          </div>
        </div> -->
        <van-field v-model="taskChangeObj.changeName" readonly label="变更类型" placeholder="请选择变更类型" right-icon="arrow" size="large" @click="changeSelectType" @click-right-icon="changeSelectType" />
        <van-field v-model="taskChangeObj.endDate" readonly :disabled="!(taskChangeObj.changeName == '工作时限变更')" label="结束时间" placeholder="选择日期" right-icon="clock-o" size="large" @click="clickTime" @click-right-icon="clickTime" />
        <van-field v-model="taskChangeObj.taskInfo" :disabled="!(taskChangeObj.changeName == '工作内容变更')" label="督办事宜" placeholder="输入督办事宜" type="textarea" size="large" :autosize="{ maxHeight: 80, minHeight: 80 }" />
        <van-field v-model="taskChangeObj.comment" label="变更理由" placeholder="输入变更理由" type="textarea" size="large" :autosize="{ maxHeight: 80, minHeight: 80 }" />
      </van-cell-group>
      <!-- 上传图片 -->
      <!--      <div style="width: 100%;height:auto;position: relative;padding-right: 15px;box-sizing:border-box">
                <form id="upBox">
                    <div id="inputBox">
                        <input type="file" title="请选择图片" name="files" multiple accept="image/png,image/jpg,image/gif,image/JPEG" ref="pImg" @change="changeImg"/>
                    </div>
                    <div id="imgBox">
                        <div class="imgContainer" v-for="(item, index) in passPicture.imgSrc" :key="index" >
                            <img :src="item" alt="" v-image-preview>
                            <van-icon name="close" @click="removeImg(index,'passPicture')"/>
                        </div>
                    </div>
                </form >
            </div> -->
      <!-- 变更类型弹出框 -->
      <van-popup position="bottom" :style="{ height: '40%' }" v-model="pickerShow">
        <van-picker show-toolbar title="变更类型" :columns="columnsData" @cancel="onCancel1" @confirm="onConfirm1" />
      </van-popup>
      <!-- 汇报时间弹出框 -->
      <van-popup position="bottom" :style="{ height: '40%' }" v-model="reportTimeShow">
        <van-datetime-picker class="timepicker" v-model="currentDate1" :formatter="formatter1" type="year-month" @confirm="onConfirmTime" @cancel="cancelTime" @change="changeTime" />
      </van-popup>
      <!-- 结束时间弹出框	 -->
      <van-popup position="bottom" :style="{ height: '40%' }" v-model="timeShow">
        <van-datetime-picker class="timepicker" v-model="currentDate" :formatter="formatter" type="date" @confirm="confirmTime" @cancel="cancelTime" @change="changeTime" />
      </van-popup>

    </div>

    <div v-if="text == '任务结项'" class="taskChange">
      <van-field v-model="taskJieXiangObj.comment" label="审批意见" placeholder="审批意见" type="textarea" size="large" :autosize="{ maxHeight: 100, minHeight: 200 }" />
    </div>

    <footer class="sFooter">
      <van-button square size="large" @click="cencelData">取消</van-button>
      <van-button square size="large" type="info" @click="submitData">确定</van-button>
    </footer>
    <van-popup v-model="show">
      <van-loading type="spinner" color="#1989fa" />
    </van-popup>
  </div>
</template>
<script>
import {
  Toast
} from 'vant';
function selector(obj, typeNum, typeCheck, cb) {
  $(obj).staffSelector({
    data: $(obj).data("code"),
    type: typeNum,
    checkType: typeCheck,
    commit: cb
  });
}
export default {
  name: 'approvalStatus', //审批
  components: {},
  data() {

    return {
      // 回复沟通图片显示
      replyShow: false,
      assistDeptData: [],
      assistUserData: [],
      show: false,
      processShow: false,
      processData: [],
      processColumns: [],
      sponsorShow: false,
      selectResponsibleShow: false,
      selectResponsibleUserShow: false,
      selectLeaderUserShow: false,
      assistDeptShow: false,
      assistUserShow: false,
      sponsorColumns: [],
      sponsorOption: [],
      responsibleDeptOption: [],
      responsibleUserOption: [],
      leaderUserOption: [],
      responsibleDeptColumns: [],
      responsibleUserColumns: [],
      leaderUserColumns: [],
      assistUserOption: [],
      timeShow: false,
      reportTimeShow: false,
      currentDate1: '',
      currentDate: new Date(),
      optionData: [],
      columns: [],
      iconBg: {
        background: "url(" + require('../../../../assets/image/auditFlow2.png') + ") no-repeat",
        height: '2rem',
        width: '2rem',
        backgroundSize: "170px 65px",
        display: "inline-block"
      },
      topIconArr: [{
        iconBgposition: {
          default: "2px 2px",
          active: "2px -33px"
        },
        text: {
          label: "通过",
          default: "#A0A0A0",
          active: '#5CE6D1'
        }
      },
      {
        iconBgposition: {
          default: "-34px 2px",
          active: "-34px -33px"
        },
        text: {
          label: "驳回",
          default: "#A0A0A0",
          active: '#FAAD55'
        }
      },
      {
        iconBgposition: {
          default: "-68px 2px",
          active: "-68px -33px"
        },
        text: {
          label: "转办",
          default: "#A0A0A0",
          active: '#31B4F5'
        }
      },
      {
        iconBgposition: {
          default: "-103px 2px",
          active: "-103px -33px"
        },
        text: {
          label: "沟通",
          default: "#A0A0A0",
          active: '#8A8AFF'
        }
      }
      ],
      replyArr: [
        {
          iconBgposition: {
            default: "-103px 2px",
            active: "-103px -33px"
          },
          text: {
            label: "回复沟通",
            default: "#A0A0A0",
            active: '#8A8AFF'
          }
        }
      ],


      seletShow: false,
      status: 0, //头部标题文字
      value: '',
      radio: '1',
      imgUrl: [ //图片未激活时状态
        {
          url: require('../../../../assets/image/pass.png'),
          textColor: '#A0A0A0'
        },
        {
          url: require('../../../../assets/image/reject.png'),
          textColor: '#A0A0A0'
        },
        {
          url: require('../../../../assets/image/abandon.png'),
          textColor: '#A0A0A0'
        }
      ],
      imgUrlActive: [ //图片激活时状态
        {
          url: require('../../../../assets/image/passActive.png'),
          textColor: '#5CE6D1'
        },
        {
          url: require('../../../../assets/image/rejectActive.png'),
          textColor: '#FAAD53'
        },
        {
          url: require('../../../../assets/image/abandonActive.png'),
          textColor: '#FA6465'
        }
      ],
      passImg: {
        url: require('../../../../assets/image/passActive.png'),
        textColor: '#5CE6D1'
      }, //通过激活状态
      rejectImg: {
        url: require('../../../../assets/image/reject.png'),
        textColor: '#A0A0A0'
      }, //驳回激活状态
      abandonImg: {
        url: require('../../../../assets/image/abandon.png'),
        textColor: '#A0A0A0'
      }, //废弃激活状态
      passImgCount: 0, //通过上传图片总数量
      rejectImgCount: 0, //驳回上传图片总数量
      abandonImgCount: 0, //废弃上传图片总数量
      passPicture: { //通过图片信息
        fileList: new Array(),
        imgName: new Array(),
        imgSrc: new Array(),
        imgFile: new Array(),
      },
      rejectPicture: { //驳回图片信息
        fileList: new Array(),
        imgName: new Array(),
        imgSrc: new Array(),
        imgFile: new Array(),
      },
      abandonPicture: { //废弃图片信息
        fileList: new Array(),
        imgName: new Array(),
        imgSrc: new Array(),
        imgFile: new Array(),
      },
      approvalObj: { //审批数据
        businessKey: this.$route.query.id, //主键
        approvalTaskId: this.$route.query.taskId, //审批任务ID
        procInstId: this.$route.query.processId, //流程实例ID
        comment: "", //审批意见
        subInfo: "", //驳回的节点信息(如果是驳回则必需)
        subinfoName: "",
        zhuanbanName: "",//转办人员名字
        goutongName: "",//沟通人员名字
        subuser: "",//沟通或者转办人id
        operationType: "32", //操作类型( 32 通过   1 驳回)
        form: { endDate: this.$route.query.endDate }
      },
      reportApprovalObj: { //汇报审批数据

      },
      taskReportObj: { //任务汇报数据
        id: this.$route.query.formId, //汇报任务ID
        taskId: this.$route.query.id, //任务主键
        approvalTaskId: this.$route.query.taskId, //审批任务ID
        taskNum: this.$route.query.taskNum, //任务编号
        taskName: this.$route.query.title, //任务名称
        reportMonth: new Date(),
        progressRadio: 0,
        progressState: "",
        progressStateName: "",
        reportInfo: "",
      },
      taskConfirmObj: { //任务确认数据
        approvalTaskId: this.$route.query.taskId, //审批任务ID
        procInstId: this.$route.query.processId, //流程实例ID
        id: this.$route.query.formId, //汇报任务ID
        comment: "同意接收", //意见
        sponsorUserId: "", //主办人ID
        sponsorUserName: "", //主办人NAME
        planDesc: this.$route.query.planDesc, //任务计划
        // 责任部门
        responsibleDeptIds: '',
        responsibleDeptNames: '',
        // 责任人
        responsibleUserIds: '',
        responsibleUserNames: '',
        // 分管领导
        leaderUserIds: '',
        leaderUserNames: '',
        // 协办部门
        assistDeptIds: '',
        assistDeptNames: '',
        // 协办人
        assistUserIds: '',
        assistUserNames: '',

      },
      taskChangeObj: { //任务变更的数据
        taskId: this.$route.query.id,
        approvalTaskId: this.$route.query.taskId,
        endDate: this.$route.query.changeEndDate,
        changeName: "",
        taskInfo: this.$route.query.taskDesc,
        comment: '',
        id: this.$route.query.formId,
      },
      taskJieXiangObj: { //任务结项数据
        id: this.$route.query.formId, //汇报任务ID
        approvalTaskId: this.$route.query.taskId, //审批任务ID
        comment: ""
      },
      columnsData: ['工作内容变更', '工作时限变更'],
      pickerShow: false, //显示选择组件
      queryData: this.$route.query, //上级组件路由数据

      taskChangeData: [],// 任务变更展示信息

    }
  },
  created() {
    console.log(this.$route.query)
    if (this.$route.query.text == "任务汇报")
      this.getOptions()
    if (this.$route.query.text == "任务确认")
      if (this.$route.query.taskType == '水板块') {
        // 水板块下拉框数据
        // 责任部门数据
        this.listResponsibleDeptIds();
        // 分管领导数据
        this.listLeaderUser()
      } else {
        this.listSysUserByDeptId()
      }
    if (this.$route.query.text == '审批' || this.$route.query.text == '汇报审批') {
      this.getNodeInfo()
      this.getApprovalReply()
    }
    if (this.$route.query.text == '任务变更') {
      this.getTaskInfo()
    }




  },
  computed: {
    text() {
      return this.$route.query.text;
    }
  },
  methods: {
    // 获取该审批是否是回复沟通数据
    getApprovalReply(){
      let taskId = this.$route.query.taskId;
      this.http({
        apiUrl: "/mobile/operation.api",
        method: "get",
        params: { taskId: taskId },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        this.replyShow = res.data
        if (this.replyShow) {
          this.approvalObj.operationType = '64'
        }
      }, err => {
        console.log(err)
      })
    },
    getValue(val) {
      console.log(val)
    },
    // 组织树选择人员
    // approvalObj
    // zhuanbanName:"",//转办人员名字
    // goutongName:"",//沟通人员名字
    // 选择转办人员
    selectSingle() {
      let result;
      let that = this;
      // name: 用户姓名
      // avatarUrl:用户图像地址
      // openId: 用户Id
      // XuntongJSBridge.call("selectPic", { 'isMulti': false }, function (result) {
      XuntongJSBridge.call("selectPersons", { 'isMulti': false }, (result) => {
        // alert('调取成功')
        // result = toJson(result);
        // alert(result)
        if (result.success) {
          // alert('success')
          let seleced = result.data.persons;
          let name = [];
          let id = [];
          for (let i in seleced) {
            name.push(seleced[i].name);
            id.push(seleced[i].openId);
          }
          that.approvalObj.zhuanbanName = name.join(',');
          that.approvalObj.subuser = id.join(',');
          that.approvalObj.operationType = '2'
        } else {
          // alert('error')
          toast(result.error);
        }
      });

      // let Input = $("<input/>")[0];
      // selector(Input, 1, 'single',this.getValue);
    },
    // 选择沟通人员
    selectPlus() {
      let result;
      let that = this;
      XuntongJSBridge.call("selectPersons", { 'isMulti': true }, (result) => {
        // result = toJson(result);
        if (result.success) {
          let seleced = result.data.persons;
          let name = [];
          let id = [];
          for (let i in seleced) {
            name.push(seleced[i].name);
            id.push(seleced[i].openId);
          }
          that.approvalObj.goutongName = name.join(',');
          that.approvalObj.subuser = id.join(',');
          that.approvalObj.operationType = '4'
        } else {
          toast(result.error);
        }
      });
      //   let Input = $("<input/>")[0];
      // selector(Input, 1, 'check',this.getValue);
      // selector(this, 1, 'check')
    },
    // 获取任务信息
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
        console.log(this.taskChangeData);
      }, err => {
        console.log(err)
        // reject(err)
      })
    },


    // 获取驳回审批节点数据
    getNodeInfo() {
      this.http({
        apiUrl: "/mobile/nodeInfo.api",
        method: "get",
        params: {
          processId: this.$route.query.processId
        },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res)
        this.processData = res.data;
        this.processColumns = this.processData.map(item => item.taskName)
        console.log(this.processColumns)
      }, err => {
        console.log(err)
        // reject(err)
      })
    },

    // 获取任务进度状态数组
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
    listSysUserByDeptId() {
      this.http({
        apiUrl: "/mobile/listSysUserByDeptIds.api",
        method: "get",
        params: {
          deptId: this.$route.query.deptId
        },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res)
        this.sponsorOption = [];
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].items.length; j++) {
            this.sponsorOption.push(res.data[i].items[j])

          }

        }
        this.sponsorColumns = this.sponsorOption.map(item => item.name)
      }, err => {
        console.log(err)
        // reject(err)
      })
    },
    // 责任部门数据
    listResponsibleDeptIds() {
      console.log(this.$route.query);
      this.http({
        apiUrl: "/mobile/listDept.api",
        method: "get",
        params: {
          regId: this.$route.query.regId
        },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res)
        this.responsibleDeptOption = [];
        for (let i = 0; i < res.data.length; i++) {
          this.responsibleDeptOption.push(res.data[i])

        }
        this.responsibleDeptColumns = this.responsibleDeptOption.map(item => item.name)
      }, err => {
        console.log(err)
        // reject(err)
      })
    },
    // 责任人和主办人数据（水板块）
    listResponsibleUserIds() {
      console.log(this.$route.query);
      this.http({
        apiUrl: "/mobile/listSysUserByDeptIds.api",
        method: "get",
        params: {
          deptId: this.taskConfirmObj.responsibleDeptIds
        },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res)
        this.responsibleUserOption = [];
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].items.length; j++) {
            this.responsibleUserOption.push(res.data[i].items[j])
            this.sponsorOption.push(res.data[i].items[j])
          }

        }
        // 责任人弹出框数据
        this.responsibleUserColumns = this.responsibleUserOption.map(item => item.name)
        // 主办人弹出框数据
        this.sponsorColumns = this.responsibleUserOption.map(item => item.name)
      }, err => {
        console.log(err)
        // reject(err)
      })
    },
    // 分管领导数据
    listLeaderUser() {
      console.log(this.$route.query);
      this.http({
        apiUrl: "/mobile/listSysUserByRole.api",
        method: "get",
        params: {
          regId: this.$route.query.regId,
          roleKey: 'leadleader'
        },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res)
        this.leaderUserOption = [];
        for (let i = 0; i < res.data.length; i++) {
          this.leaderUserOption.push(res.data[i])

        }
        this.leaderUserColumns = this.leaderUserOption.map(item => item.name)
      }, err => {
        console.log(err)
        // reject(err)
      })
    },
    // 协办人数据（水板块）
    listAssistUserIds() {
      this.http({
        apiUrl: "/mobile/listSysUserByDeptIds.api",
        method: "get",
        params: {
          deptId: this.taskConfirmObj.assistDeptIds
        },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        console.log(res)
        this.assistUserOption = [];
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].items.length; j++) {
            this.assistUserOption.push(res.data[i].items[j])
          }

        }
        // 责任人弹出框数据
        this.responsibleUserColumns = this.assistUserOption.map(item => item.name)
      }, err => {
        console.log(err)
        // reject(err)
      })
    },
    selectProcess() {
      this.processShow = true;
    },
    onConfirm3(value, index) {
      console.log(this.processData);
      let selectedItem = this.processData.filter(item => item.taskName == value)
      this.$set(this.approvalObj, 'subInfo', selectedItem[0].taskKey)
      this.$set(this.approvalObj, 'subinfoName', selectedItem[0].taskName)
      console.log(this.approvalObj)
      this.processShow = false;

    },
    onCancel3() {
      this.processShow = false;
    },

    selectSponsor() {
      this.sponsorShow = true;
    },
    selectResponsibleDept() {
      this.selectResponsibleShow = true;
    },
    selectAssistDept() {
      this.assistDeptShow = true;
    },
    selectResponsibleUser() {
      this.selectResponsibleUserShow = true;
    },
    selectAssistUser() {
      this.assistUserShow = true;
    },
    selectLeaderUser() {
      this.selectLeaderUserShow = true;
    },
    onConfirm2(value, index) {

      let selectedItem = this.sponsorOption.filter(item => item.name == value)
      console.log(selectedItem);
      this.$set(this.taskConfirmObj, 'sponsorUserId', selectedItem[0].id)
      this.$set(this.taskConfirmObj, 'sponsorUserName', selectedItem[0].name)
      this.sponsorShow = false;
      console.log(this.taskConfirmObj)
    },
    // 责任部门弹出框确定按钮
    onConfirmDeptId(value, index) {
      let selectedItem = this.responsibleDeptOption.filter(item => item.name == value)
      console.log(selectedItem);
      this.taskConfirmObj.responsibleDeptIds = selectedItem[0].id;
      this.taskConfirmObj.responsibleDeptNames = selectedItem[0].name;
      this.selectResponsibleShow = false;
      // 确定后获取责任人数据
      this.listResponsibleUserIds()
      // 责任人数据置空
      this.taskConfirmObj.responsibleUserNames = ''
      this.taskConfirmObj.responsibleUserIds = ''
      console.log(this.taskConfirmObj)
    },
    // 责任人弹出框确定按钮
    onConfirmUserId(value, index) {
      let selectedItem = this.responsibleUserOption.filter(item => item.name == value)
      console.log(selectedItem);
      // this.$set(this.taskConfirmObj, 'sponsorUserId', selectedItem[0].id)
      // this.$set(this.taskConfirmObj, 'sponsorUserName', selectedItem[0].name)
      this.taskConfirmObj.responsibleUserIds = selectedItem[0].id;
      this.taskConfirmObj.responsibleUserNames = selectedItem[0].name;
      this.selectResponsibleUserShow = false;
      console.log(this.taskConfirmObj)
    },
    // 分管领导弹出框确定按钮
    onConfirmLeaderUser(value, index) {
      let selectedItem = this.leaderUserOption.filter(item => item.name == value)
      console.log(selectedItem);
      this.taskConfirmObj.leaderUserIds = selectedItem[0].id;
      this.taskConfirmObj.leaderUserNames = selectedItem[0].name;
      this.selectLeaderUserShow = false;
      console.log(this.taskConfirmObj)
    },
    // 协办部门弹出框确定按钮
    onConfirmAssistDept() {
      let arr = []
      this.taskConfirmObj.assistDeptIds = '';
      this.taskConfirmObj.assistDeptNames = '';
      for (let i = 0; i < this.responsibleDeptOption.length; i++) {
        for (let j = 0; j < this.assistDeptData.length; j++) {
          if (this.assistDeptData[j] == this.responsibleDeptOption[i].id) {
            arr.push(this.responsibleDeptOption[i].name)
          }
        }

      }
      this.taskConfirmObj.assistDeptIds = this.assistDeptData.join(',')
      this.taskConfirmObj.assistDeptNames = arr.join(',')
      this.assistDeptShow = false;
      //获取协办人数据
      this.listAssistUserIds();
    },
    // 协办人弹出框确定按钮
    onConfirmAssistUser() {
      let arr = []
      this.taskConfirmObj.assistUserIds = '';
      this.taskConfirmObj.assistUserNames = '';
      for (let i = 0; i < this.assistUserOption.length; i++) {
        for (let j = 0; j < this.assistUserData.length; j++) {
          if (this.assistUserData[j] == this.assistUserOption[i].id) {
            arr.push(this.assistUserOption[i].name)
          }
        }

      }
      this.taskConfirmObj.assistUserIds = this.assistUserData.join(',')
      this.taskConfirmObj.assistUserNames = arr.join(',')
      this.assistUserShow = false;
    },
    onCancel2() {
      this.sponsorShow = false;
    },
    onCancelDeptId() {
      this.selectResponsibleShow = false;
    },
    onCancelUserId() {
      this.selectResponsibleUserShow = false;
    },
    onCancelLeaderUser() {
      this.selectLeaderUserShow = false;
    },
    onCancelAssistDept() {
      console.log(this.assistDeptData);
      console.log(this.responsibleDeptOption);
      this.assistDeptShow = false;
    },
    onCancelAssistUser() {
      console.log(this.assistDeptData);
      console.log(this.responsibleDeptOption);
      this.assistUserShow = false;
    },
    // 任务进度下拉框弹出事件
    clickProgress() {
      this.seletShow = !this.seletShow
    },
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.seletShow = false;
      let selectedItem = this.optionData.filter(item => item.label == value)
      this.$set(this.taskReportObj, 'progressState', selectedItem[0].value)
      this.$set(this.taskReportObj, 'progressStateName', selectedItem[0].label)
      console.log(selectedItem)
    },
    onCancel() {
      console.log('取消');
      this.seletShow = false;
    },

    // 结束时间弹出事件
    clickTime() {
      if (this.taskChangeObj.changeName != '工作时限变更')
        return
      this.timeShow = !this.timeShow;
    },
    // 任务汇报-汇报时间弹出事件
    clickTime1() {
      this.reportTimeShow = !this.reportTimeShow;
      console.log(this.reportTimeShow);
    },
    onConfirmTime(val) {
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
      this.currentDate1 = date.getFullYear() + '' + month
      this.$set(this.taskReportObj, 'reportMonth', this.currentDate1)
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
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.currentDate = date.getFullYear() + '-' + month + '-' + strDate
      this.$set(this.taskChangeObj, 'endDate', this.currentDate)
    },
    cancelTime() {
      this.timeShow = false;
    },
    changeTime(e) {
      console.log(e)
    },
    formatter1(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
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

    // 返回事件
    clickLeft() {
      console.log(this.$route.query)
      this.$router.push({
        path: '/supervision/commission/detail',
        query: this.$route.query
      })
    },
    changeSelectType() { //选择变更类型
      this.pickerShow = true;
    },
    onConfirm1(value, index) {
      console.log(value, index)
      this.taskChangeObj.changeName = value;
      this.taskChangeObj.changeType = index + 1;
      this.pickerShow = false;
    },
    onCancel1(value, index) {
      console.log(value, index)
      this.pickerShow = false;
    },
    change(num) {
      console.log(num);
      // console.log(num)
      this.status = num;
      // this.approvalObj.operationType = this.status == 1 ? "32" : (this.status == 2 ? "2" : (this.status == 3 ? "4" : (this.status == 0 ? "1" : null)))
      if (num == 0) {
        this.approvalObj.operationType = '32'
      } else if (num == 1) {
        this.approvalObj.operationType = '1'
      } else if (num == 2) {
        this.approvalObj.operationType = '2'
      } else if (num == 3) {
        this.approvalObj.operationType = '4'
      }
      console.log(this.approvalObj.operationType);
      if (num == 0) {
        this.passImg = {
          url: this.imgUrlActive[0].url,
          textColor: this.imgUrlActive[0].textColor
        }
        this.rejectImg = {
          url: this.imgUrl[1].url,
          textColor: this.imgUrl[1].textColor
        }
        this.abandonImg = {
          url: this.imgUrl[2].url,
          textColor: this.imgUrl[2].textColor
        }
      } else if (num == 1) {
        this.passImg = {
          url: this.imgUrl[0].url,
          textColor: this.imgUrl[0].textColor
        }
        this.rejectImg = {
          url: this.imgUrlActive[1].url,
          textColor: this.imgUrlActive[1].textColor
        }
        this.abandonImg = {
          url: this.imgUrl[2].url,
          textColor: this.imgUrl[2].textColor
        }
      } else {
        this.passImg = {
          url: this.imgUrl[0].url,
          textColor: this.imgUrl[0].textColor
        }
        this.rejectImg = {
          url: this.imgUrl[1].url,
          textColor: this.imgUrl[1].textColor
        }
        this.abandonImg = {
          url: this.imgUrlActive[2].url,
          textColor: this.imgUrlActive[2].textColor
        }
      }
    },
    changeImg(e) { //获取图片的名称，路径，文件数组
      if (this.status == 0) { //通过
        this.getImgInfo(this.passPicture, 'pImg', this.passImgCount, 'passImgCount')
      } else if (this.status == 1) { //驳回
        this.getImgInfo(this.rejectPicture, 'rImg', this.rejectImgCount, 'rejectImgCount')
      } else { //废弃
        this.getImgInfo(this.abandonPicture, 'aImg', this.abandonImgCount, 'abandonImgCount')
      }
    },
    getImgInfo(picture, ref, count, el) {
      var f = picture;
      var fileImg = this.$refs[ref];
      var fileList = fileImg.files;
      var oldImgCount = count;
      if (oldImgCount < 3) {
        oldImgCount = fileList.length + oldImgCount;
        this.$set(this, el, oldImgCount)
      } else {
        Toast({
          message: "最多上传三张图片",
          position: 'middle',
          duration: 2000
        })
        return false;
      }
      for (var i = 0; i < fileList.length; i++) {
        var size = Math.floor(fileList[i].size);
        if (size > 3 * 1024 * 1024) { //判断图片大小，超出3M不能上传
          Toast({
            message: '请选择3M以内的图片',
            position: 'middle',
            duration: 1000
          })
          return false;
        }
        var imgSrcI = this.getObjectURL(fileList[i]);
        f.imgName.push(fileList[i].name); //图片名称
        f.imgSrc.push(imgSrcI); //图片路径
        f.imgFile.push(fileList[i]); //图片文件数组
      }
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    removeImg(i, val) { //删除图片
      if (val == 'passPicture') {
        var fImg = this.passPicture;
        this.passImgCount--;
      } else if (val == 'rejectPicture') {
        var fImg = this.rejectPicture;
        this.rejectImgCount--;
      } else {
        var fImg = this.abandonPicture;
        this.abandonImgCount--;
      }
      fImg.imgName.splice(i, 1)
      fImg.imgSrc.splice(i, 1)
      fImg.imgFile.splice(i, 1)
    },
    getMsg(url) {
      var fd = new FormData();
      var f = this.picture.imgFile
      f.map(item => {
        fd.append('picFiles', item)
      })
      // this.deviceName=this.$refs.deviceWork.search_value;
      // this.deviceCord=this.$refs.deviceCord.search_value;
      // this.description=this.$refs.description.value;
      // this.corpCode=this.zhuzhi.parentCode;
      // this.gridCode=this.zhuzhi.code;
      // if(this.description==''||this.corpCode==''||this.gridCode==""){
      //     Toast({
      //         message:'请完善信息',
      //         position:'middle',
      //         duration:1000
      //     })
      //     return false;
      // }
      // fd.append('corpCode', this.corpCode)
      // fd.append('gridCode',this.gridCode)
      // fd.append('deviceName', this.deviceName)
      // fd.append('deviceCord', this.deviceCord)
      // fd.append('description', this.description)
      // this.submitImg(url,fd);
    },
    submitData() { //数据提交
      console.log(this.$route.query)
      let configObj = {
        "审批": {
          url: '/mobile/approval.api',
          key: 'approvalObj'
        },
        "汇报审批": {
          url: '/mobile/approval.api',
          key: 'approvalObj'
        },
        "任务确认": {
          url: '/mobile/doConfirm.api',
          key: 'taskConfirmObj'
        },
        "任务汇报": {
          url: '/mobile/report.api',
          key: 'taskReportObj'
        },
        "任务变更": {
          url: '/mobile/change.api',
          key: 'taskChangeObj'
        },
        "任务结项": {
          url: '/mobile/banjie.api',
          key: 'taskJieXiangObj'
        },
      }
      let url = configObj[this.text].url;
      let params = JSON.parse(JSON.stringify(this[configObj[this.text].key]))

      //格式化时间参数传入格式
      // if(params.hasOwnProperty("endDate")){
      // 	window.a = params
      // 	params.endDate = params.endDate.split("-").join("")
      // }
      // if(this.text === "任务变更"){
      // 	for(let i in this.columnsData){
      // 		console.log(i)
      // 		if(this.columnsData[i] === params.changeName){
      // 			params.changeName =i;
      // 		}
      // 	}
      // }
      //   sponsorUserId: "", //主办人ID
      //   sponsorUserName: "", //主办人NAME
      //   planDesc: this.$route.query.planDesc, //任务计划
      //   // 责任部门
      //   responsibleDeptIds: '',
      //   responsibleDeptNames: '',
      //   // 责任人
      //   responsibleUserIds: '',
      //   responsibleUserNames: '',
      //   // 分管领导
      //   leaderUserIds: '',
      //   leaderUserNames: '',
      console.log(url, params)
      if (this.$route.query.taskType == '水板块' && url == '/mobile/doConfirm.api') {
        if (this.taskConfirmObj.sponsorUserId == '' || this.taskConfirmObj.responsibleDeptIds == '' || this.taskConfirmObj.responsibleUserIds == '' || this.taskConfirmObj.leaderUserIds == '') {
          Toast({
            message: '内容未填写完整',
            position: 'middle',
            duration: 1500
          })
          return
        }
      }
      // 驳回，处理意见必填
      if (params.operationType == '1' && params.subinfoName == '') {
        Toast({
          message: '请选择驳回点',
          position: 'middle',
          duration: 1500
        })
        return
      } else if (params.operationType == '1' && params.comment == '') {
        Toast({
          message: '请填写处理意见',
          position: 'middle',
          duration: 1500
        })
        return
      }
      // 转办，转办人员必填
      if (params.operationType == '2' && params.zhuanbanName == '') {
        Toast({
          message: '请选择转办人员',
          position: 'middle',
          duration: 1500
        })
        return
      }
      // 转办人员单选提示
      if (params.operationType == '2' && params.zhuanbanName.indexOf(',') > -1) {
        Toast.fail({
          message: '只能选择一个转办人员，请重新选择',
          position: 'middle',
          duration: 1500
        })
        return
      }
      // 沟通，沟通人员必填
      if (params.operationType == '4' && params.goutongName == '') {
        Toast({
          message: '请选择沟通人员',
          position: 'middle',
          duration: 1500
        })
        return
      }
      // 回复沟通，处理意见必填
      if (params.operationType == '64' && params.comment == '') {
        Toast({
          message: '请填写处理意见',
          position: 'middle',
          duration: 1500
        })
        return
      }
      this.show = true;
      console.log(JSON.stringify(params));
      if (url == '/mobile/approval.api') {
        params = { json: JSON.stringify(params) }
      }
      this.http({
        apiUrl: url,
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
          this.$router.push({
            path: '/supervision/commission'
          })
        } else {
          Toast.fail(res.description);

        }

      }, err => {
        this.show = false;
        Toast.fail('操作失败！');
        console.log(err)
        // reject(err)
      })



      // this.$axios({
      //     url:uri,
      //     method:"post",
      //     data,
      //     headers: {'Content-Type': 'multipart/form-data'}
      // }).then(res=>{
      //     console.log(res)
      //     if(res.data.description == 'success'){
      //             Toast({
      //                 message:'操作成功',
      //                 position:'middle',
      //                 duration:1000
      //             })
      //             this.$router.push('/safeCount/safeFun/pat')
      //     }
      // }).catch(err=>{
      //     console.log(err)
      // })
    },
    cencelData() { //取消提交
      this.clickLeft()
    }
  }
}
</script>
<style>
.timepicker {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1000;
}
#approvalStatus .applyList > div {
  padding: 0.625rem 0;
  box-sizing: border-box;
  /* height: 3.125rem; */
  line-height: 1.475rem;
}
#approvalStatus .applyList > div::after {
  display: block;
  content: "";
  clear: both;
}
#approvalStatus .applyList > div > span {
  color: #d7d7d7;
  float: left;
  width: 20%;
  font-size: 0.8rem;
  height: 25px;
  line-height: 25px;
  text-align: justify;
}
#approvalStatus .applyList > div > span::after {
  display: inline-block;
  content: "";
  width: 100%;
  overflow: hidden;
  height: 0;
}
#approvalStatus .applyList > div:not(:last-child) {
  border-bottom: #f1f1f3 1px solid;
}
#approvalStatus .van-nav-bar--fixed {
  background: #329afa;
  color: #fff;
}

#approvalStatus .van-nav-bar__title {
  color: #fff;
}

#approvalStatus .btn_popup {
  color: #1989fa;
  background-color: white;
  border: 1px solid white;
  width: 100px;
}

#approvalStatus .van-checkbox-group {
  height: 85%;
  overflow-y: auto;
  padding-left: 28%;
}
#approvalStatus .van-checkbox {
  margin-top: 10px;
}

#approvalStatus .assistDept_popup {
  overflow: hidden;
  background-color: white !important;
}

#approvalStatus .van-nav-bar .van-icon {
  color: #fff;
}

#approvalStatus .appStatus {
  width: 100%;
  margin-top: 46px;
  border-bottom: #eff3f5 0.1rem solid;
  padding: 5px 0;
}

#approvalStatus .appStatus > div {
  width: 30%;
  text-align: center;
}

#approvalStatus .textStyle {
  font-size: 0.625rem;
}

#approvalStatus .handler {
  padding: 0.625rem 0.625rem;
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  border-bottom: #eff3f5 0.1rem solid;
}

#approvalStatus .handler::after {
  display: block;
  content: "";
  clear: both;
}

.nowHandler {
  border-left: #3193f6 0.25rem solid;
  padding-left: 5px;
}

#approvalStatus .flex {
  display: flex;
  justify-content: space-around;
  flex-flow: row;
}

.appContent {
  padding: 0.625rem 0.625rem;
}

#approvalStatus .van-cell {
  padding: 0.625rem 0;
}

.sBody::after {
  content: "";
  display: block;
  clear: both;
}

#approvalStatus .sFooter {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
}

.backImg {
  width: 2rem;
  height: 2rem;
}

.imgContainer > .van-icon {
  position: absolute;
  color: red;
  top: -7px;
  right: -7px;
  font: 14px/1 "vant-icon";
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

#approvalStatus .taskChange {
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
  margin-top: 46px;
}
/* #approvalStatus .Handling-opinions .van-field__body{
  border: none;
} */

/* 修改pc端组织树弹出框 */
.popbox {
  position: fixed;
}

.popbox .popList .popTitle span.close {
  float: right;
}
.popbox .popList {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin-top: 0;
  margin-left: 0;
}
.popbox .popList .popContent {
  height: calc(100% - 40px);
}
.popbox .popList .popContent .p-content {
  height: 100%;
  border: none;
}
.popbox .popList .popContent .p-content .leftBox {
  border: none;
  width: 100%;
}
.popbox .popList .popContent .p-content .leftBox .list01 {
  border: 1px solid #d2d2d2;
  height: auto;
  max-height: 50%;
}
.popbox .popList .popContent .p-content .leftBox .list02 {
  max-height: 30%;
  border: 1px solid #d2d2d2;
  border-top: none;
}
.popbox .popList .popContent .p-content .leftBox > span.icon-exchange {
  display: none;
}
</style>
