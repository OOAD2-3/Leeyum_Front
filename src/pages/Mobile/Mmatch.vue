<template>
  <div id="root">
    <div class="mMatchHeader">
      <div style="font-size: 18px;">发布成功</div>
    </div>
    <div style="width: 90%;background: #fff;padding: 0 5%">
      <div style="width: 100%;text-align: center;padding: 10px 0;color: #8c939d">为你匹配到以下内容~</div>
      <!--      从这里开始编辑-->
      <div class="chooseOrNot">
        <el-button type="warning" plain class="chooseOrNotButton" @click="confirmLeave">继续</el-button>
        <el-button type="warning" plain class="chooseOrNotButton" @click="confirmLeave">随便逛逛</el-button>
      </div>
      <div class="MmatchMain">
        <!--        title tags content pic_urls category[1] -->


        <div v-for="item in matchList" class="meigekuang">
          <div class="photo">
            <img
              :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'"
              class="image">
          </div>
          <div class="intro">   
            <div class="title">
               <span v-if="item.category[1]==='表白墙'"
                     style="border: hotpink 1px solid;
                        border-radius: 3px;
                        font-size: 14px;
                        padding: 1px 3px;
                        color: hotpink;
                        font-weight: normal;">{{item.category[1]}}</span>
              <span v-else
                    style="border: #fdc006 1px solid;border-radius: 3px;font-size: 14px;padding: 1px 3px;color: #fdc006;font-weight: normal;">{{item.category[1]}}</span>
              <span class="title">{{item.title}}</span>
            </div>
            <div class="tags" v-for="tag in item.tags">
              <el-tag type="info" class="tags" effect="plain">{{tag}}</el-tag>
            </div>
            <div class="matchItemContent">{{item.content.body.substr(0,30)}}
              <span v-if="item.content.body.length>30">...
              </span>
            </div>
            <div class="leimu">
              <div v-if="item.category[1]==='拼车'||item.category[1]==='约玩/约学习'"
                style="height: 20px;width: 99%;margin-left:2%;font-size: 14px;line-height: 20px;color: #3c3c3c;padding-bottom: 3px">
                <el-icon class="el-icon-user" style="padding-right: 2px"></el-icon>
                {{item.content.now_number}}/{{item.content.total_number}}人
              </div>
              <div v-if="item.category[1]==='求购'||item.category[1]==='出售'"
                style="height: 20px;width: 98%;margin-left:2%;font-size: 14px;line-height: 20px;padding-bottom: 3px;color:red;display: flex;">
                <div style="height: 100%;width: 50%">
                  <el-icon class="el-icon-money" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                  {{item.content.price}}元
                </div>
                <div style="height: 100%;width: 50%;color:#3c3c3c;">
                  <el-icon class="el-icon-magic-stick" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                  {{item.content.new_or_old}}成新
                </div>
              </div>
              <div v-if="item.category[1]==='求租'||item.category[1]==='出借'"
                style="height: 20px;width: 98%;margin-left:2%;font-size: 14px;line-height: 20px;padding-bottom: 3px;color:red;display: flex;">
                <div style="height: 100%;width: 50%">
                  <el-icon class="el-icon-money" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                  {{item.content.price}}元
                </div>
                <div style="height: 100%;width: 50%;color:#3c3c3c;">
                  <el-icon class="el-icon-magic-stick" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                  租借{{item.content.time_span}}天
                </div>
              </div>
              <div v-if="item.category[1]==='家教'"
                style="height: 20px;width: 98%;margin-left:2%;font-size: 14px;line-height: 20px;padding-bottom: 3px;color:red;display: flex">
                <div style="height: 100%;width: 50%">
                  <el-icon class="el-icon-money" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                  {{item.content.price}}元/节
                </div>
                <div style="height: 100%;width: 50%;color:#3c3c3c;">
                  <el-icon class="el-icon-time" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                  {{item.content.time}}开始
                </div>
              </div>
              <div v-if="item.category[1]==='学校事务'||item.category[1]==='其他兼职'"
                style="height: 20px;width: 98%;margin-left:2%;font-size: 14px;line-height: 20px;padding-bottom: 3px;color:red;display: flex">
                <div style="height: 100%;width: 50%">
                  <el-icon class="el-icon-money" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                  {{item.content.price}}元
                </div>
                <div style="height: 100%;width: 50%;color:#3c3c3c;">
                  <el-icon class="el-icon-time" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                  {{item.content.time}}
                </div>
              </div>
              <div v-if="item.category[1]==='志愿者招聘'"
                style="height: 20px;width: 98%;margin-left:2%;font-size: 14px;line-height: 20px;padding-bottom: 3px;color:red;display: flex">
                <div style="height: 100%;width: 50%;color:#3c3c3c;">
                  <el-icon class="el-icon-time" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                  {{item.content.time}}
                </div>
                <div style="height: 100%;width: 50%;color:#3c3c3c;">
                  <el-icon class="el-icon-place" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                  {{item.content.place}}
                </div>
              </div>
            </div>
            <div class="jiaruorxiangqing">
              <div class="matchJoinButton" v-if="item.category[1]=='拼车'||item.category[1]==='约玩/约学习'"
                   @click="joinMatchTeam(item)">
                <el-button class="joinbutton" type="text" style="color:#fdc006;margin-right:10px;" size="mini" round>
                  加入
                </el-button>
              </div>
              <div class="matchJoinButton" v-else @click="showDetail(item)">
                <el-button class="joinbutton" type="text" style="color:#fdc006;margin-right:10px;" size="mini" round>
                  详情
                </el-button>
              </div>
            </div>
          </div>
        </div>


        <!-- <div v-for="item in matchList" class="meigekuang">    V1布局，两个框在一行
      <el-row>
          <el-card :body-style="{ padding: '0px' }" >
              <img :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'" class="image">
            <div style="padding: 5px;">
              <div class="title" ><span class="title">{{item.title}}</span></div>
              <div class="tags" v-for="tag in item.tags"><el-tag type="warning" class="tags" >{{tag}}</el-tag></div>
              <div class="price">￥{{item.content.price}}</div>

             <div class="matchJoinButton" v-if="item.category[1]=='拼车'||item.category[1]==='约玩/约学习'" @click="joinMatchTeam">
             <el-button  class="joinbutton" style="color:#fdc006;"  size="mini" round>加入</el-button>
             </div>

             <div class="matchJoinButton" v-else @click="showDetail(item)">
             <el-button  class="joinbutton" style="color:#fdc006;"  size="mini" round>详情</el-button>
             </div>

            </div>
          </el-card>
    </el-row>
    </div> -->
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Mmatch",
    data() {
      return {
        id: this.$route.params.id,
        matchList: [],
      }
    },
    methods: {
      init: function () {
        let Height = window.screen.availHeight;
        let Width = window.screen.availWidth;
        document.getElementById("root").style.height = Height + "px";
        document.getElementById("root").style.width = Width + "px";
        document.getElementById("root").style.background = "#f0f0f0";
      },
      jump: function (name) {
        this.$router.push({name: name});
      },
      getMatchList: function () {
        this.$axios.get("/api/article/publish_recommend/?article_id=" + this.$data.id).then(res => {
          this.$data.matchList = res.data.data;
          if (this.$data.matchList.length <= 0)
            this.jump("MGoods");
        }).catch(err => {
          console.log(err);
        })
      },
      confirmLeave: function () {
        this.$confirm('您正在离开~', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.jump("MGoods");
        })
      },
      showDetail: function (item) {
        this.$router.push({
          name: 'MDetail',
          params: {
            articleId: item.id
          }
        })
      },
      joinMatchTeam: function (item) {
        this.$router.push({
          name: 'MDetail',
          params: {
            articleId: item.id
          }
        })
      },
    },
    mounted() {
      this.init();
    },
    created() {
      this.getMatchList();
    }
  }
