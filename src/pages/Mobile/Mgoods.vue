<template>
  <div id="root">
    <MMyHead default-active="2"
             v-bind:MsearchKeyWordOut="MsearchKeyWordOut"
             v-on:update:MsearchKeyWord="getNewMsearchKeyWordOut"
             v-on:Msearch="Msearch"/>
    <div class="mbac">
    <div class="madjust">
      <div class="mgoods_main">
        <div class="mgoods_header">
          <div class="mgoods_header_left">
          </div>
          <div class="mgoods_header_right">
            <el-carousel :interval="5000" arrow="always" height="150px">
            <el-carousel-item v-for="item in carousel_list" :key="item">
              <img :src="item" alt="" style="height: 100%;width: 100%;"/>
            </el-carousel-item>
          </el-carousel>
          </div>
          <div class="mads">
            <div class="mads_item">
              <img src="../../../static/picture/kw1.jpg" style="height: 100%;width: 100%" alt="">
            </div>
            <div class="mads_item">
              <img src="../../../static/picture/kw2.jpg" style="height: 100%;width: 100%" alt="">
            </div>
          </div>
        </div>
        <div class="mmobile-type">
          <img class="mmobile-type-item" src="../../../static/picture/temp1.png"/>
          <img class="mmobile-type-item" src="../../../static/picture/temp2.png"/>
          <img class="mmobile-type-item" src="../../../static/picture/temp3.png"/>
          <img class="mmobile-type-item" src="../../../static/picture/temp5.png"/>
          <img class="mmobile-type-item" src="../../../static/picture/temp8.png"/>
          <img class="mmobile-type-item" src="../../../static/picture/temp4.png"/>
          <img class="mmobile-type-item" src="../../../static/picture/temp7.png"/>
          <img class="mmobile-type-item" src="../../../static/picture/temp6.png"/>
        </div>
        <div class="malreadyType">当前类目：{{this.$data.nowTypeName}}
          <div class="mclearAlreadyType" @click="clearType" v-if="this.$data.nowTypeName!=='热门'">清空已选</div>
        </div>
        <div class="mgoods_order">
          <div class="mgoods_time">按热度↓</div>
          <div class="mgoods_see">按时间</div>
        </div>
        <div class="mline"></div>
        <div class="mgoods_content">
          <div class="mgoods_content_col1">
            <div class="mgoods_items" v-for="item in goodsItems1">
              <img class="mgoods_items_img" :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'" alt=""/>
              <div class="mgoods_items_content">
                <div class="mitems_line1">
                  <div class="mline1_title">{{item.title}}
                  </div>
                  <div class="mline1_date">{{item.publish_time}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mgoods_content_col2">
            <div class="mgoods_items" v-for="item in goodsItems2">
              <img class="mgoods_items_img" :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'" alt=""/>
              <div class="mgoods_items_content">
                <div class="mitems_line1">
                  <div class="mline1_title">{{item.title}}
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
        <div class="mmore_goods" @click="mgetMoreGoods" id="mmoreGoods">加载更多...</div>
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
          goodsItems: [],
          goodsItems1: [],
          goodsItems2: [],
          maxPage: 1,
          more_goods: true,
          nowType: '',
          nowKeyword: '',
          nowTypeName: '热门'
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
              this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&is_main=1").then(res => {
                for (let i = 0; i < res.data.data.article_list.length; i++) {
                  this.$data.goodsItems.push(res.data.data.article_list[i]);
                  if(i%2===0) this.$data.goodsItems1.push(res.data.data.article_list[i]);
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
                this.$data.goodsItems.push(res.data.data.article_list[i]);
                if(i%2!==0) this.$data.goodsItems1.push(res.data.data.article_list[i]);
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
        getNewMsearchKeyWordOut: function (MsearchKeyWord) {
          this.$data.MsearchKeyWordOut = MsearchKeyWord;
        },
        Msearch: function () {
          if (this.$data.MsearchKeyWordOut === '') location.reload();
          else {
            this.$data.nowKeyword = this.$data.MsearchKeyWordOut;
            this.$data.maxPage = 1;
            this.$data.nowType = '';
            this.$data.nowTypeName = '热门';
            this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&keyword=" + this.$data.nowKeyword).then(res => {
              this.$data.goodsItems.splice(0, this.$data.goodsItems.length);
              for (let i = 0; i < res.data.data.article_list.length; i++)
                this.$data.goodsItems.push(res.data.data.article_list[i]);
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
      },
        mounted() {
          this.init();
          this.mgetMoreGoods();
        },

      }
</script>

<style scoped>

</style>
