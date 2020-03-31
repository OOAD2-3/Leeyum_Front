<template>
  <div id="root" class="mroot">
    <div class="mllogo">
        <p class="mlogin_title">HANZI CAMPUS</p>
      <div class="mlogin_main_row">
        <button class="mbackimg" @click="$router.go(-1)"></button>
      </div>

    </div>
    <div class="mmain">

      <div class="mlogin_main">
        <div class="mlogin_main_content">
          <div class="mlogin_main_row">
            <!-- <div class="login_main_row_text">手机号</div> -->
            <input class="mlogin_phone_input" placeholder="请输入手机号" v-model="phone"></input>
            <button class="mlogin_check_send" @click="mgetCheckNum" id="mgetCheck">{{mbtnText}}</button>
          </div>
          <div class="mlogin_main_row">
            <!-- <div class="login_main_row_text">验证码</div> -->
            <input class="mlogin_check_input" placeholder="请输入验证码" v-model="check"></input>

          </div>
          <div class="mlogin_main_row">
            <button class="mlogin_main_button" @click="mllogin">登陆</button>
          </div>
          <div class="mlogin_tip">首次登录将自动注册为平台用户</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "login",
    data(){
      return{
          phone:'',
          check:'',
          mbtnText:'获取验证码',
          mbtnDisabled:false
      }
    },
    methods:{
      init:function() {
        let Width = window.screen.availWidth;
        document.getElementById("root").style.width = Width+"px";
        require('../../assets/css/pages/Mobile/loginStyleMobile.css')
      },
      jump:function(name){
        this.$router.push({name:name});
      },
      mgetCheckNum:function(){
        if(this.$data.mbtnDisabled===false) {
          this.$axios.get("/api/user/captcha?phone_number="+this.$data.phone).then((res)=>{
            this.$message({
              message: "发送成功",
              type: 'success'
            })
          }).catch((err)=>{
            console.log(err);
          });
          document.getElementById("mgetCheck").style.background = "#c0c0c0";
          document.getElementById("mgetCheck").style.cursor = "auto";
          if(this.$data.mbtnDisabled){
            return;
          }
          this.mgetSecond(60);
        }
      },
      mgetSecond(wait){
        let _this=this;
        let _wait = wait;
        if(wait === 0) {
          this.$data.mbtnDisabled=false;
          this.$data.mbtnText="获取验证码";
          document.getElementById("mgetCheck").style.background = "rgb(253,192,6)";
          document.getElementById("mgetCheck").style.cursor = "pointer";
          wait = _wait;
        } else {
          this.$data.mbtnDisabled=true;
          this.$data.mbtnText="已发送(" + wait + "s)"
          wait--;
          setTimeout(function() {
              _this.mgetSecond(wait);
            },
            1000);
        }
      },
      mllogin:function(){
        const formdata=new FormData();
        formdata.append('phone_number',this.$data.phone);
        formdata.append('captcha',this.$data.check);
        this.$axios.post("/api/user/login/",formdata).then((res)=>{
          this.$message({
            message: "登录成功",
            type: 'success'
          });
          this.$router.go(-1);
        }).catch((err)=>{
          console.log(err);
        })
      },
    },
    mounted() {
      this.init();
    },
  }
</script>

<style scoped>

</style>
