<template>
  <div class="mmyHead">
    <div class="mhead_adjust">
      <img class="mlogo" src="../../../static/picture/logo_temp.png" alt="" @click="jump('MHome')"/>
      <div class="msearch-div">
        <div class="msearch_main">
          <input class="msearch-input" v-model="MsearchKeyWord" placeholder="发现你想要的" @click="MfocusInput" @keyup="changeMsearchKeyWord"/>
          <div class="msearch-button" @click="Msearch">
            <el-icon name="search"/></div>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
    export default {
      name: "myHead",
      props:{
        MsearchKeyWordIn:''
      },
      data(){
        return{
          active1:'',
          active2:'',
          dialogVisible:false,
          MsearchKeyWord:this.$props.MsearchKeyWordIn
        }
      },
      methods:{
        init:function() {
          if(this.$props.defaultActive==='6') {
            this.$data.active1='';
            this.$data.active2='2-1';
          }
          else if(this.$props.defaultActive==='7') {
            this.$data.active1='';
            this.$data.active2='2-2';
          }
          else if(this.$props.defaultActive==='8') {
            this.$data.active1='';
            this.$data.active2='3';
          }
          else this.$data.active1=this.$props.defaultActive;
          let Width = window.screen.availWidth;

          require("../../assets/css/components/Mobile/headStyleMobile.css")

        },
        jump:function(name){
          this.$router.push({name:name});
        },
        changeMsearchKeyWord:function(){
          this.$emit('update:MsearchKeyWord',this.$data.MsearchKeyWord);
        },
        Msearch:function(){
          this.$emit('Msearch');
        },
        MfocusInput:function(){
          this.$emit("MfocusInput");
        },
        setSearchInput:function(item){
          this.$data.MsearchKeyWord=item;
        }
      },
      mounted() {
        this.init();
      }
    }
</script>

<style scoped>

</style>
