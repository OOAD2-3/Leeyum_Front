<template>
  <div id="root">
    <div class="mMatchHeader">
      <div style="position: absolute;left: 10px;font-weight: bolder;width: 30px">
        <el-icon class="el-icon-arrow-left"></el-icon>
      </div>
      <div style="font-size: 18px;">发布成功</div>
    </div>
    <div style="width: 90%;background: #f0f0f0;padding: 0 5%">
      <div style="width: 100%;text-align: center;padding: 10px 0;color: #8c939d">为你匹配到以下内容~</div>
<!--      从这里开始编辑-->
      <div class="MmatchMain">
<!--        title tags content pic_urls category[1] -->
        <div v-for="item in matchList"></div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Mmatch",
    data(){
      return{
        id:this.$route.params.id,
        matchList:[],
      }
    },
    methods: {
      init: function () {
        let Height = window.screen.availHeight;
        let Width = window.screen.availWidth;
        document.getElementById("root").style.height = Height + "px";
        document.getElementById("root").style.width = Width + "px";
        document.getElementById("root").style.background = "#f0f0f0";
      },
      jump: function (name) {
        this.$router.push({name: name});
      },
      getMatchList:function(){
        this.$axios.get("/api/article/publish_recommend/?article_id="+this.$data.id).then(res=>{
          for(let i=0;i<res.data.data.length;i++)
          this.$data.matchList.push(res.data.data[i]);
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    mounted() {
      this.init();
    },
    created() {
      this.getMatchList();
    }
  }
</script>

<style scoped>
  .mMatchHeader {
    height: 60px;
    width: calc(100% - 10px);
    background: #fdc006;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding-left: 10px;
    font-size: 150%;
  }
  .MmatchMain{
    width: 100%;
    background: #fdc006;

  }
</style>
