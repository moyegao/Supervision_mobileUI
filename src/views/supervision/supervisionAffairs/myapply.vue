<template>
  <div id="myapply">
    <div class="toDoLists">
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list v-model="isUpLoading" :finished="upFinished" finished-text="没有更多了" @load="onLoadList" :offset="offset">
          <div class="toDoList" @click="toDoDetail(item)" v-for="(item,index) of applyData" :key="item.taskId">
            <van-cell>
              <!-- <van-row class="vanRowList">
                                <van-col span="6" class="flex vanColList">
                                    <div class="people">{{item.startUser}}</div>
                                    <div class="content">{{item.startTime.split(" ")[0]}}</div>
                                </van-col>
                                <van-col span="18" class="flex vanColList">
                                    <div class="message">{{item.title}}</div>
                                    <div class="content">任务编号：{{item.taskNum}}</div>
                                </van-col>
                            </van-row> -->
              <van-row class="vanRowList">
                <van-col class="flex vanColList">
                  <div class="message" style="margin-bottom: 10px;">
                    <span class="msg_content">
                      <van-tag plain type="primary" v-if="item.status == '进行中'">{{item.status}}</van-tag>
                      <van-tag plain type="warning" v-if="item.status == '废弃'">{{item.status}}</van-tag>
                      <van-tag plain type="success" v-if="item.status == '结束'">{{item.status}}</van-tag>
                      &nbsp;&nbsp;{{item.title}}
                    </span>
                  </div>
                  <div class="content">
                    <span class="first">{{item.startTime}}</span>
                    <span class="second">{{item.taskName}}</span>
                    <span class="third">{{item.startUser}}</span>
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
  name: 'muToDo',
  data() {
    return {
      applyData: [],//请求数据
      data: [],
      applyPage: 0,//页码
      isDownLoading: false,//下拉刷新
      isUpLoading: false,//上拉加载
      upFinished: false,//上拉加载完毕
      offset: 50,//滚动条与底部距离小于 offset 时触发load事件
    }
  },
  mounted() {
    this.data = this.$store.state.myapplyData
    // this.init();
  },
  methods: {
    init() {
      let self = this;
      this.http({
        apiUrl: "/mobile/myapply.api",
        method: "get",
        params: { page: 0, pageCount: '10' },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        self.applyData = res.data;
        self.isDownLoading = false; //关闭下拉刷新效果
        console.log(self.applyData);
      }, err => {
        console.log(err)
        self.isDownLoading = false; //关闭下拉刷新效果
      })
      self.applyPage++;
    },
    toDoDetail(item) {//跳转详情
      console.log(item)
      // item.prevPage = "100"// 无用代码

      this.$router.push({ path: '/supervision/commission/detail', query: item });
      // this.$router.push({path:'/allTaskInfo',query: item})
    },
    onDownRefresh() {//下拉刷新
      let self = this;
      setTimeout(() => {
        self.applyPage = 0;
        self.init(); //加载数据
      }, 500);
    },
    onLoadList() {
      let self = this;
      setTimeout(() => {
        this.http({
          apiUrl: "/mobile/myapply.api",
          method: "get",
          params: { page: self.applyPage, pageCount: 10 },
          isJson: false,
          needErrorCallback: true,
        }).then(res => {
          self.applyData = self.applyData.concat(res.data);
          self.isUpLoading = false; //关闭上拉加载效果
          if (res.data.length == 0) {
            self.upFinished = true;
          }
          console.log(self.applyData);
        }, err => {
          console.log(err)
          self.isUpLoading = false; //关闭上拉加载效果
        })
        self.applyPage++
      }, 500);
    }
  }
}
</script>
<style>
#myapply {
  width: 100%;
}
#myapply .toDoLists {
  width: 100%;
  box-sizing: border-box;
}
#myapply .toDoList {
  border-bottom: #f4f4f5 1px solid;
}
#myapply .vanRowList {
  height: 100%;
}
#myapply .vanColList {
  height: 100%;
  width: 100%;
}
#myapply .people {
  font-size: 1.25rem;
}
#myapply .message {
  font-size: 1.1rem;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5;
}
#myapply .message .msg_content {
  display: inline-block;
  width: calc(100% - 30px);
  word-break:break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#myapply .content {
  display: flex;
}
#myapply .content span {
  display: inline-block;
  text-align: center;
}
#myapply .content .first {
  flex: 1;
}
#myapply .content .second {
  flex: 2;
}
#myapply .content .third {
  flex: 1;
  font-weight: bolder;
  color: black;
}
/* #myapply .content{font-size:0.625rem; color:#A7A7A7} */
/*  .flex{display:flex;flex-flow: column;justify-content: space-around;}
	.flex .content{font-size:0.8rem; color:#A7A7A7} */
</style>
