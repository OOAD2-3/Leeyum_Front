<template>
  <div id="root">
    <PMyHead/>
    <div class="bac2">
      <div class="adjust1">
        <div class="pup">
          <div class="pup1">
            <!-- 左侧商品图片 -->
            <div class="pinfoimg">
              <el-carousel :interval="4000" type="card" height="300px">
                <el-carousel-item v-for="item in pic_urls" :key="item"
                                  style="display: flex;align-items: center;background: transparent">
                  <img :src="item" style="width: 100%;" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="pinfo">
              <!----------------di1hang --------------------->
              <div class="pdiyihang">
                <span class="avatar ivu-avatar ivu-avater-circle ivu-avatar-default ivu-avatar-image">
                  <img src="../../../static/picture/about_pic.jpg" style="height: 100%;width: 100%" alt=""/></span>
                <div style="height: 20px;line-height: 20px">&nbsp;&nbsp;{{publisher}}</div>
                <div class="plikeimg" v-if="shou===false"><i class="el-icon-star-off" @click="shoucang"></i></div>
                <div class="plikeimg" v-if="shou===true"><i class="el-icon-star-on" @click="shoucang"></i></div>
                <div class="pjubaoimg"><i class="el-icon-warning-outline" @click="reportVisible=true"></i></div>
              </div>
              <!----------------di2hang --------------------->
              <div class="ptitle">{{title}}</div>
              <!----------------di3hang --------------------->
              <div class="pcontent">{{content}}</div>
              <!----------------info-item --------------------->
              <!--              <div class="pleimu">{{category[0]}}——{{category[1]}}</div>-->

              <div class="detailSpecial" v-if="category[1]==='出售'||category[1]==='求购'">
                <div class="dzhanxinchengdu">
                  <el-icon class="el-icon-magic-stick"></el-icon>
                  <span>{{new_or_old}}成新</span>
                </div>
                <div class="detailPrice">
                  <el-icon name="money" style="color: #616776;"></el-icon>
                  <span>{{price}}元</span>
                </div>
              </div>

              <div class="detailSpecial" v-if="category[1]==='出借'||category[1]==='求租'">
                <div class="tima_span">
                  <el-icon class="el-icon-stopwatch"></el-icon>
                  <span>租借{{time_span}}天</span>
                </div>
                <div class="detailPrice">
                  <el-icon class="el-icon-money" style="color: #616776;"></el-icon>
                  <span>共{{price}}元</span>
                </div>
              </div>

              <div class="detailSpecial" v-if="category[1]==='约玩/约学习'||category[1]==='拼车'">
                <div class="dzhanxinchengdu">
                  <el-icon class="el-icon-time"></el-icon>
                  <span>{{time}}</span>
                </div>
                <div class="dzhanxinchengdu">
                  <el-icon class="el-icon-location-outline"></el-icon>
                  <span>{{place}}</span>
                </div>
                <div class="dzhanxinchengdu">
                  <el-icon class="el-icon-user"></el-icon>
                  <span>{{now_number}}/{{total_number}}人</span>
                  <div class="joinTeam" v-if="!team_has_joined" @click="joinTeam">加入</div>
                  <div class="hasJoinTeam" v-if="team_has_joined" @click="exitTeam">已加入</div>
                </div>
              </div>
              <div class="detailSpecial" v-if="category[1]==='家教'">
                <div class="dzhanxinchengdu">
                  <el-icon class="el-icon-time"></el-icon>
                  <span>{{time}}</span>
                </div>
                <div class="dzhanxinchengdu">
                  <el-icon class="el-icon-location-outline"></el-icon>
                  <span>{{place}}</span>
                </div>
                <div class="detailPrice">
                  <el-icon class="el-icon-money" style="color: #616776;"></el-icon>
                  <span>{{price}}元/节</span>
                </div>
                <div class="dzhanxinchengdu">
                  <el-icon class="el-icon-chat-line-round"></el-icon>
                  <span>学生目前{{target_grade}}</span>
                </div>
                <div class="dzhanxinchengdu">
                  <el-icon class="el-icon-user"></el-icon>
                  <span>只需{{sex_require}}生</span>
                </div>
              </div>
              <div class="detailSpecial" v-if="category[1]==='学校事务'||category[1]==='其他兼职'">
                <div class="dzhanxinchengdu">
                  <el-icon class="el-icon-time"></el-icon>
                  <span>{{time}}</span>
                </div>
                <div class="dzhanxinchengdu">
                  <el-icon class="el-icon-location-outline"></el-icon>
                  <span>{{place}}</span>
                </div>
                <div class="detailPrice">
                  <el-icon class="el-icon-money" style="color: #616776;"></el-icon>
                  <span>报酬{{price}}元</span>
                </div>
              </div>
              <div class="detailSpecial" v-if="category[1]==='志愿者招聘'">
                <div class="dzhanxinchengdu">
                  <el-icon class="el-icon-time"></el-icon>
                  <span>{{time}}</span>
                </div>
                <div class="dzhanxinchengdu">
                  <el-icon class="el-icon-location-outline"></el-icon>
                  <span>{{place}}</span>
                </div>
              </div>


              <div class="dzhanxinchengdu">
                <el-icon class="el-icon-collection-tag" style="color: #8c939d"></el-icon>
                <div v-for="item in tags" class="ptags">
                  <div style="height: 20px;background: white;color: #fdc006;border-radius: 3px;border: 1px solid #fdc006;font-size: 13px;padding:0 3px">{{item}}</div>
                </div>
              </div>

              <!----------------di5hang --------------------->
