<template>
    <div id="root">
<!--      <div id="head" class="head">-->
<!--        <div class="title">-->
<!--          <div class="title1">憨子校园</div>-->
<!--          <div class="title2">— 专注校园二手 —</div>-->
<!--        </div>-->
<!--        <div class="card">-->
<!--          <el-card class="box-card1" shadow="always">-->
<!--            <div class="el-card-part">-->
<!--              <div class="el-card-part-name">校园二手</div>-->
<!--              <div class="el-card-part-text">带不走的东西，丢不掉的记忆</div>-->
<!--              <div class="el-card-part-text">让小憨子，帮它找到新的主人</div>-->
<!--              <div class="el-card-part-button">-->
<!--                <button class="button" @click="jump('PGoods')">校园二手</button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-card>-->

<!--          <el-card class="box-card2" shadow="always">-->
<!--            <div class="el-card-part">-->
<!--              <div class="el-card-part-name">校园求购</div>-->
<!--              <div class="el-card-part-text">众里寻它，蓦然回首</div>-->
<!--              <div class="el-card-part-text">原来它就在这里—— 憨子求购</div>-->
<!--              <div class="el-card-part-button">-->
<!--                <button class="button" @click="jump('Buy')">校园求购</button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-card>-->

<!--          <el-card class="box-card3" shadow="always">-->
<!--            <div class="el-card-part">-->
<!--              <div class="el-card-part-name">开通学校</div>-->
<!--              <div class="el-card-part-text">年华已去，梦想犹在</div>-->
<!--              <div class="el-card-part-text">入驻我们，或获得属于你的平台</div>-->
<!--              <div class="el-card-part-button">-->
<!--                <button class="button" @click="jump('Apply')">开通学校</button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-card>-->

<!--        </div>-->
<!--      </div>-->
<!--      <div id="focus" class="focus">-->
<!--        <div class="focus_title">专注校园二手</div>-->
<!--        <img class="focus_img" alt="" src="../../../static/picture/focus.png"/>-->
<!--      </div>-->
<!--      <div id="pic" class="pic">-->
<!--        <img class="pic_img" alt="" src="../../../static/picture/pic.png"/>-->
<!--      </div>-->
<!--      <div id="about" class="about">-->
<!--        <div class="about_title">-->
<!--          <div class="about_title1">关于我们</div>-->
<!--          <div class="about_title2">年华已去，梦想犹在，为了不一样的青春</div>-->
<!--        </div>-->
<!--        <div class="about_main">-->
<!--          <div class="about_main_content">-->
<!--            <div class="about_card" v-for="obj in aboutList">-->
<!--              <div class="about_pic">-->
<!--                <img class="about_pic_content" src="../../../static/picture/about_pic.jpg" alt=""/>-->
<!--              </div>-->
<!--              <div class="about_name">{{obj.name}}</div>-->
<!--              <div class="about_post">{{obj.post}}</div>-->
<!--              <div class="about_intro">{{obj.intro}}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <tail></tail>-->
      <div class="bbbac">
        <div class="homeHeader">
<!--          <img src="../../../static/picture/傻鸟LOGO.png" alt="" style="height: 60px;margin-right: 5px"><span>流云</span>-->
        </div>
        <div class="homeMain" id="mouseInEnter">
          <div class="homeMainShow">
            <div class="homeMainSearch">
              <div class="homeMainLine1">FIND WHAT YOU WANT</div>
              <div class="homeMainLine1Search" @click="jump('PGoods')"><el-icon name="search"></el-icon></div>
            </div>
            <div class="homeMainLine2">流云 LeeYum</div>
            <div class="homeMainLine3" @click="jump('PGoods')">进入流云</div>
          </div>
        </div>
        <div class="homeFooter">
          <div class="homeFooterLine">© 2018-2020 流云科技 All Rights Reserved，憨ICP备1234567号-999</div>
          <div class="homeFooterLine">地址：福建省厦门市思明区厦门大学学生公寓</div>
        </div>
      </div>
    </div>
</template>

<script>
    import Tail from "../../components/tail";
    export default {
      name: "home",
      components: {Tail},
      data(){
        return{
          platform:'pc', //pc or mobile
          aboutList:[
            {
              name:'王世奇',
              post:'脑残',
              intro:'我是脑残'
            },
            {
              name:'李伟泽',
              post:'傻逼',
              intro:'我是傻逼'
            },
            {
              name:'唐一淞',
              post:'弱智',
              intro:'我是弱智'
            },
            {
              name:'苏天宇',
              post:'帅逼',
              intro:'贼鸡巴帅'
            }
          ]
        }
      },
      methods:{
        init:function() {
          let Height = window.innerHeight;
          let Width = window.screen.availWidth;
          document.getElementById("root").style.height = Height + "px";
          document.getElementById("root").style.width = Width+ "px";
          if (Width > 1200) require('../../assets/css/pages/PC/homeStylePC.css');
          else this.jump("MGoods");
        },
        jump:function(name){
          this.$router.push({name:name});
        }
      },
      mounted() {
          this.init();
      },
    }
</script>

<style scoped>
  .homeHeader{
    height: 50px;
    font-size: 20px;
    color: white;
    width: calc(100% - 20px);
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
  .homeFooter{
    height: 50px;
    width: 100%;
    color: white;
  }
  .homeFooterLine{
    font-size: 13px;
    width: calc(100% - 20px);
    margin-left: 20px;
  }
  .bbbac{
    width: 100%;
    background: url("../../../static/picture/bac7.jpg");
    background-size: 100% 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }
  .homeMain{
    height: 500px;
    width: 500px;
    background:radial-gradient(circle at 100px 100px, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.65));
    border-radius: 50%;
    border: rgba(179, 179, 179, 0.15) solid 1px;
    flex-direction: column;
    transition: all .2s;
  }
  .homeMainShow{
    margin-top: 150px;
    height: 200px;
    width: 350px;
    margin-left: 75px;
  }
  .homeMainSearch{
    width: 500px;
    height: 100px;
    display: flex;
  }
  .homeMainLine1Search{
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    margin-left: 60px;
    border-radius: 100px;
    background: #fdc006;
    color: white;
    font-size: 30px;
    cursor: pointer;
  }
  .homeMainLine1Search:hover{
    background: #ffaa0a;
    transition: all .2s;
  }
  .homeMainLine1{
    color: white;
    width: 320px;
    height: 100px;
    line-height: 50px;
    font-size: 40px;
    font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }
  .homeMainLine2{
    color: white;
    font-size: 23px;
    width: 350px;
    height: 40px;
    margin-bottom: 20px;
  }
  .homeMainLine3{
    color: white;
    font-size: 35px;
    width: 350px;
    height: 50px;
    cursor: pointer;
    transition: all .2s;
  }
  .homeMainLine3:hover{
    color: #cccccc;
  }
</style>
