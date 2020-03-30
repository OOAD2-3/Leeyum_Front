<template>
  <div class="bottom_router">
    <div class="bottom_router_see">
      <div class="bottom_router_item" @click="jump('MGoods')">
        <div class="bottom_router_item_img">
        <img id="one" src="../../static/picture/find.png" style="height: 25px" alt=""/>
      </div>
        <div class="bottom_router_item_text" id="one_text">发现</div>
      </div>
      <div class="bottom_router_item" @click="jump('MType')">
        <div class="bottom_router_item_img">
          <img src="../../static/picture/kind.png" style="height: 25px" alt="" id="two"/>
        </div>
        <div class="bottom_router_item_text" id="two_text">分类</div>
      </div>
      <div class="bottom_router_item" @click="jump('Mprofile')">
        <div class="bottom_router_item_img">
          <img src="../../static/picture/person.png" style="height: 25px" alt="" id="three"/>
        </div>
        <div class="bottom_router_item_text" id="three_text">我的</div>
      </div>
      <div class="bottom_router_item" @click="MwantRelease" style="width: 18%">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "bottomRouter",
      props:{
        defaultActive:''
      },
      methods:{
        init:function(){
          if(this.$props.defaultActive==='1'){
            document.getElementById("one").src="../../static/picture/find1.png";
            document.getElementById("one_text").style.color="rgb(253,192,6)";
          }
          else if(this.$props.defaultActive==='2'){
            document.getElementById("two").src="../../static/picture/kind1.png";
            document.getElementById("two_text").style.color="rgb(253,192,6)";
          }
          else if(this.$props.defaultActive==='3'){
            document.getElementById("three").src="../../static/picture/person1.png";
            document.getElementById("three_text").style.color="rgb(253,192,6)";
          }
          else if(this.$props.defaultActive==='4'){
            document.getElementById("four").src="../../static/picture/add1.png";
            document.getElementById("four_text").style.color="rgb(253,192,6)";
          }
          require('../assets/css/components/Mobile/bottomRouterStyleMobile.css');
          this.$axios.get("/api/user/details/").then(res=>{
            this.$data.username=res.data.data.username;
            localStorage.setItem("username",res.data.data.username);
          }).catch(err=>{
            localStorage.setItem("username",'');
            console.log(err)
          });
        },
        jump:function(name){
          if(name === this.$route.name)
            return;
          this.$router.push({name:name});
        },
        MwantRelease:function(){
          console.log(localStorage.getItem("username"));
          if(localStorage.getItem("username")!==''){
            this.jump("MRelease");
          }
          else{
            this.$message.error("请登录！");
            this.jump("MLogin");
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
