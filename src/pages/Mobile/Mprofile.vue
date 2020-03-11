<template>
  <div id="root">
<!--    <div style="background: rgb(253,192,6);width: 100%;height: 50px"></div>-->
    <div class="muserInfo">
      <div class="muserImg">
        <img src="../../../static/picture/own.jpg" alt="" style="margin-left:5%;width: 90%;" />
      </div>
      <div class="muserInfoDetail">
        <div class="muserInfoDetailMain">
          <div class="muserOnline" v-if="username!==''">
            <div id="MnowUserName">您好，{{username}}</div>
          </div>
          <div class="muserOffline" v-if="username===''">
            <button class="mloginButton" @click="jump('MLogin')">请登录/注册</button>
          </div>
        </div>
      </div>
    </div>
    <div class="muserDetail">
      <div class="muserDetailLine">
        <img src="../../../static/picture/收藏.png" alt="" style="height: 70%;margin:0 10px">
        <div>收藏内容</div>
      </div>
      <div class="muserDetailLine">
        <img src="../../../static/picture/浏览.png" alt="" style="height: 70%;margin:0 10px">
        <div>浏览记录</div>
      </div>
      <div class="muserDetailLine">
        <img src="../../../static/picture/发布.png" alt="" style="height: 70%;margin:0 10px">
        <div>已发布信息</div>
      </div>
      <button @click="logout" style="margin-top: 100px;
      width: 100%;
      height: 40px;
      border: transparent;
      background: rgb(253,192,6);
      color: white;
      font-size: 15px">注 销</button>
    </div>
    <bottom-router default-active="3"></bottom-router>
  </div>
</template>

<script>
    import BottomRouter from "../../components/bottomRouter";
    export default {
      name: "Mprofile",
      components: {BottomRouter},
      data(){
        return{
          username:''
        }
      },
      methods: {
        init: function () {
          let Height = window.screen.availHeight;
          let Width = window.screen.availWidth;
          document.getElementById("root").style.height = Height + "px";
          document.getElementById("root").style.width = Width+ "px";
          document.getElementById("root").style.background = "#f0f0f0";
          this.$axios.get("/api/user/details/").then(res=>{
            this.$data.username=res.data.data.username;
            localStorage.setItem("username",res.data.data.username);
          }).catch(err=>{
            console.log(err)
          });

          if (Width > 1200) {
            // require('../assets/css/pages/PC/goodsStylePC.css');
          } else {
            // require('../assets/css/pages/Mobile/goodsStyleMobile.css');
          }
        },
        jump: function (name) {
          this.$router.push({name: name});
        },
        logout:function(){
          this.$axios.get("/api/user/logout/").then(res=>{
            this.$data.username='';
            localStorage.setItem("username",'');
            this.jump("MGoods");
          }).catch(err=>{
            alert(err);
          })
        }
      },
      mounted() {
        this.init();
      }
    }
</script>

<style scoped>
  .muserInfo{
    padding-top: 15%;
    height: 20%;
    width: 100%;
    display: flex;
  }
  .muserDetail{
    width: 90%;
    margin-left: 5%;
    height: calc(65% - 80px);
    padding-top: 20px;
  }
  .muserImg{
    width: 30%;
    margin-left: 5%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .muserInfoDetail{
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .muserInfoDetailMain{
    height: 20%;
    width: 100%;
  }
  .muserOffline{
    height: 100%;
    width: 90%;
    display: flex;
    align-items: center;
    margin-left: 10%;
  }
  .muserOnline{
    height: 100%;
    width: 90%;
    display: flex;
    align-items: center;
    margin-left: 10%;
    font-size: 20px;
  }
  .mloginButton{
    background: transparent;
    border: transparent;
    font-size: 20px;
  }
  .muserDetailLine{
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #6c6c6c;
    padding-top:10px;
  }
</style>
