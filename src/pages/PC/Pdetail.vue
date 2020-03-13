<template>
  <div id="root">
    <div class="bac2">
      <div class="adjust">
       
      <div class="pup">
        <div class="pup1">
         <!-- 左侧商品图片 -->
        <div class="pinfoimg f1">
           <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
           </el-carousel>
          <!-- <div class="pimg-zoom" style="background-image:url(../../../static/picture/desk.png);"></div>
          <div class="pthumb-s">
                <img src="../../../static/picture/desk.png" class="f1 active">
                <img src="../../../static/picture/desk.png" class="f1">
                <img src="../../../static/picture/desk.png" class="f1">
          </div> -->
        </div>
        <!-- 右侧商品信息 -->
        <div class="pinfo f1">
          <!----------------di1hang --------------------->
           <div class="pdiyihang">
            <span class="avatar ivu-avatar ivu-avater-circle ivu-avatar-default ivu-avatar-image"><img src="../../../static/picture/desk.png"></span>
            <span class="username">{{publisher}}</span>
            <div class="plikeimg"><i class="el-icon-star-off" @click="shoucang"></i></div>
            <div class="pjubaoimg"><i class="el-icon-warning"  @click="jubao"></i></div>
           </div>
           <!----------------di2hang --------------------->
           <div class="ptitle">{{title}}</div>
           <!----------------di3hang --------------------->
           <div class="pcontent">{{content}}</div>
           <!----------------info-item --------------------->
           <div class="pleimu">{{category[0]}}——{{category[1]}}</div>

          <i class="el-icon-tickets"> <div v-for="item in tags" class="ptags"><el-tag>{{item}}</el-tag></div></i>

           <!----------------di5hang --------------------->
           <div class="pinfo-item">
             <div><i class="el-icon-time"></i>{{publish_time}}</div>
           </div>
           <div class="pinfo-item">
             <div><i class="el-icon-phone-outline"></i><a href="/Plogin#/plogin" class="plogin">登录后查看联系方式</a></div>
           </div>
        </div>
        </div>
      </div>
   

              <!----------------------- comment------------------->
<div class="pcomment">

   <div class="pcommenttitle">
     <div class="pshangpinpingjia">商品评价</div>
     <a href="/Plogin#/plogin" class="plogin fr">
     <div class="cafterl">
         <span> <el-button type="primary" class="ploginbtn">登陆后评论</el-button></span>
     </div>
     </a>
   </div>
   <div class="pcommentbox">
     {{comment_id}}
     {{comment_message}}
   </div>
   <div class="ppagebox">
     <!-- <ul class="ivu-page">
       <li title="上一页" class=""></li>
     </ul> -->
   </div>
   <div class="no-content"><img src="../../../static/picture/nocomment.png" width="1200px" alt></div>

</div>

<!-- sendcomment -->
<div class="psendcomment">
  <div><el-input type="textarea"  placeholder="请输入内容"  v-model="textarea"  maxlength="30" class="pcommentarea" show-word-limit></el-input></div>
 <div class="psend"><el-button type="primary" class="psendbtn" >发送</el-button></div>
</div>
<!-- sendcomment -->
    </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Pdetail",

      data(){
       
        return{
           text: '',
          textarea: '',
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
          }],
     
        

        }
      },
      methods:{
        shoucang:function()
        {
         var status = true;
			      if(status) {
				   $(this).html("el-icon-star-on")
			   	status = false;
		     	}else{
				$(this).html("el-icon-star-off")
				status = true;
		    	}
        },
      jubao:function()
      {
        alert("举报成功！");
      },
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
            require('../../assets/css/pages/PC/detailStylePC.css');
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
              }
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
  .bac2{
    background: #f0f0f0;
    padding-bottom: 50px;
  }
  .adjust{
    width:1200px;
    /* margin: 0 auto; */
    /* zzjchange */
    margin:30px auto;
    background-color:#f0f0f0;
    padding:30px;
  }
  
</style>
