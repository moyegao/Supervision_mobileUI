<template>
  <div id="supervision">
    <van-tabs type="card" class="top_tabs" @change="changeNavTab" swipeable title-active-color="white">
      <van-tab>
        <div slot="title">督办审批</div>
        <!-- <div class="segmentation"></div> -->
      </van-tab>
      <van-tab>
        <div slot="title">督办查询</div>
        <!-- <div class="segmentation"></div> -->
      </van-tab>
    </van-tabs>
    <van-tabs v-if="allData.length==5" v-model="active" @change="changeTab" :ellipsis="false" swipeable title-active-color="#329AFA">
      <van-tab>
        <div slot="title">
          待我审的({{allData[0].length}})
        </div>

        <!-- <myToDo></myToDo> -->
        <router-view />
      </van-tab>
      <van-tab>
        <div slot="title">
          我已审的
          <!-- ({{allData[1].length}}) -->
        </div>
        <!-- <div class="segmentation"></div> -->
        <!-- <myAudited></myAudited> -->
        <router-view />
      </van-tab>
      <van-tab>
        <div slot="title">
          我发起的
          <!-- ({{allData[1].length}}) -->
        </div>
        <!-- <div class="segmentation"></div> -->
        <!-- <myAudited></myAudited> -->
        <router-view />
      </van-tab>
      <van-tab>
        <div slot="title">
          进行中({{allData[3].length}})
        </div>
        <!-- <div class="segmentation"></div> -->
        <!-- <allTasks></allTasks> -->
        <router-view />
      </van-tab>
      <van-tab>
        <div slot="title">
          已办结
          <!-- ({{allData[2].length}}) -->
        </div>
        <!-- <div class="segmentation"></div> -->
        <!-- <allTasks></allTasks> -->
        <router-view />
      </van-tab>
      <!-- <van-tab >
                <div slot="title">
                    月度汇报({{allData[3].length}})
                </div>
                <div class="segmentation"></div>
                monthlyReport是单独被注释的
                <monthlyReport></monthlyReport>
                <router-view />
            </van-tab> -->
    </van-tabs>
  </div>
