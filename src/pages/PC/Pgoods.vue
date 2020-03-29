<template>
  <div id="root">

    <PMyHead default-active="2"
             v-bind:PsearchKeyWordOut="PsearchKeyWordOut"
             v-on:update:PsearchKeyWord="getNewPsearchKeyWordOut"
             v-on:Psearch="Psearch"
             ref="pi"/>
    <div class="bac1">
      <div class="adjust">
        <div class="goods_main">
          <div class="goods_header">
            <div class="goods_header_left" @mouseleave="judgeHandleCloseSubMenu1">
              <div class="type_see">
                <div v-for="item in types" class="type_items" @mouseenter="handleOpenSubMenu(item)"
                     @click="firstTypeSearch(item)">
                  <img src="../../../static/picture/火热.png" v-if="item.category_name==='本月热门'"
                       style="height: 18px;margin-right: 3px" alt=""/>
                  <img src="../../../static/picture/个性推荐.png" v-if="item.category_name==='个性推荐'"
                       style="height: 18px;margin-right: 3px" alt=""/>
                  {{item.category_name}}
                </div>
              </div>
            </div>
            <div class="submenu" id="submenu" v-model="activeSubMenu" @mouseleave="judgeHandleCloseSubMenu">
              <div class="submenuItem" v-for="i in activeSubMenu" @click="secondTypeSearch(i)">
                <img :src="i.pic_url" alt="" style="height: 50px;"/>
                <div>{{i.category_name}}</div>
              </div>
            </div>
            <div class="goods_header_right">
              <el-carousel :interval="5000" arrow="always" height="400px" id="car1">
                <el-carousel-item v-for="item in carousel_list" :key="item">
                  <img :src="item" alt="" style="height: 100%;width: 100%;"/>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="ads">
              <div class="ads_item" style="margin-bottom: 10px" @click="biyeji">
                <img
                  src="https://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/%E6%AF%95%E4%B8%9A%E5%AD%A3.jpg"
                  style="height: 100%;width: 100%">
              </div>
              <div class="ads_item" @click="$message({message:'敬请期待',type:'info'})">
                <img
                  src="https://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/%E6%95%AC%E8%AF%B7%E6%9C%9F%E5%BE%85.jpg"
                  style="height: 100%;width: 100%">
              </div>
            </div>
            <div class="personalInfo">
              <div class="personalInfoOne">
                <img :src="touxiangUrl" alt="" style="height: 55px;border-radius: 55px">
                <div class="personalInfoOneLogin" v-if="this.$data.username===''">
                  <div style="height: 25%;width: 100%">Hi~欢迎逛流云!</div>
                  <div style="height: 25%;width: 100%;display: flex">
                    <div class="loginOr" @click="jump('PLogin')">登陆 | 注册</div>
                  </div>
                </div>
                <div class="personalInfoOneLogin" v-if="this.$data.username!==''">
                  <div style="height: 25%;width: 100%">Hi~ {{username.substr(0,4)}}
                    <span v-if="this.$data.username.length>5">..</span>
                  </div>
                  <div style="height: 25%;width: 100%;display: flex">欢迎逛流云!</div>
                </div>

              </div>
              <div
                style="background: linear-gradient(270deg,white,#eeeeee,#eeeeee,white);height: 1px;width: 100%"></div>
              <!--            <div class="personalInfoTwo">-->
              <!--              <div class="personalInfoTwoTitle">流云快报</div>-->
              <!--              <div style="height: 90px;width: 100%">-->
              <!--                <div class="quickNewItem">-->
              <!--                  <div class="quickNewItemTag">热议</div>-->
              <!--                  <div class="quickNewItemContent">还正在为买不到口罩...</div>-->
              <!--                </div>-->
              <!--                <div class="quickNewItem">-->
              <!--                  <div class="quickNewItemTag">HOT</div>-->
              <!--                  <div class="quickNewItemContent">抗击疫情，3Q医用口...</div>-->
              <!--                </div>-->
              <!--                <div class="quickNewItem">-->
              <!--                  <div class="quickNewItemTag">最新</div>-->
              <!--                  <div class="quickNewItemContent">降了！iPhone 11官方...</div>-->
              <!--                </div>-->
              <!--                <div class="quickNewItem">-->
              <!--                  <div class="quickNewItemTag">推荐</div>-->
              <!--                  <div class="quickNewItemContent">骁龙865对比麒麟999...</div>-->
              <!--                </div>-->
              <!--              </div>-->
              <!--            </div>-->
              <!--            <div style="background: linear-gradient(270deg,white,#eeeeee,#eeeeee,white);height: 1px;width: 100%"></div>-->
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
                <div class="personalInfoDetailItem" style="margin-top: 10px" @click="openSideCol('加入的组队')">
                  <img src="../../../static/picture/组队.png" alt="" style="height: 25px">
                  <div style="height: 25px;font-size: 14px;margin-top: 2px">加入的组队</div>
                </div>
                <div class="personalInfoDetailItem" style="margin-top: 10px" @click="openSideCol('设置')">
                  <img src="../../../static/picture/设置.png" alt="" style="height: 25px">
                  <div style="height: 25px;font-size: 14px;margin-top: 2px">设置</div>
                </div>
              </div>
            </div>
          </div>


          <div class="alreadyType">当前：{{this.$data.nowTypeName}}
            <div class="clearAlreadyType" @click="monthly_hot" v-if="this.$data.nowTypeName!=='本月热门'">清空已选</div>
            <div class="clearAlreadyType" @click="selfRecommend" v-if="this.$data.nowTypeName==='个性推荐'">换一波</div>
          </div>
          <!--        <div class="goods_order">-->
          <!--          <div class="goods_time">按热度↓</div>-->
          <!--          <div class="goods_see">按时间</div>-->
          <!--        </div>-->
          <div class="line"></div>
          <div class="goods_content">
            <div class="goods_items" v-for="item in goodsItems" @click="enterDetail(item)">
              <img class="goods_items_img"
                   :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'"
                   alt=""/>
              <div class="goods_items_content">
                <div class="items_line1">
                  <div class="line1_title">
                    <span v-if="item.category[1]==='表白墙'"
                          style="border: hotpink 1px solid;border-radius: 3px;font-size: 14px;padding: 1px 3px;color: hotpink;font-weight: normal;">{{item.category[1]}}</span>
                    <span v-else-if="item.category[1]==='广告'"
                          style="border: #858585 1px solid;border-radius: 3px;font-size: 14px;padding: 1px 3px;color: #858585;font-weight: normal;">{{item.category[1]}}</span>
                    <span v-else
                          style="border: #fdc006 1px solid;border-radius: 3px;font-size: 14px;padding: 1px 3px;color: #fdc006;font-weight: normal;">{{item.category[1]}}</span>
                    <span style="">{{item.title}}</span>
                  </div>
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

                <div class="items_line3">{{item.content.body.substr(0,50)}}
                  <span v-if="item.content.body.length>50">...</span>
                </div>

                <div
                  v-if="item.category[1]==='拼车'||item.category[1]==='约玩/约学习'"
                  class="items_line4">
                  <el-icon class="el-icon-user" style="padding-right: 2px"></el-icon>
                  当前人数 {{item.content.now_number}}/{{item.content.total_number}}
                </div>
                <div
                  v-if="item.category[1]==='求购'||item.category[1]==='出售'"
                  class="items_line4">
                  <div style="height: 100%;width: 50%">
                    <el-icon class="el-icon-money" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                    ￥{{item.content.price}}
                  </div>
                  <div style="height: 100%;width: 50%;color:#3c3c3c;">
                    <el-icon class="el-icon-magic-stick" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                    {{item.content.new_or_old}}成新
                  </div>
                </div>
                <div
                  v-if="item.category[1]==='求租'||item.category[1]==='出借'"
                  class="items_line4">
                  <div style="height: 100%;width: 50%">
                    <el-icon class="el-icon-money" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                    ￥{{item.content.price}}
                  </div>
                  <div style="height: 100%;width: 50%;color:#3c3c3c;">
                    <el-icon class="el-icon-magic-stick" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                    租借天数 {{item.content.time_span}}
                  </div>
                </div>
                <div
                  v-if="item.category[1]==='家教'"
                  class="items_line4">
                  <div style="height: 100%;width: 50%">
                    <el-icon class="el-icon-money" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                    ￥{{item.content.price}}/节次
                  </div>
                  <div style="height: 100%;width: 50%;color:#3c3c3c;">
                    <el-icon class="el-icon-time" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                    时间 {{item.content.time}}
                  </div>
                </div>

                <div
                  v-if="item.category[1]==='学校事务'||item.category[1]==='其他兼职'"
                  class="items_line4">
                  <div style="height: 100%;width: 50%">
                    <el-icon class="el-icon-money" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                    ￥{{item.content.price}}
                  </div>
                  <div style="height: 100%;width: 50%;color:#3c3c3c;">
                    <el-icon class="el-icon-time" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                    时间 {{item.content.time}}
                  </div>
                </div>
                <div
                  v-if="item.category[1]==='志愿者招聘'"
                  class="items_line4">
                  <div style="height: 100%;width: 50%;color:#3c3c3c;">
                    <el-icon class="el-icon-time" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                    时间 {{item.content.time}}
                  </div>
                  <div style="height: 100%;width: 50%;color:#3c3c3c;">
                    <el-icon class="el-icon-place" style="padding-right: 2px;color: #3c3c3c"></el-icon>
                    地点 {{item.content.place}}
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="more_goods" @click="getMoreGoods" id="moreGoods">点击加载更多...</div>
        </div>
      </div>
    </div>
    <el-drawer
      :title="sideTitle"
      :visible.sync="sideCol"
      direction="rtl"
      size="400px"
      style="outline: transparent;">
      <div class="sideContent" id="sideContent">
        <div v-if="sideTitle==='浏览记录'&&sideContent.length>0"
             style="width: 100%;text-align: right;font-size: 13px;color: #2d8cf0;cursor: pointer" @click="clearSee">
          清空浏览记录
        </div>
        <div v-if="sideContent.length>0" v-for="item in sideContent"
             style="min-height: 80px;width: 100%;display: flex;align-items: center;border-bottom: 1px solid #eeeeee;padding: 5px 0;cursor: pointer">
          <div style="width: 30%;height: 100%;background: white;display: flex;align-items: center"
               @click="enterDetail(item)">
            <img
              :src="item.pic_urls.length>0?item.pic_urls[0]:'http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png'"
              alt="" style="width: 100%">
          </div>
          <div style="width: 50%;height: 80%;margin-left: 5%" @click="enterDetail(item)">
            <div style="font-size: 15px;width: 100%;height: 100%;font-weight:bolder;">
              <span style="border: 1px solid hotpink;
              padding: 0 2px;border-radius: 3px;
              color: hotpink;
              font-size: 13px;
              font-weight: normal;
              margin-right: 2px"
                    v-if="item.category[1]==='表白墙'">{{item.category[1]}}</span>
              <span v-else
                    style="border: 1px solid #fdc006;padding: 0 2px;border-radius: 3px;color: #fdc006;font-size: 13px;font-weight: normal;margin-right: 2px">{{item.category[1]}}</span>{{item.title}}
            </div>
          </div>
          <div v-if="sideTitle==='已发布内容'" class="sideButton">
            <img src="../../../static/picture/下架.png"
                 alt=""
                 style="height: 21px;"
                 @click="xiajia(item)"
                 @mouseover="sideButtonIn(item.id)"
                 @mouseout="sideButtonOut(item.id)"
                 :id="item.id"/>
          </div>
          <div v-if="sideTitle==='我的收藏'" class="sideButton" @click="deleteLike(item)">
            <el-icon class="el-icon-star-on"
                     @mouseover="sideButtonIn(item.id)"
                     @mouseout="sideButtonOut(item.id)"
                     :id="item.id">
            </el-icon>
          </div>
          <div v-if="sideTitle==='加入的组队'" class="sideButton">
            <img src="../../../static/picture/退出.png"
                 alt=""
                 style="height: 21px;"
                 @click="leaveTeam(item)"
                 @mouseover="sideButtonIn(item.id)"
                 @mouseout="sideButtonOut(item.id)"
                 :id="item.id"/>
          </div>
          <div v-if="sideTitle==='浏览记录'" class="sideButton">
            <img src="../../../static/picture/浏览.png" alt=""
                 style="height: 21px;"
                 @click="xiajia(item)"
                 @mouseover="sideButtonIn(item.id)"
                 @mouseout="sideButtonOut(item.id)"
                 :id="item.id"/>
          </div>
        </div>
        <!--        <div v-if="sideContent.length>0" style="height: 50px;width: 100%;cursor:pointer;line-height: 50px;text-align: center;" @click="moreInfo">加载更多...</div>-->
        <div v-if="sideContent.length===0&&sideTitle!=='设置'"
             style="height: 100%;width: 100%;display: flex;align-items: center;justify-content: center;color: #72767b;">
          无
        </div>
        <div v-if="sideTitle==='设置'" style="height: 90%;width: 100%;color: #72767b;position: relative;">
          <div
            style="height: 100px;width: 100%;display:flex;justify-content:center;margin-bottom: 20px;position: relative">
            <input style="height: 100px;
            border-radius: 100px;
            width: 100px;
            opacity: 0;
            z-index: 999;
            cursor: pointer"
                   type="file"
                   @change="handleTouxiang"/>
            <img :src="touxiangUrl" alt=""
                 style="height: 100px;position: absolute;z-index: 0;top: 0;left: 125px"/>
          </div>
          <div
            style="display: flex;font-size: 15px;justify-content: space-between;margin-bottom: 20px;height: 30px;align-items: center">
            <span>用户名：</span>
            <input style="width: 200px;border: 1px solid #cbcbcb;border-radius: 3px;height: 25px;padding: 0 3px"
                   v-model="username"></input>
          </div>
          <div
            style="display: flex;font-size: 15px;justify-content: space-between;margin-bottom: 20px;height: 30px;align-items: center">
            <span>联系方式：</span>
            <input style="width: 200px;border: 1px solid #cbcbcb;border-radius: 3px;height: 25px;padding: 0 3px"
                   v-model="userPhoneNumber"></input>
          </div>
          <div
            style="display: flex;font-size: 15px;justify-content: space-between;margin-bottom: 15px;height: 30px;align-items: center">
            <span>允许将发布的信息推荐给其他用户</span>
            <el-switch
              active-color="#fdc006"
              v-model="accept_publish_article_recommend_to_others">
            </el-switch>
          </div>
          <div style="display: flex;font-size: 15px;justify-content: space-between;height: 30px;align-items: center">
            <span>接受推荐短信</span>
            <el-switch
              v-model="accept_recommended_message"
              active-color="#fdc006">
            </el-switch>
          </div>

          <button class="settingsButton" @click="saveSettings">保存设置</button>
        </div>
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
    data() {
      return {
        PsearchKeyWordOut: '',
        activeSubMenu: [],
        activeIndex: '1',
        types: [{
          category_id: '1',
          category_name: '本月热门',
          category_intro: '123',
          sub_category_list: []
        }, {
          category_id: '2',
          category_name: '个性推荐',
          category_intro: '123',
          sub_category_list: []
        }],
        carousel_list: [
          '../../../static/picture/ads1.jpg',
          '../../../static/picture/ads2.jpg',
          '../../../static/picture/ads3.jpg',
        ],
        goodsItems: [],
        userPhoneNumber: '',
        maxPage: 1,
        more_goods: true,
        nowType: '',
        nowKeyword: '',
        nowTypeName: '本月热门',
        username: '',
        sideCol: false,
        sideCol1: true,
        sideTitle: '',
        sideContent: [],
        accept_publish_article_recommend_to_others: true,
        accept_recommended_message: true,
        touxiangUrl: ''
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
        require('../../assets/css/pages/PC/goodsStylePC.css');
        if (sessionStorage.getItem("PsearchKeyWordOut")) {
          this.$data.nowKeyword = sessionStorage.getItem("PsearchKeyWordOut");
          this.$refs.pi.setSearchInput(this.$data.nowKeyword);
        }
        if (sessionStorage.getItem("nowType")) {
          this.$data.nowType = sessionStorage.getItem("nowType");
        }
        if (sessionStorage.getItem("nowTypeName")) {
          this.$data.nowTypeName = sessionStorage.getItem("nowTypeName");
        }
        this.$axios.get("/api/user/details/").then(res => {
          localStorage.setItem("username", res.data.data.username);
          this.$data.username = localStorage.getItem("username");
          this.$data.userPhoneNumber = res.data.data.phone_number;
          this.$data.touxiangUrl = res.data.data.profile_avatar_url;
          this.$data.accept_publish_article_recommend_to_others = res.data.data.accept_publish_article_recommend_to_others;
          this.$data.accept_recommended_message = res.data.data.accept_recommended_message;
        }).catch(err => {
          console.log(err);
          localStorage.setItem("username", '');
          this.$data.username = '';
        });
      },
      jump: function (name) {
        this.$router.push({name: name});
      },
      handleOpenSubMenu: function (item) {
        if (item.sub_category_list.length > 0) {
          this.$data.activeSubMenu = [];
          for (let i = 0; i < item.sub_category_list.length; i++) {
            this.$data.activeSubMenu.push(item.sub_category_list[i]);
          }
          document.getElementById("submenu").style.display = "block";
        } else {
          this.handleCloseSubMenu();
        }
      },
      handleCloseSubMenu: function () {
        document.getElementById("submenu").style.display = "none";
        this.$data.activeSubMenu = [];
      },
      getMoreGoods: function () {
        if (this.$data.more_goods) {
          if (this.$data.nowType === '') {
            if (this.$data.nowKeyword === '') {
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
            } else {
              this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&keyword=" + this.$data.nowKeyword).then(res => {
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
          } else {
            if (this.$data.nowKeyword === '') {
              this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&category=" + this.$data.nowType + "&is_main=1").then(res => {
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
            } else {
              this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&category=" + this.$data.nowType + "&keyword=" + this.$data.nowKeyword).then(res => {
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
      getAllType: function () {
        this.$axios.get("/api/category/").then(res => {
          for (let i = 0; i < res.data.data.length; i++)
            this.$data.types.push(res.data.data[i]);
          console.log(document.cookie);
        }).catch(err => {
          console.log(err);
        })
      },
      firstTypeSearch: function (item) {
        if (item.category_name === '本月热门') {
          this.monthly_hot()
        } else if (item.category_name === '个性推荐') {
          this.selfRecommend()
        }
      },
      selfRecommend: function () {
        this.$data.maxPage = 1;
        this.$data.goodsItems.splice(0, this.$data.goodsItems.length);
        this.$data.nowType = 1;
        this.$data.nowKeyword = '';
        this.$data.nowTypeName = '个性推荐';
        this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&is_main=1&recommend=1").then(res => {
          for (let i = 0; i < res.data.data.article_list.length; i++)
            this.$data.goodsItems.push(res.data.data.article_list[i]);
          if (!res.data.data.has_next_page) {
            document.getElementById("moreGoods").innerHTML = "已无更多";
            document.getElementById("moreGoods").style.cursor = "auto";
            this.$data.more_goods = false;
          } else this.$data.maxPage++;
        }).catch(err => {
          console.log(err);
        })
      },
      secondTypeSearch: function (item) {
        this.$data.maxPage = 1;
        this.$data.goodsItems.splice(0, this.$data.goodsItems.length);
        this.$data.nowType = item.category_id;
        this.$data.nowKeyword = '';
        this.$data.nowTypeName = item.category_name;
        this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&is_main=1&category=" + item.category_id).then(res => {
          for (let i = 0; i < res.data.data.article_list.length; i++)
            this.$data.goodsItems.push(res.data.data.article_list[i]);
          if (!res.data.data.has_next_page) {
            document.getElementById("moreGoods").innerHTML = "已无更多";
            document.getElementById("moreGoods").style.cursor = "auto";
            this.$data.more_goods = false;
          } else this.$data.maxPage++;

          const ddata = {
            action_type: "category",
            record_data: item.category_id
          };
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          this.$axios.post("/api/action/record/", JSON.stringify(ddata), config).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          })

        }).catch(err => {
          console.log(err);
        });
        this.handleCloseSubMenu();
      },
      getNewPsearchKeyWordOut: function (PsearchKeyWord) {
        this.$data.PsearchKeyWordOut = PsearchKeyWord;
      },
      Psearch: function () {
        if (this.$data.PsearchKeyWordOut === '') location.reload();
        else {
          if (localStorage.getItem('history_search')) {
            let temp = JSON.parse(localStorage.getItem('history_search'));

            let new_search_word_index = temp.indexOf(this.$data.PsearchKeyWordOut);
            if (new_search_word_index === -1) {
              temp.push(this.$data.PsearchKeyWordOut);
            } else if (new_search_word_index !== temp.len - 1) {
              temp.splice(new_search_word_index, 1);
              temp.push(this.$data.PsearchKeyWordOut);
            } else {

            }
            localStorage.setItem('history_search', JSON.stringify(temp));
          } else {
            let temp = [];
            temp.push(this.$data.PsearchKeyWordOut);
            localStorage.setItem('history_search', JSON.stringify(temp));
          }
          this.$data.nowKeyword = this.$data.PsearchKeyWordOut;
          this.$data.maxPage = 1;
          this.$data.nowType = '';
          this.$data.nowTypeName = '搜索-' + this.$data.nowKeyword;
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
      clearType: function () {
        location.reload();
      },
      judgeHandleCloseSubMenu: function (e) {
        if (e.offsetX >= 500 || e.offsetY <= 0 || e.clientY >= 400) {
          this.handleCloseSubMenu();
        }
      },
      judgeHandleCloseSubMenu1: function (e) {
        if (e.offsetX <= 0 || e.clientY >= 400) {
          this.handleCloseSubMenu();
        }
      },
      enterDetail: function (item) {
        let routeUrl = this.$router.resolve({
          path: "/pdetail/" + item.id
        });
        window.open(routeUrl.href, '_blank');
      },
      openSideCol: function (name) {
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
          } else if (name === '加入的组队') {
            this.$axios.get("/api/user/teams/").then(res => {
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
      moreInfo: function () {

      },
      xiajia: function (item) {
        this.$confirm('确认要将“' + item.title + '”下架吗？信息下架后将不会再被其他用户看到。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete("/api/article/?id=" + item.id).then(() => {
            for (let i = 0; i < this.$data.sideContent.length; i++)
              if (this.$data.sideContent[i] === item) {
                this.$data.sideContent.splice(i, 1);
                break;
              }
            this.$message.success("成功下架！");
          })
        }).catch(() => {
          this.$message.error("出了点小问题，请稍后再试！");
        })
      },
      deleteLike: function (item) {
        this.$confirm('确认要取消对“' + item.title + '”的收藏吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete("/api/user/like/?article_id=" + item.id).then(res => {
            this.$message.success("已取消收藏！");
            for (let i = 0; i < this.$data.sideContent.length; i++)
              if (this.$data.sideContent[i] === item) {
                this.$data.sideContent.splice(i, 1);
                break;
              }
          }).catch(err => {
            this.$message.error("出了一点小错误，请稍后再试！");
            console.log(err);
          });
        }).catch(() => {
        })
      },
      clearSee: function () {
        this.$confirm('确认要清空浏览记录吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete("/api/user/viewed/").then(() => {
            this.$data.sideContent.splice(0, this.$data.sideContent.length);
          }).catch(() => {
            this.$message.error("出了一点小意外，请稍后重试！");
          })
        }).catch(() => {
        })

      },
      sideButtonIn: function (id) {
        document.getElementById(id).style.height = "25px";
      },
      sideButtonOut: function (id) {
        document.getElementById(id).style.height = "21px";
      },
      leaveTeam: function (item) {
        this.$confirm('确认要退出队伍“' + item.title + '”吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const dataa = {
            article_id: item.id
          };
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          this.$axios.put("/api/article/leave_team/", dataa, config).then(res => {
            for (let i = 0; i < this.$data.sideContent.length; i++)
              if (this.$data.sideContent[i] === item) {
                this.$data.sideContent.splice(i, 1);
                break;
              }
          }).catch(err => {
            this.$alert("退出失败，请重试");
          })
        }).catch(() => {

        })
      },
      saveSettings: function () {
        this.$confirm('确认要保存设置吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const dataa = {
            accept_recommended_message: this.$data.accept_recommended_message,
            accept_publish_article_recommend_to_others: this.$data.accept_publish_article_recommend_to_others
          };
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          this.$axios.post("/api/user/settings/accept/", dataa, config).then(res => {
          }).catch(err => {
            this.$alert("保存设置失败，请稍后重试！");
          });

          const dataa1 = {
            username: this.$data.username,
            profile_avatar_url: this.$data.touxiangUrl
          };
          this.$axios.put("/api/user/settings/update/", dataa1, config).then(res => {
            this.$message.success("保存成功！");
            location.reload();
          }).catch(err => {
            this.$alert("保存设置失败，请稍后重试！");
          })
        }).catch(() => {
        })
      },
      handleTouxiang: function (e) {
        let fd = new FormData();
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
        };
        fd.append("file", e.target.files[0]);
        this.$axios.post("/api/file/upload/", fd, config).then(res => {
          this.$data.touxiangUrl = res.data.data.file_url;
        }).catch(err => {
          console.log(err);
        })
      },
      biyeji: function () {
        this.$data.nowKeyword = '毕业季';
        this.$data.maxPage = 1;
        this.$data.nowType = '';
        this.$data.nowTypeName = '毕业季';
        this.$data.goodsItems.splice(0, this.$data.goodsItems.length);
        this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&keyword=" + this.$data.nowKeyword).then(res => {
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
      },
      monthly_hot: function () {
        this.$data.maxPage = 1;
        this.$data.nowType = '';
        this.$data.nowKeyword = '';
        this.$data.nowTypeName = '本月热门';
        this.$data.more_goods = true;
        this.$data.goodsItems.splice(0, this.$data.goodsItems.length);
        this.$axios.get("/api/article/?page=" + this.$data.maxPage + "&page_size=10&is_main=1").then(res => {
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
    mounted() {
      this.init();
      this.getAllType();
      this.getMoreGoods();
    },
    beforeRouteLeave(to, from, next) {
      if (to.name === "PDetail") {
        if (this.$data.PsearchKeyWordOut !== '') sessionStorage.setItem("PsearchKeyWordOut", this.$data.PsearchKeyWordOut);
        if (this.$data.nowType !== '') sessionStorage.setItem("nowType", this.$data.nowType);
        if (this.$data.nowTypeName !== '') sessionStorage.setItem("nowTypeName", this.$data.nowTypeName);
        next();
      } else {
        sessionStorage.removeItem("PsearchKeyWordOut");
        sessionStorage.removeItem("nowType");
        sessionStorage.removeItem("nowTypeName");
        next();
      }
    },
    beforeRouteEnter(to, from, next) {
      if (from.name !== 'PDetail') {
        sessionStorage.removeItem("PsearchKeyWordOut");
        sessionStorage.removeItem("nowType");
        sessionStorage.removeItem("nowTypeName");
      }
      next();
    }
  }
</script>

<style scoped>

</style>