</script>

<style scoped>
  .mMatchHeader {
    height: 60px;
    width: calc(100% - 10px);
    background: #fdc006;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding-left: 10px;
    font-size: 150%;
  }

  .MmatchMain {
    width: 100%;
    /* background: #fdc006; */

  }

  /* zzj */
  .photo {
    margin-top: 20px;
    float: left;
    width: 50%;
    /* width:100%;
    height:100%; */
  }

  .intro {
    float: right;
    width: 50%;
  }

  .meigekuang {
    width: 100%;
    height: 80%;
    margin-top: 10px;
    float: left;
    margin-bottom: 5px;

    background-color: rgba(255, 255, 255, 0.932);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

  }

  .chooseOrNot {
    padding: 10px 0;
    width: 100%;
    /* margin-left: 5%; */
    border-bottom: 1px solid #eee;
    height: 100%;
    text-align: center;
  }

  .chooseOrNotButton {
    /* height: 100%;
    width: 60px;
    background: #fdc006;
    color: white;
    border: transparent;
    cursor: pointer;
    border-radius: 3px; */
  }


  .chooseOrNotButton:hover {
    background: #f5ba06;
  }


  .title {
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 5px;
  }

  .tags {
    /* float:left; */
    display: inline;
    margin-right: 3px;
    /* width:10px; */

  }

  .matchItemContent {
    width: 98%;
    margin-left: 2%;
    min-height: 50px;
    font-size: 10px;
    color: #aeaeae;
    margin-top: 5px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .leimu {
    /* float:left; */

  }

  .jiaruorxiangqing {
    /* width: 20%; */
    /* float:right; */
  }

  .leimu {
    width: 100%;
    padding: 0%;
    /* float:left; */
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .joinbutton {
    float: right;

  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
