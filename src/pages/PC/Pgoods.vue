<template>
  <div id="root">
    <PMyHead default-active="2"
             v-bind:PsearchKeyWordOut="PsearchKeyWordOut"
             v-on:update:PsearchKeyWord="getNewPsearchKeyWordOut"
             v-on:Psearch="Psearch"/>
    <div class="bac1">
    <div class="adjust">
      <div class="goods_main">
        <div class="goods_header">
          <div class="goods_header_left" @mouseleave="judgeHandleCloseSubMenu1">
            <div class="type_see">
              <div v-for="item in types" class="type_items" @mouseenter="handleOpenSubMenu(item)" @click="firstTypeSearch(item)">
                <span>{{item.category_name}}</span>
              </div>
            </div>
          </div>
          <div class="submenu" id="submenu" v-model="activeSubMenu" @mouseleave="judgeHandleCloseSubMenu">
            <div class="submenuItem" v-for="i in activeSubMenu" @click="secondTypeSearch(i)">{{i.category_name}}</div>
          </div>
          <div class="goods_header_right">
            <el-carousel :interval="5000" arrow="always" height="400px" id="car1">
              <el-carousel-item v-for="item in carousel_list" :key="item">
                <img :src="item" alt="" style="height: 100%;width: 100%;"/>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="ads">
            <div class="ads_item" style="margin-bottom: 10px" @click="$message({message:'广告位1招租',type:'info'})">
              <img src="../../../static/picture/kw1.jpg" style="height: 100%;width: 100%">
            </div>
            <div class="ads_item" @click="$message({message:'广告位2招租',type:'info'})">
              <img src="../../../static/picture/kw2.jpg" style="height: 100%;width: 100%">
            </div>
          </div>
          <div class="personalInfo">
            <div class="personalInfoOne">
              <img src="../../../static/picture/personalPic.png" alt="" style="height: 55px;border-radius: 55px">
              <div class="personalInfoOneLogin" v-if="this.$data.username===''">
                <div style="height: 25%;width: 100%">Hi~欢迎逛流云!</div>
                <div style="height: 25%;width: 100%;display: flex">
                  <div class="loginOr" @click="jump('PLogin')">登陆 | 注册</div>
                </div>
              </div>

              <div class="personalInfoOneLogin" v-if="this.$data.username!==''">
                <div style="height: 25%;width: 100%">Hi~ {{username.substr(0,7)}}
                  <span v-if="this.$data.username.length>7">..</span>
                </div>
                <div style="height: 25%;width: 100%;display: flex">欢迎逛流云!</div>
              </div>

            </div>
            <div style="background: linear-gradient(270deg,white,#eeeeee,#eeeeee,white);height: 1px;width: 100%"></div>
            <div class="personalInfoTwo">
              <div class="personalInfoTwoTitle">流云快报</div>
              <div style="height: 90px;width: 100%">
                <div class="quickNewItem">
                  <div class="quickNewItemTag">热议</div>
                  <div class="quickNewItemContent">还正在为买不到口罩...</div>
                </div>
                <div class="quickNewItem">
                  <div class="quickNewItemTag">HOT</div>
                  <div class="quickNewItemContent">抗击疫情，3Q医用口...</div>
                </div>
                <div class="quickNewItem">
                  <div class="quickNewItemTag">最新</div>
                  <div class="quickNewItemContent">降了！iPhone 11官方...</div>
                </div>
                <div class="quickNewItem">
                  <div class="quickNewItemTag">推荐</div>
                  <div class="quickNewItemContent">骁龙865对比麒麟999...</div>
                </div>
              </div>
            </div>
            <div style="background: linear-gradient(270deg,white,#eeeeee,#eeeeee,white);height: 1px;width: 100%"></div>
            <div class="personalInfoThree">
              <div class="personalInfoDetailItem" @click="openSideCol('我的收藏')">
                <img src="../../../static/picture/收藏.png" alt="" style="height: 25px">
                <div style="height: 25px;font-size: 14px;margin-top: 2px">我的收藏</div>
              </div>
              <div class="personalInfoDetailItem" @click="openSideCol('浏览记录')">
                <img src="../../../static/picture/浏览.png" alt="" style="height: 25px">
                <div style="height: 25px;font-size: 14px;margin-top: 2px">浏览记录</div>
              </div>
              <div class="personalInfoDetailItem" style="margin-top: 10px" @click="openSideCol('已发布内容')">
                <img src="../../../static/picture/发布.png" alt="" style="height: 25px">
                <div style="height: 25px;font-size: 14px;margin-top: 2px">已发布内容</div>
              </div>
              <div class="personalInfoDetailItem" style="margin-top: 10px" @click="openSideCol('设置')">
                <img src="../../../static/picture/设置.png" alt="" style="height: 25px">
                <div style="height: 25px;font-size: 14px;margin-top: 2px">设置</div>
              </div>
            </div>
          </div>
        </div>



        <div class="alreadyType">当前类目：{{this.$data.nowTypeName}}
          <div class="clearAlreadyType" @click="clearType" v-if="this.$data.nowTypeName!=='本月热门'">清空已选</div>
        </div>
