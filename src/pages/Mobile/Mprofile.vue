<template>
  <div id="root">
    <bottom-router default-active="3"></bottom-router>
    <div id="MnowUserName">{{username}}</div>
    <button @click="jump('MLogin')">登陆</button>
    <button @click="logout" v-if="username!==''">注销</button>
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

</style>