</template>
<script>
import { mapActions, mapStates } from "vuex"
import ongoing from './supervisionAffairs/ongoing'
import completed from './supervisionAffairs/completed'
import monthlyReport from './supervisionAffairs/monthlyReport'
import myAudited from './supervisionAffairs/myAudited'
import myToDo from './supervisionAffairs/myToDo'
import myapply from './supervisionAffairs/myapply'
export default {
  name: 'supervision',
  components: { ongoing, monthlyReport, myAudited, myToDo, myapply },
  data() {
    return {
      allData: [],
    }
  },
  created() {
    this.index = this.$route.query.index ? this.$route.query.index : this.index;
    // this.callAll(["todoapproval","myapproval","ongoing","myReport"]).then(res=>{
    this.callAll(["todoapproval", "myapproval", "myapply", "ongoing", "completed"]).then(res => {
      console.log(res)
      this.allData = res;
      let activeArr = { "commission": 0, "myAudited": 1, "monthlyReport": 2, "allTasks": 3, }
      this.$store.commit('changeIndex', activeArr[this.$router.currentRoute.name])
      console.log(this.$router.currentRoute.name)
    })
  },
  mounted() {
    let self = this;
    $('body').css("display", "none");
    setTimeout(function () {
      let path = self.$route.path;
      if ($(".van-tab--complete.van-tab").length == 5) {
        let path = self.$route.path;
        if (path.indexOf("ongoing") == -1 && path.indexOf("completed") == -1) {
          $(".van-tab--complete.van-tab").css("display", "block");
          $($(".van-tab--complete.van-tab")[3]).css("display", "none");
          $($(".van-tab--complete.van-tab")[4]).css("display", "none");
        } else {
          $(".van-tab--complete.van-tab").css("display", "none");
          $($(".van-tab--complete.van-tab")[3]).css("display", "block");
          $($(".van-tab--complete.van-tab")[4]).css("display", "block");
        }
        if (path.indexOf("commission") != -1) {
          self.$store.commit('changeIndex', 0)
        } else if (path.indexOf("myAudited") != -1) {
          self.$store.commit('changeIndex', 1)
        } else if (path.indexOf("myapply") != -1) {
          self.$store.commit('changeIndex', 2)
        } else if (path.indexOf("ongoing") != -1) {
          try {
            $($($('.van-tabs__nav')[0]).find('.van-tab')[1]).click();
          } catch (e) {
            //TODO handle the exception
          }
          self.$store.commit('changeIndex', 3)
        } else if (path.indexOf("completed") != -1) {
          try {
            $($($('.van-tabs__nav')[0]).find('.van-tab')[1]).click();
          } catch (e) {
            //TODO handle the exception
          }
          self.$store.commit('changeIndex', 4)
        }
        $("#supervision .van-tabs--line").css("margin-top", "0px");
        $('body').css("display", "block");
      }

    }, 3000);

  },
  computed: {
    active: {
      get() {
        return this.$store.state.active
      },
      set() { }
    }
  },
  methods: {
    ...mapActions(['callAll']),
    changeTab(index) {//切换路由
      console.log(index)
      this.$store.commit('changeIndex', index)
      if (index == 1) {
        this.$router.push('/supervision/myAudited')
      } else if (index == 2) {
        this.$router.push('/supervision/myapply')
      } else if (index == 3) {
        this.$router.push('/supervision/ongoing')
      } else if (index == 4) {
        this.$router.push('/supervision/completed')
      } else if (index == 0) {
        this.$router.push('/supervision/commission')
      }
    },
    changeNavTab(index) {
      if ($($(".van-tab--complete.van-tab")).length == 5) {
        if (index == 0) {
          $(".van-tab--complete.van-tab").css("display", "block");
          $($(".van-tab--complete.van-tab")[3]).css("display", "none");
          $($(".van-tab--complete.van-tab")[4]).css("display", "none");
          this.$store.commit('changeIndex', 0)
          this.$router.push('/supervision/myAudited');
        } else {
          $(".van-tab--complete.van-tab").css("display", "none");
          $($(".van-tab--complete.van-tab")[3]).css("display", "block");
          $($(".van-tab--complete.van-tab")[4]).css("display", "block");
          this.$store.commit('changeIndex', 3)
          this.$router.push('/supervision/completed');
        }
      }
    },
    backIndex(a) {
      console.log(a)
    },
    goto() {
      alert(999)
    }
  }
}
</script>
<style>
#supervision .van-tabs--card {
  padding-top: 40px;
}
#supervision .van-tabs__wrap {
  height: 40px;
}
#supervision .van-tabs__nav--card {
  margin: 0 0;
  border-radius: 0px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 0px solid white;
  /* background: #329afa; */
  height: 40px;
}
#supervision .van-tabs__nav--card .van-tab {
  background-color: #eee;
  color: black !important;
  line-height: 40px;
}
#supervision .van-tabs__nav--card .van-tab.van-tab--active {
  color: #fff !important;
  background-color: #329afa;
  line-height: 40px;
  font-weight: bolder;
}
#supervision .van-nav-bar--fixed {
  background: #329afa;
  color: #fff;
}
#supervision .van-tabs--line {
  z-index: 0;
  margin-top: 46px;
}
#supervision .van-tabs__line {
  background: #329afa;
}
#supervision .van-nav-bar__title {
  color: #fff;
}
#supervision .segmentation {
  width: 100%;
  height: 10px;
  background: #f5f6f8;
}
#supervision .top_tabs .van-tab {
  /* border-left: 2px solid #f5f6f8; */
  border-right: 1px solid #f5f6f8;
}
.flex {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.flex .content {
  font-size: 0.8rem;
  color: #a7a7a7;
}
.van-field__body {
  border: 1px solid #d7d7d7;
  padding: 5px;
}
.van-popup {
  background: transparent !important;
}
</style>