<!--        <div class="goods_order">-->
<!--          <div class="goods_time">按热度↓</div>-->
<!--          <div class="goods_see">按时间</div>-->
<!--        </div>-->
        <div class="line"></div>
        <div class="goods_content">
          <div class="goods_items" v-for="item in goodsItems" @click="enterDetail(item)">
            <img class="goods_items_img"
                 :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'" alt=""/>
            <div class="goods_items_content">
              <div class="items_line1">
                <div class="line1_title">{{item.title}}</div>
                <div class="line1_text">
                  <div>发布时间</div>
                  <div style="margin-top: 2px">{{item.publish_time}}</div>
                </div>
                <div class="line1_text">
                  <div>浏览量</div>
                  <div style="margin-top: 2px">{{item.viewed_times+1}}</div>
                </div>
              </div>
              <div class="items_line2">
                <div class="tags" v-for="tag in item.tags">{{tag}}</div>
              </div>
              <div class="items_line3">{{item.content.body.substr(0,87)}}
                <span v-if="item.content.body.length>87">...</span>
              </div>
            </div>
          </div>
        </div>
        <div class="more_goods" @click="getMoreGoods" id="moreGoods">加载更多...</div>
      </div>
    </div>
    </div>
    <el-drawer
      :title="sideTitle"
      :visible.sync="sideCol"
      direction="rtl"
      size="300px"
      style="outline: transparent;">
      <div class="sideContent" id="sideContent">
        <div v-if="sideContent.length>0" v-for="item in sideContent" style="min-height: 80px;width: 100%;display: flex;align-items: center;border-bottom: 1px solid #eeeeee;padding: 5px 0;cursor: pointer" @click="enterDetail(item)">
          <div style="width: 40%;height: 100%;background: white;display: flex;align-items: center"><img :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'" alt="" style="width: 100%"></div>
          <div style="width: 55%;height: 80%;margin-left: 5%">
            <div style="font-size: 15px;width: 100%;height: 100%;font-weight:bolder;">
              <span style="border: 1px solid hotpink;
              padding: 0 2px;border-radius: 3px;
              color: hotpink;
              font-size: 13px;
              font-weight: normal;
              margin-right: 2px"
               v-if="item.category[1]==='表白墙'">{{item.category[1]}}</span>
              <span v-else style="border: 1px solid #fdc006;padding: 0 2px;border-radius: 3px;color: #fdc006;font-size: 13px;font-weight: normal;margin-right: 2px">{{item.category[1]}}</span>{{item.title}}</div>
          </div>
        </div>
<!--        <div v-if="sideContent.length>0" style="height: 50px;width: 100%;cursor:pointer;line-height: 50px;text-align: center;" @click="moreInfo">加载更多...</div>-->
        <div v-if="sideContent.length===0&&sideTitle!=='设置'" style="height: 100%;width: 100%;display: flex;align-items: center;justify-content: center;color: #72767b;">无</div>
        <div v-if="sideTitle==='设置'" style="height: 100%;width: 100%;color: #72767b;">接受短信</div>
      </div>
    </el-drawer>
    <tail id="pcmtail"/>
  </div>
</template>

