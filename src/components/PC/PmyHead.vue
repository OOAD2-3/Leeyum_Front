<template>
  <div class="myHead">
    <div class="head_adjust">
      <img class="logo" src="../../../static/picture/logo_temp.png" alt="" @click="jump('PHome')"/>
      <el-menu
        :default-active="active1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#ffffff"
        style="border-bottom: transparent;"
        active-text-color="rgb(253,192,6)"
        text-color="#222222">
        <el-menu-item index="1" @click="jump('PHome')">首页</el-menu-item>
        <el-menu-item index="2" @click="jump('PGoods')">发现</el-menu-item>
<!--        <el-menu-item index="3" @click="jump('PBuy')">求购</el-menu-item>-->
  <!--      <el-menu-item index="4" @click="jump('Switch')">切换学校</el-menu-item>-->
  <!--      <el-menu-item index="5">校园动态</el-menu-item>-->
  <!--      <el-submenu index="6">-->
  <!--        <template slot="title">更多</template>-->
  <!--        <el-menu-item index="6-1" style="padding-left: 10%" @click="dialogVisible = true">兼职</el-menu-item>-->
  <!--        <el-menu-item index="6-2" style="padding-left: 10%" @click="dialogVisible = true">优惠券</el-menu-item>-->
  <!--        <el-menu-item index="6-3" style="padding-left: 10%" @click="dialogVisible = true">加入我们</el-menu-item>-->
  <!--      </el-submenu>-->
      </el-menu>
      <div class="search-div">
        <div class="search_main">
          <input class="search-input" v-model="PsearchKeyWord" placeholder="发现你想要的" @keyup="changePsearchKeyWord"/>
          <div class="search-button" @click="Psearch">
            <el-icon name="search"/></div>
        </div>
      </div>
      <div class="back">
<!--        <div class="application" @click="dialogVisible = true">APP</div>-->
        <div class="release-button" @click="PwantRelease">我要发布</div>
        <div class="login">
          <img src="../../../static/picture/about_pic.jpg" alt="" style="height: 70%;margin-right: 10px;"/>
          <div class="login_button" @click="jump('PLogin')" id="noLogin">登录</div>
          <div class="onlineState" id="onlineState">
            <div id="userName"></div>
            <div class="logout_button" @click="logout">
              <el-icon name="switch-button"></el-icon>
            </div>
          </div>
        </div>
      </div>
<!--    <el-dialog-->
<!--      title="下载APP获取更多功能"-->
<!--      :visible.sync="dialogVisible"-->
<!--      width="30%">-->
<!--      // :before-close="handleClose"  对话框关闭前的确认-->
<!--      <img src="../../../static/picture/2dc.png" alt="" style="margin-left:2%;width: 30%"/>-->
<!--      <img src="../../../static/picture/2dc.png" alt="" style="margin-left:2%;width: 30%"/>-->
<!--      <img src="../../../static/picture/2dc.png" alt="" style="margin-left:2%;width: 30%"/>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <button class="cancel_button" @click="dialogVisible = false">取消</button>-->
<!--        <button class="confirm_button" @click="dialogVisible = false">确定</button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </div>
  </div>
</template>

<script>
    export default {
      name: "myHead",
      props:{
        defaultActive:'',
        PsearchKeyWordIn:''
      },
      data(){
        return{
          active1:'',
          active2:'',
          dialogVisible:false,
          PsearchKeyWord:this.$props.PsearchKeyWordIn
        }
      },
      methods:{
        init:function() {
          this.$data.active1=this.$props.defaultActive;
          require("../../assets/css/components/PC/headStylePC.css");
          this.$axios.get("/api/user/details/").then(res=>{
            document.getElementById("noLogin").style.display="none";
            document.getElementById("onlineState").style.display="flex";
            document.getElementById("userName").innerHTML=res.data.data.username;
            localStorage.setItem("username",res.data.data.username);
          }).catch(err=>{
            console.log(err)
          })
        },
        jump:function(name){
          this.$router.push({name:name});
        },
        changePsearchKeyWord:function(){
          var e = window.event || arguments.callee.caller.arguments[0];
          if (e && e.keyCode === 13 ) {
            this.$emit('Psearch');
          }
          else this.$emit('update:PsearchKeyWord',this.$data.PsearchKeyWord);
        },
        Psearch:function(){
          this.$emit('Psearch');
        },
        logout:function(){
          this.$axios.get("/api/user/logout/").then(res=>{
            localStorage.setItem("username",'');
            location.reload();
          }).catch(err=>{
            alert(err);
          })
        },
        PwantRelease:function(){
          console.log(localStorage.getItem("username"));
          if(localStorage.getItem("username")!==''){
            this.jump("PRelease");
          }
          else{
            this.$message.error("请登录！");
            this.jump("PLogin");
          }
        }
      },
      mounted() {
        this.init();
      }
    }
</script>

<style scoped>

</style>
