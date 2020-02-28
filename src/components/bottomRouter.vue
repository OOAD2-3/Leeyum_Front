<template>
  <div class="bottom_router">
    <div class="bottom_router_see">
      <div class="bottom_router_item" @click="jump('MGoods')">
        <div class="bottom_router_item_img">
        <img id="one" src="../../static/picture/find.png" style="height: 30px" alt=""/>
      </div>
        <div class="bottom_router_item_text" id="one_text">发现</div>
      </div>
      <div class="bottom_router_item" @click="jump('MType')">
        <div class="bottom_router_item_img">
          <img src="../../static/picture/kind.png" style="height: 30px" alt="" id="two"/>
        </div>
        <div class="bottom_router_item_text" id="two_text">分类</div>
      </div>
      <div class="bottom_router_item" @click="jump('MRelease')">
        <div class="bottom_router_item_img">
          <img src="../../static/picture/add.png" style="height: 30px" alt="" id="four"/>
        </div>
        <div class="bottom_router_item_text" id="four_text">发布</div>
      </div>
      <div class="bottom_router_item" @click="jump('Mprofile')">
        <div class="bottom_router_item_img">
          <img src="../../static/picture/person.png" style="height: 30px" alt="" id="three"/>
        </div>
        <div class="bottom_router_item_text" id="three_text">我的</div>
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
        },
        jump:function(name){
          this.$router.push({name:name});
        },
      },
      mounted() {
        this.init();
      }
    }
</script>

<style scoped>

</style>
