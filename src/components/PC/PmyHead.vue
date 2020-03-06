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
      </el-menu>
      <div class="search-div">
        <div class="search_main">
          <input id="inputFocus"
                 class="search-input"
                 v-model="PsearchKeyWord"
                 placeholder="发现你想要的"
                 @keyup="changePsearchKeyWord"
                 @focus="PCfocus"
                 @blur="PCfocusOut"/>
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
  </div>
    <div class="PCfocusDiv" id="PCfocusDiv">
      <div class="PChotSearch">
        <div style="margin-left: 10px;width: calc(100% - 10px);height: 30px;line-height: 30px;display: flex;justify-content: space-between">
          <div style="">历史搜索</div>
          <div v-if="this.$data.search_history.length>0" style="color: #8cc5ff;font-size: 13px;padding-right: 20px;cursor: pointer" @mousedown="clearSearchHistory">清空记录</div>
        </div>
        <div class="PChistorySearchMain">
          <div class="searchHistoryItem" v-for="item in search_history" @mousedown="chooseSearch(item)">{{item}}</div>
          <div class="searchHistoryItem" style="cursor: auto" v-if="this.$data.search_history.length===0">无</div>
        </div>
      </div>
      <div class="PChistorySearch">
        <div style="margin-left: 10px;width: calc(100% - 10px);height: 30px;line-height: 30px">热门搜索</div>
        <div class="PChotSearchMain">
          <div class="searchHistoryItem" v-for="item in search_history" @mousedown="chooseSearch(item)">{{item}}</div></div>
      </div>
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
          PsearchKeyWord:this.$props.PsearchKeyWordIn,
          search_history:[]
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
            document.getElementById("inputFocus").blur();
            this.PCfocusOut();
            this.$emit('Psearch');
          }
          else this.$emit('update:PsearchKeyWord',this.$data.PsearchKeyWord);
        },
        Psearch:function(){
          document.getElementById("PCfocusDiv").style.display = "none";
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
        },
        PCfocus:function() {
          this.$data.search_history.splice(0, this.$data.search_history.length);
          if(localStorage.getItem('history_search')) {
            let temp = JSON.parse(localStorage.getItem('history_search'));
            if (temp.length > 30) {
              temp.splice(0, 10);
              localStorage.setItem('history_search', JSON.stringify(temp));
            }
            if (temp.length < 8) {
              for (let i = temp.length - 1; i >= 0; i--)
                this.$data.search_history.push(temp[i]);
            } else {
              for (let i = temp.length - 1; i >= temp.length - 8; i--)
                this.$data.search_history.push(temp[i]);
            }
          }
          document.getElementById("PCfocusDiv").style.display = "flex";
        },
        PCfocusOut:function() {
          document.getElementById("PCfocusDiv").style.display = "none";
        },
        chooseSearch:function(item){
          this.$data.PsearchKeyWord=item;
          this.$emit('update:PsearchKeyWord',this.$data.PsearchKeyWord);
          this.Psearch();
        },
        clearSearchHistory:function(){
          localStorage.removeItem("history_search");
        }
      },
      mounted() {
        this.init();
      }
    }
</script>

<style scoped>

</style>
