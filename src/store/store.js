import Vue from 'vue';
import Vuex from 'vuex';
import fetch from "../assets/js/http.js"

let http = fetch.http


Vue.use(Vuex);

const state = {
    basicQueryObj: null,
    baseUrl: null,
    active:0,//导航栏选中下标
	allTaskInfoData:[],// 所有任务
	myReportData:[],// 待汇报
	todoapprovalData:[],// 待审批
	myapprovalData:[],// 我的已审
	
}
const getters = {
	
}
const mutations = {
    changeIndex(state,index){
        state.active = index;
    }
}
const actions = {
// 进行中：/mobile/ongoing.api
// 待汇报：/mobile/myReport.api
// 待审批：/mobile/todoapproval.api
// 我的已审：/mobile/myapproval.api
// 调用接口将数据存入state
	allTaskInfo({commit,state},url){
		return new Promise((resolve,reject)=>{
			http({
			  apiUrl:"/mobile/"+url+".api",
			  needErrorCallback:true,
			}).then(res => {
				// console.log(res)
				state[url+"Data"] = res.data
				resolve(res.data)
			},err=>{
				reject(err)
			})
		})
	},
	// 请求所有接口
	callAll({dispatch},urlArr){
		let promiseArr = urlArr.map(url=>dispatch("allTaskInfo",url));
		return new Promise((resolve,reject)=>{
			Promise.all(promiseArr).then(res=>{
				resolve(res)
			})
		})
	}
	
}
const modules = {
    
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules
})