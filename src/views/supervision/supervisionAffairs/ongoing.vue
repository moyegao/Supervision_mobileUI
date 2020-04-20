<template>
  <div id="ongoing">
    <div class="searchArea">
      <van-search placeholder="任务编号/任务名称" v-model="taskName" @search="onSearch()"/>
    </div>
    <div class="ongoingLists">
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
          <van-list v-model="isUpLoading" :finished="upFinished" finished-text="没有更多了" @load="onLoadList" :offset="offset">
            <div class="ongoingList" @click="toTaskDetails(item)" v-for="(item,index) of ongoingArr" :key="item.id">

                 <!-- @click.stop阻止事件冒泡 -->
              <van-cell>
                <van-row class="vanRowList">
                  <van-col span="6" class="flex vanColList">
                    <div class="people">{{item.state}}</div>
                    <!-- <div class="content">{{item.startTime.split(" ")[0]}}</div> -->
                  </van-col>
                  <van-col span="18" class="flex vanColList">
                    <div class="message"><span class="taskcontent">{{item.taskName}}</span>
                      <!-- <van-button type="primary" v-if="item.reportState == 0" @click="goReport(item, $event)">汇报</van-button> -->
                      <!-- <van-button class="disabled_btn" v-else @click="goReport(item, $event)">汇报</van-button> -->
                    </div>
                    <div class="content"><span class="taskcontent">任务编号：{{item.taskNum}}</span>
                      <!-- <van-button type="info" v-if="item.changeState == 0" @click="goChange(item, $event)">变更</van-button> -->
                      <!-- <van-button class="disabled_btn" v-else @click="goChange(item, $event)">变更</van-button> -->
                    </div>
                  </van-col>
                </van-row>
              </van-cell>
            </div>
         </van-list>
       </van-pull-refresh>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ongoing',
  data() {
    return {
      ongoingArr: [],
      data:[],
      taskName:'',
      ongoingPage:1,//页码
      isDownLoading:false,//下拉刷新
      isUpLoading:false,//上拉加载
      upFinished:false,//上拉加载完毕
      offset:50,//滚动条与底部距离小于 offset 时触发load事件
    }
  },
  created() {
    this.ongoingArr = this.$store.state.ongoingData
    console.log(this.ongoingArr);
  },
  computed: {

  },
  mounted(){
    if(this.ongoingArr.length!=0){
      this.ongoingPage = 2;
    }
  },
  methods: {
    onSearch(){
      this.onDownRefresh(this.taskName);
      this.$forceUpdate();
    },
    toTaskDetails(item) {
      console.log(item);
      // this.$router.push({ path: '/supervision/allTasks/detail', query: item })
      item.firstURL = 'ongoing'
      this.$router.push({path:'/allTaskInfo',query: item})
    },
    goReport(item, e){
        // 阻止冒泡事件
        console.log(item, e);
        e.stopPropagation();
        if (item.reportState == -1) {
            return
        }else {
            this.$router.push({ path:'/supervision/monthlyReport/detail', query: item })
        }
    },
    goChange(item, e){
        // 阻止冒泡事件
        console.log(item, e);
        e.stopPropagation();
        if (item.changeState == -1) {
            return
        }else {
            this.$router.push({ path:'/allTasksChange', query: item })
        }
    },
    init(searchName){
        let self = this;
        this.http({
          apiUrl: "/mobile/ongoing.api",
          method: "get",
          params: { page: 1, pageCount: 10,taskName:searchName},
          isJson: false,
          needErrorCallback: true,
        }).then(res => {
          self.ongoingArr = res.data;
          self.isDownLoading = false; //关闭下拉刷新效果
          if(self.ongoingArr.length<10){
            self.upFinished = true;
          }
          console.log(self.ongoingArr);
        }, err => {
          console.log(err)
          self.isDownLoading = false; //关闭下拉刷新效果
          // self.upFinished = true;
        })
        self.ongoingPage++;
    },
    onDownRefresh(searchName){//下拉刷新
          let self = this;
          setTimeout(() => {
              self.ongoingPage = 1;
              self.init(searchName); //加载数据
          }, 500);
      },
    onLoadList(){
      let self = this;
        setTimeout(() => {
            this.http({
              apiUrl: "/mobile/ongoing.api",
              method: "get",
              params: { page: self.ongoingPage, pageCount: '10'},
              isJson: false,
              needErrorCallback: true,
            }).then(res => {
              self.ongoingArr = self.ongoingArr.concat(res.data);
              self.isUpLoading = false; //关闭上拉加载效果
              if (res.data.length==0) {
                    self.upFinished = true;
                }
              console.log(self.ongoingArr);
            }, err => {
              console.log(err)
              self.isUpLoading = false; //关闭上拉加载效果
            })
            self.ongoingPage++
        }, 500);
    }
  }
}
</script>
<style>
#ongoing .van-tabs--line {
  margin-top: 10px;
}
#ongoing {
  width: 100%;
}
#ongoing .van-button {
  width: 4rem;
  height: 1.7rem;
  line-height: 1.5rem;
  float: right;
  margin: 3px 0;
}
.disabled_btn {
  color: white;
  background: #c9c9c9;
}
#ongoing .taskcontent {
  /* width: 185px; */
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
#ongoing .ongoingLists {
  width: 100%;
  box-sizing: border-box;
}
#ongoing .ongoingList {
  border-bottom: #f4f4f5 1px solid;
}
#ongoing .vanRowList {
  height: 100%;
}
#ongoing .vanColList {
  height: 100%;
}
#ongoing .people {
  font-size: 1.25rem;
}
#ongoing .message {
  font-size: 1rem;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5;
}
/* #ongoing .content{font-size:0.625rem; color:#A7A7A7} */
/* .flex{display:flex;flex-flow: column;justify-content: space-between;} */
</style>
