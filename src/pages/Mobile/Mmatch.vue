<template>
  <div id="root">
    <div class="mMatchHeader">
      <div style="position: absolute;left: 10px;font-weight: bolder;width: 30px" @click="jump('MGoods')">
        <el-icon class="el-icon-arrow-left"></el-icon>
      </div>
      <div style="font-size: 18px;">发布成功</div>
    </div>
    <div style="width: 90%;background: #f0f0f0;padding: 0 5%">
      <div style="width: 100%;text-align: center;padding: 10px 0;color: #8c939d">为你匹配到以下内容~</div>
<!--      从这里开始编辑-->
      <div class="MmatchMain">
        123
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Mmatch",
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
    },
    mounted() {
      this.init();
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
