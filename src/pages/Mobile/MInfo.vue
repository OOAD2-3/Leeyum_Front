<template>
  <div id="root">
    <div class="mInfoHeader">
      <div style="position: absolute;left: 10px;font-weight: bolder;width: 30px" @click="$router.go(-1)">
        <el-icon class="el-icon-arrow-left"></el-icon>
      </div>
      <div style="font-size: 18px;" v-if="son==='settings'">设置</div>
      <div style="font-size: 18px;" v-if="son==='team'">加入的队伍</div>
      <div style="font-size: 18px;" v-if="son==='scanned'">浏览记录</div>
      <div style="font-size: 18px;" v-if="son==='liked'">收藏内容</div>
      <div style="font-size: 18px;" v-if="son==='released'">已发布信息</div>
    </div>

<!--    设置-->
    <div v-if="son==='settings'">

    </div>

<!--    组队-->
    <div v-if="son==='team'" class="infoMain">
      <div v-if="content.length===0" style="height: 300px;width: 100%;display: flex;align-items: center;justify-content: center;color: #8c939d">无内容</div>
      <div v-for="item in content" class="infoMainItem">
        <img :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'"
             alt="" style="width:50px;margin-right: 10px"/>
        <div class="mInfoTitle">{{item.title}}</div>
        <div class="mInfoButton" @click="handleLeave(item)">退出</div>
      </div>
    </div>

<!--    浏览记录-->
    <div v-if="son==='scanned'" class="infoMain">
      <div v-if="content.length===0" style="height: 300px;width: 100%;display: flex;align-items: center;justify-content: center;color: #8c939d">无内容</div>
      <div v-if="content.length>0"
        style="width: 100%;justify-content:flex-end;padding-right: 5px;color: #8cc5ff;height: 30px;display: flex;align-items: flex-end"
        @click="showClear=true">清空历史</div>
      <div v-for="item in content" class="infoMainItem">
        <img :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'"
             alt="" style="width:50px;margin-right: 10px"/>
        <div class="mInfoTitle">{{item.title}}</div>
      </div>

    </div>

<!--    收藏-->
    <div v-if="son==='liked'" class="infoMain">
      <div v-if="content.length===0" style="height: 300px;width: 100%;display: flex;align-items: center;justify-content: center;color: #8c939d">无内容</div>
      <div v-for="item in content" class="infoMainItem">
        <img :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'"
             alt="" style="width:50px;margin-right: 10px"/>
        <div class="mInfoTitle">{{item.title}}</div>
        <div class="mInfoButton" style="background: white;border: none;color: #fdc006;font-size: 20px" @click="handleRemoveLike(item)"><el-icon class="el-icon-star-on"></el-icon></div>
      </div>

    </div>

<!--    已发布-->
    <div v-if="son==='released'" class="infoMain">
      <div v-if="content.length===0" style="height: 300px;width: 100%;display: flex;align-items: center;justify-content: center;color: #8c939d">无内容</div>
      <div v-for="item in content" class="infoMainItem">
        <img :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'"
             alt="" style="width:50px;margin-right: 10px"/>
        <div class="mInfoTitle">{{item.title}}</div>
        <div class="mInfoButton" @click="handleBackInfo(item)">下架</div>
      </div>
    </div>

    <confirm v-model="showLeave"
             title="确认离开组队?"
             @on-confirm="outTeam">
      <p style="text-align:center">离开后可重新加入</p>
    </confirm>
    <confirm v-model="showRemoveLike"
             title="确认离开组队?"
             @on-confirm="removeLike">
      <p style="text-align:center">确认取消对该商品的收藏吗</p>
    </confirm>
    <confirm v-model="showBackInfo"
             title="确认下架该商品吗?"
             @on-confirm="backInfo">
      <p style="text-align:center">下架后将不会再被其他用户看到</p>
    </confirm>
    <confirm v-model="showClear"
             title="确认要清空浏览历史吗?"
             @on-confirm="clearHistory">
      <p style="text-align:center">清空后不可找回</p>
    </confirm>
  </div>
</template>

