<template>
  <div id="root">
    <div class="mbac1" id="mbac">
      <div class="madjust">
        <div>标题：{{title}}</div>
        <div>内容：{{content}}</div>
        <div>发布时间：{{publish_time}}</div>
        <div>发布者：{{publisher}}</div>
        <div>类目：{{category[0]}}——{{category[1]}}</div>
        <div v-for="item in tags">{{item}}</div>
        <div>评论</div>
        <div v-for="item in comment">{{item.publisher_name}}  {{item.comment_message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Mdetail",
    data(){
      return{
        id:'',
        title:'',
        pic_urls:'',
        content:'',
        tags:[],
        category:[],
        publish_time:'',
        publisher:'',
        comment:[{
          comment_id: 3,
          publisher_name: 2,
          comment_message: "1",
        }]
      }
    },
    methods:{
      getScrollWidth:function () {
        // 获取滚动条宽度
        let noScroll, scroll, oDiv = document.createElement("DIV");
        oDiv.style.cssText = "position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;";
        noScroll = document.body.appendChild(oDiv).clientWidth;
        oDiv.style.overflowY = "scroll";
        scroll = oDiv.clientWidth;
        document.body.removeChild(oDiv);
        return noScroll - scroll;
      },
      init:function() {
        let Height = window.screen.availHeight;
        let Width = window.screen.availWidth;
        document.getElementById("root").style.height = Height + "px";
        document.getElementById("root").style.width = Width-this.getScrollWidth() + "px";
        document.getElementById("root").style.background="#f0f0f0";
      },
      getGoodInfo:function(){
        this.$data.id=this.$route.params.articleId;
        this.$axios.get("/api/article/details/?id="+this.$data.id).then(res=>{
          this.$data.id=res.data.data.id;
          this.$data.pic_urls=res.data.data.pic_urls;
          this.$data.title=res.data.data.title;
          this.$data.content=res.data.data.content.body;
          this.$data.tags=res.data.data.tags;
          this.$data.category=res.data.data.category;
          this.$data.publish_time=res.data.data.publish_time;
          this.$data.publisher=res.data.data.publisher.username;
        }).catch(err=>{
          console.log(err);
        });

        this.$axios.get("/api/comment/?article_id="+this.$data.id).then(res=> {
          console.log(res.data.data);
          for(let i=0;i<res.data.data.length;i++){
            let temp={
              comment_id: res.data.data[i].comment_id,
              publisher_name: res.data.data[i].publisher_id,
              comment_message: res.data.data[i].comment_message,
            };
            this.$data.comment.push(temp);
          }
        }).catch(err=>{
          console.log(err);
        })

      }
    },
    mounted() {
      this.init();
    },
    created() {
      this.getGoodInfo();
    }
  }
</script>

<style scoped>
  .mbac1{
    background: #f0f0f0;
    padding-bottom: 80px
  }
  .madjust{
    width:90%;
    min-height: 80%;
    margin: 0 auto;
    background: #fdc006;
  }
</style>