<script>
    import Tail from "../../components/tail";
    import PMyHead from "../../components/PC/PmyHead";
    import BottomRouter from "../../components/bottomRouter";
    export default {
        name: "goods",
      components: {BottomRouter, PMyHead, Tail},
      data(){
          return{
            PsearchKeyWordOut:'',
            activeSubMenu:[],
            activeIndex:'1',
            types:[{
              category_id:'1',
              category_name:'本月热门',
              category_intro:'123',
              sub_category_list:[]
            },{
              category_id:'2',
              category_name:'个性推荐',
              category_intro:'123',
              sub_category_list:[]
            }],
            carousel_list:[
              '../../../static/picture/ads1.jpg',
              '../../../static/picture/ads2.jpg',
              '../../../static/picture/ads3.jpg',
            ],
            goodsItems:[],
            maxPage:1,
            more_goods:true,
            nowType:'',
            nowKeyword:'',
            nowTypeName:'本月热门',
            username:'',
            sideCol:false,
            sideTitle:'',
            sideContent:[]
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
          document.getElementById("root").style.width = Width - this.getScrollWidth() + "px";
          document.getElementById("root").style.background = "#f0f0f0";
          require('../../assets/css/pages/PC/goodsStylePC.css');
          this.$axios.get("/api/user/details/").then(res => {
            localStorage.setItem("username", res.data.data.username);
            this.$data.username = localStorage.getItem("username");
          }).catch(err => {
            console.log(err);
            localStorage.setItem("username",'');
            this.$data.username='';
          });
        },
        jump:function(name){
          this.$router.push({name:name});
        },
        handleOpenSubMenu:function(item){
          if(item.sub_category_list.length>0) {
            this.$data.activeSubMenu = [];
            for (let i = 0; i < item.sub_category_list.length; i++) {
              this.$data.activeSubMenu.push(item.sub_category_list[i]);
            }
            document.getElementById("submenu").style.display = "block";
          }
          else{
           this.handleCloseSubMenu();
          }
        },
        handleCloseSubMenu:function(){
          document.getElementById("submenu").style.display="none";
          this.$data.activeSubMenu=[];
        },
        getMoreGoods:function(){
          if(this.$data.more_goods) {
            if(this.$data.nowType==='') {
              if(this.$data.nowKeyword==='') {
                this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&is_main=1").then(res => {
                  for (let i = 0; i < res.data.data.article_list.length; i++)
                    this.$data.goodsItems.push(res.data.data.article_list[i]);
                  if (!res.data.data.has_next_page) {
                    document.getElementById("moreGoods").innerHTML = "已无更多";
                    document.getElementById("moreGoods").style.cursor = "auto";
                    this.$data.more_goods = false;
                  } else this.$data.maxPage++;
                }).catch(err => {
                  console.log(err);
                });
              }
              else{
                this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&keyword="+this.$data.nowKeyword).then(res => {
                  for (let i = 0; i < res.data.data.article_list.length; i++)
                    this.$data.goodsItems.push(res.data.data.article_list[i]);
                  if (!res.data.data.has_next_page) {
                    document.getElementById("moreGoods").innerHTML = "已无更多";
                    document.getElementById("moreGoods").style.cursor = "auto";
                    this.$data.more_goods = false;
                  } else this.$data.maxPage++;
                }).catch(err => {
                  console.log(err);
                });
              }
            }
            else{
              if(this.$data.nowKeyword==='') {
                this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&category="+this.$data.nowType+"&is_main=1").then(res => {
                  for (let i = 0; i < res.data.data.article_list.length; i++)
                    this.$data.goodsItems.push(res.data.data.article_list[i]);
                  if (!res.data.data.has_next_page) {
                    document.getElementById("moreGoods").innerHTML = "已无更多";
                    document.getElementById("moreGoods").style.cursor = "auto";
                    this.$data.more_goods = false;
                  } else this.$data.maxPage++;
                }).catch(err => {
                  console.log(err);
                });
              }
              else{
                this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&category="+this.$data.nowType+"&keyword="+this.$data.nowKeyword).then(res => {
                for (let i = 0; i < res.data.data.article_list.length; i++)
                  this.$data.goodsItems.push(res.data.data.article_list[i]);
                if (!res.data.data.has_next_page) {
                  document.getElementById("moreGoods").innerHTML = "已无更多";
                  document.getElementById("moreGoods").style.cursor = "auto";
                  this.$data.more_goods = false;
                } else this.$data.maxPage++;
              }).catch(err => {
                console.log(err);
              });

              }
            }
          }
        },
        getAllType:function() {
          this.$axios.get("/api/category/").then(res => {
            for (let i = 0; i < res.data.data.length; i++)
              this.$data.types.push(res.data.data[i]);
              console.log(document.cookie);
          }).catch(err => {
            console.log(err);
          })
        },
        firstTypeSearch:function(item){
          if(item.category_name==='本月热门') {
            location.reload();
          }
          else if(item.category_name==='个性推荐'){
            this.$message.error("123");
          }
        },
        secondTypeSearch:function(item){
          this.$data.maxPage=1;
          this.$data.goodsItems.splice(0,this.$data.goodsItems.length);
          this.$data.nowType=item.category_id;
          this.$data.nowKeyword='';
          this.$data.nowTypeName=item.category_name;
          this.$axios.get("/api/article/?page="+this.$data.maxPage+"&page_size=10&is_main=1&category="+item.category_id).then(res=>{
            for (let i = 0; i < res.data.data.article_list.length; i++)
              this.$data.goodsItems.push(res.data.data.article_list[i]);
            if (!res.data.data.has_next_page) {
              document.getElementById("moreGoods").innerHTML = "已无更多";
              document.getElementById("moreGoods").style.cursor = "auto";
              this.$data.more_goods = false;
            } else this.$data.maxPage++;

            const ddata={
              action_type: "category",
              record_data: item.category_id
            };
            const config= {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            this.$axios.post("/api/action/record/",JSON.stringify(ddata),config).then(res=>{
              console.log(res);
            }).catch(err=>{
              console.log(err);
            })

          }).catch(err=>{
            console.log(err);
          });
          this.handleCloseSubMenu();
        },
        getNewPsearchKeyWordOut:function(PsearchKeyWord){
          this.$data.PsearchKeyWordOut=PsearchKeyWord;
        },
        Psearch:function() {
          if (this.$data.PsearchKeyWordOut === '') location.reload();
          else {
            if(localStorage.getItem('history_search')) {
              let temp = JSON.parse(localStorage.getItem('history_search'));
              temp.push(this.$data.PsearchKeyWordOut);
              localStorage.setItem('history_search',JSON.stringify(temp));
            }
            else{
              let temp=[];
              temp.push(this.$data.PsearchKeyWordOut);
              localStorage.setItem('history_search',JSON.stringify(temp));
            }
            this.$data.nowKeyword = this.$data.PsearchKeyWordOut;
            this.$data.maxPage = 1;
            this.$data.nowType='';
            this.$data.nowTypeName='本月热门';
            this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&keyword=" + this.$data.nowKeyword).then(res => {
              this.$data.goodsItems.splice(0, this.$data.goodsItems.length);
              for (let i = 0; i < res.data.data.article_list.length; i++)
                this.$data.goodsItems.push(res.data.data.article_list[i]);
              if (!res.data.data.has_next_page) {
                document.getElementById("moreGoods").innerHTML = "已无更多";
                document.getElementById("moreGoods").style.cursor = "auto";
                this.$data.more_goods = false;
              } else this.$data.maxPage++;
            }).catch(err => {
              console.log(err);
            });
          }
        },
        clearType:function(){
          location.reload();
        },
        judgeHandleCloseSubMenu:function(e){
          if(e.offsetX>=500||e.offsetY<=0||e.clientY>=400){
            this.handleCloseSubMenu();
          }
        },
        judgeHandleCloseSubMenu1:function(e){
          if(e.offsetX<=0||e.clientY>=400){
            this.handleCloseSubMenu();
          }
        },
        enterDetail:function(item){
          this.$router.push({
            name:'PDetail',
            params:{
              articleId:item.id
            }
          })
        },
        openSideCol:function(name) {
          if (localStorage.getItem("username") !== '') {
            this.$data.sideContent.splice(0, this.$data.sideContent.length);
            this.$data.sideCol = true;
            this.$data.sideTitle = name;
            if (name === "我的收藏") {
              this.$axios.get("/api/user/like/").then(res => {
                for (let i = 0; i < res.data.data.length; i++)
                  this.$data.sideContent.push(res.data.data[i]);
              }).catch(err => {
                console.log(err);
              })
            } else if (name === "浏览记录") {
              this.$axios.get("/api/user/viewed/").then(res => {
                for (let i = 0; i < res.data.data.length; i++)
                  this.$data.sideContent.push(res.data.data[i]);
              }).catch(err => {
                console.log(err);
              })
            } else if (name === "已发布内容") {
              this.$axios.get("/api/user/published/").then(res => {
                for (let i = 0; i < res.data.data.length; i++)
                  this.$data.sideContent.push(res.data.data[i]);
              }).catch(err => {
                console.log(err);
              })
            }
          } else {
            this.$message.error("请登录后查看！");
            this.jump("PLogin");
          }
        },
        moreInfo:function(){

        },

      },
      mounted() {
        this.init();
        this.getAllType();
        this.getMoreGoods();
      },

    }
</script>

<style scoped>

</style>
