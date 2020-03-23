<template>
  <div id="root">
    <MMyHead default-active="2"
             v-bind:MsearchKeyWordOut="MsearchKeyWordOut"
             v-on:update:MsearchKeyWord="getNewMsearchKeyWordOut"
             v-on:Msearch="Msearch"
             v-on:MfocusInput="MfocusInput"
             ref="mi"/>
    <div class="mbac" id="mbac">
      <div class="gmadjust">
        <div class="mgoods_main">
          <div class="mgoods_header">
            <div class="mgoods_header_right">
              <el-carousel :interval="5000" arrow="always" height="200px">
                <el-carousel-item v-for="item in carousel_list" :key="item">
                  <img :src="item" alt="" style="height: 100%;width: 100%;"/>
                </el-carousel-item>
              </el-carousel>
            </div>
            <!--          <div class="mads">-->
            <!--            <div class="mads_item">-->
            <!--              <img src="../../../static/picture/kw1.jpg" style="height: 100%;width: 100%" alt="">-->
            <!--            </div>-->
            <!--            <div class="mads_item">-->
            <!--              <img src="../../../static/picture/kw2.jpg" style="height: 100%;width: 100%" alt="">-->
            <!--            </div>-->
            <!--          </div>-->
          </div>
          <div class="mmobile-type">
            <div class="mmmobileTypeItem" @click="clearType">
              <img class="mmobile-type-item" src="../../../static/picture/热门.png"/>
              <div style="height: 20%;width: 100%;text-align: center;color: #4b4b4b;font-size: 14px">本月热门</div>
            </div>
            <div class="mmmobileTypeItem">
              <img class="mmobile-type-item" src="../../../static/picture/推荐.png"/>
              <div style="height: 20%;width: 100%;text-align: center;color: #4b4b4b;font-size: 14px">个性推荐</div>
            </div>
            <div class="mmmobileTypeItem">
              <img class="mmobile-type-item" src="../../../static/picture/毕业季.png"/>
              <div style="height: 20%;width: 100%;text-align: center;color: #4b4b4b;font-size: 14px">毕业季</div>
            </div>
            <div class="mmmobileTypeItem" @click="jump('MType')">
              <img class="mmobile-type-item" src="../../../static/picture/其他.png"/>
              <div style="height: 20%;width: 100%;text-align: center;color: #4b4b4b;font-size: 14px">其他</div>
            </div>
          </div>
          <div class="malreadyType">当前：{{this.$data.nowTypeName}}
            <div class="mclearAlreadyType" @click="clearType" v-if="this.$data.nowTypeName!=='本月热门'">清空已选</div>
          </div>
          <!--        <div class="mgoods_order">-->
          <!--          <div class="mgoods_time">按热度↓</div>-->
          <!--          <div class="mgoods_see">按时间</div>-->
          <!--        </div>-->
          <div class="mline"></div>
          <div class="mgoods_content">
            <div class="mgoods_content_col1">
              <div class="mgoods_items" v-for="item in goodsItems1" @click="enterDetail(item)">
                <img class="mgoods_items_img"
                     :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'"
                     alt=""/>
                <div class="mgoods_items_content">
                  <div class="mitems_line1">
                    <div class="mline1_title">
                      <span style="padding: 1px 4px;font-size: 13px;color: #fdc006;border-radius: 3px;border: 1px solid #fdc006">{{item.category[1]}}</span>
                      {{item.title}}
                    </div>
                    <div class="mline1_number" v-if="item.category[1]==='拼车'||item.category[1]==='约玩/约学习'">
                      <el-icon class="el-icon-user" style="margin-right: 3px"></el-icon>
                      {{item.content.now_number}}/{{item.content.total_number}}人
                    </div>
                    <div class="mline1_date">{{item.publish_time}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mgoods_content_col2">
              <div class="mgoods_items" v-for="item in goodsItems2" @click="enterDetail(item)">
                <img class="mgoods_items_img"
                     :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'"
                     alt=""/>
                <div class="mgoods_items_content">
                  <div class="mitems_line1">
                    <div class="mline1_title">
                      <span style="padding: 1px 4px;font-size: 13px;color: #fdc006;border-radius: 3px;border: 1px solid #fdc006">{{item.category[1]}}</span>
                      {{item.title}}
                    </div>
                    <div class="mline1_number" v-if="item.category[1]==='拼车'||item.category[1]==='约玩/约学习'">
                      <el-icon class="el-icon-user" style="margin-right: 3px"></el-icon>
                      {{item.content.now_number}}/{{item.content.total_number}}人
                    </div>
                    <div class="mline1_date">{{item.publish_time}}</div>
                  </div>
                </div>
              </div>
            </div>
            <!--          <div class="mgoods_items" v-for="item in goodsItems">-->
            <!--            <img class="mgoods_items_img" :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'" alt=""/>-->
            <!--            <div class="mgoods_items_content">-->
            <!--              <div class="mitems_line1">-->
            <!--                <div class="mline1_title">{{item.title.substr(0,10)}}-->
            <!--                  <span v-if="item.title.length>10">...</span>-->
            <!--                </div>-->
            <!--                <div class="mline1_date">{{item.publish_time}}</div>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--          </div>-->
          </div>
          <div class="mmore_goods" @click="mgetMoreGoods" id="mmoreGoods">点击加载更多...</div>
        </div>
      </div>
      <div class="releaseFontButton">
        <img src="../../../static/picture/releaseFont.png" style="height: 43px;margin-top: 37px;margin-left: 22px" @click="MwantRelease" />
      </div>
    </div>
    <div id="focusInputDiv" class="MfocusInputDiv" @click="cancelFocusInput">
      <div class="MhotSearch">
        <div style="padding: 8px;font-size: 13px">热门搜索</div>
        <div class="MhotSearchMain">
          <div v-for="item in search_hot" class="MhotSearchItem" @click="clickQuickSearch(item)">{{item}}</div>
        </div>
      </div>
      <div class="MhistorySearch">
        <div style="width: 100%;display: flex;justify-content: space-between">
          <div style="margin: 8px;font-size: 13px">搜索历史</div>
          <div style="margin-top:8px;font-size: 13px;color: #8cc5ff;padding-right: 10px" v-if="this.$data.search_history.length>0"
               @click="clearSearchHistory">清空记录
          </div>
        </div>
        <div class="MhistorySearchMain">
          <div v-for="item in search_history" class="MhistorySearchItem" @click="clickQuickSearch(item)">{{item}}</div>
          <div v-if="search_history.length===0">无</div>
        </div>
      </div>
    </div>
    <bottom-router id="pcmbottomrouter" default-active="1"></bottom-router>

  </div>
</template>

<script>
  import Tail from "../../components/tail";
  import MMyHead from "../../components/Mobile/MmyHead";
  import BottomRouter from "../../components/bottomRouter";

  export default {
    name: "goods",
    components: {BottomRouter, MMyHead, Tail},
    data() {
      return {
        MsearchKeyWordOut: '',
        activeIndex: '1',
        carousel_list: [
          '../../../static/picture/ads1.jpg',
          '../../../static/picture/ads2.jpg',
          '../../../static/picture/ads3.jpg',
        ],
        goodsItems1: [],
        goodsItems2: [],
        maxPage: 1,
        more_goods: true,
        nowType: '',
        nowKeyword: '',
        nowTypeName: '本月热门',
        search_history: [],
        search_hot: []
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
        document.getElementById("root").style.background = "#f0f0f0";
        require('../../assets/css/pages/Mobile/goodsStyleMobile.css');
        if(sessionStorage.getItem("MsearchKeyWordOut")) {
          this.$data.nowKeyword=sessionStorage.getItem("MsearchKeyWordOut");
          this.$refs.mi.setSearchInput(this.$data.nowKeyword);
        }
        if (sessionStorage.getItem("nowType")) {
          this.$data.nowType = sessionStorage.getItem("nowType");
        }
        if (sessionStorage.getItem("nowTypeName")) {
          this.$data.nowTypeName = sessionStorage.getItem("nowTypeName");
        }
      },
      jump: function (name) {
        this.$router.push({name: name});
      },
      mgetMoreGoods: function () {
        if (this.$route.params.choosenType && this.$route.params.choosenTypeName) {
          this.$data.nowType = this.$route.params.choosenType;
          this.$data.nowTypeName = this.$route.params.choosenTypeName;
        }
        if (this.$data.more_goods) {
          if (this.$data.nowType === '') {
            if(this.$data.nowKeyword === '') {
              this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&is_main=1").then(res => {
                for (let i = 0; i < res.data.data.article_list.length; i++) {
                  if (i % 2 === 0) this.$data.goodsItems1.push(res.data.data.article_list[i]);
                  else this.$data.goodsItems2.push(res.data.data.article_list[i]);
                }
                if (!res.data.data.has_next_page) {
                  document.getElementById("mmoreGoods").innerHTML = "已无更多";
                  document.getElementById("mmoreGoods").style.cursor = "auto";
                  this.$data.more_goods = false;
                } else this.$data.maxPage++;
              }).catch(err => {
                console.log(err);
              });
            }
            else{
              this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&keyword="+this.$data.nowKeyword).then(res => {
                for (let i = 0; i < res.data.data.article_list.length; i++) {
                  if (i % 2 === 0) this.$data.goodsItems1.push(res.data.data.article_list[i]);
                  else this.$data.goodsItems2.push(res.data.data.article_list[i]);
                }
                if (!res.data.data.has_next_page) {
                  document.getElementById("mmoreGoods").innerHTML = "已无更多";
                  document.getElementById("mmoreGoods").style.cursor = "auto";
                  this.$data.more_goods = false;
                } else this.$data.maxPage++;
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&is_main=1&category=" + this.$data.nowType).then(res => {
              for (let i = 0; i < res.data.data.article_list.length; i++) {
                if (i % 2 === 0) this.$data.goodsItems1.push(res.data.data.article_list[i]);
                else this.$data.goodsItems2.push(res.data.data.article_list[i]);
              }
              if (!res.data.data.has_next_page) {
                document.getElementById("mmoreGoods").innerHTML = "已无更多";
                document.getElementById("mmoreGoods").style.cursor = "auto";
                this.$data.more_goods = false;
              } else this.$data.maxPage++;
            }).catch(err => {
              console.log(err);
            });
          }
        }
      },
      getNewMsearchKeyWordOut: function (MsearchKeyWord) {
        this.$data.MsearchKeyWordOut = MsearchKeyWord;
      },
      Msearch: function () {
        document.getElementById("mbac").style.display = "block";
        document.getElementById("pcmbottomrouter").style.display = "flex";
        document.getElementById("focusInputDiv").style.display = "none";
        if (this.$data.MsearchKeyWordOut === '') location.reload();
        else {
          if (localStorage.getItem('history_search')) {
            let temp = JSON.parse(localStorage.getItem('history_search'));
            temp.push(this.$data.MsearchKeyWordOut);
            localStorage.setItem('history_search', JSON.stringify(temp));
          } else {
            let temp = [];
            temp.push(this.$data.MsearchKeyWordOut);
            localStorage.setItem('history_search', JSON.stringify(temp));
          }
          this.$data.nowKeyword = this.$data.MsearchKeyWordOut;
          this.$data.maxPage = 1;
          this.$data.nowType = '';
          this.$data.nowTypeName = '本月热门';
          this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&keyword=" + this.$data.nowKeyword).then(res => {
            this.$data.goodsItems1.splice(0, this.$data.goodsItems1.length);
            this.$data.goodsItems2.splice(0, this.$data.goodsItems2.length);
            for (let i = 0; i < res.data.data.article_list.length; i++) {
              if (i % 2 === 0) this.$data.goodsItems1.push(res.data.data.article_list[i]);
              else this.$data.goodsItems2.push(res.data.data.article_list[i]);
            }
            if (!res.data.data.has_next_page) {
              document.getElementById("mmoreGoods").innerHTML = "已无更多";
              document.getElementById("mmoreGoods").style.cursor = "auto";
              this.$data.more_goods = false;
            } else this.$data.maxPage++;
          }).catch(err => {
            console.log(err);
          });
        }
      },
      clearType: function () {
        location.reload();
      },
      MfocusInput: function () {
        document.getElementById("mbac").style.display = "none";
        document.getElementById("pcmbottomrouter").style.display = "none";
        document.getElementById("focusInputDiv").style.display = "block";
        this.$data.search_history.splice(0, this.$data.search_history.length);
        if (localStorage.getItem('history_search')) {
          let temp = JSON.parse(localStorage.getItem('history_search'));
          if (temp.length > 30) {
            temp.splice(0, 10);
            localStorage.setItem('history_search', JSON.stringify(temp));
          }
          if (temp.length < 10) {
            for (let i = temp.length - 1; i >= 0; i--)
              this.$data.search_history.push(temp[i]);
          } else {
            for (let i = temp.length - 1; i >= temp.length - 10; i--)
              this.$data.search_history.push(temp[i]);
          }
        }
      },
      cancelFocusInput: function () {
        document.getElementById("mbac").style.display = "block";
        document.getElementById("pcmbottomrouter").style.display = "flex";
        document.getElementById("focusInputDiv").style.display = "none";
      },
      clickQuickSearch: function (item) {
        this.$refs.mi.setSearchInput(item);
        this.$data.MsearchKeyWordOut = item;
        this.Msearch();
      },
      clearSearchHistory: function () {
        localStorage.removeItem("history_search");
      },
      enterDetail: function (item) {
        this.$router.push({
          name: 'MDetail',
          params: {
            articleId: item.id
          }
        })
      },
      MwantRelease: function () {
        console.log(localStorage.getItem("username"));
        if (localStorage.getItem("username") !== '') {
          this.jump("MRelease");
        } else {
          this.$message.error("请登录！");
          this.jump("MLogin");
        }
      },
      getSearchHot:function(){
        this.$axios.get("/api/article/hot_words/").then(res=>{
          for(let i=0;i<res.data.data.length;i++)
            this.$data.search_hot.push(res.data.data[i]);
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    mounted() {
      this.init();
      this.mgetMoreGoods();
      this.getSearchHot();
    },
    beforeRouteLeave(to, from, next) {
      if (to.name === "MDetail") {
        if(this.$data.MsearchKeyWordOut!=='') sessionStorage.setItem("MsearchKeyWordOut",this.$data.MsearchKeyWordOut);
        if (this.$data.nowType !== '') sessionStorage.setItem("nowType", this.$data.nowType);
        if (this.$data.nowTypeName !== '') sessionStorage.setItem("nowTypeName", this.$data.nowTypeName);
        next();
      } else {
        sessionStorage.removeItem("MsearchKeyWordOut");
        sessionStorage.removeItem("nowType");
        sessionStorage.removeItem("nowTypeName");
        next();
      }
    },
    beforeRouteEnter(to,from,next){
      if(from.name!=='MDetail'){
        sessionStorage.removeItem("MsearchKeyWordOut");
        sessionStorage.removeItem("nowType");
        sessionStorage.removeItem("nowTypeName");
      }
      next();
    }

  }
</script>

<style scoped>

</style>