<!--              <div class="pinfo-item">-->
<!--                <div><i class="el-icon-time"></i>{{publish_time}}</div>-->
<!--              </div>-->
              <div class="pinfo-item">
                <div v-if="username===''"><i class="el-icon-phone-outline"></i><a @click="jump('PLogin')" class="plogin">登录后查看联系方式</a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!----------------------- comment------------------->
        <div class="pcomment">

          <div class="pcommenttitle">
            <div class="pshangpinpingjia">商品评价</div>
            <a @click="jump('PLogin')" class="plogin fr" v-if="username===''">
              <div class="cafterl">
                <span> <button class="ploginbtn">登陆后评论</button></span>
              </div>
            </a>
          </div>
          <div style="border-bottom: 1px solid #e0e0e0;width: 96%;margin-left: 2%"></div>

          <img src="../../../static/picture/nocomment.png" width="1000px" alt="" v-if="comment.length===0">
          <div class="pcommentbox" v-else>
            <div v-for="item in comment" class="commentItem">
              <div class="commentItemPic">
                <img src="../../../static/picture/about_pic.jpg" alt="" style="height: 70px">
              </div>
              <div class="commentItemCol1">
                <div style="min-height: 28px;margin-top: 10%;line-height: 28px;font-weight: bolder">{{item.publisher_name}}</div>
                <div style="min-height: 28px;font-size: 13px;color: #808695;">2020-03-13</div>
              </div>
              <div class="commentItemCol2">{{item.comment_message}}</div>
            </div>
          </div>
        </div>

        <!-- sendcomment -->
        <div class="psendcomment" v-if="username!==''">
          <div>
            <textarea placeholder="请输入您的评论"
                      v-model="textarea"
                      maxlength="50"
                      class="pcommentarea">
            </textarea>
          </div>
          <div class="psend">
            <button class="psendbtn" @click="sendComment">评 论</button>
          </div>
        </div>
        <!-- sendcomment -->
      </div>
    </div>
    <el-dialog :visible.sync="reportVisible" title="我要举报">
      <div style="margin-bottom: 10px">请核实要举报的信息名称<span style="font-weight: bolder;color: black">“{{title}}”</span></div>
      <textarea placeholder="请输入举报原因（200字以内）"
                v-model="ReportReason"
                maxlength="200"
                class="pcommentarea">
      </textarea>
        <button class="reportButton" @click="jubao">举 报</button>
    </el-dialog>
    <tail/>
  </div>
</template>

