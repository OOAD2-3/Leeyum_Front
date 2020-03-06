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
        </div>
        <div class="alreadyType">当前类目：{{this.$data.nowTypeName}}
          <div class="clearAlreadyType" @click="clearType" v-if="this.$data.nowTypeName!=='热门'">清空已选</div>
        </div>
        <div class="goods_order">
          <div class="goods_time">按热度↓</div>
          <div class="goods_see">按时间</div>
        </div>
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
                  <div style="margin-top: 2px">{{item.see}}</div>
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
              category_name:'热门',
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
            nowTypeName:'热门'
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
          if(Width>1200)
            require('../../assets/css/pages/PC/goodsStylePC.css');
          else{
            this.jump("MGoods");
          }
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
          if(item.sub_category_list.length===0) {
            location.reload();
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
            this.$data.nowTypeName='热门';
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
        }

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
