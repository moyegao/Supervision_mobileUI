import axios from 'axios'
const METHOD = {
  GET:'get',
  POST:'post'
};

export default{
	http(myConfig){	
	    let defaultConfig = {
	      apiUrl:'',
	      method:METHOD.GET,
	      params:null,
	      isJson:true,
	      needErrorCallback:true,
	    };
	    myConfig = Object.assign({}, defaultConfig, myConfig);
	    // process.env.baseUrl
	    let RequestObj = {
	      url:myConfig.apiUrl,
	      method:myConfig.method,
	      timeout: 60000,
	      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	      withCredentials: true
	    };
	    // 数据格式处理
	    if (myConfig.method === METHOD.GET) {
				RequestObj.params = myConfig.params;
				// RequestObj.headers['eid'] = localStorage.getItem('eid');
			} else if (myConfig.method === METHOD.POST) {
				// RequestObj.headers['eid'] = localStorage.getItem('eid');
	      if (myConfig.isJson) {
	        // json格式
	        RequestObj.headers['Content-Type'] = 'application/json;charset=UTF-8';
	        
	        RequestObj.data = myConfig.params;
	      } else {
	        // 默认表单格式
	        RequestObj.params = myConfig.params;
	      }
	    }
	    return new Promise((resolve ,reject)=>{
	//  	console.log(RequestObj);
	      axios(RequestObj).then(res=>{
			  resolve(res.data)
		  },err=>{
	        if(myConfig.needErrorCallback){
				console.log(err)
	          reject(err)
	        }
	      }).catch(error=>{
	        if (myConfig.needErrorCallback) {
				console.log(error)
	          reject(error)
	        }
	      });
	    });	
	}
}