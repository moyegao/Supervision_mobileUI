<template>
<!-- 待我审的 -->
  <div id="myToDo">
    <div class="toDoLists">
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list v-model="isUpLoading" :finished="upFinished" finished-text="没有更多了" @load="onLoadList" :offset="offset">
          <div class="toDoList" @click="toDoDetail(item)" v-for="item of toDoData" :key="item.taskId">
            <van-cell>
              <van-row class="vanRowList">
                <van-col class="flex vanColList">
                  <div class="message" style="margin-bottom: 10px;">
                    <span class="msg_content">
                      <van-tag plain type="primary" v-if="item.status == '待审'">{{item.status}}</van-tag>
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
      toDoData: [],//请求数据
      data: [],
      mytodoPage: 0,//页码
      isDownLoading: false,//下拉刷新
      isUpLoading: false,//上拉加载
      upFinished: false,//上拉加载完毕
      offset: 50,//滚动条与底部距离小于 offset 时触发load事件

    }
  },
  mounted() {
    this.data = this.$store.state.todoapprovalData
    this.loadData();
  },
  methods: {
    init() {
      let self = this;
      this.http({
        apiUrl: "/mobile/todoapproval.api",
        method: "get",
        params: { page: 0, pageCount: 10 },
        isJson: false,
        needErrorCallback: true,
      }).then(res => {
        self.toDoData = res.data;
        self.isDownLoading = false; //关闭下拉刷新效果
        console.log(self.toDoData);
      }, err => {
        console.log(err)
        self.isDownLoading = false; //关闭下拉刷新效果
      })
      self.mytodoPage++;
    },
    toDoDetail(item) {//跳转详情
      console.log(item)
      item.prevPage = "0"

      this.$router.push({ path: '/supervision/commission/detail', query: item });
      // this.$router.push({path:'/allTaskInfo',query: item})
    },
    onDownRefresh() {//下拉刷新
      let self = this;
      setTimeout(() => {
        self.mytodoPage = 0;
        self.init(); //加载数据
      }, 500);
    },
    onLoadList() {
      let self = this;
      setTimeout(() => {
        this.http({
          apiUrl: "/mobile/todoapproval.api",
          method: "get",
          params: { page: self.mytodoPage, pageCount: 10 },
          isJson: false,
          needErrorCallback: true,
        }).then(res => {
          self.toDoData = self.toDoData.concat(res.data);
          self.isUpLoading = false; //关闭上拉加载效果
          if (res.data.length == 0) {
            self.upFinished = true;
          }
          console.log(self.toDoData);
        }, err => {
          console.log(err)
          self.isUpLoading = false; //关闭上拉加载效果
        })
        self.mytodoPage++;
      }, 500);
    },
    loadData() {
      let self = this;
      setTimeout(() => {
        if (self.toDoData.length == 0) {
          this.http({
            apiUrl: "/mobile/todoapproval.api",
            method: "get",
            params: { page: 0, pageCount: 10 },
            isJson: false,
            needErrorCallback: true,
          }).then(res => {
            self.toDoData = res.data;
            self.isUpLoading = false; //关闭上拉加载效果
            if (res.data.length < 10) {
              self.upFinished = true;
            }
          }, err => {
            self.isUpLoading = false; //关闭上拉加载效果
          })
          self.mytodoPage++;
        } else {
          self.isUpLoading = false; //关闭上拉加载效果
        }
      }, 500);
    }
  }
}
</script>
<style>
#myToDo {
  width: 100%;
}
#myToDo .toDoLists {
  width: 100%;
  box-sizing: border-box;
}
#myToDo .toDoList {
  border-bottom: #babcbe 1px solid;
}
#myToDo .vanRowList {
  height: 100%;
}
#myToDo .vanColList {
  height: 100%;
  width: 100%;
}
#myToDo .people {
  font-size: 1.25rem;
  text-align: center;
}
#myToDo .message {
  font-size: 1.1rem;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.1;
}
/* #myToDo .message .van-tag {
  float: left;
} */
#myToDo .message .msg_content {
  display: inline-block;
  width: 100%;
  word-break:break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#myToDo .content {
  display: flex;
}
#myToDo .content span {
  display: inline-block;
  text-align: center;
}
#myToDo .content .first {
  flex: 1;
}
#myToDo .content .second {
  flex: 2;
}
#myToDo .content .third {
  flex: 1;
  font-weight: bolder;
  color: black;
}
/* #myToDo .content{font-size:0.625rem; color:#A7A7A7} */
/*  .flex{display:flex;flex-flow: column;justify-content: space-around;}
	.flex .content{font-size:0.8rem; color:#A7A7A7} */
</style>
