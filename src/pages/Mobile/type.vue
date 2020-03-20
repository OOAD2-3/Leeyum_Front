<template>
  <div id="root">
    <div class="type_main">
      <div class="firstType">
        <div v-for="item in type_list" @click="switchSubMenu(item)" :id="item.category_name" class="firstTypeItem">{{item.category_name}}</div>
      </div>
      <div class="subType">
        <div id="type_home" style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%">选择您感兴趣的分类</div>
        <div v-for="item in nowSubMenu" class="nowSubMenuItem" @click="chooseType(item)">
          <img :src="item.pic_url" alt="" style="height: 60%;margin-top: 10%"/>
          <div style="height: 25%;width: 100%">{{item.category_name}}</div>
        </div>
      </div>
    </div>
    <bottom-router default-active="2"></bottom-router>
    <div class="releaseFontButton">
    <img src="../../../static/picture/releaseFont.png" style="height: 43px;margin-top: 37px;margin-left: 22px" @click="MwantRelease" />
  </div>
  </div>
</template>

<script>
  import BottomRouter from "../../components/bottomRouter";
  export default {
    name: "type",
    components: {BottomRouter},
    data(){
      return{
        type_list:[],
        nowSubMenu:[],
        OpenedFirstType:''
      }
    },
    methods: {
      init: function () {
        let Height = window.screen.availHeight;
        let Width = window.screen.availWidth;
        document.getElementById("root").style.height = Height + "px";
        document.getElementById("root").style.width = Width+ "px";
        document.getElementById("root").style.background = "#f0f0f0";

        if (Width > 1200) {
          // require('../assets/css/pages/PC/goodsStylePC.css');
        } else {
          // require('../assets/css/pages/Mobile/goodsStyleMobile.css');
        }
      },
      jump: function (name) {
        this.$router.push({name: name});
      },
      switchSubMenu:function(item) {
        if (item.category_name !== '本月热门' && item.category_name !== '个性推荐') {
          document.getElementById("type_home").style.display = 'none';
          if (this.$data.OpenedFirstType !== '') {
            document.getElementById(this.$data.OpenedFirstType).style.background = 'white';
            document.getElementById(this.$data.OpenedFirstType).style.color = '#3c3c3c';
            document.getElementById(this.$data.OpenedFirstType).style.fontWeight = "normal";
          }
          this.$data.OpenedFirstType = item.category_name;
          document.getElementById(item.category_name).style.background = "#f0f0f0";
          document.getElementById(item.category_name).style.color = "rgb(253,192,6)";
          document.getElementById(item.category_name).style.fontWeight = "bolder";

          this.$data.nowSubMenu.splice(0, this.$data.nowSubMenu.length);
          for (let i = 0; i < item.sub_category_list.length; i++) {
            this.$data.nowSubMenu.push(item.sub_category_list[i]);
          }
        } else {
          this.jump("MGoods");
        }
      },
      getAllType:function(){
        this.$axios.get("/api/category/").then(res => {
          for (let i = 0; i < res.data.data.length; i++)
            this.$data.type_list.push(res.data.data[i]);
        }).catch(err => {
          console.log(err);
        })
      },
      chooseType:function(item){
        console.log(item);
        this.$router.push({
          name:'MGoods',
          params:{
            choosenType:item.category_id,
            choosenTypeName:item.category_name
          }
        })
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
    },
    created() {
      this.getAllType();
    }
  }
</script>
<style scoped>
  .type_main{
    height: calc(100% - 60px);
    width: 100%;
    display: flex;
  }
  .firstType{
    width:100px;
    height: 100%;
    background: white;
    color: #3c3c3c;
  }
  .subType{
    width: calc(100% - 100px);
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .firstTypeItem{
    height: 50px;
    line-height: 50px;
    width: 100%;
    background: white;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
    font-size: 15px;
  }
  .nowSubMenuItem{
    width: calc(92%/3);
    height: 100px;
    background: white;
    margin-left: 2%;
    text-align: center;
    margin-bottom: 2%;
  }
  .releaseFontButton{
    position: fixed;bottom: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: #fdc006;
    border-top-left-radius: 105px;
  }
</style>
