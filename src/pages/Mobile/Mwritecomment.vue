<template>
  <div id="root">
    <div class="mCommentHeader">
      <div style="position: absolute;left: 10px;font-weight: bolder;width: 30px" @click="$router.go(-1)"><el-icon class="el-icon-arrow-left"></el-icon></div>
      <div style="font-size: 20px;">发表评论</div>
    </div>
    <textarea class="commentTextarea" maxlength="200" v-model="commentContent" placeholder="从这里开始输入您的精彩评论"></textarea>
    <button class="commentButton" @click="sendComment">评论</button>
  </div>
</template>

<script>
  export default {
    name: "Mdetail",
    data() {
      return {
        article_id: this.$route.params.articleId,
        commentContent: ''
      }
    },
    methods: {
      getScrollWidth: function () {
        // 获取滚动条宽度
        let noScroll, scroll, oDiv = document.createElement("DIV");
        oDiv.style.cssText = "position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;";
        noScroll = document.body.appendChild(oDiv).clientWidth;
        oDiv.style.overflowY = "scroll";
        scroll = oDiv.clientWidth;
        document.body.removeChild(oDiv);
        return noScroll - scroll;
      },
      init: function () {
        let Height = window.screen.availHeight;
        let Width = window.screen.availWidth;
        document.getElementById("root").style.height = Height + "px";
        document.getElementById("root").style.width = Width - this.getScrollWidth() + "px";
        document.getElementById("root").style.background = "white";
        require('../../assets/css/pages/Mobile/writecomment.css');
      },
      sendComment: function () {
        const dataa = {
          article_id: this.$data.article_id,
          comment_message: this.$data.commentContent,
        };
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        this.$axios.post("/api/comment/",dataa,config).then(res=>{
          this.$message.success("评论成功！");
          this.$router.go(-1);
        }).catch(err=>{
          this.$message.error("出了一点小问题，请稍后重试！");
        })
      }

    },
    mounted() {
      this.init();
    },
    created() {
    }
  }
</script>

<style scoped>
  .commentTextarea {
    margin-top: 5px;
    margin-left: 3%;
    width: calc(94% - 4px);
    height: calc(100% - 129px);
    display: flex;
    align-items: center;
    border: none;
    overflow: hidden;
    padding: 2px 2px;
    font-size: 15px;
  }

  .mCommentHeader {
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

  .commentTextarea::-webkit-scrollbar {
    display: none
  }

  .commentButton {
    width: 100%;
    height: 60px;
    border: none;
    background: #fdc006;
    color: white;
    font-size: 18px;
    position: fixed;
    bottom: 0;
  }
</style>