<script>
  import { Confirm } from 'vux'
  export default {
    name: "MInfo",
    components: {
      Confirm
    },
    data() {
      return {
        son: this.$route.params.son,
        content:[],
        showLeave:false,
        showRemoveLike:false,
        showBackInfo:false,
        showClear:false,
        handleId:''
      }
    },
    methods: {
      init: function () {
        let Height = window.screen.availHeight;
        let Width = window.screen.availWidth;
        document.getElementById("root").style.height = Height + "px";
        document.getElementById("root").style.width = Width + "px";
        document.getElementById("root").style.background = "#f0f0f0";

        if(this.$data.son==='liked'){
          this.$axios.get("/api/user/like/").then(res => {
            for (let i = 0; i < res.data.data.length; i++)
              this.$data.content.push(res.data.data[i]);
          }).catch(err => {
            console.log(err);
          })
        }
        if(this.$data.son==='released'){
          this.$axios.get("/api/user/published/").then(res => {
            for (let i = 0; i < res.data.data.length; i++)
              this.$data.content.push(res.data.data[i]);
          }).catch(err => {
            console.log(err);
          })
        }
        if(this.$data.son==='scanned'){
          this.$axios.get("/api/user/viewed/").then(res => {
            for (let i = 0; i < res.data.data.length; i++)
              this.$data.content.push(res.data.data[i]);
          }).catch(err => {
            console.log(err);
          })
        }
        if(this.$data.son==='settings'){

        }
        if(this.$data.son==='team'){
          this.$axios.get("/api/user/teams/").then(res => {
            for (let i = 0; i < res.data.data.length; i++)
              this.$data.content.push(res.data.data[i]);
          }).catch(err => {
            console.log(err);
          })
        }
      },
      jump: function (name) {
        this.$router.push({name: name});
      },
      handleLeave:function(item){
        this.$data.handleId=item.id;
        this.$data.showLeave=true;
      },
      handleRemoveLike:function(item){
        this.$data.handleId=item.id;
        this.$data.showRemoveLike=true;
      },
      handleBackInfo:function(item){
        this.$data.handleId=item.id;
        this.$data.showBackInfo=true;
      },
      clearHistory:function(){
        this.$axios.delete("/api/user/viewed/").then(() => {
          this.$data.content.splice(0, this.$data.content.length);
          this.$message.success("清除成功！");
        }).catch(() => {
          this.$message.error("出了一点小意外，请稍后重试！");
        })
      },
      removeLike:function(){
        this.$axios.delete("/api/user/like/?article_id=" + this.$data.handleId).then(res => {
          this.$message.success("已取消收藏！");
          for (let i = 0; i < this.$data.content.length; i++)
            if (this.$data.content[i].id ===  this.$data.handleId) {
              this.$data.content.splice(i, 1);
              break;
            }
        }).catch(err => {
          this.$message.error("出了一点小错误，请稍后再试！");
          console.log(err);
        });
      },
      outTeam:function(){
        const dataa = {
          article_id: this.$data.handleId
        };
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        this.$axios.put("/api/article/leave_team/", dataa, config).then(res => {
          for (let i = 0; i < this.$data.content.length; i++)
            if (this.$data.content[i].id === this.$data.handleId) {
              this.$data.content.splice(i, 1);
              break;
            }
          this.$message.success("退出成功！");
        }).catch(err => {
          this.$alert("退出失败，请重试");
        })
      },
      backInfo:function() {
        this.$axios.delete("/api/article/?id=" + this.$data.handleId).then(() => {
          for (let i = 0; i < this.$data.content.length; i++)
            if (this.$data.content[i].id === this.$data.handleId) {
              this.$data.content.splice(i, 1);
              break;
            }
          this.$message.success("成功下架！");
        }).catch(err => {
          this.$message.error("出了一点小错误，请稍后再试！");
          console.log(err);
        });
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>
  .mInfoHeader{
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
  .infoMain{
    width: 96%;
    padding: 0 2% 10px;
    background: #f0f0f0;
  }
  .infoMainItem{
    background: white;
    border-radius: 5px;
    width: calc(100% - 20px);
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .mInfoButton{
    width: 50px;
    border-radius: 3px;
    border: 1px solid #fdc006;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fdc006;
    height: 20px;
    font-size: 13px;
  }
  .mInfoTitle{
    width: calc(100% - 110px);
    font-size: 15px;

  }
</style>