<script>
  import Tail from "../../components/tail";
  import PMyHead from "../../components/PC/PmyHead";

  export default {
    name: "Pdetail",
    components: {PMyHead, Tail},

    data() {
      return {
        ReportReason:'',
        reportVisible:false,
        username: '',
        text: '',
        textarea: '',
        id: '',
        title: '',
        pic_urls: ["http://leeyum-bucket.oss-cn-hangzhou.aliyuncs.com/default_front_file/404pic.png",],
        content: '',
        tags: [],
        category: [],
        publish_time: '',
        publisher: '',
        comment: [{
          comment_id: 3,
          publisher_name: 2,
          comment_message: "1",
        },{
          comment_id: 4,
          publisher_name: 18805925595,
          comment_message: "苏天宇太帅了",
        }],
        shou: false,


        price:'100',
        new_or_old:10,
        time_span:'3',
        time:'',
        place:'厦大',
        now_number:'1',
        total_number:'3',
        target_grade:'五年级',
        sex_require:'男',
        team_has_joined:'',

      }
    },
    methods: {
      shoucang: function () {
        if(this.$data.username===''){
          this.$message.error("请先登录！");
          this.jump("PLogin");
        }
        else {
          const dataa = {
            article_id: this.$data.id
          };
          const config={
            headers: {
              'Content-Type': 'application/json'
            }
          };
          this.$axios.post("/api/user/like/", dataa,config).then(res => {
            this.$data.shou = !this.$data.shou;
            this.$message.success("收藏成功！");
          }).catch(err => {

          })
        }
      },
      jubao: function () {
        if(this.$data.username===''){
          this.$message.error("请先登录！");
          this.jump("PLogin");
        }
        else {
          const dataa = {
            article_id: this.$data.id,
            report_reason: this.$data.ReportReason
          };
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          this.$axios.post("/api/report/", dataa, config).then(res => {
            this.$message.success("举报成功，感谢您为净化网络做出的贡献！");
            this.$data.reportVisible = false;
          }).catch(err => {
            this.$message.success("出了一点小问题，请稍后再试");
          })
        }
      },
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
        require('../../assets/css/pages/PC/detailStylePC.css');
        if (localStorage.getItem("username") && localStorage.getItem("username") !== '') this.$data.username = localStorage.getItem("username");
      },
      getGoodInfo: function () {
        this.$data.id = this.$route.params.articleId;
        this.$axios.get("/api/article/details/?id=" + this.$data.id).then(res => {
          this.$data.id = res.data.data.id;
          if (res.data.data.pic_urls.length > 0) this.$data.pic_urls.push(...res.data.data.pic_urls);
          this.$data.title = res.data.data.title;
          this.$data.content = res.data.data.content.body;
          this.$data.tags = res.data.data.tags;
          this.$data.category = res.data.data.category;
          this.$data.publish_time = res.data.data.publish_time;
          this.$data.publisher = res.data.data.publisher.username;
          if(res.data.data.content.team_has_joined) this.$data.team_has_joined=res.data.data.content.team_has_joined;
          if(res.data.data.content.price) this.$data.price=res.data.data.content.price;
          if(res.data.data.content.new_or_old) this.$data.new_or_old=res.data.data.content.new_or_old;
          if(res.data.data.content.time_span) this.$data.time_span=res.data.data.content.time_span;
          if(res.data.data.content.time) this.$data.time=res.data.data.content.time;
          if(res.data.data.content.place) this.$data.place=res.data.data.content.place;
          if(res.data.data.content.total_number) this.$data.total_number=res.data.data.content.total_number;
          if(res.data.data.content.now_number) this.$data.now_number=res.data.data.content.now_number;
          if(res.data.data.content.target_grade) this.$data.target_grade=res.data.data.content.target_grade;
          if(res.data.data.content.sex_require) this.$data.sex_require=res.data.data.content.sex_require;
        }).catch(err => {
          console.log(err);
        });

        this.$axios.get("/api/comment/?article_id=" + this.$data.id).then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            let temp = {
              comment_id: res.data.data[i].comment_id,
              publisher_name: res.data.data[i].publisher_id,
              comment_message: res.data.data[i].comment_message,
            };
            this.$data.comment.push(temp);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      jump:function(name){
        this.$router.push({name:name});
      },
      joinTeam:function(){
        if(this.$data.username===''){
          this.$message.error("请先登录！");
          this.jump("PLogin");
        }
        else {
          const dataa = {
            article_id: this.$data.id
          };
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          this.$axios.put("/api/article/join_team/", dataa, config).then(res => {
            this.$data.team_has_joined = true;
            let temp = parseInt(this.$data.now_number) + 1;
            this.$data.now_number = temp.toString();
          }).catch(err => {
            this.$alert("加入失败，请重试");
          })
        }
      },
      exitTeam:function(){
        if(this.$data.username===''){
          this.$message.error("请先登录！");
          this.jump("PLogin");
        }
        else {

          const dataa = {
            article_id: this.$data.id
          };
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          this.$axios.put("/api/article/leave_team/", dataa, config).then(res => {
            this.$data.team_has_joined = false;
            let temp = parseInt(this.$data.now_number) - 1;
            this.$data.now_number = temp.toString();
          }).catch(err => {
            this.$alert("退出失败，请重试");
          })
        }
      },
      sendComment:function() {
        const dataa = {
          comment_article_id: this.$data.id,
          comment_article_message: this.$data.textarea,
        };
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        this.$axios.post("/api/comment/",dataa,config).then(res=>{
          this.$message.success("评论成功！");
          location.reload();
        }).catch(err=>{
          this.$alert("输了一点小问题，请稍后重试！")
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

</style>
