<template>
  <div id="root" class="root">
    <div class="pplogo">
      <button type="button" class="logoimg"></button>
      <p class="login_title">HANZI CAMPUS</p>
    </div>
    <div class="intro">
      <p id="big">HELLO,ITEMS.</p>
      <p id="small">We provide school goods trading platform in order to enhance the value of the items.<br>The way items should be.</p>
      <button type="button" class="logoimg2"></button>
    </div>
    <div class="plmain">
      <div class="login_main">
        <div class="login_main_content">
          <div class="login_main_row">
            <!-- <div class="login_main_row_text">手机号</div> -->
            <input class="login_phone_input" placeholder="请输入手机号" v-model="phone"></input>
            <button class="login_check_send" @click="getCheckNum()" id="getCheck">{{btnText}}</button>
          </div>
          <div class="login_main_row">
            <input class="login_check_input" placeholder="请输入验证码" v-model="check"></input>
          </div>
          <div class="login_main_row">
            <button class="login_main_button" @click="llogin">登陆</button>
          </div>
          <div class="login_tip">首次登录将自动注册为平台用户</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "login",
    data(){
      return {
        phone: '',
        check: '',
        btnText:'获取验证码',
        btnDisabled:false
      }
    },
    methods:{
      init:function() {
        let Width = window.screen.availWidth;
        document.getElementById("root").style.width = Width+"px";
        require('../../assets/css/pages/PC/loginStylePC.css');
      },
      getCheckNum:function(){
        if(this.$data.btnDisabled===false) {
          this.$axios.get("/api/user/captcha?phone_number="+this.$data.phone).then((res)=>{
            this.$message({
              message: "发送成功",
              type: 'success'
            });
          }).catch((err)=>{
            console.log(err);
          });
          document.getElementById("getCheck").style.background = "#c0c0c0";
          document.getElementById("getCheck").style.cursor = "auto";
          if(this.$data.btnDisabled){
            return;
          }
          this.getSecond(60);
        }
      },
      getSecond(wait){
        let _this=this;
        let _wait = wait;
        if(wait === 0) {
          this.$data.btnDisabled=false;
          this.$data.btnText="获取验证码";
          document.getElementById("getCheck").style.background = "rgb(253,192,6)";
          document.getElementById("getCheck").style.cursor = "pointer";
          wait = _wait;
        } else {
          this.$data.btnDisabled=true;
          this.$data.btnText="已发送(" + wait + "s)"
          wait--;
          setTimeout(function() {
              _this.getSecond(wait);
            },
            1000);
        }
      },
      llogin:function(){
        const formdata=new FormData();
        formdata.append('phone_number',this.$data.phone);
        formdata.append('captcha',this.$data.check);
        this.$axios.post("/api/user/login/",formdata).then((res)=>{
          this.$message({
            message: "登录成功",
            type: 'success'
          });
          localStorage.setItem("username",this.$data.phone);
          this.$router.go(-1);
        }).catch((err)=>{
          this.$message({
            message: "登录失败",
            type: 'error'
          })
        })
      },
      jump:function(name){
        this.$router.push({name:name});
      }
    },
    mounted() {
      this.init();
    },
  }
</script>

<style scoped>

</style>
