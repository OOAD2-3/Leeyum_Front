<template>
  <div id="root">
    <PMyHead/>
    <div class="bac">
      <div class="adjust">
        <div class="content">
          <div class="success">
            <div style="width: 100%;height: 30px;text-align: center;line-height: 30px;font-size: 20px;">发布成功！</div>
            <div style="width: 100%;height: 40px;text-align: center;line-height: 40px">以下是为您匹配到的内容~</div>
          </div>
          <div class="chooseOrNot">
            <button class="chooseOrNotButton" style="margin-right: 30px" @click="confirmLeave">继续</button>
            <button class="chooseOrNotButton" @click="confirmLeave">随便逛逛</button>
          </div>
          <div class="matchMain">
            <div v-for="item in matchList" class="matchMainItem">
              <img
                :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'"
                style="margin-right: 10px;width: 190px">
              <div class="matchMainItemMain">
                <div style="width: 100%;height: 30px;line-height: 30px;font-weight: bolder">
                  <span v-if="item.category[1]==='表白墙'"
                        style="border: hotpink 1px solid;
                        border-radius: 3px;
                        font-size: 14px;
                        padding: 1px 3px;
                        color: hotpink;
                        font-weight: normal;">{{item.category[1]}}</span>
                  <span v-else
                        style="border: #fdc006 1px solid;border-radius: 3px;font-size: 14px;padding: 1px 3px;color: #fdc006;font-weight: normal;">{{item.category[1]}}</span>
                  <span style="">{{item.title}}</span>
                </div>
                <div
                  v-if="item.category[1]==='拼车'||item.category[1]==='约玩/约学习'"
                  style="height: 20px;width: 99%;margin-left:2%;font-size: 14px;line-height: 20px;color: #3c3c3c;padding-bottom: 3px">
                  <el-icon class="el-icon-user" style="padding-right: 2px"></el-icon>
                  {{item.content.now_number}}/{{item.content.total_number}}人
                </div>
                <div
                  v-if="item.category[1]==='求购'||item.category[1]==='出售'"
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
                <div
                  v-if="item.category[1]==='求租'||item.category[1]==='出借'"
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
                <div
                  v-if="item.category[1]==='家教'"
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

                <div
                  v-if="item.category[1]==='学校事务'||item.category[1]==='其他兼职'"
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
                <div
                  v-if="item.category[1]==='志愿者招聘'"
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

                <div style="margin-left: 2%;width: 98%;min-height: 20px;display: flex;flex-wrap: wrap;" v-if="item.tags.length>0">
                  <div class="tags" v-for="tag in item.tags">{{tag}}</div>
                </div>
                <div class="matchItemContent">{{item.content.body}}</div>
              </div>
              <div class="matchMainItemButtonCol">
                <button class="matchJoinButton" v-if="item.category[1]==='拼车'||item.category[1]==='约玩/约学习'" @click="joinMatchTeam">加入</button>
                <button class="matchJoinButton" v-else @click="showDetail(item)">详情</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tail/>
  </div>
</template>

<script>
  import PMyHead from "../../components/PC/PmyHead";
  import Tail from "../../components/tail";

  export default {
    name: "PMatch",
    components: {PMyHead, Tail},
    data() {
      return {
        matchList: [
          {
            title: '苏天宇好帅',
            content: {
              body: '巨帅'
            },
            tags:['太帅了'],
            category: ['二手交易', '出售'],
            pic_urls: []
          }, {
            title: '苏天宇好帅',
            content: {
              body: '巨帅'
            },
            tags:[],
            category: ['二手交易', '出售'],
            pic_urls: []
          }, {
            title: '苏天宇好帅',
            content: {
              body: '巨帅'
            },
            tags:[],
            category: ['二手交易', '出售'],
            pic_urls: []
          }, {
            title: '苏天宇好帅',
            content: {
              body: '巨帅'
            },
            tags:[],
            category: ['二手交易', '出售'],
            pic_urls: []
          }
        ]
      }
    },
    methods: {
      getScrollWidth: function () {
        // 获取滚动条宽度
        let noScroll, scroll, oDiv = document.createElement("DIV");
        oDiv.style.cssText = "position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;";
        noScroll = document.body.appendChild(oDiv).clientWidth;
        oDiv.style.overflowY = "scroll";
        scroll = oDiv.clientWidth;
        document.body.removeChild(oDiv);
        return noScroll - scroll;
      },
      init: function () {
        let Height = window.screen.availHeight;
        let Width = window.screen.availWidth;
        document.getElementById("root").style.height = Height + "px";
        document.getElementById("root").style.width = Width - this.getScrollWidth() + "px";
        require('../../assets/css/pages/PC/releaseStylePC.css');
      },
      jump: function (name) {
        this.$router.push({name: name});
      },
      confirmLeave: function () {
        this.$confirm('确认要离开匹配页吗？离开后将不能再看到与您发布的内容相匹配的信息。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.jump("PGoods");
        })
      },
      showDetail:function(item){

      },
      joinMatchTeam:function () {

      }
    },
    mounted() {
      this.init();
    },
    // beforeRouteEnter(to, from, next){
    //   if(from.name==='PRelease'||from.name==='PDetail') next();
    //   else next("/pgoods");
    // },
  }
</script>

<style scoped>
  .bac {
    width: 100%;
    min-height: 800px;
    background: url("../../../static/picture/bac6.jpg") no-repeat;
    background-size: 100% 100%;
    padding-bottom: 50px;
  }

  .adjust {
    width: 1200px;
    min-height: 800px;
    margin: 0 auto;
    overflow: hidden;
  }

  .content {
    min-height: 850px;
    width: 60%;
    margin-top: 20px;
    margin-left: 20%;
    box-shadow: 0 0 3px #606060;
    background: white;
  }

  .success {
    width: 100%;
    height: 70px;
    padding-top: 20px;
  }

  .chooseOrNot {
    padding: 10px 0;
    width: 90%;
    margin-left: 5%;
    border-bottom: 1px solid #eee;
    height: 35px;
    text-align: center;
  }

  .chooseOrNotButton {
    height: 100%;
    width: 150px;
    background: #fdc006;
    color: white;
    border: transparent;
    cursor: pointer;
    border-radius: 3px;
  }

  .chooseOrNotButton:hover {
    background: #f5ba06;
  }

  .matchMain {
    height: 674px;
    width: 100%;
    padding: 20px 0 50px 0;
    overflow: auto;
  }

  .matchMain::-webkit-scrollbar {
    display: none;
  }

  .matchMainItem {
    min-height: 190px;
    width: calc(80% - 10px);
    margin-left: 10%;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
  }

  .matchMainItemMain {
    min-height: 190px;
    width: 300px;
    padding: 5px 5px 5px 0;
  }

  .matchItemContent {
    width: 98%;
    margin-left: 2%;
    min-height: 100px;
    font-size: 14px;
    color: #aeaeae;
    margin-top: 3px;
  }
  .tags{
    color: #a4a5a7;
    border: solid 1px #e8eaec;
    font-size: 13px;
    border-radius: 3px;
    display: flex;
    height: 20px;
    line-height: 20px;
    margin-right: 3px;
    padding: 1px 3px;
  }
  .matchMainItemButtonCol {
    width: 60px;
  }

  .matchJoinButton {
    width: 100%;
    height: 30px;
    background: #fdc006;
    color: white;
    border-radius: 5px;
    border: transparent;
    cursor: pointer;
    transition: all .1s;
  }

  .matchJoinButton:hover {
    background: #f5ba06;
  }
</style>
