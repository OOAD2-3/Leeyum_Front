<template>
  <div id="root">
    <bottom-router default-active="3"></bottom-router>
    <button @click="jump('MLogin')">登陆</button>
  </div>
</template>

<script>
    import BottomRouter from "../../components/bottomRouter";
    export default {
        name: "Mprofile",
      components: {BottomRouter},
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
      },
      mounted() {
        this.init();
      }
    }
</script>

<style scoped>

</style>
