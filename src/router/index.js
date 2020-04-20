import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/supervision/commission'
    },
    {
      path:'/supervision',
      name:'supervision',
      component: resolve => require(['@/views/supervision/index'], resolve),
      children:[
        {
          path:'/supervision/commission',
          name:'muToDo',
          component:resolve => require(['@/views/supervision/supervisionAffairs/myToDo'],resolve),
        },
        {
          path:'/supervision/myapply',
          name:'muToDo',
          component:resolve => require(['@/views/supervision/supervisionAffairs/myapply'],resolve),
        },
        {
          path:'/supervision/myAudited',
          name:'myAudited',
          component:resolve => require(['@/views/supervision/supervisionAffairs/myAudited'],resolve)
        },
        {
          path:'/supervision/ongoing',
          name:'ongoing',
          component:resolve => require(['@/views/supervision/supervisionAffairs/ongoing'],resolve)
        },
        {
          path:'/supervision/completed',
          name:'completed',
          component:resolve => require(['@/views/supervision/supervisionAffairs/completed'],resolve)
        },
        {
          path:'/supervision/monthlyReport',
          name:'monthlyReport',
          component:resolve => require(['@/views/supervision/supervisionAffairs/monthlyReport'],resolve)
        },
      ]
    },
    {
      path:'/supervision/commission/detail',
      name:'myToDoDetails',
      component:resolve => require(['@/views/supervision/supervisionAffairs/details/myToDoDetails'],resolve),
    },
    {
      path:'/attachmentDetails',//审批附件
      name:'attachmentDetails',
      component:resolve => require(['@/views/supervision/supervisionAffairs/details/attachmentDetails'],resolve),
    },
    {
      path:'/supervision/commission/accraditation',//审批
      name:'approvalStatus',
      component:resolve => require(['@/views/supervision/supervisionAffairs/approvalStatus/index'],resolve),
    },
    {
      path:'/allTaskInfo',// 任务详情
      name:'allTaskInfo',
      component:resolve => require(['@/views/supervision/supervisionAffairs/allTaskInfo/index'],resolve),
    },
    {
      path:'/allTaskInfoContent',// 任务详情内容
      name:'allTaskInfoContent',
      component:resolve => require(['@/views/supervision/supervisionAffairs/allTaskInfo/allTaskInfoContent'],resolve),
    },
    {
      path:'/taskAssignment',// 任务下达
      name:'taskAssignment',
      component:resolve => require(['@/views/supervision/supervisionAffairs/allTaskInfo/taskAssignment'],resolve),
    },
    {
      path:'/taskAssignmentDetails',// 任务下达-详情
      name:'taskAssignmentDetails',
      component:resolve => require(['@/views/supervision/supervisionAffairs/allTaskInfo/taskAssignmentDetails'],resolve),
    },
    {
      path:'/reportUpLoad',// 汇报审批-详情
      name:'reportUpLoad',
      component:resolve => require(['@/views/supervision/supervisionAffairs/allTaskInfo/reportUpLoad'],resolve),
    },
    {
      path:'/supervision/monthlyReport/detail',
      name:'monthlyReportDetails',
      component:resolve => require(['@/views/supervision/supervisionAffairs/details/monthlyReportDetails'],resolve)
    },
    {
      path:'/supervision/myAudited/detail',
      name:'myAudDetails',
      component:resolve => require(['@/views/supervision/supervisionAffairs/details/myAuditedDetails'],resolve)
    },{
      path:'/supervision/allTasks/detail',
      name:'allTasksDetails',
      component:resolve => require(['@/views/supervision/supervisionAffairs/details/allTasksDetails'],resolve)
    },{
      path:'/allTasksChange',
      name:'allTasksChange',
      component:resolve => require(['@/views/supervision/supervisionAffairs/details/allTasksChange'],resolve)
    }
  ]
})
