<template>
  <div id="myAudited">
    <div class="myAuditedLists">
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list v-model="isUpLoading" :finished="upFinished" finished-text="没有更多了" @load="onLoadList" :offset="offset">
          <div class="myAuditedList" @click="toMyAudDetails(item)" v-for="item of myAuditedData" :key="item.taskId">
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
  name: 'myAudited',
  data() {
    return {
      myAuditedData: [],
      reload: true,
      active: 2,
      data: [],
      myauditedPage: 0,//页码
      isDownLoading: false,//下拉刷新
      isUpLoading: false,//上拉加载
      upFinished: false,//上拉加载完毕
      offset: 50,//滚动条与底部距离小于 offset 时触发load事件
    }
  },
  created() {
    this.myAuditedData = this.$store.state.myapprovalData;
  },
  mounted() {
    if (this.$store.state.myapprovalData.length != -0) {
      this.myauditedPage = 2;
    }
  },
  methods: {
    toMyAudDetails(item) {
      item.prevPage = "1"
      // this.$router.push({ path: '/supervision/allTasks/detail', query: item })
      this.$router.push({ path: '/supervision/commission/detail', query: item });
    },
    init() {
      let self = this;
      this.http({
        apiUrl: "/mobile/myapproval.api",
        method: "get",
        params: { page: 0, pageCount: 10 },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        self.myAuditedData = res.data;
        self.isDownLoading = false; //关闭下拉刷新效果
        console.log(self.myAuditedData);
      }, err => {
        console.log(err)
        self.isDownLoading = false; //关闭下拉刷新效果
      })
      self.myauditedPage++;
    },
    onDownRefresh() {//下拉刷新
      let self = this;
      setTimeout(() => {
        self.myauditedPage = 0;
        self.init(); //加载数据
      }, 500);
    },
    onLoadList() {
      let self = this;
      setTimeout(() => {
        this.http({
          apiUrl: "/mobile/myapproval.api",
          method: "get",
          params: { page: self.myauditedPage, pageCount: '10' },
          isJson: false,
          needErrorCallback: true,
        }).then(res => {
          self.myAuditedData = self.myAuditedData.concat(res.data);
          self.isUpLoading = false; //关闭上拉加载效果
          if (res.data.length == 0) {
            self.upFinished = true;
          }
          console.log(self.myAuditedData);
        }, err => {
          console.log(err)
          self.isUpLoading = false; //关闭上拉加载效果
        })
        self.myauditedPage++;
      }, 500);
    }
  }
}
</script>
<style>
#myAudited .van-tabs--line {
  margin-top: 10px;
}
#myAudited {
  width: 100%;
}
#myAudited .myAuditedLists {
  width: 100%;
  box-sizing: border-box;
}
#myAudited .myAuditedList {
  border-bottom: #f4f4f5 1px solid;
}
#myAudited .vanRowList {
  height: 100%;
}
#myAudited .vanColList {
  height: 100%;
  width: 100%;
}
#myAudited .people {
  font-size: 1.25rem;
}
#myAudited .message {
  font-size: 1.1rem;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5;
}
#myAudited .message .msg_content {
  display: inline-block;
  width: calc(100% - 30px);
  word-break:break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#myAudited .content {
  display: flex;
}
#myAudited .content span {
  display: inline-block;
  text-align: center;
}
#myAudited .content .first {
  flex: 1;
}
#myAudited .content .second {
  flex: 2;
}
#myAudited .content .third {
  flex: 1;
  font-weight: bolder;
  color: black;
}
</style>
